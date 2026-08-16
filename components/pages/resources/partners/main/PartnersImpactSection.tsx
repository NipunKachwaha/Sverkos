"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { SlicedRollingText } from '@/components/ui/SlicedRollingText';

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

export default function PartnersImpactSection() {
    return (
        // STRICT ZERO TOP/BOTTOM SPACE: No py, pt, pb, my, mt, or mb on the outer wrapper
        <section className="w-full max-w-7xl mx-auto px-4 md:px-8">

            {/* ================= 3-COLUMN GRID SECTION ================= */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="relative bg-[#fafaf9] border border-gray-100 shadow-sm"
            >
                {/* The Gradient Bottom Border */}
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#3b82f6] via-[#c084fc] to-[#ff007f] z-10" />

                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">

                    {/* Column 1: Government */}
                    <motion.div
                        variants={fadeUpVariants}
                        className="p-10 md:p-12 flex flex-col h-full group hover:bg-white hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 ease-out cursor-pointer"
                    >
                        <h4 className="text-[22px] font-semibold text-[#111111] mb-8">Government</h4>
                        <p className="text-gray-600 font-medium leading-relaxed mb-12 flex-grow group-hover:text-gray-900 transition-colors">
                            Modernize public services. Help agencies build citizen-facing tools and streamline operations.
                        </p>
                        <div className="text-gray-400 font-medium text-sm flex items-center overflow-hidden h-6">
                            <SlicedRollingText
                                text="Coming soon"
                                className="!text-sm !font-semibold !normal-case !text-gray-400 group-hover:!text-[#3b82f6] transition-colors duration-300"
                                duration={0.8}
                            />
                        </div>
                    </motion.div>

                    {/* Column 2: Education */}
                    <motion.div
                        variants={fadeUpVariants}
                        className="p-10 md:p-12 flex flex-col h-full group hover:bg-white hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 ease-out cursor-pointer"
                    >
                        <h4 className="text-[22px] font-semibold text-[#111111] mb-8">Education</h4>
                        <p className="text-gray-600 font-medium leading-relaxed mb-12 flex-grow group-hover:text-gray-900 transition-colors">
                            Shape the next generation. Integrate Sverkos into your curriculum and equip students with real-world skills.
                        </p>
                        <div className="text-gray-400 font-medium text-sm flex items-center overflow-hidden h-6">
                            <SlicedRollingText
                                text="Coming soon"
                                className="!text-sm !font-semibold !normal-case !text-gray-400 group-hover:!text-[#c084fc] transition-colors duration-300"
                                duration={0.8}
                                staggerDelay={0.06}
                            />
                        </div>
                    </motion.div>

                    {/* Column 3: Non-profit */}
                    <motion.div
                        variants={fadeUpVariants}
                        className="p-10 md:p-12 flex flex-col h-full group hover:bg-white hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 ease-out cursor-pointer"
                    >
                        <h4 className="text-[22px] font-semibold text-[#111111] mb-8">Non-profit</h4>
                        <p className="text-gray-600 font-medium leading-relaxed mb-12 flex-grow group-hover:text-gray-900 transition-colors">
                            Build for impact. Access friendly pricing, free training, and priority support for your mission.
                        </p>
                        <div className="text-gray-400 font-medium text-sm flex items-center overflow-hidden h-6">
                            <SlicedRollingText
                                text="Coming soon"
                                className="!text-sm !font-semibold !normal-case !text-gray-400 group-hover:!text-[#ff007f] transition-colors duration-300"
                                duration={0.8}
                                staggerDelay={0.07}
                            />
                        </div>
                    </motion.div>

                </div>
            </motion.div>


            {/* ================= TESTIMONIAL SECTION ================= */}
            {/* Internal margin top (mt-24) separates the grid from the testimonial, while keeping the outer section flush */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="max-w-4xl mx-auto text-center mt-32 mb-16"
            >
                {/* Profile Meta */}
                <motion.div variants={fadeUpVariants} className="flex items-center justify-center gap-4 mb-10 group cursor-pointer">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 border border-gray-300 shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
                        {/* Replace with real image path */}
                        <img
                            src="/ji.jpeg"
                            alt="AI Engineer"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="text-left">
                        <div className="font-bold text-[#ffffff] text-[15px] group-hover:text-blue-600 transition-colors">Nipun Kachwaha</div>
                        <div className="text-gray-500 text-[13px] font-medium">AI Engineer</div>
                    </div>
                </motion.div>

                {/* Main Quote */}
                <motion.h2
                    variants={fadeUpVariants}
                    className="text-[1.75rem] md:text-[2.5rem] font-bold tracking-tight leading-[1.2] text-[#ffffff] mb-14"
                >
                    “Sverkos changed how we deliver AI solutions — instead of handing clients an API or a report, we ship them a real interface in days, and suddenly everything clicks for them: they can touch it, navigate it, and immediately see the value we've built.”
                </motion.h2>

                {/* Company Logo Area */}
                <motion.div
                    variants={fadeUpVariants}
                    className="flex flex-col items-center justify-center group cursor-pointer hover:-translate-y-1 transition-transform duration-300"
                >
                    <div className="flex flex-col items-center mb-1">
                        <div className="flex gap-1 mb-[3px]">
                            <div className="w-6 h-1.5 bg-[#ffb800] rounded-full" />
                            <div className="w-4 h-1.5 bg-[#ffb800] rounded-full" />
                        </div>
                        <div className="flex gap-1 mb-1.5">
                            <div className="w-8 h-1.5 bg-[#ffb800] rounded-full" />
                            <div className="w-2 h-1.5 bg-[#ffb800] rounded-full" />
                        </div>
                    </div>

                    <span className="font-black text-3xl tracking-tighter text-[#ffffff] leading-none mb-1">
                        Black Greater 
                    </span>
                    <span className="text-[8px] font-bold tracking-[0.2em] text-gray-400 uppercase">
                        A Assests Managing Company
                    </span>
                </motion.div>
            </motion.div>

        </section>
    );
}