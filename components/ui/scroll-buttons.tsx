"use client";

import { useState, useEffect } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

export function ScrollButtons() {
    const [isAtTop, setIsAtTop] = useState(true);
    const [isAtBottom, setIsAtBottom] = useState(false);

    useEffect(() => {
        // Lenis ka container dhundho
        const lenisContainer = document.querySelector('.lenis') as HTMLElement;
        if (!lenisContainer) return;

        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = lenisContainer;
            
            // 50px ka buffer rakha hai smooth experience ke liye
            setIsAtTop(scrollTop <= 50);
            setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 50);
        };

        // Initial check
        handleScroll();

        // Lenis container pe scroll event lagao
        lenisContainer.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            lenisContainer.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        const container = document.querySelector('.lenis') as HTMLElement || document.documentElement;
        container.scrollTo({ top: 0, behavior: "smooth" });
    };

    const scrollToBottom = () => {
        const container = document.querySelector('.lenis') as HTMLElement || document.documentElement;
        container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
    };

    return (
        <div className="fixed right-9 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 mt-72">
            
            {/* ===== UP BUTTON ===== */}
            <button
                onClick={scrollToTop}
                className={`group relative w-12 h-12 rounded-full overflow-hidden transition-all duration-500 ease-out
                    backdrop-blur-2xl border shadow-xl
                    bg-white/[0.08] border-white/20 shadow-black/20
                    hover:bg-white/[0.15] hover:border-white/40 hover:shadow-2xl hover:shadow-purple-500/10
                    hover:scale-110 active:scale-95
                    ${isAtTop ? "opacity-0 pointer-events-none scale-75" : "opacity-100 pointer-events-auto scale-100"}`}
                title="Go to Top"
            >
                {/* ✨ Liquid Light Sweep Effect (Left to Right) */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
                
                {/* 🎯 Inner Glass Glow */}
                <span className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* ⬆️ Arrow Icon */}
                <span className="relative z-10 flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-0.5">
                    <ChevronUp className="w-5 h-5 text-white/80 group-hover:text-white drop-shadow-lg" />
                </span>
            </button>

            {/* ===== DOWN BUTTON ===== */}
            <button
                onClick={scrollToBottom}
                className={`group relative w-12 h-12 rounded-full overflow-hidden transition-all duration-500 ease-out
                    backdrop-blur-2xl border shadow-xl
                    bg-white/[0.08] border-white/20 shadow-black/20
                    hover:bg-white/[0.15] hover:border-white/40 hover:shadow-2xl hover:shadow-purple-500/10
                    hover:scale-110 active:scale-95
                    ${isAtBottom ? "opacity-0 pointer-events-none scale-75" : "opacity-100 pointer-events-auto scale-100"}`}
                title="Go to Bottom"
            >
                {/* ✨ Liquid Light Sweep Effect (Left to Right) */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
                
                {/* 🎯 Inner Glass Glow */}
                <span className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* ⬇️ Arrow Icon */}
                <span className="relative z-10 flex items-center justify-center transition-transform duration-300 group-hover:translate-y-0.5">
                    <ChevronDown className="w-5 h-5 text-white/80 group-hover:text-white drop-shadow-lg" />
                </span>
            </button>

        </div>
    );
}