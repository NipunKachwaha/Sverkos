"use client";

import { useEffect, useRef } from "react";
import {
    Zap, StopCircle, Copy, Check, Save, Star, Edit3, Download
} from "lucide-react";
import { cn } from "@/lib/utils";
import { renderMarkdown } from "@/lib/markdown";
import Sverkos from "@/public/sverkoslogo-removebg.png";
import BlurText from "@/components/pages/plan/BlurText";

export interface ChatMessage {
    id: string;
    role: "user" | "model" | "assistant";
    content: string;
}

interface ChatareaProps {
    messages: ChatMessage[];
    streamingContent: string;
    isGenerating: boolean;
    copiedId: string | null;
    stopGeneration: () => void;
    handleCopyPlan: (content: string, id: string) => void;
    handleCustomize: (prompt: string) => void;
    hasChatStarted: boolean;
}

export function Chatarea({
    messages,
    streamingContent,
    isGenerating,
    copiedId,
    stopGeneration,
    handleCopyPlan,
    handleCustomize,
    hasChatStarted,
}: ChatareaProps) {

    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, streamingContent]);

    if (!hasChatStarted) {
        return (
            <div className="min-h-[300px] flex flex-col items-center justify-center px-4 py-10">
                <BlurText
                    text="Discuss your plan for your next build, Nipun?"
                    className="text-4xl md:text-5xl lg:text-[4.5rem] font-heading italic text-white leading-[0.8] max-w-2xl tracking-[-4px] text-center"
                />
            </div>
        );
    }

    return (
        <div
            ref={scrollRef}
            className="max-h-[50vh] md:max-h-[450px] w-full overflow-y-auto p-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-neutral-300 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-700 [&::-webkit-scrollbar-thumb]:rounded-full"
        >
            <div className="flex flex-col gap-6">
                {messages.map((m) => (
                    <div key={m.id} className={cn("flex w-full flex-col", m.role === 'user' ? "items-end" : "items-start")}>
                        {m.role === 'user' ? (
                            <div className="max-w-[80%] rounded-2xl px-5 py-3 text-sm bg-black text-white dark:bg-white dark:text-black shadow-md">
                                {m.content}
                            </div>
                        ) : (
                            <div className="w-full max-w-[90%] bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6 shadow-lg text-left text-sm text-black dark:text-white prose dark:prose-invert">
                                <div className="flex items-center justify-between mb-4 border-b border-neutral-100 dark:border-neutral-800 pb-3">
                                    <div className="flex items-center gap-2">
                                        <img src={Sverkos.src} alt="Sverkos" className="w-5 h-5 animate-pulse" />
                                        <h3 className="text-lg font-bold">Sverkos PlanForge AI</h3>
                                    </div>
                                    <button onClick={() => handleCopyPlan(m.content, m.id)} className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors">
                                        {copiedId === m.id ? (<><Check className="w-3.5 h-3.5 text-green-500" /> Copied</>) : (<><Copy className="w-3.5 h-3.5" /> Copy Plan</>)}
                                    </button>
                                </div>
                                <div dangerouslySetInnerHTML={{ __html: renderMarkdown(m.content) }} />
                                {!isGenerating && (
                                    <div className="mt-6 pt-5 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap gap-3 non-prose">
                                        <span className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5 w-full mb-2 uppercase tracking-wider font-semibold"><Zap className="w-3.5 h-3.5 text-blue-500" /> Quick Actions</span>
                                        <button onClick={() => console.log("Save clicked")} className="group flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full bg-black/5 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:bg-black/10 dark:hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300 text-neutral-700 dark:text-neutral-200"><Save className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" /> Save Plan</button>
                                        <button onClick={() => console.log("Favorite clicked")} className="group flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full bg-black/5 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:bg-black/10 dark:hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300 text-neutral-700 dark:text-neutral-200"><Star className="w-3.5 h-3.5 text-pink-500 dark:text-pink-400" /> Favorite</button>
                                        <button onClick={() => handleCustomize("I want to edit this plan: ")} className="group flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full bg-black/5 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:bg-black/10 dark:hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300 text-neutral-700 dark:text-neutral-200"><Edit3 className="w-3.5 h-3.5 text-purple-500 dark:text-purple-400" /> Edit</button>
                                        <button onClick={() => console.log("Export clicked")} className="group flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full bg-black/5 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:bg-black/10 dark:hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300 text-neutral-700 dark:text-neutral-200"><Download className="w-3.5 h-3.5 text-green-500 dark:text-green-400" /> Export</button>
                                        <button onClick={() => handleCopyPlan(m.content, m.id)} className="group flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full bg-black/5 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:bg-black/10 dark:hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300 text-neutral-700 dark:text-neutral-200">
                                            {copiedId === m.id ? (<><Check className="w-3.5 h-3.5 text-emerald-500" /> Copied</>) : (<><Copy className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" /> Copy Plan</>)}
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}

                {isGenerating && streamingContent && (
                    <div className="flex w-full flex-col items-start">
                        <div className="w-full max-w-[90%] bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6 shadow-lg text-left text-sm text-black dark:text-white prose dark:prose-invert">
                            <div className="flex items-center justify-between mb-4 border-b border-neutral-100 dark:border-neutral-800 pb-3">
                                <div className="flex items-center gap-2">
                                    <img src={Sverkos.src} alt="Sverkos" className="w-5 h-5 animate-pulse" />
                                    <h3 className="text-lg font-bold">Generating Plan...</h3>
                                </div>
                                <button onClick={stopGeneration} className="text-xs flex items-center gap-1 text-red-500 hover:text-red-600 font-medium"><StopCircle className="w-4 h-4" /> Stop</button>
                            </div>
                            <div dangerouslySetInnerHTML={{ __html: renderMarkdown(streamingContent) }} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}