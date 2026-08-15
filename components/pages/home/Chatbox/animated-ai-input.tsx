"use client";

import {
    X, File,
    FileText,
    Image as ImageIcon,
    Video,
    Music,
    FileArchive,
    Mic,
    MicOff
} from "lucide-react";
import { useState, useRef, useCallback, useEffect } from "react";
import { Textarea } from "@/components/Chatbox/textarea";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

// Components Imports
import { PlanToggle } from "./plan-toggle";
import { FileAttachButton } from "@/components/Chatbox/file-attach-button";
import { ModelSelector } from "@/components/Chatbox/model-selector";
import { SendButton } from "./send-button";
import { useSpeechToText } from "@/hooks/useSpeechToText";
import { useLanguage } from "@/hooks/useLanguage";
import { useAnimatedPlaceholder } from "@/hooks/useAnimatedPlaceholder";

function useAutoResizeTextarea({ minHeight, maxHeight }: { minHeight: number; maxHeight?: number }) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const adjustHeight = useCallback((reset?: boolean) => {
        const textarea = textareaRef.current;
        if (!textarea) return;
        if (reset) {
            textarea.style.height = `${minHeight}px`;
            return;
        }
        textarea.style.height = `${minHeight}px`;
        const newHeight = Math.max(minHeight, Math.min(textarea.scrollHeight, maxHeight ?? Number.POSITIVE_INFINITY));
        textarea.style.height = `${newHeight}px`;
    }, [minHeight, maxHeight]);

    useEffect(() => { textareaRef.current && (textareaRef.current.style.height = `${minHeight}px`); }, [minHeight]);
    return { textareaRef, adjustHeight };
}

