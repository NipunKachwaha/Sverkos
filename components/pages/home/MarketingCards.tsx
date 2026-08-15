"use client";

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import ElasticMesh from '@/components/ui/ElasticMesh/ElasticMesh';

// --- TYPES ---
interface MarketingCardData {
    id: string;
    title: React.ReactNode;
    description: string;
}

// --- CONSTANTS & DATA ---
const MARKETING_DATA: MarketingCardData[] = [
    {
        id: "seo-geo",
        title: <>SEO/GEO<br />dashboard</>,
        description: "Get found where people are actually looking – on Google, ChatGPT, Gemini and more. Run a scan, get a prioritized fix list, and let AI apply the fixes."
    },
    {
        id: "social",
        title: <>Social<br />presence</>,
        description: "Sverkos reads what you build, picks the right social platforms, and generates ready-to-post content – in your voice."
    },
    {
        id: "analytics",
        title: <>App<br />analytics</>,
        description: "Track traffic, sales, customize your dashboard, and measure the actions that matter most in your Sverkos app."
    }
];

// --- ANIMATION VARIANTS ---
const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1,
        }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 50, rotateX: 10 },
    show: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
            type: "spring",
            stiffness: 80,
            damping: 15,
            mass: 1.2
        }
    }
};

// --- SUB-COMPONENTS ---
const GlassMarketingCard = memo(({ card }: { card: MarketingCardData }) => {
    return (
        <motion.article
            variants={cardVariants}
            className="group relative flex flex-col justify-between p-8 md:p-10 min-h-[380px] rounded-2xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-3 liquid-glass hover:liquid-glass-strong cursor-pointer overflow-hidden backdrop-blur-md"
        >
            {/* Ambient Background Glow on Hover (Inside Card) */}
            <div className="absolute inset-0 bg-white/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl z-0" />

            {/* Content Layer */}
            <div className="relative z-10 flex flex-col gap-6 pointer-events-none">
                <h3
                    style={{ fontFamily: "'MyCustomFont', sans-serif" }}
                    className="text-3xl md:text-4xl font-normal text-white leading-[1.1] tracking-tight transition-transform duration-500 group-hover:translate-x-1"
                >
                    {card.title}
                </h3>

                <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-[90%] transition-colors duration-500 group-hover:text-white">
                    {card.description}
                </p>
            </div>

            {/* Animated Bottom-Left Button */}
            <div className="relative z-10 mt-12 pointer-events-auto">
                <div className="w-10 h-10 rounded-full bg-[#1a1a1a]/80 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:bg-white group-hover:text-black group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                    <div className="relative flex items-center justify-center w-full h-full">
                        {/* Primary Arrow */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18" height="18"
                            viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2"
                            strokeLinecap="round" strokeLinejoin="round"
                            className="absolute transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-8 group-hover:-translate-y-8"
                        >
                            <path d="M7 17l9.2-9.2M17 17V7H7" />
                        </svg>

                        {/* Secondary Arrow */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18" height="18"
                            viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2"
                            strokeLinecap="round" strokeLinejoin="round"
                            className="absolute -translate-x-8 translate-y-8 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:translate-y-0"
                        >
                            <path d="M7 17l9.2-9.2M17 17V7H7" />
                        </svg>
                    </div>
                </div>
            </div>
        </motion.article>
    );
});
GlassMarketingCard.displayName = 'GlassMarketingCard';

// --- MAIN COMPONENT ---
const MarketingCardsSection = () => {
    return (
        <section className="relative w-full min-h-screen flex items-center py-20 px-6 md:px-12 lg:px-20 font-sans selection:bg-white/20 selection:text-white overflow-hidden">
            
            {/* GLOBAL BACKGROUND MESH */}
            <div className="absolute inset-0 z-0 pointer-events-auto">
                <ElasticMesh
                    image=""
                    interaction="hover"
                    tilt={0}
                    shading={0.75}
                    color1="#241D26" // Deep Dark Purple/Brown
                    color2="#8A5626" // Warm Bronze/Amber
                    color3="#D48924" // Glowing Golden Orange
                    color4="#FFFFFF" // Bright Luminous White
                    showGrid
                    gridDensity={4}
                    gridOpacity={0}
                    gridColor="#ffffff"
                    highlight="#ffffff"
                    borderRadius={0} // Changed to 0 since it covers the whole screen now
                    stiffness={0.02}
                    damping={0.25}
                    grabRadius={0.9}
                    pull={0.60}
                    wobble={0}
                    resolution={32}
                    enabled
                    style={{
                        width: '100vw',
                        height: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0
                    }}
                />
            </div>

            {/* CONTENT LAYER */}
            <div className="relative z-10 max-w-[1400px] w-full mx-auto">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 pointer-events-none"
                >
                    {MARKETING_DATA.map((card) => (
                        <div key={card.id} className="pointer-events-auto">
                            <GlassMarketingCard card={card} />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default MarketingCardsSection;