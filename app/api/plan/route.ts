// app/api/plan/route.ts
import { NextRequest } from "next/server";
import { PLANFORGE_SYSTEM_PROMPT } from "@/lib/prompts";
import { DEFAULT_CONFIG, PlanForgeConfig } from "@/types/chat";

const GEMINI_MODEL = "gemini-2.5-flash";
const GEMINI_API_BASE = "https://generativelanguage.googleapis.com/v1beta/models";

interface MessagePart {
    text?: string;
    inlineData?: {
        mimeType: string;
        data: string; 
    };
}

interface GeminiMessage {
    role: "user" | "model";
    parts: MessagePart[];
}

interface IncomingMessage {
    role: "user" | "assistant";
    content: string;
    images?: string[]; 
}

export async function POST(req: NextRequest) {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return new Response(
                JSON.stringify({ error: "GEMINI_API_KEY environment variable not set" }),
                { status: 500, headers: { "Content-Type": "application/json" } }
            );
        }

        const body = await req.json();
        const { messages, config } = body as {
            messages: IncomingMessage[];
            config?: PlanForgeConfig;
        };

        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return new Response(
                JSON.stringify({ error: "Messages array is required" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        const parseBase64Image = (base64String: string): { mimeType: string; data: string } | null => {
            try {
                const matches = base64String.match(/^data:([^;]+);base64,(.+)$/);
                if (matches && matches.length === 3) {
                    return {
                        mimeType: matches[1],
                        data: matches[2]
                    };
                }
                return {
                    mimeType: "image/jpeg", 
                    data: base64String
                };
            } catch {
                return null;
            }
        };

        // Convert messages with image support
        const contents: GeminiMessage[] = messages.map((msg) => {
            const parts: MessagePart[] = [];

            // Add images first (Gemini best practice - images before text)
            if (msg.images && msg.images.length > 0) {
                for (const imgBase64 of msg.images) {
                    const parsed = parseBase64Image(imgBase64);
                    if (parsed) {
                        parts.push({
                            inlineData: {
                                mimeType: parsed.mimeType,
                                data: parsed.data
                            }
                        });
                    }
                }
            }

            // Add text content
            if (msg.content && msg.content.trim()) {
                parts.push({ text: msg.content });
            }

            // Fallback - If no text and image 
            if (parts.length === 0) {
                parts.push({ text: "" });
            }

            return {
                role: msg.role === "assistant" ? "model" : "user",
                parts
            };
        });

        const mergedConfig = { ...DEFAULT_CONFIG, ...config };

        const url = `${GEMINI_API_BASE}/${GEMINI_MODEL}:streamGenerateContent?alt=sse&key=${apiKey}`;

        const geminiResponse = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                system_instruction: {
                    parts: [{ text: PLANFORGE_SYSTEM_PROMPT }],
                },
                contents,
                generationConfig: {
                    temperature: mergedConfig.temperature,
                    topP: mergedConfig.topP,
                    topK: mergedConfig.topK,
                    maxOutputTokens: mergedConfig.maxOutputTokens,
                },
            }),
        });

        if (!geminiResponse.ok) {
            let errorMsg = `Gemini API Error: ${geminiResponse.status}`;
            try {
                const errData = await geminiResponse.json();
                errorMsg = errData.error?.message || errorMsg;
            } catch {}
            return new Response(
                JSON.stringify({ error: errorMsg }),
                { status: geminiResponse.status, headers: { "Content-Type": "application/json" } }
            );
        }

        return new Response(geminiResponse.body, {
            headers: {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache, no-transform",
                Connection: "keep-alive",
            },
        });
    } catch (error: any) {
        console.error("[PlanForge API Error]", error);
        return new Response(
            JSON.stringify({ error: error.message || "Internal server error" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}