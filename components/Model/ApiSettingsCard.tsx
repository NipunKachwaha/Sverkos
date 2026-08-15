"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { KeyIcon, Search, Bot, Sparkles, Zap } from "lucide-react";
import ModelButton from "./ModelButton";

const AI_PROVIDERS = [
    {
        id: "openai",
        name: "OpenAI (GPT-4o)",
        short: "OpenAI",
        placeholder: "sk-proj-...",
        color: "#10A37F", 
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="provider-icon">
                <path fill="#ffffff" d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.8956zm16.0993 3.8558L12.5907 8.3829 14.6108 7.2144a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.3927-.6813zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
            </svg>
        )
    },
    {
        id: "anthropic",
        name: "Anthropic (Claude 3.5)",
        short: "Claude",
        placeholder: "sk-ant-...",
        color: "#D97757", 
        icon: (
            <img
                src="/icons/claude-white.svg"
                alt="Claude Logo"
                className="provider-icon"
                style={{
                    background: "#D97757",
                    borderRadius: "4px",
                    width: "60px",
                    height: "60px"
                }}
            />
        )
    },
    {
        id: "gemini",
        name: "Google Gemini (1.5)",
        short: "Gemini",
        placeholder: "AIzaSy...",
        color: "#1A73E8",
        icon: (
            <img
                src="/icons/white-gemini.svg"
                alt="Gemini Logo"
                className="provider-icon"
                style={{
                    borderRadius: "4px",
                    width: "55px",
                    height: "55px",
                }}
            />
        )
    },
    {
        id: "groq",
        name: "Groq (Llama 3)",
        short: "Llama 3",
        placeholder: "gsk_...",
        color: "#F55036",
        icon: (
            <img
                src="/icons/icons8-llama-50.png"
                alt="Ollama Logo"
                className="provider-icon"
                style={{
                    borderRadius: "4px",
                    width: "60px",
                    height: "60px",
                    filter: "brightness(0) invert(1)"
                }}
            />
        )
    },
    {
        id: "grok",
        name: "xAI (Grok 1.5)",
        short: "Grok",
        placeholder: "xsk_...",
        color: "#000000", 
        icon: (
            <img
                src="/icons/grok-ai-icon.svg"
                alt="Grok Logo"
                className="provider-icon"
                style={{
                    borderRadius: "4px",
                    width: "50px",
                    height: "50px",
                    filter: "brightness(0) invert(1)"
                }}
            />
        )
    },
    {
        id: "mistral",
        name: "Mistral AI (Large)",
        short: "Mistral",
        placeholder: "Provide API Key...",
        color: "#F26E24",
        icon: (
            <img
                src="/icons/mistral.png"
                alt="Mistral Logo"
                className="provider-icon"
                style={{
                    borderRadius: "4px",
                    width: "50px",
                    height: "50px",
                }}
            />
        )
    },
    {
        id: "cohere",
        name: "Cohere (Command R+)",
        short: "Cohere",
        placeholder: "cohere_...",
        color: "#39594D",
        icon: (
            <img
                src="/icons/cohere.png"
                alt="Cohere Logo"
                className="provider-icon"
                style={{
                    borderRadius: "4px",
                    width: "50px",
                    height: "50px",
                    filter: "brightness(0) invert(1)"
                }}
            />
        )
    },
    {
        id: "perplexity",
        name: "Perplexity (Sonar)",
        short: "Perplexity",
        placeholder: "pplx-...",
        color: "#22B8CD", 
        icon: (
            <img
                src="/icons/perplexity.webp"
                alt="Perplexity Logo"
                className="provider-icon"
                style={{
                    borderRadius: "4px",
                    width: "50px",
                    height: "50px",
                    filter: "brightness(0) invert(1)"
                }}
            />
        )
    },
    {
        id: "deepseek",
        name: "DeepSeek (Coder V2)",
        short: "DeepSeek",
        placeholder: "sk-...",
        color: "#4D6BFE", 
        icon: (
            <img
                src="/icons/deepseek.png"
                alt="DeepSeek Logo"
                className="provider-icon"
                style={{
                    borderRadius: "4px",
                    width: "55px",
                    height: "55px",
                    filter: "brightness(0) invert(1)"
                }}
            />
        )
    },
    {
        id: "openrouter",
        name: "OpenRouter",
        short: "OpenRouter",
        placeholder: "sk-or-...",
        color: "#B0E101", 
        icon: (
            <img
                src="/icons/openrouter.png"
                alt="OpenRouter Logo"
                className="provider-icon"
                style={{
                    borderRadius: "4px",
                    width: "50px",
                    height: "50px",
                }}
            />
        )
    },
    {
        id: "huggingface",
        name: "Hugging Face",
        short: "HF Models",
        placeholder: "hf_...",
        color: "#FFD21E",
        icon: (
            <img
                src="/icons/huggingface.png"
                alt="Hugging Face Logo"
                className="provider-icon"
                style={{
                    borderRadius: "4px",
                    width: "60px",
                    height: "60px",
                }}
            />
        )
    },
    {
        id: "replicate",
        name: "Replicate",
        short: "Replicate",
        placeholder: "r8_...",
        color: "#111111", 
        icon: (
            <img
                src="/icons/replicate-icon.svg"
                alt="Replicate Logo"
                className="provider-icon"
                style={{
                    borderRadius: "4px",
                    width: "40px",
                    height: "40px",
                    filter: "brightness(0) invert(1)"
                }}
            />
        )
    }
];

