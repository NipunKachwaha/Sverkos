"use client";

import React from "react";
import { motion } from "framer-motion";
import { SlicedRollingText } from "@/components/ui/SlicedRollingText";
import TextPressure from "@/components/ui/TextPressure"; // Assuming this is your component path

const MARQUEE_WORDS = [
    "neural",
    "empathetic",
    "expert",
    "collab",
    "explore",
    "team",
    "intuitive",
];

export default function TeamSection() {
    return (
        <section className="relative w-full min-h-screen bg-white flex flex-col items-center justify-center overflow-hidden py-20 font-sans">

            {/* --- 1. INFINITE SCROLLING MARQUEE (Background) --- */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full flex overflow-hidden whitespace-nowrap pointer-events-none opacity-40 z-0">
                <motion.div
                    className="flex items-center gap-8 md:gap-16"
                    animate={{ x: [0, -1000] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 20,
                    }}
                >
                    {/* Render the list multiple times for seamless infinite scroll */}
                    {[...Array(4)].map((_, i) => (
                        <React.Fragment key={i}>
                            {MARQUEE_WORDS.map((word, index) => (
                                <div key={`${i}-${index}`} className="flex items-center gap-8 md:gap-16">
                                    <span className="text-2xl md:text-4xl font-semibold text-[#a795c5] tracking-wide lowercase">
                                        {word}
                                    </span>
                                    {/* Small abstract leaf/shape icon between words */}
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#a795c5]">
                                        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor" opacity="0.3" />
                                        <path d="M12 6L14.59 9.41L18 12L14.59 14.59L12 18L9.41 14.59L6 12L9.41 9.41L12 6Z" fill="currentColor" />
                                    </svg>
                                </div>
                            ))}
                        </React.Fragment>
                    ))}
                </motion.div>
            </div>

            {/* --- 2. BOTTOM DOTTED WAVE GRAPHIC --- */}
            <div className="absolute bottom-0 left-0 w-full h-[200px] pointer-events-none z-0 opacity-60">
                <svg viewBox="0 0 1440 320" className="w-full h-full object-cover" preserveAspectRatio="none">
                    <defs>
                        <pattern id="dots" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
                            <circle fill="#d1c5e3" cx="2" cy="2" r="2"></circle>
                        </pattern>
                    </defs>
                    {/* A gentle wave path filled with dots */}
                    <path fill="url(#dots)" d="M0,256L48,245.3C96,235,192,213,288,218.7C384,224,480,256,576,250.7C672,245,768,203,864,181.3C960,160,1056,160,1152,176C1248,192,1344,224,1392,240L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
            </div>

            {/* --- 3. MAIN CONTENT AREA --- */}
            {/* Adding a subtle white radial gradient behind text to make it readable over the marquee */}
            <div className="relative z-10 flex flex-col items-center text-center max-w-3xl px-6 py-12 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-white/80 to-transparent">

                {/* Heading with SlicedRollingText and TextPressure */}
                <div className="flex flex-col items-center gap-2 mb-6 text-black">
                    {/* Using SlicedRollingText for the first line */}
                    <SlicedRollingText
                        text="We're a collaborative"
                        className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900"
                        staggerDelay={0.04}
                    />

                    {/* Using TextPressure for the second line to give it that dynamic feel */}
                    <div className="w-full max-w-[600px] h-[60px] md:h-[80px] mt-2">
                        <TextPressure
                            text="team of experts"
                            flex={true}
                            alpha={false}
                            stroke={false}
                            width={true}
                            weight={true}
                            italic={true}
                            textColor="#111827"
                        />
                    </div>
                </div>

                {/* Subtext Paragraph */}
                <p className="text-sm md:text-base text-gray-600 max-w-2xl mb-10 leading-relaxed font-medium">
                    We are ML/AI engineers, thinkers, and champions who are passionate about exploring the potential of language AI to make our world a better place.
                </p>

                {/* CTA Button with Liquid Glass */}
                <button className="group liquid-glass relative inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-[#d5f750] text-black font-semibold text-sm transition-transform duration-300 hover:scale-105 shadow-lg hover:shadow-xl outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#d5f750]">
                    {/* Glass Overlay for the button */}
                    <div className="absolute inset-0 bg-white/20 mix-blend-overlay rounded-full pointer-events-none"></div>

                    <span className="relative z-10">Join us</span>

                    <motion.svg
                        className="w-4 h-4 relative z-10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ x: 0 }}
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                    </motion.svg>
                </button>
            </div>

        </section>
    );
}