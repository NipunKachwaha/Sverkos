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
            delayChildren: 0.8,
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
                src="https://github.com/NipunKachwaha/Sverkos-Assets/releases/download/v1.0/girl2loop.mp4"
                className="absolute left-1/2 top-[50%] -translate-x-1/2 -translate-y-1/2 object-cover min-w-full min-h-full z-0"
                style={{ width: '120vw', height: '120vh' }}
            />
            <div className="absolute inset-0 z-[1]" />
        </>
    ), []);

    return (
        <section className="relative w-full">
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

                        <SlicedRollingText
                            text="Become a"
                            className="text-4xl md:text-6xl lg:text-[5rem] font-heading text-white leading-tight md:leading-[0.85] text-center max-w-4xl tracking-[-2px] md:tracking-[-4px] drop-shadow-lg"
                        />
                        <div className="h-6 md:h-8" />
                        <SlicedRollingText
                            text="Sverkos Partner"
                            className="text-4xl md:text-6xl lg:text-[5rem] font-heading text-white leading-tight md:leading-[0.85] text-center max-w-4xl tracking-[-2px] md:tracking-[-4px] drop-shadow-lg"
                        />

                        <motion.p
                            variants={itemVariants}
                            className="mt-6 text-base md:text-lg text-white/90 max-w-xl font-body font-light leading-relaxed text-center tracking-wide"
                        >
                            <strong>
                                Discover partnership opportunities that spark growth, drive innovation, and turn our shared ambition into shared success.
                            </strong>
                        </motion.p>

                        <motion.button
                            variants={itemVariants}
                            whileHover={{
                                scale: 1.065,
                                boxShadow: "0 8px 28px 0 rgba(0,0,0,0.30),0 1.5px 4px 0 rgba(0,0,0,0.10)",
                                transition: { duration: 0.18 }
                            }}
                            whileTap={{ scale: 0.96 }}
                            className="mt-10 px-8 py-3 rounded-lg bg-white shadow-2xl hover:shadow-xl focus:outline-none transition-all duration-150"
                            style={{
                                boxShadow: "0 6px 24px 0 rgba(0,0,0,0.20), 0 1.5px 4px 0 rgba(0,0,0,0.10)"
                            }}
                        >
                            <SlicedRollingText
                                text="Apply"
                                className="text-lg md:text-xl font-heading font-semibold text-black drop-shadow-sm tracking-wide"
                                animationDuration={0.45}
                            />
                        </motion.button>

                    </div>
                </motion.div>
            </ScrollExpand>
        </section>
    );
}