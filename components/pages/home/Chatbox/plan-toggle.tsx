"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Info, Brain, Hammer, MessagesSquare, type LucideIcon } from "lucide-react";
import { useState, useId } from "react";
import { useLoading } from '@/providers/LoadingProvider';

export type ModeType = "built" | "discuss" | "plan";

interface PlanToggleProps {
    mode: ModeType;
    setMode: (val: ModeType) => void;
    className?: string;
}

interface ModeConfig {
    value: ModeType;
    label: string;
    description: string;
    icon: LucideIcon;
    activeText: string;
}

const MODES: ModeConfig[] = [
    {
        value: "built",
        label: "Built",
        description: "AI will start building immediately.",
        icon: Hammer,
        activeText: "text-neutral-900 dark:text-white",
    },
    {
        value: "discuss",
        label: "Discuss",
        description: "Discuss your requirements with the AI.",
        icon: MessagesSquare,
        activeText: "text-red-600 dark:text-red-400",
    },
    {
        value: "plan",
        label: "Plan",
        description: "AI will outline a detailed plan before building.",
        icon: Brain,
        activeText: "text-blue-600 dark:text-blue-400",
    },
];

export function PlanToggle({ mode, setMode, className }: PlanToggleProps) {
    const [showTooltip, setShowTooltip] = useState(false);
    const groupId = useId();
    const activeIndex = MODES.findIndex((m) => m.value === mode);
    const activeConfig = MODES[activeIndex];
    
    // Loader hook initialize kiya
    const { startLoading } = useLoading();

    function handleKeyDown(e: React.KeyboardEvent, index: number) {
        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
            e.preventDefault();
            startLoading(); // Instant Loader Trigger
            setMode(MODES[(index + 1) % MODES.length].value);
        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
            e.preventDefault();
            startLoading(); // Instant Loader Trigger
            setMode(MODES[(index - 1 + MODES.length) % MODES.length].value);
        }
    }

    return (
        <div className={cn("flex items-center gap-2", className)}>
            <div
                role="radiogroup"
                aria-label="Mode"
                className={cn(
                    "relative flex items-center h-9 px-1 rounded-xl overflow-hidden",
                    "bg-white/30 dark:bg-black/30 backdrop-blur-xl backdrop-saturate-150",
                    "border border-white/40 dark:border-white/10",
                    "shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]",
                    "transition-colors duration-300",
                    "hover:bg-white/40 dark:hover:bg-black/40"
                )}
            >
                <div className="absolute inset-y-1 left-1 right-1 flex pointer-events-none">
                    <motion.div
                        className="h-full bg-white/80 dark:bg-white/10 rounded-lg shadow-md border border-white/50 dark:border-white/5"
                        initial={false}
                        animate={{ x: `${activeIndex * 100}%` }}
                        style={{ width: `${100 / MODES.length}%` }}
                        transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                </div>

                {MODES.map((config, index) => {
                    const Icon = config.icon;
                    const isActive = mode === config.value;
                    return (
                        <button
                            key={config.value}
                            type="button"
                            role="radio"
                            aria-checked={isActive}
                            id={`${groupId}-${config.value}`}
                            tabIndex={isActive ? 0 : -1}
                            onClick={() => {
                                startLoading(); // Instant Loader Trigger
                                setMode(config.value);
                            }}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            className={cn(
                                "relative z-10 flex-1 flex items-center justify-center gap-1.5",
                                "px-3 py-1.5 text-[11px] font-semibold whitespace-nowrap",
                                "rounded-lg transition-colors duration-300 cursor-pointer",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70 focus-visible:ring-offset-1",
                                isActive ? config.activeText : "text-black/50 dark:text-white/50"
                            )}
                        >
                            <Icon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                            {config.label}
                        </button>
                    );
                })}
            </div>

            <div className="relative">
                <button
                    type="button"
                    aria-label="What does this mode do?"
                    aria-expanded={showTooltip}
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    onClick={() => setShowTooltip((v) => !v)}
                    onBlur={() => setShowTooltip(false)}
                    className={cn(
                        "p-1.5 rounded-lg transition-all duration-300 ease-out cursor-help",
                        "hover:bg-white/30 dark:hover:bg-white/10 hover:backdrop-blur-md",
                        "hover:border hover:border-white/40 dark:hover:border-white/10",
                        "hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)]",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70"
                    )}
                >
                    <Info
                        className={cn(
                            "w-4 h-4 transition-all duration-300 ease-out",
                            "text-black/40 dark:text-white/40",
                            showTooltip && "text-black dark:text-white scale-110"
                        )}
                    />
                </button>

                <AnimatePresence>
                    {showTooltip && (
                        <motion.div
                            role="tooltip"
                            initial={{ opacity: 0, y: 8, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 4, scale: 0.96 }}
                            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                            className={cn(
                                "absolute bottom-full right-0 mb-3 w-[260px] max-w-[80vw] p-4 z-50 pointer-events-none",
                                "bg-white/70 dark:bg-black/70 backdrop-blur-3xl backdrop-saturate-200",
                                "border border-white/50 dark:border-white/10",
                                "shadow-[0_20px_50px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.5)]",
                                "rounded-2xl"
                            )}
                        >
                            <p className="relative text-[12px] leading-relaxed text-black/80 dark:text-white/80 font-medium">
                                {activeConfig.label} mode is{" "}
                                <strong className={activeConfig.activeText}>Enabled</strong>.{" "}
                                {activeConfig.description}
                            </p>
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}