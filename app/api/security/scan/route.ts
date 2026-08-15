import { NextResponse, NextRequest } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { db } from "@/lib/supabase";
import { sql } from "drizzle-orm";

interface Vulnerability {
  table: string;
  type: "no_rls" | "no_policies" | "public_table" | "missing_pk" | "sensitive_data_exposed";
  severity: "critical" | "high" | "medium" | "low";
  description: string;
  fix: string;
}

export async function POST(req: NextRequest) {
  try {
    // Check auth, requires a request context
    const { userId } = getAuth(req);
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const vulnerabilities: Vulnerability[] = [];

    // 1. Check for tables that don't have row level security enabled (RLS)
    const missingRLS = await db.execute(sql`
      SELECT schemaname, tablename
      FROM pg_tables
      WHERE schemaname NOT IN ('pg_catalog', 'information_schema')
      AND tablename NOT LIKE 'pg_%'
      AND tablename NOT LIKE 'sql_%'
      AND tablename NOT LIKE 'drizzle_%'
      AND (SELECT relrowsecurity FROM pg_class WHERE relname = tablename LIMIT 1) = false
    `);

    if (Array.isArray(missingRLS.rows)) {
      missingRLS.rows.forEach((row: any) => {
        vulnerabilities.push({
          table: row.tablename,
          type: "no_rls",
          severity: "high",
          description: `Table "${row.tablename}" is missing Row Level Security (RLS). Anyone with the anon key can read this data!`,
          fix: `ALTER TABLE "${row.tablename}" ENABLE ROW LEVEL SECURITY;`
        });
      });
    }

    // 2. Check for tables without ANY policies defined (no_policies)
    const noPolicies = await db.execute(sql`
      SELECT t.table_schema, t.table_name
      FROM information_schema.tables t
      WHERE t.table_schema NOT IN ('pg_catalog', 'information_schema')
      AND NOT EXISTS (
        SELECT 1 FROM pg_policies p
        WHERE p.schemaname = t.table_schema AND p.tablename = t.table_name
      )
    `);

    if (Array.isArray(noPolicies.rows)) {
      noPolicies.rows.forEach((row: any) => {
        // Don't double-report if this table already flagged in no_rls
        if (!vulnerabilities.find(v => v.table === row.table_name)) {
          vulnerabilities.push({
            table: row.table_name,
            type: "no_policies",
            severity: "medium",
            description: `Table "${row.table_name}" has absolutely no RLS policies defined.`,
            fix: `Define RLS policies for read and write operations on "${row.table_name}".`
          });
        }
      });
    }

    // 3. Check for tables without Primary Keys (missing_pk)
    const noPK = await db.execute(sql`
      SELECT t.table_schema, t.table_name
      FROM information_schema.tables t
      WHERE t.table_schema NOT IN ('pg_catalog', 'information_schema')
      AND NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints tc
        WHERE tc.table_schema = t.table_schema
        AND tc.table_name = t.table_name
        AND tc.constraint_type = 'PRIMARY KEY'
      )
    `);

    if (Array.isArray(noPK.rows)) {
      noPK.rows.forEach((row: any) => {
        vulnerabilities.push({
          table: row.table_name,
          type: "missing_pk",
          severity: "low",
          description: `Table "${row.table_name}" does not have a Primary Key. This can cause performance issues.`,
          fix: `ALTER TABLE "${row.table_name}" ADD COLUMN id SERIAL PRIMARY KEY;`
        });
      });
    }

    // 4. Check for known sensitive tables exposed without policies (sensitive_data_exposed)
    const sensitiveTables = ['users', 'payments', 'orders', 'api_keys', 'secrets', 'tokens'];
    if (Array.isArray(noPolicies.rows)) {
      for (const tableName of sensitiveTables) {
        const exists = noPolicies.rows.find((row: any) => row.table_name === tableName);
        if (exists) {
          vulnerabilities.push({
            table: tableName,
            type: "sensitive_data_exposed",
            severity: "critical",
            description: `CRITICAL: Table "${tableName}" contains likely sensitive data but lacks proper security policies.`,
            fix: `Immediately restrict access to "${tableName}" and create strict RLS policies.`
          });
        }
      }
    }

    const criticalCount = vulnerabilities.filter(v => v.severity === "critical").length;

    return NextResponse.json({
      success: true,
      vulnerabilities,
      summary: `${vulnerabilities.length} security issues found. ${criticalCount > 0 ? criticalCount + ' are critical.' : ""}`
    });
  } catch (error: any) {
    console.error("Security scan error:", error);
    return NextResponse.json({ error: error?.message ?? "Internal Server Error" }, { status: 500 });
  }
}