export default function ApiSettingsCard() {
    const [provider, setProvider] = useState("openai");
    const [apiKey, setApiKey] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [isSaved, setIsSaved] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const savedProvider = localStorage.getItem("user_ai_provider");
        const savedKey = localStorage.getItem("user_api_key");
        if (savedProvider) setProvider(savedProvider);
        if (savedKey) setApiKey(savedKey);
        setIsLoaded(true);
    }, []);

    const handleSave = () => {
        if (apiKey.trim()) {
            localStorage.setItem("user_ai_provider", provider);
            localStorage.setItem("user_api_key", apiKey.trim());
            setIsSaved(true);
            setTimeout(() => setIsSaved(false), 2000);
        }
    };

    if (!isLoaded) return null;

    const filteredProviders = AI_PROVIDERS.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className="bg-[#ffffff] border border-gray-200 p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <KeyIcon className="w-5 h-5 text-gray-700" />
                API Configuration
            </h2>

            <div className="mb-6 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    placeholder="Search AI Provider..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 p-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                />
            </div>

            <div className="mb-8">
                <label className="text-sm font-semibold text-gray-700 block mb-3">
                    Select AI Provider
                </label>
                {filteredProviders.length === 0 ? (
                    <p className="text-sm text-gray-500 italic py-4">No models found for "{searchQuery}"</p>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-6 justify-items-center pb-4">
                        {filteredProviders.map((p) => (
                            <ModelButton
                                key={p.id}
                                id={p.id}
                                short={p.short}
                                color={p.color}
                                icon={p.icon}
                                isSelected={provider === p.id}
                                onClick={() => {
                                    setProvider(p.id);
                                    setApiKey("");
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>

            <div className="mb-8 flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">
                    {AI_PROVIDERS.find(p => p.id === provider)?.name || "API"} Key
                </label>
                <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder={`e.g. ${AI_PROVIDERS.find(p => p.id === provider)?.placeholder || "sk-..."}`}
                    className="w-full p-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-mono"
                />
                <p className="text-[11px] text-gray-500 mt-1">
                    Your key is stored securely in your browser's local storage and is never saved to our database.
                </p>
            </div>

            <Button
                onClick={handleSave}
                disabled={!apiKey.trim()}
                className={`w-full py-6 text-base font-semibold rounded-xl transition-all ${isSaved ? "bg-emerald-500 hover:bg-emerald-600 text-white" : "bg-black hover:bg-gray-800 text-white"
                    }`}
            >
                {isSaved ? "Key Saved Successfully! ✓" : "Save & Connect"}
            </Button>
        </div>
    );
}