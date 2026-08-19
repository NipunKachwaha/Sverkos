"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import RollingText from "@/components/ui/CharRollingText";

const LINKS_COLUMN_1 = [
    { label: "Technology", href: "#" },
    { label: "Products", href: "#" },
    { label: "AI Models", href: "#" }
];

const LINKS_COLUMN_2 = [
    { label: "Expertise", href: "#" },
    { label: "Key features", href: "#" },
    { label: "Integrations", href: "#" }
];

const ParallaxChar = ({ char, globalIndex, scrollYProgress }: { char: string, globalIndex: number, scrollYProgress: any }) => {
    const speed = 1 + (globalIndex * 0.15);
    const y = useTransform(scrollYProgress, [0, 1], [`${200 * speed}%`, `-${200 * speed}%`]);

    const charVariants: Variants = {
        hidden: { y: "110%", opacity: 0, rotateX: -45 },
        show: {
            y: "0%", opacity: 1, rotateX: 0,
            transition: { type: "spring", damping: 12, stiffness: 150 }
        }
    };

    return (
        <motion.span style={{ y }} className="inline-block relative">
            <span className="inline-block overflow-hidden pb-1">
                <motion.span variants={charVariants} className="inline-block origin-bottom">
                    {char}
                </motion.span>
            </span>
        </motion.span>
    );
};

export default function FinalFooter() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const text = "Sverkos";
    const words = text.split(" ");
    let globalCharCount = 0;

    return (
        <div ref={containerRef} className="w-full h-full flex flex-col justify-between pt-12 md:pt-20 px-6 md:px-12 lg:px-20 relative z-10 font-sans overflow-hidden">

            {/* --- TOP SECTION: Links & Newsletter --- */}
            <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-0 w-full mb-10 md:mb-0 relative z-20">
                <div className="flex gap-16 md:gap-32">
                    {/* <div className="flex flex-col gap-4 md:gap-6">
                        {LINKS_COLUMN_1.map((link) => (
                            <a key={link.label} href={link.href} className="text-white text-sm md:text-base font-medium hover:text-gray-300 transition-colors">
                                {link.label}
                            </a>
                        ))}
                    </div>
                    <div className="flex flex-col gap-4 md:gap-6">
                        {LINKS_COLUMN_2.map((link) => (
                            <a key={link.label} href={link.href} className="text-white text-sm md:text-base font-medium hover:text-gray-300 transition-colors">
                                {link.label}
                            </a>
                        ))}
                    </div> */}
                </div>

                <div className="flex flex-col items-start lg:items-end w-full lg:w-auto">
                    <h3 className="text-white text-2xl md:text-3xl font-bold mb-6 tracking-tight">
                        Still have questions?
                    </h3>
                    <div className="flex w-full md:w-auto gap-3">
                        <input 
                            type="email" 
                            placeholder="Enter your email" 
                            className="bg-white text-gray-900 placeholder-gray-400 rounded-full px-6 py-3.5 outline-none focus:ring-2 focus:ring-[#d5f750] w-full md:w-[280px]"
                        />
                        <button className="bg-[#d5f750] text-black font-semibold rounded-full px-6 py-3.5 hover:bg-[#c4e63e] transition-colors flex items-center justify-center gap-2">
                            Send
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14"></path>
                                <path d="m12 5 7 7-7 7"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div> 

            {/* --- MIDDLE SECTION --- */}
            <div className="absolute inset-x-0 top-0 bottom-[88px] overflow-hidden flex items-end justify-center pointer-events-none z-0">
                <motion.p
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-20px" }}
                    className="flex flex-col items-center justify-center text-[14vw] md:text-[16vw] leading-[0.75] font-black text-white/90 tracking-tighter uppercase"
                    aria-label={text}
                    transition={{ staggerChildren: 0.04, delayChildren: 0.1 }}
                >
                    {words.map((word, wIdx) => (
                        <span key={wIdx} className="inline-flex pb-0">
                            {word.split("").map((char) => {
                                const currentIndex = globalCharCount++;
                                return (
                                    <ParallaxChar
                                        key={currentIndex}
                                        char={char}
                                        globalIndex={currentIndex}
                                        scrollYProgress={scrollYProgress}
                                    />
                                );
                            })}
                        </span>
                    ))}
                </motion.p>
            </div>

            {/* --- BOTTOM SECTION: Copyright & Legal --- */}
            <div className="w-full border-t border-white/20 pt-6 pb-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs md:text-sm text-gray-400 relative z-20 bg-transparent mt-auto">

                {/* Copyright Text */}
                <RollingText
                    text={`© ${new Date().getFullYear()} Black Greater. All rights reserved.`}
                />

                {/* Links & Credits */}
                <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
                    {/* <a href="#" className="group">
                        <RollingText
                            text="Privacy Policy"
                            className="group-hover:text-white transition-colors duration-300"
                        />
                    </a>

                    <a href="#" className="group">
                        <RollingText
                            text="Cookies Policy"
                            className="group-hover:text-white transition-colors duration-300"
                        />
                    </a> */}

                    <div className="flex items-center gap-1.5 ml-0 md:ml-2">
                        <RollingText text="Developed by" />
                        <RollingText
                            text="Nipun Kachwaha"
                            className="text-white font-medium"
                        />
                    </div>
                </div>
            </div>

        </div>
    );
}