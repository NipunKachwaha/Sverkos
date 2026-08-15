// app/api/generate/stream/route.ts
import { NextRequest } from "next/server";
import { SYSTEM_PROMPT } from "./prompt";

export const runtime = "nodejs";
export const maxDuration = 120; 

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const MAX_PROMPT_LENGTH = 20_000;
const MAX_OUTPUT_TOKENS = 8000;
const HEARTBEAT_MS = 15_000;

const MODEL_IDS = {
    anthropic: {
        default: "claude-3-5-sonnet-20240620",
        sonnet: "claude-3-5-sonnet-20240620",
        opus: "claude-3-opus-20240229",
        haiku: "claude-3-haiku-20240307",
    },
    openai: {
        default: "gpt-4o",
    },
    gemini: {
        default: "gemini-2.5-flash",
    },
} as const;

// Added all the new providers here
type Provider = "anthropic" | "openai" | "gemini" | "groq" | "perplexity" | "deepseek" | "mistral" | "openrouter" | "grok";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getErrorMessage(err: unknown): string {
    return err instanceof Error ? err.message : String(err);
}

function detectProvider(modelLower: string): Provider {
    if (modelLower.includes("claude") || modelLower.includes("anthropic")) return "anthropic";
    if (modelLower.includes("gpt") || modelLower.includes("openai")) return "openai";
    if (modelLower.includes("gemini")) return "gemini";
    if (modelLower.includes("llama") || modelLower.includes("groq")) return "groq";
    return "openai"; // Fallback to OpenAI API structure for custom providers
}

function resolveAnthropicModel(modelLower: string): string {
    if (modelLower.includes("haiku")) return MODEL_IDS.anthropic.haiku;
    if (modelLower.includes("opus")) return MODEL_IDS.anthropic.opus;
    if (modelLower.includes("sonnet")) return MODEL_IDS.anthropic.sonnet;
    return MODEL_IDS.anthropic.default;
}

function sanitizeFilePath(rawPath: string): string | null {
    if (!rawPath) return null;
    let cleaned = rawPath.trim().replace(/\\/g, "/");
    cleaned = cleaned.replace(/^\/+/, ""); 
    if (!cleaned) return null;
    if (cleaned.length > 255) return null;
    if (cleaned.split("/").some((seg) => seg === "..")) return null;
    if (/^[a-zA-Z]:/.test(cleaned)) return null; 
    return cleaned;
}

function getLanguageFromPath(path: string): string {
    const ext = path.split(".").pop()?.toLowerCase() || "";
    const langMap: Record<string, string> = {
        ts: "typescript", tsx: "typescript",
        js: "javascript", jsx: "javascript",
        css: "css", scss: "scss",
        html: "html", json: "json", md: "markdown",
    };
    return langMap[ext] || "plaintext";
}

// ---------------------------------------------------------------------------
// Incremental <lov-write> parser (Unchanged)
// ---------------------------------------------------------------------------

interface ParsedFileStart { type: "file_start"; path: string; index: number; }
interface ParsedFileComplete { type: "file_complete"; path: string; content: string; index: number; truncated?: boolean; }
type ParserEvent = ParsedFileStart | ParsedFileComplete;

class LovWriteStreamParser {
    private buffer = "";
    private cursor = 0;
    private inFile = false;
    private currentPath = "";
    private currentContentStart = 0;
    private fileIndex = 0;
    private static OPEN_TAG = /<lov-write\s+(?:file_)?path=["']([^"']+)["']>/i;
    private static CLOSE_TAG = "</lov-write>";

    constructor(private onEvent: (event: ParserEvent) => void) {}

    push(chunk: string) {
        this.buffer += chunk;
        this.drain();
    }

    private drain() {
        for (;;) {
            if (!this.inFile) {
                const remaining = this.buffer.slice(this.cursor);
                const match = remaining.match(LovWriteStreamParser.OPEN_TAG);
                if (!match || match.index === undefined) return;

                const rawPath = match[1];
                this.cursor += match.index + match[0].length;

                const safePath = sanitizeFilePath(rawPath);
                if (!safePath) continue; 

                this.inFile = true;
                this.currentPath = safePath;
                this.currentContentStart = this.cursor;
                this.fileIndex += 1;
                this.onEvent({ type: "file_start", path: safePath, index: this.fileIndex });
            } else {
                const remaining = this.buffer.slice(this.cursor);
                const closeIdx = remaining.indexOf(LovWriteStreamParser.CLOSE_TAG);
                if (closeIdx === -1) return; 

                const content = this.buffer
                    .slice(this.currentContentStart, this.cursor + closeIdx)
                    .trim();
                this.cursor += closeIdx + LovWriteStreamParser.CLOSE_TAG.length;
                this.inFile = false;

                if (content) {
                    this.onEvent({
                        type: "file_complete",
                        path: this.currentPath,
                        content,
                        index: this.fileIndex,
                    });
                } else {
                    this.fileIndex -= 1; 
                }
            }
        }
    }

