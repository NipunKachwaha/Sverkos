"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { SlicedRollingText } from '@/components/ui/SlicedRollingText';
import TextPressure from '@/components/ui/TextPressure';
import LaunchCountdown from '@/components/ui/LaunchCountdown';

export default function FounderSection() {
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    return (
        // Wrapper: Background color add nahi kiya gaya hai.
        <section className="w-full py-24 px-6 md:px-12 lg:px-20 font-sans">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                className="max-w-7xl mx-auto flex flex-col gap-20"
            >
                {/* --- Top Section: Details, Quote & Image --- */}
                <div className="flex flex-col-reverse md:flex-row justify-between items-start gap-10 md:gap-8">

                    <motion.div variants={itemVariants} className="max-w-4xl flex flex-col gap-6">
                        {/* Founder Details */}
                        <p className="text-gray-400 text-sm md:text-base tracking-wide font-light">
                        — Nipun Kachwaha · Founder & Indie Developer, Sverkos
                        </p>

                        {/* The Big Quote */}
                        <div className="flex flex-col gap-1">
                            <SlicedRollingText 
                                text='"It took me just about a week to'
                                className="text-3xl md:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight normal-case"
                                staggerDelay={0.04} 
                            />
                            <SlicedRollingText 
                                text='build a complete product that'
                                className="text-3xl md:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight normal-case"
                                staggerDelay={0.04} 
                            />
                            <SlicedRollingText 
                                text='works flawlessly end-to-end."'
                                className="text-3xl md:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight normal-case"
                                staggerDelay={0.04} 
                            />
                        </div>
                    </motion.div>

                    {/* Profile Image with Liquid Glass Border */}
                    <motion.div
                        variants={itemVariants}
                        className="relative w-28 h-28 md:w-36 md:h-36 shrink-0 liquid-glass rounded-xl overflow-hidden shadow-2xl flex items-center justify-center"
                    >
                        <Image
                            src="/Founder/ji.jpeg" 
                            alt="Founder Profile"
                            width={160}
                            height={160}
                            className="object-cover grayscale hover:grayscale-0 transition-all duration-500 w-24 h-24 md:w-32 md:h-32 rounded-xl mx-auto"
                        />
                    </motion.div>
                </div>

                {/* --- Bottom Section: Cascading Metric Cards --- */}
                <div className="flex flex-col md:flex-row items-end gap-6 relative w-full">

                    {/* Card 1 (Tallest) */}
                    <LaunchCountdown itemVariants={itemVariants} />

                    {/* Card 2 (Medium Height) */}
                    <motion.div
                        variants={itemVariants}
                        className="liquid-glass hover:liquid-glass-strong transition-all duration-500 rounded-2xl p-8 flex flex-col justify-between w-full md:w-1/3 h-[280px] md:h-[260px]"
                    >
                        <h3 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white tracking-tight">
                            $1M ARR
                        </h3>
                        <p className="text-gray-400 text-lg font-medium">in 3 months</p>
                    </motion.div>

                    {/* Card 3 (Shortest) + Read More Link */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col w-full md:w-1/3 gap-6 h-full justify-end"
                    >
                        <div className="flex justify-start md:justify-end w-full px-2">
                            <Link
                                href="#"
                                className="text-white hover:text-gray-300 underline underline-offset-4 decoration-gray-600 hover:decoration-white transition-all duration-300 flex items-center gap-2 font-medium"
                            >
                                Read full story
                                <span className="text-xl transform group-hover:translate-x-1 transition-transform">→</span>
                            </Link>
                        </div>

                        <div className="liquid-glass hover:liquid-glass-strong transition-all duration-500 rounded-2xl p-8 flex flex-col justify-between w-full h-[220px]">
                            <h3 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white tracking-tight">
                                6-8%
                            </h3>
                            <p className="text-gray-400 text-lg font-medium">conversion</p>
                        </div>
                    </motion.div>

                </div>
            </motion.div>
        </section>
    );
}