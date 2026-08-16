"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
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

export default function OtherWaysToPartner() {
    return (
        <section className="w-full max-w-7xl mx-auto px-4 md:px-8">

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={containerVariants}
                className="w-full"
            >
                {/* Main Heading */}
                <motion.div variants={fadeUpVariants} className="mb-12 md:mb-16">
                    <h2 className="text-4xl md:text-[3.25rem] font-bold tracking-tight text-[#ffffff] leading-tight max-w-sm">
                        Other ways to partner with us
                    </h2>
                </motion.div>

                {/* 3-Column Grid with subtle top border and dividers */}
                <div className="border-t border-gray-200">
                    <motion.div
                        variants={containerVariants}
                        className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200"
                    >

                        {/* COLUMN 1: Affiliate partners */}
                        <motion.div
                            variants={fadeUpVariants}
                            className="p-8 md:p-10 -mx-4 md:mx-0 group cursor-pointer hover:bg-white hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-500 ease-out flex flex-col h-full rounded-2xl md:rounded-none"
                        >
                            <h4 className="text-[22px] font-semibold text-[#ffffff] mb-5 tracking-tight group-hover:text-blue-600 transition-colors duration-300">
                                Affiliate partners
                            </h4>
                            <p className="text-gray-200 font-medium leading-relaxed mb-10 flex-grow">
                                Earn while you share. Get rewarded for every customer you refer to Lovable.
                            </p>

                            <div className="flex items-center text-[#ffffff] group-hover:text-blue-600 transition-colors duration-300 overflow-hidden h-6 mt-auto">
                                <SlicedRollingText
                                    text="Learn more"
                                    className="!text-[15px] !font-semibold !normal-case !tracking-normal"
                                    duration={0.8}
                                    pauseDuration={3}
                                />
                                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                            </div>
                        </motion.div>

                        {/* COLUMN 2: Content creators and influencers */}
                        <motion.div
                            variants={fadeUpVariants}
                            className="p-8 md:p-10 -mx-4 md:mx-0 group cursor-pointer hover:bg-white hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-500 ease-out flex flex-col h-full rounded-2xl md:rounded-none"
                        >
                            <h4 className="text-[22px] font-semibold text-[#ffffff] mb-5 tracking-tight group-hover:text-blue-600 transition-colors duration-300">
                                Content creators and influencers
                            </h4>
                            <p className="text-gray-200 font-medium leading-relaxed mb-10 flex-grow">
                                You want to create content about Lovable and share with your audience.
                            </p>

                            <div className="flex items-center text-[#ffffff] group-hover:text-blue-600 transition-colors duration-300 overflow-hidden h-6 mt-auto">
                                <SlicedRollingText
                                    text="Learn more"
                                    className="!text-[15px] !font-semibold !normal-case !tracking-normal"
                                    duration={0.8}
                                    staggerDelay={0.06}
                                    pauseDuration={3.5}
                                />
                                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                            </div>
                        </motion.div>

                        {/* COLUMN 3: Events and hackathons */}
                        <motion.div
                            variants={fadeUpVariants}
                            className="p-8 md:p-10 -mx-4 md:mx-0 group cursor-pointer hover:bg-white hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-500 ease-out flex flex-col h-full rounded-2xl md:rounded-none"
                        >
                            <h4 className="text-[22px] font-semibold text-[#ffffff] mb-5 tracking-tight group-hover:text-blue-600 transition-colors duration-300">
                                Events and hackathons
                            </h4>
                            <p className="text-gray-200 font-medium leading-relaxed mb-10 flex-grow">
                                You want to organize a community-led hackathon, workshop or event using Lovable.
                            </p>

                            <div className="flex items-center text-[#ffffff] group-hover:text-blue-600 transition-colors duration-300 overflow-hidden h-6 mt-auto">
                                <SlicedRollingText
                                    text="Learn more"
                                    className="!text-[15px] !font-semibold !normal-case !tracking-normal"
                                    duration={0.8}
                                    staggerDelay={0.07}
                                    pauseDuration={4}
                                />
                                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                            </div>
                        </motion.div>

                    </motion.div>
                </div>
            </motion.div>

        </section>
    );
}