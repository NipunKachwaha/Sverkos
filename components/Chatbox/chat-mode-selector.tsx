"use client";

import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type ChatMode = "build" | "discuss" | "plan";

interface ChatModeSelectorProps {
    activeMode: ChatMode;
    onModeChange: (mode: ChatMode) => void;
}

const MODES: {
    id: ChatMode;
    label: string;
    textClass: string;
    shadow: string;
    bgHover: string;
}[] = [
    {
        id: "build",
        label: "Build",
        textClass: "text-[#DC2626] dark:text-red-400", // Brick Red
        shadow: "rgba(220, 38, 38, 0.3)",
        bgHover: "hover:bg-red-50 dark:hover:bg-red-500/10",
    },
    {
        id: "discuss",
        label: "Discuss",
        textClass: "text-[#2563EB] dark:text-blue-400", // Blue
        shadow: "rgba(37, 99, 235, 0.3)",
        bgHover: "hover:bg-blue-50 dark:hover:bg-blue-500/10",
    },
    {
        id: "plan",
        label: "Plan",
        textClass: "text-[#0D9488] dark:text-teal-400", // Teal
        shadow: "rgba(13, 148, 136, 0.3)",
        bgHover: "hover:bg-teal-50 dark:hover:bg-teal-500/10",
    }
];

export function ChatModeSelector({
    activeMode,
    onModeChange
}: ChatModeSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);

    const current =
        MODES.find((m) => m.id === activeMode) ?? MODES[0];

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <div className="relative flex items-center justify-center">
                    {/* Double Sonar Ripple - Activates when dropdown is open */}
                    {isOpen && (
                        <>
                            <div
                                className="absolute inset-0 rounded-xl bg-current opacity-20 animate-[ping_2s_ease-out_infinite]"
                                style={{ color: current.shadow.replace("0.3", "1") }}
                            />
                            <div
                                className="absolute inset-0 rounded-xl bg-current opacity-10 animate-[ping_2.5s_ease-out_infinite_0.4s]"
                                style={{ color: current.shadow.replace("0.3", "1") }}
                            />
                        </>
                    )}

                    <button
                        className={cn(
                            "group relative flex items-center justify-center px-4 h-10 rounded-xl transition-all duration-300 ease-out z-10 text-[15px] font-medium tracking-wide outline-none border border-transparent overflow-hidden",
                            current.textClass,
                            isOpen
                                ? "scale-105 shadow-[0_6px_20px_var(--glow)] border-white/40 dark:border-white/10 bg-black/5 dark:bg-white/5"
                                : "hover:scale-[1.02] hover:shadow-[0_4px_15px_var(--glow)] hover:border-white/50 dark:hover:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 active:scale-95"
                        )}
                        style={{ "--glow": current.shadow } as React.CSSProperties}
                        type="button"
                        tabIndex={0}
                    >
                        {/* Smooth Glassmorphic Hover (Glossy Reflection) */}
                        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.6),transparent_60%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.15),transparent_60%)]" />

                        {/* Shine effect on hover */}
                        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent pointer-events-none" />

                        {/* Breathing 3D Gradient Pulse inside the button when open */}
                        {isOpen && (
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-white/0 to-white/40 dark:to-white/10 animate-[pulse_2s_ease-in-out_infinite]" />
                        )}

                        <span className="relative z-10 drop-shadow-sm">{current.label}</span>
                    </button>
                </div>
            </DropdownMenuTrigger>

            {/* Floating Mini-Pill Dropdown Menu */}
            <DropdownMenuContent
                align="center"
                sideOffset={14}
                className="w-40 p-1.5 rounded-[20px] backdrop-blur-2xl bg-white/80 dark:bg-zinc-900/80 border border-white/60 dark:border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,1)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.05)] overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2"
            >
                {MODES.map((mode) => (
                    <DropdownMenuItem
                        key={mode.id}
                        onSelect={() => onModeChange(mode.id)}
                        className={cn(
                            "group relative flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer outline-none transition-all duration-300 mb-0.5 last:mb-0",
                            mode.bgHover,
                            activeMode === mode.id
                                ? "bg-black/5 dark:bg-white/10" // Active state background
                                : "text-gray-700 dark:text-gray-300" // Fixed dark mode text color
                        )}
                    >
                        <span
                            className={cn(
                                "z-10 text-[15px] transition-transform duration-300 ease-out",
                                "group-hover:translate-x-1", // Sliding effect on hover
                                activeMode === mode.id ? cn("font-semibold", mode.textClass) : "font-medium"
                            )}
                        >
                            {mode.label}
                        </span>
                        
                        {/* Check Icon with pop animation */}
                        {activeMode === mode.id ? (
                            <Check className={cn("w-4 h-4 z-10 animate-in zoom-in-50 duration-300", mode.textClass)} />
                        ) : (
                            <div className="w-4 h-4" /> // Placeholder to keep spacing consistent
                        )}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}