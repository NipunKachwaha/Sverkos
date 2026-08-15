// app/api/projects/save/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { db } from "@/lib/supabase";
import { projects, projectFiles } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
    try {
        const { userId } = getAuth(req);
        if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { name, files, status = "ready" } = await req.json();
        if (!name || !files || files.length === 0) {
            return NextResponse.json({ error: "Missing data" }, { status: 400 });
        }

        // 1. Project Create
        const [newProject] = await db.insert(projects).values({
            userId,
            name,
            status,
        }).returning();

        // 2. Files Insert (Bulk insert)
        const filesToInsert = files.map((file: any) => ({
            projectId: newProject.id,
            path: file.path,
            content: file.content,
            language: file.language || "plaintext",
        }));

        await db.insert(projectFiles).values(filesToInsert);

        return NextResponse.json({ success: true, projectId: newProject.id });
    } catch (error: any) {
        console.error("Save Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}