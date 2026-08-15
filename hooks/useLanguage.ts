// hooks/useLanguage.ts

import { createContext, useContext } from "react";

export interface LanguageOption {
    code: string;
    label: string;
    nativeLabel: string;
    speechCode: string;
}

export const LANGUAGES: LanguageOption[] = [
    { code: "en", label: "English", nativeLabel: "English", speechCode: "en-IN" },
    { code: "hi", label: "Hindi", nativeLabel: "हिन्दी", speechCode: "hi-IN" },
    { code: "ja", label: "Japanese", nativeLabel: "日本語", speechCode: "ja-JP" },
    { code: "de", label: "German", nativeLabel: "Deutsch", speechCode: "de-DE" },
    { code: "es", label: "Spanish", nativeLabel: "Español", speechCode: "es-ES" },
    { code: "fr", label: "French", nativeLabel: "Français", speechCode: "fr-FR" },
    { code: "pt", label: "Portuguese", nativeLabel: "Português", speechCode: "pt-BR" },
    { code: "zh", label: "Chinese", nativeLabel: "中文", speechCode: "zh-CN" },
    { code: "ar", label: "Arabic", nativeLabel: "العربية", speechCode: "ar-SA" },
    { code: "ko", label: "Korean", nativeLabel: "한국어", speechCode: "ko-KR" },
    { code: "ru", label: "Russian", nativeLabel: "Русский", speechCode: "ru-RU" },
    { code: "it", label: "Italian", nativeLabel: "Italiano", speechCode: "it-IT" },
];

interface LanguageContextType {
    selectedCode: string;
    selectedLanguage: LanguageOption;
    setLanguage: (code: string) => void;
    isLoaded: boolean;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}