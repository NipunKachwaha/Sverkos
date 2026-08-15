"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import TeamSection from "@/components/pages/home/TeamSection";
import { SlicedRollingText } from "@/components/ui/SlicedRollingText";
import Footer from "@/components/pages/home/Footer";
import FinalFooter from "@/components/pages/home/FinalFooter"
import FadingVideo from './FadingVideo'

export default function FAQWrapper() {
    const ctaRef = useRef<HTMLElement>(null);
    const footerRef = useRef<HTMLElement>(null);

    const { scrollYProgress: scrollYProgressFooter } = useScroll({
        target: footerRef,
        offset: ["start end", "start start"]
    });
    const ctaY = useTransform(scrollYProgressFooter, [0, 1], ["0vh", "100vh"]);

    return (
        <div className="relative w-full block">
            {/* --- 1. TEAM SECTION --- */}
            <div className="sticky top-0 z-0 w-full h-screen bg-white">
                <TeamSection />
            </div>

            {/* --- 2. CTA SECTION --- */}
            <div className="sticky top-0 z-10 w-full h-screen">
                <section
                    ref={ctaRef}
                    className="relative w-full h-full max-w-full mx-auto shadow-[0_-20px_50px_rgba(0,173,225,0.2)] hover:shadow-[0_-30px_60px_rgba(0,173,225,0.3)] transition-shadow duration-500 px-4 md:px-8 lg:px-12 py-12 md:py-16 lg:py-24 flex flex-col items-center justify-center text-center rounded-t-[2.5rem] md:rounded-t-[3.5rem] lg:rounded-t-[4.5rem]">
                    <FadingVideo
                        src="https://github.com/NipunKachwaha/Sverkos-Assets/releases/download/v1.0/4042.mp4"
                        className="absolute left-1/2 top-0 -translate-x-1/2 object-cover object-top z-0 rounded-t-[1.5rem] md:rounded-t-[2.5rem] lg:rounded-t-[3.5rem]"
                        style={{ width: '120%', height: '120%', filter: "brightness(1.5) saturate(1.2)" }}
                    />

                    {/* Top-right 3 lines */}
                    <motion.button
                        type="button"
                        className="absolute top-6 right-8 flex flex-col items-end gap-1 z-10 outline-none focus-visible:ring-2 focus-visible:ring-white/70 cursor-pointer bg-transparent border-0 p-2"
                        aria-label="Open menu"
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        whileTap="tap"
                        variants={{
                            hidden: { opacity: 0, x: 40, scale: 0.9 },
                            visible: {
                                opacity: 1,
                                x: 0,
                                scale: 1,
                                transition: { type: "spring", stiffness: 340, damping: 36, delay: 0.2 }
                            },
                            hover: {},
                            tap: { scale: 0.95 }
                        }}
                    >
                        {/* Line 1 */}
                        <motion.span
                            className="liquid-glass h-1.5 rounded-xl bg-white/90 shadow-lg brightness-125 block"
                            variants={{
                                hidden: { width: "2rem" },
                                visible: { width: "2rem" },
                                hover: { width: "1rem" }
                            }}
                            transition={{ type: "spring", stiffness: 400, damping: 28 }}
                        />

                        {/* Line 2 */}
                        <motion.span
                            className="liquid-glass h-1.5 rounded-xl bg-white/90 shadow-lg brightness-125 block"
                            variants={{
                                hidden: { width: "1.5rem" },
                                visible: { width: "1.5rem" },
                                hover: { width: "2rem" }
                            }}
                            transition={{ type: "spring", stiffness: 400, damping: 28, delay: 0.06 }}
                        />

                        {/* Line 3 */}
                        <motion.span
                            className="liquid-glass h-1.5 rounded-xl bg-white/90 shadow-lg brightness-125 block"
                            variants={{
                                hidden: { width: "1rem" },
                                visible: { width: "1rem" },
                                hover: { width: "1.5rem" }
                            }}
                            transition={{ type: "spring", stiffness: 400, damping: 28, delay: 0.12 }}
                        />
                    </motion.button>

                    {/* Top Headings */}
                    <div className="flex flex-col items-center mb-10 md:mb-16 w-full relative z-10">
                        <SlicedRollingText text="Go ahead." className="text-black/60 text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.9] normal-case" staggerDelay={0.04} />
                        <SlicedRollingText text="Build it yourself." className="text-black/60 text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.9] normal-case mt-2 md:mt-4" staggerDelay={0.04} />
                    </div>

                    {/* Image Gallery */}
                    <div className="relative flex items-center justify-center w-full max-w-2xl md:max-w-3xl px-2 md:px-5 mb-10 md:mb-16 h-[90px] sm:h-[120px] md:h-[180px] z-10">
                        <div className="absolute top-0 left-2 md:left-5 right-2 md:right-5 h-[1px] bg-black/40 z-0"></div>
                        <div className="absolute top-0 left-2 md:left-5 w-2 h-2 md:w-3 md:h-3 bg-black -mt-[3px] md:-mt-[5px] -ml-[3px] md:-ml-[5px] z-10"></div>
                        <div className="absolute top-0 right-2 md:right-5 w-2 h-2 md:w-3 md:h-3 bg-black -mt-[3px] md:-mt-[5px] -mr-[3px] md:-mr-[5px] z-10"></div>

                        <div className="liquid-glass w-full h-full relative overflow-hidden z-10 border border-white/20 rounded-2xl flex items-center justify-center">
                            <img src="/FAQ/blue.png" alt="Monitor" className="w-full h-full object-cover rounded-2xl" />
                        </div>
                    </div>

                    <a href="/build" className="group flex flex-col md:flex-row items-center gap-3 md:gap-4 hover:opacity-80 transition-opacity mb-2 z-10">
                        <div className="flex items-center gap-2 md:gap-4 border-b-[3px] md:border-b-[6px] border-black/60 pb-1 md:pb-2">
                            <svg className="w-8 h-8 md:w-12 md:h-12 lg:w-14 lg:h-14 text-black/60 group-hover:translate-x-2 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 12A9 9 0 1 1 12 3c2.4 0 4.6.9 6.2 2.4" />
                                <path d="M3 12h9" />
                                <path d="M8 8l4 4-4 4" />
                            </svg>
                            <SlicedRollingText text="Start building" className="text-black/60 text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight normal-case" staggerDelay={0.05} />
                        </div>
                    </a>
                </section>
            </div>

            {/* --- 3. FOOTER SECTION --- */}
            <div className="sticky top-0 z-20 w-full h-screen">
                <section className="relative w-full h-full max-w-full mx-auto rounded-t-3xl md:rounded-t-[48px] border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.8)] px-4 md:px-8 lg:px-12 py-24 flex items-center justify-center text-gray-500 overflow-hidden">
                    <FadingVideo
                        src="https://github.com/NipunKachwaha/Sverkos-Assets/releases/download/v1.0/blob2.mp4"
                        className="absolute left-1/2 top-0 -translate-x-1/2 object-cover object-top z-0"
                        style={{ width: '120%', height: '120%', filter: "brightness(1.5) saturate(1.2)" }}
                    />

                    {/* Top-right 3 */}
                    <motion.button
                        type="button"
                        className="absolute top-6 right-8 flex flex-col items-end gap-1 z-20 outline-none focus-visible:ring-2 focus-visible:ring-white/70 cursor-pointer bg-transparent border-0 p-2"
                        aria-label="Open menu"
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        whileTap="tap"
                        variants={{
                            hidden: { opacity: 0, x: 40, scale: 0.9 },
                            visible: {
                                opacity: 1,
                                x: 0,
                                scale: 1,
                                transition: { type: "spring", stiffness: 340, damping: 36, delay: 0.2 }
                            },
                            hover: {},
                            tap: { scale: 0.95 }
                        }}
                    >
                        {/* Line 1 */}
                        <motion.span
                            className="liquid-glass h-1.5 rounded-xl bg-white/90 shadow-lg brightness-125 block"
                            variants={{
                                hidden: { width: "2rem" },
                                visible: { width: "2rem" },
                                hover: { width: "1rem" }
                            }}
                            transition={{ type: "spring", stiffness: 400, damping: 28 }}
                        />

                        {/* Line 2 */}
                        <motion.span
                            className="liquid-glass h-1.5 rounded-xl bg-white/90 shadow-lg brightness-125 block"
                            variants={{
                                hidden: { width: "1.5rem" },
                                visible: { width: "1.5rem" },
                                hover: { width: "2rem" }
                            }}
                            transition={{ type: "spring", stiffness: 400, damping: 28, delay: 0.06 }}
                        />

                        {/* Line 3 */}
                        <motion.span
                            className="liquid-glass h-1.5 rounded-xl bg-white/90 shadow-lg brightness-125 block"
                            variants={{
                                hidden: { width: "1rem" },
                                visible: { width: "1rem" },
                                hover: { width: "1.5rem" }
                            }}
                            transition={{ type: "spring", stiffness: 400, damping: 28, delay: 0.12 }}
                        />
                    </motion.button>

                    <div className="relative z-20 w-full h-full flex flex-col justify-between overflow-y-auto no-scrollbar">
                        <Footer />
                    </div>

                </section>
            </div>

            {/* --- 4. CARD --- */}
            <div className="sticky top-0 z-30 w-full h-screen">
                <section
                    className="relative w-full h-full max-w-full mx-auto rounded-t-3xl md:rounded-t-[48px] border-t border-white/5 shadow-[0_-20px_50px_rgba(0,0,0,0.8)] px-4 md:px-8 lg:px-12 py-24 flex items-center justify-center text-gray-400"
                >
                    <FadingVideo
                        src="https://github.com/NipunKachwaha/Sverkos-Assets/releases/download/v1.0/GardenRemix.mp4"
                        className="absolute left-1/2 top-0 -translate-x-1/2 object-cover object-top z-0 rounded-t-[1.5rem] md:rounded-t-[2.5rem] lg:rounded-t-[3.5rem]"
                        style={{ width: '100%', height: '100%', filter: "brightness(1.5) saturate(1.2)" }}
                    />

                    {/* Top-right 3 lines */}
                    <motion.button
                        type="button"
                        className="absolute top-6 right-8 flex flex-col items-end gap-1 z-10 outline-none focus-visible:ring-2 focus-visible:ring-white/70 cursor-pointer bg-transparent border-0 p-2"
                        aria-label="Open menu"
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        whileTap="tap"
                        variants={{
                            hidden: { opacity: 0, x: 40, scale: 0.9 },
                            visible: {
                                opacity: 1,
                                x: 0,
                                scale: 1,
                                transition: { type: "spring", stiffness: 340, damping: 36, delay: 0.2 }
                            },
                            hover: {},
                            tap: { scale: 0.95 }
                        }}
                    >
                        {/* Line 1 */}
                        <motion.span
                            className="liquid-glass h-1.5 rounded-xl bg-white/90 shadow-lg brightness-125 block"
                            variants={{
                                hidden: { width: "2rem" },
                                visible: { width: "2rem" },
                                hover: { width: "1rem" }
                            }}
                            transition={{ type: "spring", stiffness: 400, damping: 28 }}
                        />

                        {/* Line 2 */}
                        <motion.span
                            className="liquid-glass h-1.5 rounded-xl bg-white/90 shadow-lg brightness-125 block"
                            variants={{
                                hidden: { width: "1.5rem" },
                                visible: { width: "1.5rem" },
                                hover: { width: "2rem" }
                            }}
                            transition={{ type: "spring", stiffness: 400, damping: 28, delay: 0.06 }}
                        />

                        {/* Line 3 */}
                        <motion.span
                            className="liquid-glass h-1.5 rounded-xl bg-white/90 shadow-lg brightness-125 block"
                            variants={{
                                hidden: { width: "1rem" },
                                visible: { width: "1rem" },
                                hover: { width: "1.5rem" }
                            }}
                            transition={{ type: "spring", stiffness: 400, damping: 28, delay: 0.12 }}
                        />
                    </motion.button>
                        <FinalFooter />
                </section>
            </div>

        </div>
    );
}