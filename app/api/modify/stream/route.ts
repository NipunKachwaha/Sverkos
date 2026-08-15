// app/api/modify/stream/route.ts
import { NextRequest } from "next/server";
import type { ProjectFile } from "@/types/chat";

export async function POST(req: NextRequest) {
    try {
        const { prompt, model = "gemini-2.5-flash", files, activeFilePath } = await req.json();

        if (!prompt || !files || files.length === 0) {
            return new Response(JSON.stringify({ error: "Prompt and existing files are required" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        // AI ko context dene ke liye existing files ko ek string me convert karna
        let contextString = "Current Project Files:\n\n";
        files.forEach((file: ProjectFile) => {
            const isTarget = file.path === activeFilePath ? " (USER IS CURRENTLY VIEWING THIS FILE)" : "";
            contextString += `--- ${file.path}${isTarget} ---\n${file.content}\n\n`;
        });

        // System Prompt for Modification
        const systemPrompt = `You are an expert developer modifying an existing codebase.
    
RULES:
1. Analyze the user's request and the provided existing code.
2. Return ONLY a valid JSON array of objects containing the files that NEED TO BE CHANGED OR CREATED. Do NOT return unchanged files.
3. Each object must have this exact structure: {"path": "filename.tsx", "content": "updated code here"}
4. If you need to create a brand new file, include it in the array.
5. Do NOT add markdown formatting like \`\`\`json. Return raw JSON only.
6. Ensure all imports/exports remain correct across files if you add new components.`;

        const userPrompt = `${contextString}\n\nUser's modification request: ${prompt}\n\nReturn the updated/created files as a JSON array.`;

        // --- GEMINI 2.5 FLASH API CALL ---
        if (!process.env.GEMINI_API_KEY) {
            throw new Error("GEMINI_API_KEY is missing");
        }

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: `SYSTEM: ${systemPrompt}\n\n${userPrompt}` }] }],
                generationConfig: {
                    responseMimeType: "application/json"
                },
            }),
        });

        if (!response.ok) {
            const errorData = await response.text();
            let exactError = "Unknown API error";
            try {
                const parsedError = JSON.parse(errorData);
                exactError = parsedError.error?.message || errorData;
            } catch { exactError = errorData.substring(0, 300); }
            throw new Error(`API Error ${response.status}: ${exactError}`);
        }

        const data = await response.json();
        let aiResponseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

        // Clean up response
        aiResponseText = aiResponseText.replace(/^```json\s*/gm, "").replace(/^```\s*/gm, "").trim();

        // Parse JSON
        let modifiedFiles;
        try {
            const jsonMatch = aiResponseText.match(/\[[\s\S]*\]/);
            if (jsonMatch) {
                modifiedFiles = JSON.parse(jsonMatch[0]);
            } else {
                throw new Error("No JSON array found");
            }
        } catch (parseError) {
            console.error("Parse Error:", parseError, "\nRaw:", aiResponseText);
            throw new Error("AI returned invalid structure for modification.");
        }

        // --- STREAMING BACK TO FRONTEND ---
        const encoder = new TextEncoder();
        const stream = new ReadableStream({
            async start(controller) {
                try {
                    // Existing files ke paths ka set banayein taaki pata chale file new hai ya purani
                    const existingPaths = new Set(files.map((f: ProjectFile) => f.path));

                    for (const file of modifiedFiles) {
                        if (!file.path || file.content === undefined) continue;

                        // Check kar rahe hain ki yeh file pehle se hai ya nahi
                        const eventType = existingPaths.has(file.path) ? "file_update" : "file_add";

                        // Small delay for visual effect
                        await new Promise((resolve) => setTimeout(resolve, 200));

                        // Send event to frontend
                        controller.enqueue(
                            encoder.encode(`data: ${JSON.stringify({
                                type: eventType,
                                file: {
                                    id: `file-${Date.now()}`,
                                    path: file.path,
                                    content: file.content,
                                    language: getLanguageFromPath(file.path),
                                }
                            })}\n\n`)
                        );
                    }

                    // Send complete event
                    controller.enqueue(
                        encoder.encode(`data: ${JSON.stringify({ type: "complete", message: "Changes applied successfully!" })}\n\n`)
                    );
                    controller.close();
                } catch (err) {
                    controller.enqueue(
                        encoder.encode(`data: ${JSON.stringify({ type: "error", message: "Stream processing failed" })}\n\n`)
                    );
                    controller.close();
                }
            },
        });

        return new Response(stream, {
            headers: {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                Connection: "keep-alive",
            },
        });
    } catch (error: any) {
        console.error("Modify API Error:", error);
        return new Response(
            JSON.stringify({ error: error.message || "Internal Server Error" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}

// Helper function
function getLanguageFromPath(path: string): string {
    const ext = path.split(".").pop()?.toLowerCase() || "";
    const langMap: Record<string, string> = {
        ts: "typescript", tsx: "typescript", js: "javascript", jsx: "javascript",
        css: "css", scss: "scss", html: "html", json: "json", md: "markdown",
    };
    return langMap[ext] || "plaintext";
}