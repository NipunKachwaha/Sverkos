'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import FadingVideo from '@/components/ui/FadingVideo';
import { SlicedRollingText } from '@/components/ui/SlicedRollingText';
import { AI_Prompt } from "@/components/Chatbox/Showpis/animated-ai-input";

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
export default function ChatBoxSection() {
    const backgroundContent = useMemo(() => (
        <>
            <FadingVideo
                src="https://github.com/NipunKachwaha/Sverkos-Assets/releases/download/v1.0/loopbg.mp4"
                className="absolute inset-0 w-full h-full object-cover z-0 rounded-3xl"
                style={{}}
            />
            <div className="absolute inset-0 z-[1] bg-black/20 rounded-3xl" />
        </>
    ), []);

    return (
        <section className="relative w-full min-h-[100dvh]">
            {/* Background Layers */}
            <div className="absolute inset-0 pointer-events-none select-none">
                {backgroundContent}
            </div>

            <motion.div
                className="relative z-10 flex flex-col min-h-[100dvh] w-full max-w-7xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="flex-1 flex flex-col items-center justify-center pt-24 md:pt-32 px-4 md:px-8">
                    <SlicedRollingText
                        text="Ready to bring your idea to life?"
                        className="text-2xl md:text-3xl lg:text-4xl font-heading text-white leading-tight md:leading-snug text-center max-w-2xl tracking-[-1px] md:tracking-[-2px] drop-shadow-lg"
                    />

                    <motion.div
                        variants={itemVariants}
                        className="w-full max-w-3xl flex justify-center mt-4 relative z-20"
                    >
                        <AI_Prompt />
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}