// app/api/generate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { db } from '@/db/index';
import { projects, projectFiles, generationLogs } from '@/db/schema';
import { CodeGenerator } from '@/lib/ai/code-generator';
import { eq, and } from 'drizzle-orm';

const MAX_PROMPT_LENGTH = 20_000;

function getErrorMessage(err: unknown): string {
    return err instanceof Error ? err.message : String(err);
}

/**
 * Prevents path traversal / absolute-path writes from AI-generated file paths.
 * Returns null if the path is unsafe and should be rejected.
 */
function sanitizeFilePath(rawPath: string): string | null {
    if (!rawPath) return null;
    let cleaned = rawPath.trim().replace(/\\/g, '/').replace(/^\/+/, '');
    if (!cleaned || cleaned.length > 255) return null;
    if (cleaned.split('/').some((seg) => seg === '..')) return null;
    if (/^[a-zA-Z]:/.test(cleaned)) return null;
    return cleaned;
}

export async function POST(req: NextRequest) {
    // Parsed once, up front, so it's available to BOTH the try block and the
    // catch block. Previously the catch block called `await req.json()` again,
    // which always throws ("Body has already been read") because a
    // Request/NextRequest body stream can only be consumed once — meaning the
    // original error-logging path never actually ran.
    let requestBody: { projectId?: string; prompt?: string; model?: string } = {};

    try {
        // Authenticate user
        const { userId } = getAuth(req);
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Parse + validate request body
        requestBody = await req.json();
        const { projectId, prompt, model = 'anthropic' } = requestBody;

        if (!projectId || typeof projectId !== 'string') {
            return NextResponse.json({ error: 'projectId is required' }, { status: 400 });
        }
        if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
            return NextResponse.json({ error: 'prompt is required' }, { status: 400 });
        }
        if (prompt.length > MAX_PROMPT_LENGTH) {
            return NextResponse.json(
                { error: `prompt too long (max ${MAX_PROMPT_LENGTH} characters)` },
                { status: 400 }
            );
        }

        // Verify project ownership
        const project = await db.query.projects.findFirst({
            where: and(eq(projects.id, projectId), eq(projects.userId, userId)),
        });

        if (!project) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }

        // Get existing files (used as context for incremental edits)
        const existingFiles = await db.query.projectFiles.findMany({
            where: eq(projectFiles.projectId, projectId),
        });

        const codeGenerator = new CodeGenerator();
        const startTime = Date.now();

        const generatedFiles = await codeGenerator.generateProjectFiles(
            project,
            prompt,
            existingFiles,
            model
        );

        // Sanitize + validate every path before anything touches the DB.
        const safeFiles = generatedFiles
            .map((file) => {
                const safePath = sanitizeFilePath(file.path);
                if (!safePath) return null;
                return { ...file, path: safePath };
            })
            .filter((f): f is NonNullable<typeof f> => f !== null);

        if (safeFiles.length === 0) {
            return NextResponse.json(
                { error: 'AI did not return any usable files. Please try again.' },
                { status: 500 }
            );
        }

        const duration = Date.now() - startTime;

        // Everything below is one logical unit of work — either all of it lands
        // (files saved, log written, project marked ready) or none of it does.
        // Previously each insert ran independently, so a failure partway through
        // the loop could leave the project half-updated with no record of why.
        const savedFiles = await db.transaction(async (tx) => {
            const inserted = await tx
                .insert(projectFiles)
                .values(
                    safeFiles.map((file) => ({
                        projectId,
                        path: file.path,
                        content: file.content,
                        language: file.language,
                        isEntry: file.isEntry,
                    }))
                )
                .returning();

            await tx.insert(generationLogs).values({
                projectId,
                prompt,
                model,
                duration,
                status: 'success',
            });

            await tx
                .update(projects)
                .set({ status: 'ready', updatedAt: new Date() })
                .where(eq(projects.id, projectId));

            return inserted;
        });

        return NextResponse.json({
            success: true,
            files: savedFiles,
            duration,
        });
    } catch (error) {
        console.error('Error generating code:', error);
        const message = getErrorMessage(error);

        // Best-effort error log — uses the body we already parsed above instead
        // of trying (and failing) to re-read the request stream.
        if (requestBody.projectId) {
            try {
                await db.insert(generationLogs).values({
                    projectId: requestBody.projectId,
                    prompt: requestBody.prompt || '',
                    model: requestBody.model || 'unknown',
                    status: 'error',
                    error: message,
                });
            } catch (logErr) {
                console.error('Failed to write generation error log:', logErr);
            }
        }

        return NextResponse.json(
            { error: 'Failed to generate code', details: message },
            { status: 500 }
        );
    }
}