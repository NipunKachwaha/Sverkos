// app/api/security/fix-rls/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { db } from "@/lib/supabase";
import { sql } from "drizzle-orm";

export async function POST(req: NextRequest) {
    try {
        const { userId } = getAuth();
        if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { policyName, tableName, policySQL } = await req.json();

        if (!policyName || !tableName || !policySQL) {
            return NextResponse.json({ error: "Missing required fields: policyName, tableName, policySQL" }, { status: 400 });
        }

        const safeTableName = tableName.replace(/[^a-zA-Z0-9_]/g, "");

        try {
            await db.execute(sql`DROP POLICY IF EXISTS "${policyName}" ON "${safeTableName}"`);

            await db.execute(sql`${policySQL}`);

            return NextResponse.json({
                success: true,
                message: `Successfully created policy "${policyName}" on table "${safeTableName}"`
            });
        } catch (error: any) {
            console.error("RLS fix error:", error);
            return NextResponse.json({ error: `Failed to apply policy: ${error.message}` }, { status: 500 });
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}