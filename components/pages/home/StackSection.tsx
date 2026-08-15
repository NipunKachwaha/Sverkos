"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from "next/image";
import collageImage from "@/public/collage.webp";
import TextPressure from '@/components/ui/TextPressure';
import { SlicedRollingText } from '@/components/ui/SlicedRollingText';

const features = [
    "Ready-to-use backend and storage",
    "Connect your tools in a single click",
    "Use custom domains for full branding",
    "Effortless analytics and performance tracking",
    "Accept payments instantly through Sverkos",
    "Advanced, enterprise-level security"
];

const StackSection = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
        show: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { type: "spring", stiffness: 200, damping: 20 }
        },
    };

    return (
        <section className="w-full min-h-screen text-white py-20 px-6 md:px-12 lg:px-20 font-sans overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

                {/* Left Column: Heading & Description */}
                <div className="flex flex-col justify-start h-full">

                    {/* Heading */}
                    <div className="flex flex-col w-full gap-2 sm:gap-4 mb-10 mt-4">
                        {/* Line 1 */}
                        <div className="relative w-full h-[45px] sm:h-[60px] md:h-[80px]">
                            <TextPressure
                                text="The whole stack."
                                flex alpha={false} stroke={false} width weight italic
                                textColor="#ffffff" strokeColor="#5227FF" minFontSize={30}
                            />
                        </div>
                        {/* Line 2 */}
                        <div className="relative w-[70%] h-[45px] sm:h-[60px] md:h-[80px]">
                            <TextPressure
                                text="No setup"
                                flex alpha={false} stroke={false} width weight italic
                                textColor="#ffffff" strokeColor="#5227FF" minFontSize={30}
                            />
                        </div>
                        {/* Line 3 */}
                        <div className="relative w-[90%] h-[45px] sm:h-[60px] md:h-[80px]">
                            <TextPressure
                                text="slowdown."
                                flex alpha={false} stroke={false} width weight italic
                                textColor="#ffffff" strokeColor="#5227FF" minFontSize={30}
                            />
                        </div>
                    </div>

                    {/* Paragraph */}
                    <SlicedRollingText
                        text="Bring your ideas to life instantly. Skip the hassle of spinning up servers, integrating payment gateways, or building databases from scratch. The entire infrastructure is ready when you are."
                        className="text-gray-200 text-lg md:text-xl lg:text-xl leading-relaxed max-w-2xl font-light"
                        staggerDelay={0.04}
                    />

                    <div className="my-4" />

                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="w-full h-[260px] rounded-2xl overflow-hidden flex relative group cursor-pointer mt-auto"
                    >
                        <Image
                            src={collageImage}
                            alt="collage"
                            fill
                            className="object-cover object-center"
                            priority
                        />
                    </motion.div>
                </div>

                {/* Right Column: Features List */}
                <div className="flex flex-col justify-end h-full mt-12 lg:mt-0">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        className="flex flex-col w-full gap-4"
                    >
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="group cursor-pointer rounded-2xl liquid-glass hover:liquid-glass-strong transition-all duration-500"
                            >
                                <div className="flex items-center justify-between p-6 transition-all duration-300 ease-out">
                                    {/* Cool animation on text */}
                                    <motion.h3
                                        className="text-xl md:text-2xl font-medium text-gray-300 transition-colors duration-300 group-hover:text-white"
                                        initial={{ opacity: 0, x: -20, skewY: 2 }}
                                        whileInView={{ opacity: 1, x: 0, skewY: 0 }}
                                        whileHover={{
                                            scale: 1.06,
                                            color: "#fff",
                                            textShadow: "0px 4px 24px rgba(82,39,255,0.8)",
                                            transition: { type: "spring", stiffness: 300, damping: 15 }
                                        }}
                                        transition={{ duration: 0.5, delay: index * 0.07 }}
                                    >
                                        {feature}
                                    </motion.h3>

                                    {/* Cool animation on arrow */}
                                    <motion.div
                                        className="relative overflow-hidden w-10 h-10 rounded-full border border-gray-500 flex items-center justify-center transition-all duration-500 group-hover:border-white group-hover:bg-white group-hover:text-black text-gray-400"
                                        whileHover={{
                                            scale: 1.08,
                                            boxShadow: "0 0 18px 3px #5227FF66",
                                            transition: { duration: 0.3, type: "spring" }
                                        }}
                                    >
                                        <motion.svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="absolute transition-all duration-500 ease-in-out transform group-hover:translate-x-8 group-hover:opacity-0"
                                            initial={false}
                                            whileHover={{
                                                x: 8,
                                                opacity: 0,
                                                rotate: 20
                                            }}
                                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                        >
                                            <path d="M5 12h14"></path>
                                            <path d="m12 5 7 7-7 7"></path>
                                        </motion.svg>
                                        <motion.svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="absolute transition-all duration-500 ease-in-out transform -translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                                            initial={{ x: -8, opacity: 0 }}
                                            whileHover={{
                                                x: 0,
                                                opacity: 1,
                                                scale: 1.22,
                                                rotate: -8
                                            }}
                                            transition={{ type: "spring", stiffness: 240, damping: 16 }}
                                        >
                                            <path d="M5 12h14"></path>
                                            <path d="m12 5 7 7-7 7"></path>
                                        </motion.svg>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

            </div>
        </section>
    );
};

export default StackSection;