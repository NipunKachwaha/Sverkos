"use client";

import React, { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import TextPressure from '@/components/ui/TextPressure';
import { SlicedRollingText } from '@/components/ui/SlicedRollingText';

// --- TYPES ---
interface CardData {
    id: string;
    title: string;
    description: string;
    buttonText: string;
    theme: {
        overlay: string;
        accent: string;
        glow: string;
    };
}

// --- CONSTANTS & DATA ---
const CARDS_DATA: CardData[] = [
    {
        id: "apps-card",
        title: "Apps",
        description: "Turn any idea into a fully functional app — with backend, auth, payments, and hosting already built in. No setup, no engineers, no waiting.",
        buttonText: "Build an app",
        theme: {
            overlay: "from-yellow-700/30 via-yellow-600/10 to-transparent",
            accent: "group-hover:bg-[linear-gradient(90deg,_#B6861D,_#C19F53,#B6861D)]",
            glow: "group-hover:shadow-[0_0_40px_rgba(182,134,29,0.3),0_0_8px_2px_rgba(193,159,83,0.2),0_0_24px_6px_rgba(182,134,29,0.18)]"
        }
    },
    {
        id: "websites-card",
        title: "Websites",
        description: "Build a website for any need. AI-generated design, custom domain, built-in SEO tools — ready to go live from day one.",
        buttonText: "Build a website with AI",
        theme: {
            overlay: "from-yellow-700/30 via-yellow-600/10 to-transparent",
            accent: "group-hover:bg-[linear-gradient(90deg,_#B6861D,_#C19F53,#B6861D)]",
            glow: "group-hover:shadow-[0_0_40px_rgba(182,134,29,0.3),0_0_8px_2px_rgba(193,159,83,0.2),0_0_24px_6px_rgba(182,134,29,0.18)]"
        }
    },
    {
        id: "agents-card",
        title: "AI Agents",
        description: "Create a 24/7 agent that connects to your tools, takes real action, and works while you sleep. No integration headaches.",
        buttonText: "Create an AI agent",
        theme: {
            overlay: "from-yellow-700/30 via-yellow-600/10 to-transparent",
            accent: "group-hover:bg-[linear-gradient(90deg,_#B6861D,_#C19F53,#B6861D)]",
            glow: "group-hover:shadow-[0_0_40px_rgba(182,134,29,0.3),0_0_8px_2px_rgba(193,159,83,0.2),0_0_24px_6px_rgba(182,134,29,0.18)]"
        }
    }
];

const ANIMATION_VARIANTS = {
    container: {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.15 },
        },
    },
    card: {
        hidden: { opacity: 0, y: 30, scale: 0.98 },
        show: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { type: "spring", stiffness: 120, damping: 20 }
        },
    }
};

// --- COMPONENTS ---

// 1. Spotlight Button
const SpotlightButton = React.memo(({ text }: { text: string }) => {
    const btnRef = useRef<HTMLButtonElement>(null);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        if (!btnRef.current) return;
        
        requestAnimationFrame(() => {
            if (!btnRef.current) return;
            const rect = btnRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            btnRef.current.style.setProperty('--x', `${x}px`);
            btnRef.current.style.setProperty('--y', `${y}px`);
        });
    }, []);

    return (
        <button
            ref={btnRef}
            onMouseMove={handleMouseMove}
            aria-label={text}
            className="group/btn relative overflow-hidden px-6 py-3 rounded-2xl bg-[#1e1e1e] text-white text-sm font-semibold border border-white/10 transition-all duration-300 hover:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-600 flex items-center justify-center gap-3 shadow-lg w-full sm:w-auto"
        >
            <span 
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100"
                style={{
                    background: 'radial-gradient(circle 50px at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.12), transparent 100%)'
                }}
            />
            
            <span className="relative z-10 flex items-center justify-center gap-2">
                {text}
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" height="16" 
                    viewBox="0 0 24 24" fill="none" 
                    stroke="currentColor" strokeWidth="2" 
                    strokeLinecap="round" strokeLinejoin="round" 
                    aria-hidden="true"
                    className="transition-all duration-300 -translate-x-3 opacity-0 group-hover/btn:translate-x-0 group-hover/btn:opacity-100"
                >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                </svg>
            </span>
        </button>
    );
});
SpotlightButton.displayName = 'SpotlightButton';

// 2. Glass Card Component (Extracted for modularity)
const GlassCard = React.memo(({ card }: { card: CardData }) => {
    return (
        <motion.article 
            variants={ANIMATION_VARIANTS.card}
            className={`group flex flex-col p-8 min-h-[340px] rounded-2xl transition-all duration-500 ease-out hover:-translate-y-2 liquid-glass hover:liquid-glass-strong ${card.theme.glow}`}
        >
            {/* Inner Background Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0 ${card.theme.overlay}`} />

            {/* Thicker Animated Bottom Border */}
            <div className={`absolute bottom-0 left-0 w-full h-1 bg-transparent transition-colors duration-500 rounded-b-2xl z-10 ${card.theme.accent}`} />

            {/* Content Layout */}
            <div className="relative z-20 flex flex-col h-full gap-4">
                <h3 className="text-2xl lg:text-3xl font-bold tracking-tight text-white transition-transform duration-500 group-hover:translate-x-1">
                    {card.title}
                </h3>
                
                <p className="text-gray-400 leading-relaxed text-sm lg:text-base mb-8">
                    {card.description}
                </p>
                
                <div className="mt-auto">
                    <SpotlightButton text={card.buttonText} />
                </div>
            </div>
        </motion.article>
    );
});
GlassCard.displayName = 'GlassCard';

// 3. Main Section
const BuildSection = () => {
    return (
        <section className="w-full text-white pt-12 pb-12 px-6 md:px-12 lg:px-20 font-sans selection:bg-yellow-600/30 selection:text-white">
            <div className="max-w-7xl mx-auto flex flex-col gap-12">
                
                {/* Header Section */}
                <header className="flex flex-col gap-6">
                    <div className="relative w-full max-w-3xl h-[60px] sm:h-[80px] md:h-[110px]">
                        <TextPressure
                            text="What will you build?"
                            flex alpha={false} stroke={false} width weight italic
                            textColor="#ffffff" strokeColor="#5227FF" minFontSize={36}
                        />
                    </div>
                    <SlicedRollingText
                        text="Whatever you're imagining, you can use vibe coding to build it on Sverkos."
                        className="text-gray-200 text-lg md:text-xl lg:text-2xl leading-relaxed max-w-4xl font-light"
                        staggerDelay={0.04}
                    />
                </header>

                {/* Cards */}
                <motion.div 
                    variants={ANIMATION_VARIANTS.container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                >
                    {CARDS_DATA.map((card) => (
                        <GlassCard key={card.id} card={card} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default BuildSection;