// app/api/security/schema/route.ts
import { NextResponse, NextRequest } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { db } from "@/lib/supabase";
import { sql } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const { userId } = getAuth(req);
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Fetch all tables in the current schema (public schema)
    const tablesResult = await db.execute(sql`
      SELECT 
        t.table_schema,
        t.table_name,
        t.table_type,
        (SELECT count(*) FROM information_schema.columns WHERE table_schema = t.table_schema AND table_name = t.table_name) as column_count
      FROM information_schema.tables t
      WHERE t.table_schema NOT IN ('information_schema', 'pg_catalog')
      ORDER BY t.table_name;
    `);

    // Fetch columns for all tables
    const columnsResult = await db.execute(sql`
      SELECT 
        table_schema,
        table_name,
        column_name,
        data_type,
        is_nullable,
        column_default
      FROM information_schema.columns
      WHERE table_schema NOT IN ('information_schema', 'pg_catalog')
      ORDER BY table_name, ordinal_position;
    `);


    const rows = tablesResult?.rows || [];

    // Group columns by table
    const schema = tablesResult.rows.reduce((acc, row) => {
      const tableName = row.table_name;
      if (!acc[tableName]) {
        acc[tableName] = { table_schema: row.table_schema, type: row.table_type, columns: [] };
      }
      acc[tableName].columns.push({
        name: row.column_name,
        type: row.data_type,
        nullable: row.is_nullable,
        default: row.column_default,
      });
      return acc;
    }, {} as Record<string, any>);

    return NextResponse.json({ success: true, schema });
  } catch (error: any) {
    console.error("Schema fetch error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}