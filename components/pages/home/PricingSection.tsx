"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { SlicedRollingText } from '@/components/ui/SlicedRollingText';
import TextPressure from '@/components/ui/TextPressure';
import FadingVideo from './FadingVideo'

export default function PricingSection() {
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    return (
        <section className="w-full py-24 px-6 md:px-12 lg:px-20 font-sans text-white relative overflow-hidden">
            <FadingVideo
                src="/videos/rock2.mp4"
                className="absolute left-1/2 top-0 -translate-x-1/2 object-cover object-top z-0 rounded-3xl"
                style={{
                    width: '98%', 
                    height: '100%',
                    filter: "",
                    borderRadius: '1.5rem 1.5rem 1.5rem 1.5rem'
                }}
            />
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-8 justify-between relative z-10"
            >
                {/* --- Left Column: Header & Subtitle --- */}
                <motion.div variants={itemVariants} className="w-full lg:w-5/12 flex flex-col gap-6 pt-4">
                    <div className="w-full flex flex-col">
                        <SlicedRollingText
                            text="Choose"
                            className="text-5xl md:text-7xl lg:text-8xl font-medium leading-[1.1] tracking-tight normal-case"
                            staggerDelay={0.04}
                        />
                        <SlicedRollingText
                            text="Your Plan."
                            className="text-5xl md:text-7xl lg:text-8xl font-medium leading-[1.1] tracking-tight normal-case"
                            staggerDelay={0.04}
                        />
                    </div>

                    {/* Subtitle */}
                    <div className="max-w-md mt-4 relative h-16 md:h-20 lg:h-24 flex flex-col gap-1">
                        <TextPressure
                            text="Built for where you are,"
                            flex
                            alpha={false}
                            stroke={false}
                            width
                            weight
                            italic
                            uppercase={false}
                            textColor="#FFFFFF"
                            strokeColor="#FFFFFF"
                            minFontSize={36}
                        />
                        <TextPressure
                            text="and where you're going."
                            flex
                            alpha={false}
                            stroke={false}
                            width
                            weight
                            italic
                            uppercase={false}
                            textColor="#FFFFFF"
                            strokeColor="#FFFFFF"
                            minFontSize={36}
                        />
                    </div>
                </motion.div>

                {/* --- Right Column: Pricing Cards --- */}
                <div className="w-full lg:w-7/12 flex flex-col gap-6">

                    {/* Card 1: Free Plan */}
                    <motion.div
                        variants={itemVariants}
                        className="liquid-glass hover:liquid-glass-strong transition-all duration-500 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row gap-8 justify-between group"
                    >
                        {/* Plan Details */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-2xl font-medium text-gray-300">Start for free</h3>
                            <div className="flex items-baseline gap-1">
                                <span className="text-6xl md:text-7xl font-semibold tracking-tight">$0</span>
                                <span className="text-gray-400 text-2xl font-medium">/mo</span>
                            </div>
                            <button className="mt-4 px-6 py-3 bg-white/10 hover:bg-white text-white hover:text-black rounded-lg font-medium transition-colors w-fit border border-white/20 hover:border-transparent">
                                Start Building
                            </button>
                        </div>

                        {/* Features List */}
                        <div className="flex flex-col gap-3 md:pt-2">
                            <p className="text-sm text-gray-400 font-medium mb-1">Get access to:</p>
                            <ul className="flex flex-col gap-3">
                                {['All core features', 'Built-in integrations', 'Authentication system', 'Database functionality'].map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-sm md:text-base text-gray-300">
                                        <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* Card 2: Paid Plan */}
                    <motion.div
                        variants={itemVariants}
                        className="liquid-glass hover:liquid-glass-strong transition-all duration-500 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row gap-8 justify-between relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20 transition-opacity group-hover:opacity-100 opacity-50"></div>

                        {/* Plan Details */}
                        <div className="flex flex-col gap-4 relative z-10">
                            <h3 className="text-2xl font-medium text-gray-300">Paid plans from</h3>
                            <div className="flex items-baseline gap-1">
                                <span className="text-6xl md:text-7xl font-semibold tracking-tight text-white">$16</span>
                                <span className="text-gray-400 text-2xl font-medium">/mo</span>
                            </div>
                            <p className="text-xs text-gray-500">*Billed annually</p>
                            <button className="mt-4 px-6 py-3 bg-white text-black hover:bg-gray-200 rounded-lg font-medium transition-colors w-fit">
                                See all plans
                            </button>
                        </div>

                        {/* Features List */}
                        <div className="flex flex-col gap-3 md:pt-2 relative z-10 max-w-[250px]">
                            <p className="text-sm text-gray-400 font-medium leading-relaxed mb-1">
                                Upgrade as you go for more credits, more features, and more support.
                            </p>
                            <ul className="flex flex-col gap-3 mt-2">
                                {['Unlimited number of apps', 'In-app code edits', 'AI model select', 'Free custom domain'].map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-sm md:text-base text-gray-300">
                                        <svg className="w-4 h-4 text-orange-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* Bottom Link */}
                    <motion.div variants={itemVariants} className="pt-2">
                        <p className="text-gray-400 text-sm md:text-base">
                            Looking for enterprise solutions?{' '}
                            <a href="#" className="text-white hover:text-gray-300 underline underline-offset-4 decoration-gray-600 hover:decoration-white transition-all duration-300 inline-flex items-center gap-1">
                                Contact sales <span>→</span>
                            </a>
                        </p>
                    </motion.div>

                </div>
            </motion.div>
        </section>
    );
}