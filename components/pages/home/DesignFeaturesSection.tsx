"use client";

import React, { memo, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import TextPressure from '@/components/ui/TextPressure';
import { SlicedRollingText } from '@/components/ui/SlicedRollingText';
import FadingVideo from './FadingVideo'

// --- TYPES ---
interface FeatureData {
    id: string;
    title: string;
    description: string;
}

// --- CONSTANTS & DATA ---
const FEATURES_DATA: FeatureData[] = [
    {
        id: "collab",
        title: "Seamlessly collaborate",
        description: "See every page at once. Leave notes, sketch ideas, and send instructions straight to AI — all on one board."
    },
    {
        id: "video",
        title: "Generate high-quality videos",
        description: "Describe a video, get one. Add it to any page — hero sections, onboarding screens, product previews."
    },
    {
        id: "redesign",
        title: "Get redesign recommendation",
        description: "Ask for design options, pick the one you want. AI shows previews before it touches anything."
    },
    {
        id: "control",
        title: "Control the design",
        description: "Set colors and fonts for your entire app from one place. Your entire app — updated everywhere at once."
    }
];

// --- ANIMATION VARIANTS ---
const listVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
        }
    }
};

const rowVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
    show: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { type: "spring", stiffness: 100, damping: 20 }
    }
};

// --- SUB-COMPONENTS ---
const FeatureRow = memo(({ title, description }: Omit<FeatureData, 'id'>) => {
    return (
        <motion.article
            variants={rowVariants}
            className="group relative cursor-pointer py-10 first:pt-0 border-b border-white/10 last:border-none transition-all duration-500 hover:border-white/40 overflow-hidden"
        >
            {/* Animated Hover Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/[0.03] to-transparent opacity-0 -translate-x-full transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-x-0 pointer-events-none" />

            <header className="relative z-10 flex justify-between items-center mb-3">
                <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-gray-200 transition-colors duration-500 group-hover:text-white">
                    {title}
                </h3>

                {/* Highly Animated Arrow Icon */}
                <div className="flex items-center justify-center w-12 h-12 rounded-full border border-white/10 transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:border-white group-hover:bg-white text-white group-hover:text-black group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                    <div className="relative overflow-hidden w-5 h-5 flex items-center justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20" height="20"
                            viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2"
                            strokeLinecap="round" strokeLinejoin="round"
                            className="absolute transition-transform duration-500 ease-out group-hover:translate-x-6 group-hover:-translate-y-6"
                            aria-hidden="true"
                        >
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                        </svg>
                        {/* Duplicate Arrow for Continuous Motion Illusion */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20" height="20"
                            viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2"
                            strokeLinecap="round" strokeLinejoin="round"
                            className="absolute -translate-x-6 translate-y-6 transition-transform duration-500 ease-out group-hover:translate-x-0 group-hover:translate-y-0"
                            aria-hidden="true"
                        >
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </header>

            <p className="relative z-10 text-gray-300 text-base md:text-lg leading-relaxed pr-12 md:pr-24 transition-colors duration-500 group-hover:text-gray-200">
                {description}
            </p>
        </motion.article>
    );
});
FeatureRow.displayName = 'FeatureRow';

// --- MAIN COMPONENT ---
const DesignFeaturesSection = () => {
    const leftColRef = useRef(null);
    const isLeftInView = useInView(leftColRef, { once: true, margin: "-100px" });

    return (
        <section className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-2 font-sans selection:bg-black/10 selection:text-black overflow-hidden">

            {/* Left Column */}
            <motion.div
                ref={leftColRef}
                initial={{ opacity: 0, x: -50 }}
                animate={isLeftInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative flex flex-col px-8 py-16 md:px-16 lg:px-20 xl:px-24 justify-center rounded-tr-3xl rounded-br-3xl overflow-hidden"
            >
                {/* Video Background */}
                <FadingVideo
                    src="/videos/earth.mp4"
                    className="absolute inset-0 w-full h-full object-cover z-0 rounded-tr-3xl rounded-br-3xl"
                />

                <div className="relative z-10 flex flex-col sticky top-24 w-full max-w-[650px] mx-auto lg:mx-0">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={isLeftInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col gap-2 w-full mb-8"
                    >
                        {[
                            { text: "Beautiful", className: "w-full h-[55px] sm:h-[75px] md:h-[90px] lg:h-[110px]" },
                            { text: "by default.", className: "w-[90%] h-[55px] sm:h-[75px] md:h-[95px] lg:h-[110px]" },
                            { text: "Yours by", className: "w-[90%] h-[55px] sm:h-[75px] md:h-[95px] lg:h-[110px]" },
                            { text: "design.", className: "w-[90%] h-[55px] sm:h-[75px] md:h-[95px] lg:h-[110px]" },
                        ].map(({ text, className }, i) => (
                            <div key={text} className={className}>
                                <TextPressure
                                    text={text}
                                    flex
                                    alpha={false}
                                    stroke={false}
                                    width={true}
                                    weight={true}
                                    textColor="#ffffff"
                                    strokeColor="#ffffff"
                                    minFontSize={36}
                                />
                            </div>
                        ))}
                    </motion.div>

                    <div className="h-8" />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isLeftInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <SlicedRollingText
                            text="Sverkos starts with designs that look good before you change a thing — and hold up just as well when you do."
                            className="text-white text-xl md:text-2xl lg:text-3xl leading-relaxed max-w-full font-bold"
                            staggerDelay={0.04}
                        />
                    </motion.div>
                </div>
            </motion.div>


            {/* Right Column: Features List */}
            <div className="flex flex-col px-8 py-16 md:px-16 lg:px-20 xl:px-24 justify-center">
                <motion.div
                    variants={listVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="flex flex-col w-full max-w-[700px] mx-auto lg:mx-0"
                >
                    {FEATURES_DATA.map((feature) => (
                        <FeatureRow
                            key={feature.id}
                            title={feature.title}
                            description={feature.description}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default DesignFeaturesSection;