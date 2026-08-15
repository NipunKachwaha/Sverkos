import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "@/db/schema";

let db: any;

try {
  const postgres = require("postgres");
  const connectionString = process.env.DATABASE_URL!;
  if (
    connectionString &&
    connectionString !== "postgresql://postgres.[YOUR-PROJECT-REF]:[YOUR-PASSWORD]@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres"
  ) {
    const safeUrl = connectionString.replace(/:[^:@]+@/, ':****@');
    console.log("Connecting to DB with URL:", safeUrl);
    const client = postgres(connectionString, {
      prepare: false, 
    });
    db = drizzle(client, { schema });
  } else {
    console.error("⚠️ DATABASE_URL is not set correctly in .env.local");
  }
} catch (error) {
  console.error("⚠️ Failed to initialize database connection. Is the 'postgres' package installed? Run: npm install postgres");
}

export { db };