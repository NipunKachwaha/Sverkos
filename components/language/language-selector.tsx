"use client";

import { useRef, useEffect } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { LANGUAGES } from "@/hooks/useLanguage";

interface LanguageDropdownProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (code: string) => void;
    selectedCode: string;
    isCollapsed?: boolean;
}

export function LanguageDropdown({
    isOpen,
    onClose,
    onSelect,
    selectedCode,
    isCollapsed = false,
}: LanguageDropdownProps) {
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Bahar click pe band
    useEffect(() => {
        if (!isOpen) return;
        function handleClickOutside(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                onClose();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, onClose]);

    // Escape pe band
    useEffect(() => {
        if (!isOpen) return;
        function handleEscape(e: KeyboardEvent) {
            if (e.key === "Escape") onClose();
        }
        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            ref={dropdownRef}
            className={cn(
                "absolute z-[100] min-w-[180px] py-1 rounded-md shadow-xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-150",
                "bg-white dark:bg-[#1c1c1c] border border-neutral-200/80 dark:border-[#2a2a2a]", 
                isCollapsed
                    ? "left-full ml-4 bottom-0"
                    : "left-1/2 -translate-x-1/2 bottom-full mb-2"
            )}
        >
            {/* Header */}
            <div className="px-3 py-2 border-b border-neutral-100 dark:border-[#2a2a2a]">
                <p className="text-[10px] uppercase tracking-wider text-neutral-400 dark:text-neutral-500 font-semibold">
                    Speech Language
                </p>
            </div>

            {/* List */}
            <div className="max-h-[280px] overflow-y-auto py-1 px-1">
                {LANGUAGES.map((lang) => {
                    const isSelected = lang.code === selectedCode;
                    return (
                        <button
                            key={lang.code}
                            type="button"
                            onClick={() => onSelect(lang.code)}
                            className={cn(
                                "w-full flex items-center justify-between px-3 py-2 text-[15px] transition-colors rounded-sm",
                                isSelected
                                    ? "bg-[#fff3e5] dark:bg-[#3d2516] text-[#ea580c] dark:text-[#ea580c]"
                                    : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-[#2a2a2a]"
                            )}
                        >
                            <span className="font-normal">{lang.nativeLabel}</span>
                            {isSelected && (
                                <Check className="w-4 h-4 text-[#ea580c] shrink-0 stroke-[1.5]" />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}