// app/api/supabase/docs/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
    try {
        const { query } = await req.json();
        if (!query) return NextResponse.json({ error: "Query is required" }, { status: 400 });

        // Fetch from official Supabase docs
        const response = await fetch(
            `https://content.supabase.com/content/plahfcrhwd0234ujrnxw4ag3pwrnwxnkwxicxds.supabase.co/content/v1/search?query=${encodeURIComponent(query)}&limit=3`,
            {
                headers: { "Content-Type": "application/json" }
            }
        );

        const data = await response.json();

        // Format results for AI readability
        const results = (data.data || []).map((item: any) => ({
            title: item.title,
            slug: item.slug,
            url: `https://supabase.com/docs/${item.slug}`,
            snippet: item.content?.substring(0, 200) + "...",
        }));

        return NextResponse.json({ success: true, results });
    } catch (error: any) {
        return NextResponse.json({ error: "Failed to fetch docs" }, { status: 500 });
    }
}