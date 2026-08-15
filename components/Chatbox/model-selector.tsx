"use client";

import Image from "next/image";
import { Check, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// 1. Aapke saare models yahan hain
export const MODELS = [
    { id: "claude-3-opus", name: "Claude 3 Opus", provider: "Anthropic", icon: "claude", description: "Most powerful, best for complex apps" },
    { id: "claude-3-sonnet", name: "Claude 3 Sonnet", provider: "Anthropic", icon: "claude", description: "Fast and capable" },
    { id: "gpt-4-turbo", name: "GPT-4 Turbo", provider: "OpenAI", icon: "openai", description: "Fast and intelligent" },
    { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI", icon: "openai", description: "Latest multimodal model" },
    { id: "gemini-2.5-flash", name: "Gemini 2.5 Flash", provider: "Google", icon: "gemini", description: "Large context window" },
    { id: "grok-2", name: "Grok 2", provider: "xAI", icon: "xai", description: "Fast reasoning" },
    { id: "deepseek-coder", name: "DeepSeek Coder", provider: "DeepSeek", icon: "deepseek", description: "Excellent at coding tasks" },
    { id: "llama3-70b-8192", name: "Llama 3 70B (Groq)", provider: "Groq", icon: "llama", description: "Ultra-fast inference" },
    { id: "mistral-large-latest", name: "Mistral Large", provider: "Mistral", icon: "Mistral", description: "High performance open model" },
    { id: "llama-3-sonar-large-32k-online", name: "Perplexity Sonar", provider: "Perplexity", icon: "Perplexity", description: "Online grounded model" },
    { id: "auto", name: "OpenRouter Auto", provider: "OpenRouter", icon: "OpenRouter", description: "Automatically routes to best model" }
];

// 2. Icon function jo public/icons/ se images uthayega
export function ModelIcon({ model }: { model: string }) {
    const getIconPath = (iconName: string) => {
        switch (iconName) {
            case "claude": return "/icons/claude.svg";
            case "openai": return "/icons/openai.svg";
            case "gemini": return "/icons/gemini.svg";
            case "xai": return "/icons/grok-ai-icon.svg";
            case "deepseek": return "/icons/deepseek-color.svg";
            case "llama": return "/icons/ollama-icon.svg";
            case "Mistral": return "/icons/mistral-ai.webp";
            case "Perplexity": return "/icons/perplexity-bg.svg";
            case "OpenRouter": return "/icons/open-router.svg";
            default: return "/icons/brain.svg";
        }
    };

    return (
        <Image
            src={getIconPath(model)}
            alt={`${model} icon`}
            width={16}
            height={16}
            className="object-contain w-4 h-4 flex-shrink-0"
        />
    );
}

interface ModelSelectorProps {
    selectedModel: string;
    onModelChange: (model: string) => void;
}

export function ModelSelector({ selectedModel, onModelChange }: ModelSelectorProps) {
    const currentModel = MODELS.find((m) => m.id === selectedModel) || MODELS[0];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className={cn(
                        "flex items-center justify-center h-9 w-9 p-0 rounded-xl cursor-pointer transition-all duration-300",
                        "bg-white/30 dark:bg-black/30 backdrop-blur-xl backdrop-saturate-150 border border-white/40 dark:border-white/10",
                        "shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] hover:bg-white/40 dark:hover:bg-black/40 hover:scale-105 active:scale-95",
                        "text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white"
                    )}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedModel}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="flex items-center justify-center"
                        >
                            <ModelIcon model={currentModel.icon} />
                        </motion.div>
                    </AnimatePresence>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="start"
                sideOffset={10}
                className={cn(
                    "w-[320px] p-0 rounded-2xl overflow-hidden",
                    "bg-white/80 dark:bg-neutral-900/80 backdrop-blur-3xl backdrop-saturate-200",
                    "border border-white/50 dark:border-white/10 shadow-xl z-50"
                )}
            >
                <div className="flex flex-col">
                    <div
                        onClick={() => onModelChange("auto")}
                        className="p-4 flex items-start gap-3 cursor-pointer hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                    >
                        <div className="flex items-center justify-center w-6 h-6 shrink-0 rounded-md bg-blue-50 dark:bg-blue-900/30">
                            <Image
                                src="/icons/icons8-ai.svg"
                                alt="OpenRouter Logo"
                                width={24}
                                height={24}
                            />
                        </div>

                        <div className="flex-1">
                            <h3 className="text-sm font-medium text-black dark:text-white">Automatic</h3>
                            <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
                                Matched with the best AI Model for each request
                            </p>
                        </div>
                        {selectedModel === "auto" && <Check className="w-5 h-5 text-blue-600 mt-1 shrink-0" />}
                    </div>

                    <div className="h-px bg-border/50 dark:bg-white/10 mx-4" />

                    <div className="px-4 pt-4 pb-2">
                        <div className="flex items-center justify-between mb-1">
                            <h3 className="text-sm font-medium text-black dark:text-white">Choose model</h3>
                            <span className="text-[10px] font-semibold text-blue-600 border border-blue-200 bg-blue-50 rounded-full px-2 py-0.5">
                                Pro
                            </span>
                        </div>
                        <p className="text-xs text-muted-foreground">Pick the right model for your app</p>
                    </div>

                    <div className="px-2 pb-2 max-h-[260px] overflow-y-auto scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        {MODELS.filter(m => m.id !== "auto").map((model) => (
                            <DropdownMenuItem
                                key={model.id}
                                onClick={() => onModelChange(model.id)}
                                className={cn(
                                    "flex items-center justify-between gap-3 h-12 px-3 rounded-xl cursor-pointer font-medium text-sm transition-all duration-200",
                                    selectedModel === model.id
                                        ? "bg-blue-50/80 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                        : "text-black/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/10"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <ModelIcon model={model.icon} />
                                    <div className="flex flex-col">
                                        <span className="text-[13px] leading-none">{model.name}</span>
                                        <span className="text-[11px] font-normal opacity-70 mt-1 leading-none">{model.provider}</span>
                                    </div>
                                </div>
                                {selectedModel === model.id && <Check className="w-4 h-4" />}
                            </DropdownMenuItem>
                        ))}
                    </div>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}