export function AI_Prompt() {
    const router = useRouter();

    // 1. STATE UPDATE: Boolean se Mode String mein change kiya gaya
    const [mode, setMode] = useState<"built" | "discuss" | "plan">("built");

    const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
    const [value, setValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const { textareaRef, adjustHeight } = useAutoResizeTextarea({ minHeight: 72, maxHeight: 300 });
    const { selectedLanguage } = useLanguage();
    const [localInput, setLocalInput] = useState("");

    const placeholderPhrases = [
        // Your original lines
        "A reporting dashboard with charts for my business...",
        "A gaming platform with leaderboards and tournaments...",
        "An AI tool that generates email templates...",

        // E-commerce & Payments
        "An e-commerce storefront integrated with custom payment gateways...",
        "A digital product marketplace with secure checkout...",

        // UI/UX & Modern Design
        "A 3D landing page using modern UI components and smooth animations...",
        "A sleek portfolio website featuring luxury typography...",

        // Freelance & Local Business 
        "A booking and scheduling system for a local fitness academy...",
        "A customer CRM and lead tracker for service businesses...",

        // AI & Advanced Tech
        "A local AI chatbot powered by custom open-source models...",
        "A crypto portfolio dashboard tracking real-time token data...",

        // Entertainment & Media
        "A media tracking app for upcoming anime and movie releases...",

        // The final prompt
        "What can I build for you today?"
    ];

    const animatedPlaceholder = useAnimatedPlaceholder(placeholderPhrases, 40, 20, 2500);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey && value.trim()) {
            e.preventDefault();
            setValue("");
            adjustHeight(true);
        }
    };

    const { isListening, isSupported, transcript, interimTranscript, toggleListening, startListening, stopListening, resetTranscript, error: speechError } = useSpeechToText({
        lang: selectedLanguage.speechCode,
        continuous: true,
        onFinalTranscript: (text) => { setLocalInput((prev) => prev + text); setTimeout(() => adjustHeight(), 10); },
    });

    const displayValue = localInput + interimTranscript;

    useEffect(() => { if (isListening) { const timer = setTimeout(() => { stopListening(); startListening(); }, 150); return () => clearTimeout(timer); } }, [selectedLanguage.speechCode]);
    useEffect(() => { if (interimTranscript) { adjustHeight(); } }, [interimTranscript, adjustHeight]);

    const handleSend = (e?: React.FormEvent | React.KeyboardEvent) => {
        if (e) e.preventDefault();

        const text = displayValue.trim();

        if (isListening) toggleListening();

        // 2. ROUTING FIX: if, else if, aur else ka use karke routing fix ki gayi
        if (mode === "plan") {
            router.push("/plan");
        } else if (mode === "discuss") {
            router.push("/discuss");
        } else {
            router.push("/build");
        }

        setLocalInput("");
        setAttachedFiles([]);
        resetTranscript();
        setTimeout(() => adjustHeight(true), 10);
    };

    // ============== File Icon Helper Function ==============
    const FilePreviewCard = ({ file, onRemove }: { file: File; onRemove: () => void }) => {
        const [previewUrl, setPreviewUrl] = useState<string | null>(null);

        useEffect(() => {
            if (file.type.startsWith("image/")) {
                const url = URL.createObjectURL(file);
                setPreviewUrl(url);
                return () => URL.revokeObjectURL(url);
            }
        }, [file]);

        const getFileVisual = () => {
            const type = file.type;
            const name = file.name.toLowerCase();

            if (previewUrl) {
                return (
                    <div className="w-10 h-10 rounded-lg overflow-hidden border border-white/10 flex-shrink-0 bg-black/50">
                        <img src={previewUrl} alt="preview" className="w-full h-full object-cover" />
                    </div>
                );
            }

            if (name.endsWith(".psd")) {
                return (
                    <div className="w-10 h-10 rounded-lg bg-[#001E36] border-[1.5px] border-[#31A8FF] flex items-center justify-center shadow-[0_0_10px_rgba(49,168,255,0.2)]">
                        <span className="text-[#31A8FF] font-bold text-sm tracking-tighter">Ps</span>
                    </div>
                );
            }

            if (name.endsWith(".ai")) {
                return (
                    <div className="w-10 h-10 rounded-lg bg-[#260000] border-[1.5px] border-[#FF9A00] flex items-center justify-center shadow-[0_0_10px_rgba(255,154,0,0.2)]">
                        <span className="text-[#FF9A00] font-bold text-sm tracking-tighter">Ai</span>
                    </div>
                );
            }

            if (name.endsWith(".pdf") || type === "application/pdf") {
                return (
                    <div className="w-10 h-10 rounded-lg bg-red-500/10 border-[1.5px] border-red-500/50 flex items-center justify-center">
                        <div className="flex flex-col items-center">
                            <FileText className="w-4 h-4 text-red-500 mb-0.5" />
                            <span className="text-red-500 font-extrabold text-[8px] leading-none">PDF</span>
                        </div>
                    </div>
                );
            }

            if (type.startsWith("video/")) {
                return (
                    <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border-[1.5px] border-indigo-500/30 flex items-center justify-center">
                        <Video className="w-5 h-5 text-indigo-500 fill-indigo-500/20" />
                    </div>
                );
            }

            if (type.startsWith("audio/")) {
                return (
                    <div className="w-10 h-10 rounded-lg bg-pink-500/10 border-[1.5px] border-pink-500/30 flex items-center justify-center">
                        <Music className="w-5 h-5 text-pink-500 fill-pink-500/20" />
                    </div>
                );
            }

            if (name.endsWith(".zip") || name.endsWith(".rar")) {
                return (
                    <div className="w-10 h-10 rounded-lg bg-yellow-500/10 border-[1.5px] border-yellow-500/30 flex items-center justify-center">
                        <FileArchive className="w-5 h-5 text-yellow-500" />
                    </div>
                );
            }

            return (
                <div className="w-10 h-10 rounded-lg bg-neutral-500/10 border-[1.5px] border-neutral-500/30 flex items-center justify-center">
                    <File className="w-5 h-5 text-neutral-500" />
                </div>
            );
        };

        return (
            <div className="relative group flex flex-col items-center gap-2 p-2.5 w-24 rounded-xl bg-black/40 dark:bg-white/5 backdrop-blur-md border border-white/10 dark:border-white/10 shadow-lg transition-all hover:bg-black/50 dark:hover:bg-white/10">
                <button
                    onClick={onRemove}
                    className="absolute -top-1.5 -right-1.5 bg-neutral-800 dark:bg-neutral-200 border border-white/20 dark:border-black/20 text-white dark:text-black rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110 z-10"
                >
                    <X className="w-3 h-3" />
                </button>
                {getFileVisual()}
                <span className="w-full text-center text-xs font-medium text-neutral-300 dark:text-neutral-200 truncate px-1">
                    {file.name}
                </span>
            </div>
        );
    };
    // ==========================================================

    return (
        <div className="w-full max-w-3xl py-4 mx-auto">
            <div className={cn(
                "rounded-[20px] p-1.5 transition-all duration-300 ease-out",
                "bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/5 dark:border-white/10 shadow-sm",
                isFocused ? "ring-2 ring-blue-500/30 dark:ring-blue-400/30 shadow-lg" : "hover:border-black/10 dark:hover:border-white/20"
            )}>
                <div className="relative">
                    <div className="relative flex flex-col">
                        <div className="overflow-y-auto" style={{ maxHeight: "400px" }}>
                            {attachedFiles.length > 0 && (
                                <div className="flex flex-wrap gap-3 px-4 pt-4 pb-2 border-b border-black/5 dark:border-white/5 mx-2 mb-2">
                                    {attachedFiles.map((file, index) => (
                                        <FilePreviewCard
                                            key={`${file.name}-${index}`}
                                            file={file}
                                            onRemove={() => setAttachedFiles(prev => prev.filter((_, i) => i !== index))}
                                        />
                                    ))}
                                </div>
                            )}
                            <Textarea
                                id="ai-input-15"
                                value={value}
                                placeholder={animatedPlaceholder}
                                className="w-full rounded-xl rounded-b-none px-4 py-3 bg-transparent border-none dark:text-white placeholder:text-black/60 dark:placeholder:text-white/50 resize-none focus-visible:ring-0 focus-visible:ring-offset-0 text-base transition-colors min-h-[72px]"
                                ref={textareaRef}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                onKeyDown={handleKeyDown}
                                onChange={(e) => { setValue(e.target.value); adjustHeight(); }}
                            />
                        </div>

                        <div className="h-14 bg-transparent rounded-b-xl flex items-center">
                            <div className="absolute left-3 right-3 bottom-3 flex items-center justify-between w-[calc(100%-24px)]">
                                <div className="flex items-center gap-2">
                                    <FileAttachButton
                                        onFilesSelected={(newFiles) => setAttachedFiles((prev) => [...prev, ...newFiles])}
                                    />
                                    <div className="h-4 w-px bg-black/10 dark:bg-white/10 mx-0.5" />

                                    <PlanToggle mode={mode} setMode={setMode} />

                                    <div className="h-4 w-px bg-black/10 dark:bg-white/10 mx-0.5" />
                                    <ModelSelector />
                                </div>

                                <div className="flex items-center gap-2">
                                    {isSupported && (
                                        <div className="relative flex items-center justify-center">
                                            {isListening && (
                                                <>
                                                    <div className="absolute inset-0 rounded-xl border-2 border-red-400/40 bg-gradient-to-tr from-red-500/10 to-rose-400/5 animate-[ping_2s_ease-out_infinite]" />
                                                    <div className="absolute inset-0 rounded-xl border border-red-300/30 bg-gradient-to-tr from-red-400/10 to-rose-300/5 animate-[ping_2.5s_ease-out_infinite_0.4s]" />
                                                </>
                                            )}

                                            <button
                                                type="button"
                                                onClick={toggleListening}
                                                className={cn(
                                                    "group relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-500 ease-out z-10",
                                                    isListening
                                                        ? "bg-gradient-to-br from-red-500 via-rose-500 to-red-600 text-white shadow-[0_8px_25px_rgba(225,29,72,0.5),inset_0_2px_4px_rgba(255,255,255,0.4)] border border-red-400/50 scale-105 hover:scale-110 active:scale-95"
                                                        : "bg-transparent border-transparent text-black/10 dark:text-white/75 hover:text-red-600 dark:hover:text-red-400 hover:bg-black/5 dark:hover:bg-white/5 active:scale-95"
                                                )}
                                                aria-label={isListening ? "Stop listening" : "Start voice dictation"}
                                                title={isListening ? "Stop recording" : "Use microphone"}
                                                style={{ willChange: 'transform, box-shadow, background' }}
                                            >
                                                <div className="relative flex items-center justify-center w-full h-full">
                                                    <div className={cn(
                                                        "absolute inset-0 flex items-center justify-center transition-all duration-500",
                                                        isListening ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50 pointer-events-none"
                                                    )}>
                                                        <MicOff className="w-4 h-4 text-white drop-shadow-[0_2px_4px_rgba(159,18,57,0.8)] transition-transform duration-300 group-hover:scale-90" />

                                                        <div className="absolute -top-3.5 -right-4 flex items-center justify-center gap-[2.5px] h-[20px] px-2 rounded-full bg-white/25 backdrop-blur-md border border-white/60 shadow-[0_4px_12px_rgba(225,29,72,0.4),inset_0_1px_2px_rgba(255,255,255,0.9)] overflow-hidden ring-1 ring-black/5">
                                                            <div className="w-[2px] h-[40%] bg-gradient-to-t from-red-300/100 to-red-600 rounded-full drop-shadow-[0_0_2px_rgba(255,255,255,0.9)] animate-[waveform_0.8s_ease-in-out_infinite]" style={{ animationDelay: "0ms" }} />
                                                            <div className="w-[2px] h-[70%] bg-gradient-to-t from-red-300/100 to-red-600 rounded-full drop-shadow-[0_0_2px_rgba(255,255,255,0.9)] animate-[waveform_1.1s_ease-in-out_infinite]" style={{ animationDelay: "150ms" }} />
                                                            <div className="w-[2px] h-[90%] bg-gradient-to-t from-red-300/100 to-red-600 rounded-full drop-shadow-[0_0_2px_rgba(255,255,255,0.9)] animate-[waveform_0.9s_ease-in-out_infinite]" style={{ animationDelay: "300ms" }} />
                                                            <div className="w-[2px] h-[60%] bg-gradient-to-t from-red-300/100 to-red-600 rounded-full drop-shadow-[0_0_2px_rgba(255,255,255,0.9)] animate-[waveform_1.2s_ease-in-out_infinite]" style={{ animationDelay: "450ms" }} />
                                                            <div className="w-[2px] h-[30%] bg-gradient-to-t from-red-300/100 to-red-600 rounded-full drop-shadow-[0_0_2px_rgba(255,255,255,0.9)] animate-[waveform_0.9s_ease-in-out_infinite]" style={{ animationDelay: "600ms" }} />
                                                        </div>
                                                    </div>

                                                    <div className={cn(
                                                        "absolute inset-0 flex items-center justify-center transition-all duration-500",
                                                        !isListening ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-50 pointer-events-none"
                                                    )}>
                                                        <Mic className="w-4 h-4 transition-transform duration-300 group-hover:scale-110 drop-shadow-sm" />
                                                    </div>
                                                </div>
                                            </button>
                                        </div>
                                    )}
                                    <SendButton
                                        value={value}
                                        disabled={!value.trim()}
                                        onClick={handleSend}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}