"use client";

import React from "react";
import { motion } from "framer-motion";
import { SlicedRollingText } from '@/components/ui/SlicedRollingText';
import TextPressure from '@/components/ui/TextPressure';
import FadingVideo from '@/components/ui/FadingVideo';

// --- Animation Variants ---
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
};

const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
};

export default function PartnershipSolutions() {
    return (
        <section className="w-full max-w-7xl mx-auto px-4 md:px-8">

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="w-full"
            >
                {/* FIX 1: Gave TextPressure a strict block container with a defined height and max-width so it doesn't collapse to 0px */}
                <motion.div
                    variants={fadeUpVariants}
                    className="mb-6 w-full max-w-sm h-8 md:h-10 relative"
                >
                    <TextPressure 
                        text="Discover partnership opportunities"
                        className="text-[15px] font-semibold text-white tracking-tight" 
                    />
                </motion.div>

                {/* Main Animated Heading */}
                <motion.div variants={fadeUpVariants} className="max-w-4xl mb-12">
                    <SlicedRollingText
                        text="From integration to enterprise solutions, find the perfect partnership to grow your business"
                        className="!text-4xl md:!text-[3.25rem] !font-bold !tracking-tighter !text-white !normal-case !leading-[1.05]"
                        duration={1.2}
                    />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-4 md:gap-6">

                    {/* CARD 1: Solution Partners (Dark) */}
                    <motion.div
                        variants={fadeUpVariants}
                        className="relative bg-[#0d0d0d] rounded-3xl p-8 md:p-10 min-h-[420px] flex flex-col justify-between overflow-hidden group cursor-pointer"
                    >
                        {/* Video Background */}
                        <div className="absolute inset-0 z-0">
                            <FadingVideo 
                                src="https://github.com/NipunKachwaha/Sverkos-Assets/releases/download/v1.0/plane3.mp4" 
                                className="w-full h-full object-cover opacity-60 group-hover:opacity-90 transition-opacity duration-700 ease-in-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 mix-blend-multiply pointer-events-none" />
                        </div>

                        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay z-0 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

                        <h3 className="text-white text-2xl font-semibold z-10 tracking-tight">Solution partners</h3>

                        <div className="z-10 mt-20 flex flex-col items-start">
                            <p className="text-white/95 text-lg font-medium leading-snug mb-6 max-w-sm group-hover:translate-x-1 transition-transform duration-500">
                                Deliver transformation at scale. Help companies design, build, and ship with Sverkos.
                            </p>
                            
                            {/* FIX 2: Used w-fit to constrain button width, and applied ! (important) tags to force the small text size */}
                            <button className="bg-[#1a1a1a] text-white px-6 py-3 rounded-xl hover:bg-black hover:scale-[1.02] active:scale-95 transition-all shadow-lg border border-white/5 flex items-center justify-center overflow-hidden w-fit min-w-[120px]">
                                <SlicedRollingText 
                                    text="Apply now" 
                                    className="!text-sm md:!text-sm !font-semibold !normal-case !leading-none !tracking-normal !text-white" 
                                    duration={0.8}
                                    pauseDuration={2.5}
                                />
                            </button>
                        </div>
                    </motion.div>

                    {/* CARD 2: Startup Partners (Light) */}
                    <motion.div
                        variants={fadeUpVariants}
                        className="bg-[#f5f5f4] rounded-3xl p-8 md:p-10 min-h-[420px] flex flex-col justify-between group cursor-pointer hover:bg-[#ebebea] transition-colors duration-500 border border-transparent hover:border-gray-200"
                    >
                        <h3 className="text-[#111111] text-2xl font-semibold tracking-tight">Startup partners</h3>

                        <div className="mt-20 flex flex-col items-start">
                            <p className="text-[#111111] text-lg font-medium leading-snug mb-6 max-w-sm group-hover:translate-x-1 transition-transform duration-500">
                                For VCs, accelerators, and incubators. Give your portfolio startups the tools to build and scale faster.
                            </p>
                            
                            {/* FIX 2: Added w-fit and forced text sizing with ! */}
                            <button className="bg-[#1a1a1a] text-white px-6 py-3 rounded-xl hover:bg-black hover:scale-[1.02] active:scale-95 transition-all shadow-md flex items-center justify-center overflow-hidden w-fit min-w-[120px]">
                                <SlicedRollingText 
                                    text="Apply now" 
                                    className="!text-sm md:!text-sm !font-semibold !normal-case !leading-none !tracking-normal !text-white" 
                                    duration={0.8}
                                    pauseDuration={2.5}
                                />
                            </button>
                        </div>
                    </motion.div>

                </div>
            </motion.div>
        </section>
    );
}