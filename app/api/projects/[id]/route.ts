// app/api/projects/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { db } from "@/lib/supabase";
import { projects, projectFiles } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { userId } = getAuth(req);
        if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const projectId = (await params).id;

        // Project load - Updated to use standard db.select() for safety
        const [project] = await db.select()
            .from(projects)
            .where(and(
                eq(projects.id, projectId), 
                eq(projects.userId, userId)
            ));

        if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });

        // Files load
        const files = await db.select()
            .from(projectFiles)
            .where(eq(projectFiles.projectId, projectId));

        return NextResponse.json({ project, files });
    } catch (error: any) {
        console.error("Single Project Fetch Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { userId } = getAuth(req);
        if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const projectId = params.id;

        await db.delete(projectFiles).where(eq(projectFiles.projectId, projectId));
        await db.delete(projects).where(and(eq(projects.id, projectId), eq(projects.userId, userId)));

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Delete Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// 2. PROJECT RENAME
export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { userId } = getAuth(req);
        if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const projectId = params.id;
        const { name } = await req.json();

        if (!name) return NextResponse.json({ error: "Name is required" }, { status: 400 });

        // Update the project name
        await db.update(projects)
            .set({ name })
            .where(and(eq(projects.id, projectId), eq(projects.userId, userId)));

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Rename Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}