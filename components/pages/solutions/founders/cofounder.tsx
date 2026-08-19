'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SlicedRollingText } from '@/components/ui/SlicedRollingText';
import { Building2, Smartphone, ShoppingCart, AppWindow, BarChart3, User } from 'lucide-react';

const features = [
    {
        icon: <Building2 className="w-6 h-6 text-[#e83382]" />, // Pink
        title: "B2B SaaS",
        description: "Build subscription platforms, workflow tools, and project management apps. Real auth, databases, and billing included."
    },
    {
        icon: <Smartphone className="w-6 h-6 text-[#ea580c]" />, // Orange
        title: "Consumer apps",
        description: "Launch social platforms, community sites, and fitness apps with user profiles, feeds, and real-time interactions."
    },
    {
        icon: <ShoppingCart className="w-6 h-6 text-[#eab308]" />, // Yellow
        title: "Marketplaces & e-commerce",
        description: "Create booking platforms, storefronts, and rental marketplaces. Payments, search, and user accounts all work out of the box."
    },
    {
        icon: <AppWindow className="w-6 h-6 text-[#8b5cf6]" />, // Purple
        title: "Landing pages & websites",
        description: "Create company sites, portfolios, and waitlist pages with professional design. Custom domains and SEO built in."
    },
    {
        icon: <BarChart3 className="w-6 h-6 text-[#3b82f6]" />, // Blue
        title: "Internal tools & dashboards",
        description: "CRMs, admin panels, and analytics dashboards. Build and visualize what your team needs without waiting on developers."
    },
    {
        icon: <User className="w-6 h-6 text-[#111111]" />, // Black
        title: "Client projects",
        description: "Ship for clients faster with full code export. Agencies and freelancers use Sverkos to deliver production-ready products."
    }
];