    finalize() {
        if (this.inFile) {
            const content = this.buffer.slice(this.currentContentStart).trim();
            if (content) {
                this.onEvent({
                    type: "file_complete",
                    path: this.currentPath,
                    content,
                    index: this.fileIndex,
                    truncated: true,
                });
            }
        }
    }

    get totalFiles() {
        return this.fileIndex;
    }
}

// ---------------------------------------------------------------------------
// Provider request builders (Updated for API Key logic & New Providers)
// ---------------------------------------------------------------------------

function buildProviderRequest(provider: Provider, modelLower: string, userPrompt: string, apiKey: string) {
    if (provider === "anthropic") {
        return {
            url: "https://api.anthropic.com/v1/messages",
            headers: {
                "anthropic-version": "2023-06-01",
                "x-api-key": apiKey,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: resolveAnthropicModel(modelLower),
                max_tokens: MAX_OUTPUT_TOKENS,
                system: SYSTEM_PROMPT,
                stream: true,
                messages: [{ role: "user", content: userPrompt }],
            }),
        };
    }

    if (provider === "gemini") {
        const geminiModel = MODEL_IDS.gemini.default;
        return {
            url: `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:streamGenerateContent?alt=sse&key=${apiKey}`,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: `SYSTEM: ${SYSTEM_PROMPT}\n\nUSER: ${userPrompt}` }] }],
                generationConfig: { temperature: 0.2, maxOutputTokens: MAX_OUTPUT_TOKENS },
            }),
        };
    }

    // --- Handling OpenAI and ALL OpenAI-Compatible Providers ---
    let url = "https://api.openai.com/v1/chat/completions";
    let actualModel: string = MODEL_IDS.openai.default;

    if (provider === "groq") { url = "https://api.groq.com/openai/v1/chat/completions"; actualModel = "llama3-70b-8192"; }
    else if (provider === "perplexity") { url = "https://api.perplexity.ai/chat/completions"; actualModel = "llama-3-sonar-large-32k-online"; }
    else if (provider === "deepseek") { url = "https://api.deepseek.com/chat/completions"; actualModel = "deepseek-coder"; }
    else if (provider === "mistral") { url = "https://api.mistral.ai/v1/chat/completions"; actualModel = "mistral-large-latest"; }
    else if (provider === "openrouter") { url = "https://openrouter.ai/api/v1/chat/completions"; actualModel = "auto"; }
    else if (provider === "grok") { url = "https://api.x.ai/v1/chat/completions"; actualModel = "grok-1.5"; }

    return {
        url,
        headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: actualModel,
            stream: true,
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: userPrompt },
            ],
        }),
    };
}

/** Reads an upstream SSE body and yields plain text deltas, provider-agnostic. */
async function* streamProviderText(
    body: ReadableStream<Uint8Array>,
    provider: Provider,
    signal: AbortSignal
): AsyncGenerator<string> {
    const reader = body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    try {
        while (true) {
            if (signal.aborted) break;
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
                const trimmed = line.trim();
                if (!trimmed.startsWith("data:")) continue;
                const dataStr = trimmed.slice(5).trim();
                if (!dataStr || dataStr === "[DONE]") continue;

                let json: any;
                try {
                    json = JSON.parse(dataStr);
                } catch {
                    continue; 
                }

                if (provider === "anthropic") {
                    if (json.type === "content_block_delta" && json.delta?.type === "text_delta") {
                        yield json.delta.text as string;
                    }
                } else if (provider === "gemini") {
                    const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
                    if (text) yield text as string;
                } else {
                    // This handles OpenAI AND all OpenAI-compatible endpoints (Groq, Mistral, etc.)
                    const delta = json.choices?.[0]?.delta?.content;
                    if (delta) yield delta as string;
                }
            }
        }
    } finally {
        reader.releaseLock();
    }
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

