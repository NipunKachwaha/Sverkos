"use client";

import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import TextPressure from '@/components/ui/TextPressure';
import { SlicedRollingText } from '@/components/ui/SlicedRollingText';

const MarketingSection = () => {
    const containerRef = useRef<HTMLElement>(null);

    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });
    const parallaxY = useTransform(scrollYProgress, [0, 1], [100, -100]);

    return (
        <section
            ref={containerRef}
            className="relative w-full min-h-[40vh] flex items-center py-12 md:py-16 px-6 md:px-12 lg:px-20 overflow-hidden font-sans selection:bg-white/20 selection:text-white"
        >
            <motion.div
                style={{ y: parallaxY }}
                className="absolute inset-0 z-0 flex items-center justify-center opacity-20 pointer-events-none select-none"
            >
                <div className="w-[120%] md:w-[150%] h-[150px] md:h-[250px]">
                    <TextPressure
                        text="MARKETING"
                        flex={true}
                        alpha={false}
                        stroke={true}
                        width={true}
                        weight={true}
                        italic={true}
                        uppercase={true}
                        textColor="transparent"
                        strokeColor="#ffffff"
                        minFontSize={100}
                    />
                </div>
            </motion.div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-white/[0.02] blur-[120px] rounded-full pointer-events-none z-0" />

            <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col gap-6 md:gap-8">

                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} 
                    className="flex items-center gap-4 md:gap-6"
                >
                    <p className="w-full text-center text-white/80 text-base md:text-lg font-medium mb-2">
                        Built-in marketing tools to grow after you ship
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                    <SlicedRollingText
                        text="Sverkos isn't just for launching your creations. It's a complete ecosystem designed to help you scale and grow your business from day one."
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-[#ffffff] leading-[1.2] md:leading-[1.1] max-w-[180rem] w-full"
                        staggerDelay={0.015} 
                    />
                </motion.div>

            </div>
        </section>
    );
};

export default MarketingSection;