const Cofounder = () => {
    return (
        <div className="pb-16 pt-4 md:pt-8 px-6 md:px-12 lg:px-24 font-sans relative z-20 -mt-16 md:-mt-24">
            <div className="max-w-7xl mx-auto">

                {/* Header Section - Fades and slides down */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="mb-12 max-w-2xl"
                >
                    <SlicedRollingText
                        text="Your AI cofounder and dev team"
                        className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-[#ffffff] mb-5 tracking-tight leading-tight"
                    />
                    <p className="text-[1.1rem] text-white/80 leading-relaxed">
                        Your idea doesn't need a technical cofounder. Sverkos is your technical partner -
                        <br className="hidden md:block" /> build, iterate, and ship in hours instead of months.
                    </p>
                </motion.div>

                {/* Card Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="group bg-white rounded-[2.5rem] p-4 md:p-6 lg:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col lg:flex-row items-stretch gap-6 transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                >
                    <div className="flex-1 px-6 lg:px-12 py-10 lg:py-20 flex flex-col justify-center">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-2xl md:text-[1.75rem] font-bold text-[#111111] mb-4 tracking-tight transition-colors duration-300"
                        >
                            Build by describing what you want
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="text-gray-700 text-[1.05rem] leading-relaxed max-w-[420px]"
                        >
                            Chatting with Sverkos is like talking with a developer. Describe your vision,
                            drop in screenshots, or paste your Notion doc. Sverkos takes it from there.
                        </motion.p>
                    </div>
                    <div className="flex-1 w-full bg-gray-50 rounded-[1.5rem] overflow-hidden relative">
                        <img
                            src="/FAQ/cofounder1.png"
                            alt="Sverkos chat interface prompt"
                            className="w-full h-full object-cover object-left transform transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none"></div>
                    </div>
                </motion.div>

                {/* Card 2 Section*/}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="group mt-8 bg-white rounded-[2.5rem] p-4 md:p-6 lg:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col lg:flex-row items-stretch gap-6 transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                >
                    <div className="flex-1 w-full bg-[#fdf2f8] rounded-[1.5rem] overflow-hidden relative order-2 lg:order-1">
                        <img
                            src="/FAQ/cofounder2.avif"
                            alt="Sverkos infrastructure dashboard"
                            className="w-full h-full object-cover object-left transform transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none"></div>
                    </div>
                    <div className="flex-1 px-6 lg:px-12 py-10 lg:py-20 flex flex-col justify-center order-1 lg:order-2">
                        <motion.h2
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-2xl md:text-[1.75rem] font-bold text-[#111111] mb-4 tracking-tight transition-colors duration-300"
                        >
                            Production infrastructure included
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-gray-700 text-[1.05rem] leading-relaxed max-w-[480px]"
                        >
                            Real backend with Sverkos Cloud and Supabase gives you Postgres database,
                            authentication, file storage, and real-time features. All auto-provisioned. Connect
                            to 400+ tools via n8n - send emails, sync to your CRM, automate workflows.
                            Add AI to your product with chatbots, image generation, and text analysis.
                        </motion.p>
                    </div>
                </motion.div>

                <div className="my-8" />

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="group bg-white rounded-[2.5rem] p-4 md:p-6 lg:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col lg:flex-row items-stretch gap-6 transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                >
                    <div className="flex-1 px-6 lg:px-12 py-10 lg:py-20 flex flex-col justify-center">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-2xl md:text-[1.75rem] font-bold text-[#111111] mb-4 tracking-tight transition-colors duration-300"
                        >
                            Polish it to perfection
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="text-gray-700 text-[1.05rem] leading-relaxed max-w-[420px]"
                        >
                            Tweak layouts, colors, and text with direct visual control. See changes instantly and bring your vision to life exactly as you imagined it.
                        </motion.p>
                    </div>
                    <div className="flex-1 w-full bg-gray-50 rounded-[1.5rem] overflow-hidden relative">
                        <img
                            src="/FAQ/cofounder3.avif"
                            alt="Sverkos chat interface prompt"
                            className="w-full h-full object-cover object-left transform transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none"></div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="group mt-8 bg-white rounded-[2.5rem] p-4 md:p-6 lg:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col lg:flex-row items-stretch gap-6 transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                >
                    <div className="flex-1 w-full bg-[#fdf2f8] rounded-[1.5rem] overflow-hidden relative order-2 lg:order-1">
                        <img
                            src="/FAQ/cofounder4.avif"
                            alt="Sverkos infrastructure dashboard"
                            className="w-full h-full object-cover object-left transform transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none"></div>
                    </div>
                    <div className="flex-1 px-6 lg:px-12 py-10 lg:py-20 flex flex-col justify-center order-1 lg:order-2">
                        <motion.h2
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-2xl md:text-[1.75rem] font-bold text-[#111111] mb-4 tracking-tight transition-colors duration-300"
                        >
                            Modern, standard tech stack
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-gray-700 text-[1.05rem] leading-relaxed max-w-[480px]"
                        >
                            Build on industry-standard frameworks - React + Supabase + Tailwind - and sync to GitHub from day one. Your code, your repository, your rules.
                        </motion.p>
                    </div>
                </motion.div>

                <div className="my-8" />

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="group bg-white rounded-[2.5rem] p-4 md:p-6 lg:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col lg:flex-row items-stretch gap-6 transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                >
                    <div className="flex-1 px-6 lg:px-12 py-10 lg:py-20 flex flex-col justify-center">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-2xl md:text-[1.75rem] font-bold text-[#111111] mb-4 tracking-tight transition-colors duration-300"
                        >
                            One-click publish
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="text-gray-700 text-[1.05rem] leading-relaxed max-w-[420px]"
                        >
                            Custom domain, SEO optimization, and security scans are all handled. Go from idea to live project in the same day.
                        </motion.p>
                    </div>
                    <div className="flex-1 w-full bg-gray-50 rounded-[1.5rem] overflow-hidden relative">
                        <img
                            src="/FAQ/cofounder5.avif"
                            alt="Sverkos chat interface prompt"
                            className="w-full h-full object-cover object-left transform transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none"></div>
                    </div>
                </motion.div>

                {/* Card 6 (Use Cases Grid) */}
                <div className="my-8" />
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="bg-white rounded-[2.5rem] p-8 md:p-12 lg:p-16 shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-gray-100"
                >
                    <div className="mb-12 max-w-2xl">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#111111] mb-4 tracking-tight">
                            <SlicedRollingText text="Dream it. Build it. Ship it." className="text-[#111111]" />
                        </h2>
                        <p className="text-[1.05rem] text-gray-700 leading-relaxed font-medium">
                            Start from your Notion docs. Connect to Stripe for payments,
                            n8n for automations. Ship with the tools you already use.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-[#FAF9F5] border border-gray-100 rounded-[1.5rem] p-8 hover:shadow-md hover:border-gray-200 transition-all duration-300 flex flex-col gap-4"
                            >
                                <div className="mb-2">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-[#111111] tracking-tight">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 text-[15px] leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Card 7 (Success Stories) */}
                <div className="my-24" />
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col items-center w-full"
                >
                    <SlicedRollingText
                        text="Real founders, real products, real results"
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#ffffff] mb-12 tracking-tight text-center"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                        {/* Testimonial 1 */}
                        <div className="bg-white rounded-[2rem] p-8 md:p-10 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col h-full hover:shadow-md transition-shadow duration-300">
                            <h3 className="text-[1.4rem] font-bold text-[#111111] mb-6 tracking-tight">Yannis Karagiannidis</h3>
                            <p className="text-gray-800 text-[1.05rem] leading-relaxed mb-8 flex-grow">
                                When Yannis hit a wall trying to customize newsletters for his marketing clients, he decided to build his own solution. Three days later, PrintPigeon was live—a micro-SaaS that solved his problem and turned into a revenue-generating product. No engineering team, no months of planning. Just a founder who saw a gap and filled it faster than he could have explained the problem to a dev shop.
                            </p>
                            <a href="#" className="text-[0.95rem] font-medium text-[#111111] hover:text-gray-600 transition-colors flex items-center justify-between group">
                                From idea to impact: Yannis' journey with L...
                                <span className="group-hover:translate-x-1 transition-transform text-lg leading-none">›</span>
                            </a>
                        </div>

                        {/* Testimonial 2 */}
                        <div className="bg-white rounded-[2rem] p-8 md:p-10 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col h-full hover:shadow-md transition-shadow duration-300">
                            <h3 className="text-[1.4rem] font-bold text-[#111111] mb-6 tracking-tight">Tom Skyrme</h3>
                            <p className="text-gray-800 text-[1.05rem] leading-relaxed mb-8 flex-grow">
                                Tom spent years helping people through holistic health coaching, but he had zero coding experience. When he realized his clients needed a better way to track their wellness journey, he built Elora Health in one month and launched it to real customers. The same people who used to ask "can you code?" now ask "how did you ship so fast?"
                            </p>
                            <a href="#" className="text-[0.95rem] font-medium text-[#111111] hover:text-gray-600 transition-colors flex items-center justify-between group">
                                From idea to full-blown product in a month
                                <span className="group-hover:translate-x-1 transition-transform text-lg leading-none">›</span>
                            </a>
                        </div>

                        {/* Testimonial 3 */}
                        <div className="bg-white rounded-[2rem] p-8 md:p-10 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col h-full hover:shadow-md transition-shadow duration-300">
                            <h3 className="text-[1.4rem] font-bold text-[#111111] mb-6 tracking-tight">Sabrine Matos</h3>
                            <p className="text-gray-800 text-[1.05rem] leading-relaxed mb-8 flex-grow">
                                In Brazil, women needed a way to access public criminal data before meeting someone new—information that existed but wasn't easy to find. Sabrine, with no technical background, built Plinq to make that data accessible and help women stay safer. What started as a personal mission became an app with real social impact, built by someone who had never written a line of code.
                            </p>
                            <a href="#" className="text-[0.95rem] font-medium text-[#111111] hover:text-gray-600 transition-colors flex items-center justify-between group">
                                How Plinq fights gender-based violence in...
                                <span className="group-hover:translate-x-1 transition-transform text-lg leading-none">›</span>
                            </a>
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

export default Cofounder;