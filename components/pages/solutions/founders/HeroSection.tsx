'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import FadingVideo from '@/components/ui/FadingVideo';
import ScrollExpand from '@/components/ui/ScrollExpand/ScrollExpand';
import { SlicedRollingText } from '@/components/ui/SlicedRollingText';

// --- Animation Variants ---
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1, // Sped this up slightly for a snappier intro
        },
    },
};

const itemVariants = {
    hidden: { filter: 'blur(10px)', opacity: 0, y: 20 },
    visible: {
        filter: 'blur(0px)',
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: 'easeOut' }
    },
};

// --- Main Component ---
export default function HeroSection() {
    const backgroundContent = useMemo(() => (
        <>
            <FadingVideo
                src="https://github.com/NipunKachwaha/Sverkos-Assets/releases/download/v1.0/Silk.Material.in.Motion.-.Satisfying.Video.mp4"
                className="absolute left-1/2 top-[50%] -translate-x-1/2 -translate-y-1/2 object-cover min-w-full min-h-full z-0"
                style={{ width: '100vw', height: '100vh' }}
            />
            <div className="absolute inset-0 z-[1]" />
        </>
    ), []);

    return (
        <section className="relative w-full overflow-hidden">
            <ScrollExpand
                useWindowScroll={true}
                startWidth={100}
                endWidth={85}
                startHeight={100}
                endHeight={85}
                startRadius={0}
                endRadius={40}
                scrollDistance={1.0}
                bgContent={backgroundContent}
            >
                <motion.div
                    className="relative z-10 flex flex-col min-h-[100dvh] w-full max-w-7xl mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="flex-1 flex flex-col items-center justify-center pt-24 md:pt-32 px-4 md:px-8">

                        {/* Top Label (Inspired by "Tools for founders") */}
                        <motion.div variants={itemVariants} className="mb-2 md:mb-4">
                            <h2 className="text-xs md:text-base font-semibold text-white/80 tracking-widest uppercase">
                                Tools for founders
                            </h2>
                        </motion.div>

                        {/* Smaller Headline Group */}
                        <motion.div
                            variants={itemVariants}
                            className="relative flex flex-col items-center justify-center text-center w-full"
                        >
                            <SlicedRollingText
                                text="Build your"
                                className="text-[2rem] md:text-[4rem] lg:text-[5rem] font-black text-white leading-[0.9] tracking-tighter drop-shadow-lg relative z-10"
                            />

                            {/* Gradient Blob Container */}
                            <div className="relative mt-1 md:mt-[-4px] flex justify-center items-center">
                                {/* The Pink/Purple Gradient Blob */}
                                <div className="absolute w-[90%] md:w-[100%] h-[80%] bg-gradient-to-r from-[#9b6ef3] via-[#ff3b8f] to-[#ff2a5f] rounded-[50px] md:rounded-[75px] z-0 blur-[4px] opacity-95 shadow-2xl"
                                    style={{ borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%' }}>
                                </div>

                                {/* Floating decorative dots from the reference */}
                                <div className="absolute -left-4 bottom-1 w-2 h-2 bg-[#ff6b9e] rounded-full blur-[1px] hidden md:block z-0"></div>
                                <div className="absolute -right-6 top-0 w-3 h-3 bg-[#ff1493] rounded-full blur-[1px] hidden md:block z-0"></div>

                                {/* Foreground Text (Dark to contrast the bright blob) */}
                                <SlicedRollingText
                                    text="dream"
                                    className="text-[1.75rem] md:text-[3.5rem] lg:text-[4.5rem] font-black text-[#111] leading-[0.9] tracking-tighter relative z-10"
                                />
                            </div>
                        </motion.div>

                        <motion.p
                            variants={itemVariants}
                            className="mt-6 text-sm md:text-lg text-white/95 max-w-xl font-medium leading-relaxed text-center tracking-wide drop-shadow-md"
                        >
                            Sverkos is your AI cofounder and development team. Ship your ideas in days, not months — and start building the business you've been dreaming about
                        </motion.p>

                        {/* Call to Action Button - Styled Dark like the reference */}
                        <motion.button
                            variants={itemVariants}
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0 0px 30px rgba(255,59,143,0.4)",
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-6 px-6 py-2 rounded-lg bg-black border border-white/10 shadow-2xl transition-all duration-200"
                            onClick={() => {
                                window.location.href = '/build';
                            }}
                        >
                            <SlicedRollingText
                                text="Start Building"
                                className="text-base md:text-lg font-bold text-white tracking-wide"
                            />
                        </motion.button>
                

                    </div>
                </motion.div>
            </ScrollExpand>
        </section>
    );
}