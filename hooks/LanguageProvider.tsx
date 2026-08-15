// hooks/LanguageProvider.tsx

"use client";

import { useState, useCallback, useEffect, ReactNode } from "react";
import { LanguageContext, LANGUAGES } from "./useLanguage";

const STORAGE_KEY = "sverkos-selected-language";

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [selectedCode, setSelectedCode] = useState<string>("en");
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const found = LANGUAGES.find((lang) => lang.code === saved);
            if (found) setSelectedCode(saved);
        }
        setIsLoaded(true);
    }, []);

    const setLanguage = useCallback((code: string) => {
        const found = LANGUAGES.find((lang) => lang.code === code);
        if (!found) return;
        setSelectedCode(code);
        localStorage.setItem(STORAGE_KEY, code);
    }, []);

    const selectedLanguage = LANGUAGES.find((lang) => lang.code === selectedCode) ?? LANGUAGES[0];

    return (
        <LanguageContext.Provider value={{ selectedCode, selectedLanguage, setLanguage, isLoaded }}>
            {children}
        </LanguageContext.Provider>
    );
}