export async function POST(req: NextRequest) {
    let payload: { prompt?: string; model?: string };
    try {
        payload = await req.json();
    } catch {
        return jsonError("Invalid JSON body", 400);
    }

    const { prompt, model = "gemini-2.5-flash" } = payload;

    if (!prompt || !prompt.trim()) {
        return jsonError("Prompt is required", 400);
    }
    if (prompt.length > MAX_PROMPT_LENGTH) {
        return jsonError(`Prompt too long (max ${MAX_PROMPT_LENGTH} characters)`, 400);
    }

    // 🌟 1. Extract API Key and Provider from Frontend Headers
    let userApiKey = req.headers.get("x-api-key");
    let requestedProvider = req.headers.get("x-ai-provider") as Provider | null;
    const modelLower = model.toLowerCase();

    // If frontend didn't specify provider, try to guess from the model name
    if (!requestedProvider) {
        try {
            requestedProvider = detectProvider(modelLower);
        } catch (err) {
            return jsonError(getErrorMessage(err), 400);
        }
    }

    // 🌟 2. FALLBACK: If user didn't provide a key, check .env.local
    if (!userApiKey || userApiKey === "null" || userApiKey === "") {
        if (requestedProvider === "openai") userApiKey = process.env.OPENAI_API_KEY || null;
        else if (requestedProvider === "anthropic") userApiKey = process.env.ANTHROPIC_API_KEY || null;
        else if (requestedProvider === "gemini") userApiKey = process.env.GEMINI_API_KEY || null;
        else if (requestedProvider === "groq") userApiKey = process.env.GROQ_API_KEY || null;
        else if (requestedProvider === "mistral") userApiKey = process.env.MISTRAL_API_KEY || null;
        else if (requestedProvider === "perplexity") userApiKey = process.env.PERPLEXITY_API_KEY || null;
        else if (requestedProvider === "deepseek") userApiKey = process.env.DEEPSEEK_API_KEY || null;
        else if (requestedProvider === "openrouter") userApiKey = process.env.OPENROUTER_API_KEY || null;
        else if (requestedProvider === "grok") userApiKey = process.env.GROK_API_KEY || null;
    }

    // 🌟 3. Reject if no key is found at all
    if (!userApiKey) {
        return jsonError("API Key missing. Please set it in the API Configuration or in your environment variables.", 401);
    }

    const userPrompt = `User Request: ${prompt}

CRITICAL REQUIREMENTS:
1. You must output the code files using the <lov-write> XML tag.
2. YOU MUST ALWAYS generate the main entry file of the application (e.g., 'src/App.tsx' for React/Vite, or 'app/page.tsx' for Next.js). Without this, the application preview will fail and crash.
3. Include all necessary imports, styles, and a proper default export in the main entry file.
4. The output must be a fully working, renderable application.

Example format:
<lov-write file_path="src/App.tsx">
export default function App() { return <div>Hello World</div>; }
</lov-write>`;

    let upstreamRequest;
    try {
        upstreamRequest = buildProviderRequest(requestedProvider, modelLower, userPrompt, userApiKey);
    } catch (err) {
        return jsonError(getErrorMessage(err), 400);
    }

    const abortController = new AbortController();
    req.signal.addEventListener("abort", () => abortController.abort());

    let upstreamResponse: Response;
    try {
        upstreamResponse = await fetch(upstreamRequest.url, {
            method: "POST",
            headers: upstreamRequest.headers as any,
            body: upstreamRequest.body,
            signal: abortController.signal,
        });
    } catch (err) {
        return jsonError(`Failed to reach AI provider: ${getErrorMessage(err)}`, 502);
    }

    if (!upstreamResponse.ok || !upstreamResponse.body) {
        const errorText = await upstreamResponse.text().catch(() => "");
        let message = "Unknown API error";
        try {
            message = JSON.parse(errorText).error?.message || errorText;
        } catch {
            message = errorText.substring(0, 300) || message;
        }
        return jsonError(`API Error ${upstreamResponse.status}: ${message}`, 502);
    }

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
        async start(controller) {
            let closed = false;
            const safeEnqueue = (data: object) => {
                if (closed) return;
                controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
            };

            const heartbeat = setInterval(() => {
                if (!closed) controller.enqueue(encoder.encode(`: heartbeat\n\n`));
            }, HEARTBEAT_MS);

            safeEnqueue({ type: "plan", message: "Generating files..." });

            const parser = new LovWriteStreamParser((event) => {
                if (event.type === "file_start") {
                    safeEnqueue({ type: "file_start", path: event.path, index: event.index });
                } else {
                    safeEnqueue({
                        type: "file_complete",
                        file: {
                            id: `file-${event.index}`,
                            path: event.path,
                            content: event.content,
                            language: getLanguageFromPath(event.path),
                        },
                        truncated: event.truncated ?? false,
                    });
                }
            });

            try {
                // Pass the requestedProvider so streamProviderText parses the data format correctly
                for await (const textChunk of streamProviderText(
                    upstreamResponse.body!,
                    requestedProvider as Provider,
                    abortController.signal
                )) {
                    parser.push(textChunk);
                }
                parser.finalize();

                if (parser.totalFiles === 0) {
                    safeEnqueue({
                        type: "error",
                        message: "AI did not generate any files in the expected format. Please try your prompt again.",
                    });
                } else {
                    safeEnqueue({ type: "complete", totalFiles: parser.totalFiles });
                }
            } catch (err) {
                if (!abortController.signal.aborted) {
                    safeEnqueue({ type: "error", message: getErrorMessage(err) });
                }
            } finally {
                clearInterval(heartbeat);
                closed = true;
                controller.close();
            }
        },
        cancel() {
            abortController.abort();
        },
    });

    return new Response(stream, {
        headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache, no-transform",
            Connection: "keep-alive",
            "X-Accel-Buffering": "no", 
        },
    });
}

function jsonError(message: string, status: number) {
    return new Response(JSON.stringify({ error: message }), {
        status,
        headers: { "Content-Type": "application/json" },
    });
}