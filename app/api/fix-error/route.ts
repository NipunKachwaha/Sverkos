// app/api/fix-error/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { errorLogs, files } = await req.json();

        if (!errorLogs || !files) {
            return new Response(JSON.stringify({ error: "Missing error logs or files" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const recentLogs = errorLogs.split('\n').slice(-30).join('\n');

        const systemPrompt = `You are an expert React/Vite debugger. 
The development server crashed with the following error logs:
---
 ${recentLogs}
---

Analyze the stack trace, find the exact file causing the error, and fix it.
RULES:
1. Return ONLY a valid JSON array of the files that need to be fixed/updated.
2. Format: [{"path": "filename", "content": "fixed code"}]
3. Do NOT change files that are not related to the error.
4. Fix the exact issue (e.g., missing import, wrong syntax, undefined variable).`;

        const hasGemini = process.env.GEMINI_API_KEY?.trim();

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${hasGemini}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: systemPrompt }] }],
                    generationConfig: { responseMimeType: "application/json" },
                }),
            }
        );

        if (!response.ok) throw new Error("Failed to call AI for error fixing");

        const data = await response.json();
        let aiResponseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

        // Clean and parse JSON
        let cleanedText = aiResponseText.replace(/```json\s*/gi, '').replace(/```/gi, '').trim();
        const startIndex = cleanedText.indexOf('[');
        const endIndex = cleanedText.lastIndexOf(']') + 1;

        if (startIndex === -1) throw new Error("AI could not generate fixed files");

        let jsonString = cleanedText.substring(startIndex, endIndex);
        jsonString = jsonString.replace(/(?<!\\)\\(?!["\\/bfnrtu])/g, '\\\\'); 

        const fixedFiles = JSON.parse(jsonString);
        return NextResponse.json({ success: true, fixedFiles });
    } catch (error: any) {
        console.error("Fix Error API failed:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}