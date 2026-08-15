// app/api/projects/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { db } from "@/lib/supabase";
import { projects } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    try {
        const { userId } = getAuth(req);
        if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const userProjects = await db.select({
            id: projects.id,
            name: projects.name,
            status: projects.status,
            createdAt: projects.createdAt, 
        }).from(projects)
            .where(eq(projects.userId, userId))
            .orderBy(desc(projects.createdAt));

        return NextResponse.json(userProjects);
    } catch (error: any) {
        console.error("Fetch projects error:", error);
        return NextResponse.json([], { status: 500 });
    }
}