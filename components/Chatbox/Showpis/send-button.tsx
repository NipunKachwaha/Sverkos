"use client";

import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SendButtonProps {
    value: string;
    onClick: () => void;
    disabled: boolean;
}

export function SendButton({ value, onClick, disabled }: SendButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={cn(
                "rounded-xl p-2.5 transition-all duration-300 ease-out flex items-center justify-center",
                "backdrop-blur-xl backdrop-saturate-150 border transition-all duration-300",
                value.trim() 
                    ? "bg-black/80 dark:bg-white/90 border-black/10 dark:border-white/20 shadow-lg hover:scale-105" 
                    : "bg-black/5 dark:bg-white/5 border-transparent opacity-40 cursor-not-allowed"
            )}
            aria-label="Send message"
        >
            <ArrowRight 
                className={cn(
                    "w-4 h-4 transition-all duration-300", 
                    value.trim() ? "text-white dark:text-black" : "text-black/30 dark:text-white/30"
                )} 
            />
        </button>
    );
}