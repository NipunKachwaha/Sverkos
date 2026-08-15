"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Search, Star, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { LiquidGlassCard } from "@/components/ui/liquid-glass";

const tabs = ["Recent apps", "Community templates", "Sverkos templates"] as const;
type PlanTab = (typeof tabs)[number];

const communityCategories = [
    "All", "Marketing & Sales", "Operations", "Data & Analytics", "Content Generation",
    "HR & Legal", "Finance", "Education", "Community", "Lifestyle & Hobbies", "Games",
];

const recentApps = [
    { title: "BlueprintAI", description: "An intelligent planning engine that converts your creative ideas into detaile...", updated: "Edited 5 hours ago" },
];

const communityTemplates = [
    { title: "CODE GEN AI", price: "Free", users: "23.6K", author: "Vishal Prajapati", preview: "from-violet-950 via-purple-800 to-fuchsia-700" },
    { title: "Interactive Globe", price: "$35", users: "2.7K", author: "anjum khan", preview: "from-black via-slate-950 to-indigo-950" },
    { title: "Interactive Floating Sidebar UI", price: "Free", users: "17.1K", author: "anjum khan", preview: "from-slate-950 via-zinc-900 to-neutral-700" },
    { title: "GourmetGo APP", price: "$150", users: "25", author: "Navarro Tech", preview: "from-neutral-200 via-neutral-100 to-stone-200" },
];

const SverkosTemplates = [
    { title: "Task management", price: "Free", users: "32.9K", author: "Sverkos App", rating: "5.0", preview: "from-sky-50 via-white to-blue-100" },
    { title: "Moda Studio", price: "Free", users: "8.7K", author: "Sverkos App", preview: "from-stone-300 via-amber-100 to-stone-500" },
    { title: "Burger Builder", price: "Free", users: "4K", author: "Sverkos App", preview: "from-orange-100 via-amber-400 to-orange-600" },
    { title: "FlowSchedule", price: "Free", users: "9.1K", author: "Sverkos App", preview: "from-blue-50 via-sky-100 to-cyan-200" },
    { title: "Studio Console", price: "$20", users: "1.2K", author: "Sverkos App", preview: "from-slate-950 via-zinc-900 to-black" },
    { title: "Green Future", price: "Free", users: "997", author: "Sverkos App", preview: "from-emerald-900 via-teal-700 to-green-500" },
];

export function BottomSection() {
    const [activeTab, setActiveTab] = useState<PlanTab>("Recent apps");

    return (
        <section className="-mt-28 px-6 md:px-10 relative z-10 flex-1 flex flex-col pb-0">
            <LiquidGlassCard
                draggable={false}
                borderRadius="32px 32px 0 0" 
                blurIntensity="xl"
                shadowIntensity="none"
                glowIntensity="none"
                className="mx-auto flex-1 w-full max-w-[1280px] bg-black/20 border border-white/10 px-10 py-12 md:px-14"
            >
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="mb-8 flex items-center justify-between gap-6">
                        <div className="flex flex-wrap items-center gap-4 relative z-30">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={cn(
                                        "px-4 py-2 rounded-xl text-[16px] font-medium transition-all duration-300 outline-none",
                                        activeTab === tab
                                            ? "bg-white/10 text-white border border-white/20 shadow-lg backdrop-blur-sm" // Active Dark Style
                                            : "text-white/50 hover:text-white hover:bg-white/5" // Inactive Dark Style
                                    )}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        <motion.button 
                            whileHover={{ x: 4 }}
                            className="relative z-30 flex shrink-0 items-center gap-3 text-[16px] font-medium text-white/80 hover:text-white transition outline-none"
                        >
                            View all <ChevronRight className="h-4 w-4" />
                        </motion.button>
                    </div>

                    <div className="relative z-30">
                        {activeTab === "Recent apps" && <RecentApps />}
                        {activeTab === "Community templates" && (
                            <TemplateBrowser
                                description="Discover a curated collection of applications built by our community."
                                templates={communityTemplates}
                                showFilters
                                buttonText="View All Community Templates"
                            />
                        )}
                        {activeTab === "Sverkos templates" && (
                            <TemplateBrowser
                                description="Discover a curated collection of applications built by the Sverkos team."
                                templates={SverkosTemplates}
                            />
                        )}
                    </div>
                </motion.div>
            </LiquidGlassCard>
        </section>
    );
}

function RecentApps() {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
            {recentApps.map((app, index) => (
                <motion.article
                    key={app.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                >
                    {/* ✅ CARD: Dark Glass */}
                    <LiquidGlassCard
                        draggable={false}
                        borderRadius="16px"
                        blurIntensity="md"
                        shadowIntensity="sm"
                        glowIntensity="xs"
                        className="bg-white/5 border border-white/10 p-4 cursor-pointer hover:bg-white/10 transition-colors"
                    >
                        <div className="flex max-w-[500px] gap-4">
                            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-[#3c265f]/50 border border-white/10 overflow-hidden">
                                <div className="h-14 w-14 rounded-full border-4 border-[#f4cf66]/80" />
                            </div>
                            <div className="min-w-0 pt-0.5">
                                <h3 className="text-lg font-semibold text-white">{app.title}</h3>
                                <p className="line-clamp-2 text-[15px] leading-snug text-white/60">{app.description}</p>
                                <p className="mt-3 text-sm text-white/40">{app.updated}</p>
                            </div>
                        </div>
                    </LiquidGlassCard>
                </motion.article>
            ))}
        </motion.div>
    );
}

function TemplateBrowser({
    description,
    templates,
    showFilters = false,
    buttonText,
}: {
    description: string;
    templates: Array<{ title: string; price: string; users: string; author: string; rating?: string; preview: string }>;
    showFilters?: boolean;
    buttonText?: string;
}) {
    return (
        <div className="pb-12">
            <p className="mb-6 text-[18px] text-white/70">{description}</p>

            <div className="mb-8 flex flex-col gap-5 border-b border-white/10 pb-8 lg:flex-row lg:items-center lg:justify-between">
                {/* ✅ SEARCH BAR: Dark Glass */}
                <LiquidGlassCard
                    draggable={false}
                    borderRadius="16px"
                    blurIntensity="lg"
                    shadowIntensity="sm"
                    className="relative w-full max-w-[520px] bg-white/5 border border-white/10"
                >
                    <div className="relative flex items-center">
                        <Search className="absolute left-4 h-6 w-6 text-white/40" />
                        <input
                            className="relative z-10 h-12 w-full bg-transparent pl-14 pr-4 text-[15px] text-white outline-none placeholder:text-white/30"
                            placeholder="Search apps..."
                        />
                    </div>
                </LiquidGlassCard>

                {showFilters && (
                    <LiquidGlassCard
                        draggable={false}
                        borderRadius="12px"
                        blurIntensity="md"
                        className="flex h-11 w-[175px] items-center justify-between px-5 bg-white/5 border border-white/10 cursor-pointer"
                    >
                        <span className="text-[15px] font-medium text-white/80">English</span>
                        <ChevronRight className="h-4 w-4 rotate-90 text-white/40" />
                    </LiquidGlassCard>
                )}
            </div>

            {showFilters && (
                <div className="mb-12 overflow-hidden">
                    <div className="flex gap-3 overflow-x-auto pb-4">
                        {communityCategories.map((category, index) => (
                            <motion.button
                                key={category}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.03 }}
                                className={cn(
                                    "shrink-0 rounded-full px-4 py-1.5 text-[15px] transition-all duration-300 outline-none border",
                                    category === "All"
                                        ? "border-white/30 bg-white/10 text-white shadow-lg backdrop-blur-sm" // Active Dark
                                        : "border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white" // Inactive Dark
                                )}
                            >
                                {category}
                            </motion.button>
                        ))}
                    </div>
                    <div className="mx-1 h-2 rounded-full bg-white/10">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: "88%" }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="h-2 rounded-full bg-white/30" 
                        />
                    </div>
                </div>
            )}

            <div className="grid gap-x-8 gap-y-14 md:grid-cols-2 xl:grid-cols-3">
                {templates.map((template, index) => (
                    <motion.div
                        key={template.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                    >
                        <TemplateCard {...template} />
                    </motion.div>
                ))}
            </div>

            {buttonText && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-24 flex justify-center"
                >
                    <motion.button 
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="rounded-xl bg-white/10 backdrop-blur-md border border-white/20 px-10 py-3.5 text-[15px] font-semibold text-white shadow-2xl shadow-black/50 transition outline-none hover:bg-white/20"
                    >
                        {buttonText}
                    </motion.button>
                </motion.div>
            )}
        </div>
    );
}

function TemplateCard({
    title,
    price,
    users,
    author,
    rating,
    preview,
}: {
    title: string;
    price: string;
    users: string;
    author: string;
    rating?: string;
    preview: string;
}) {
    const isDark = preview.includes("950") || preview.includes("black") || preview.includes("900");

    return (
        <article className="group cursor-pointer">
            {/* ✅ TEMPLATE CARD: Dark Glass Border */}
            <div className="relative overflow-hidden rounded-xl border border-white/10 shadow-xl">
                <LiquidGlassCard
                    draggable={false}
                    borderRadius="12px"
                    blurIntensity="md"
                    shadowIntensity="md"
                    glowIntensity="sm"
                    className={`aspect-[1.62] overflow-hidden bg-gradient-to-br ${preview} transition-transform duration-500 group-hover:scale-[1.02]`}
                >
                    <div className="relative z-30 flex h-full items-center justify-center px-8 text-center">
                        <span className={`text-2xl font-semibold drop-shadow-lg ${isDark ? "text-white" : "text-black mix-blend-multiply"}`}>
                            {title}
                        </span>
                    </div>
                    
                    {/* Shine Effect */}
                    <div className="absolute inset-0 z-40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%]" style={{ transitionDuration: '1s' }} />
                </LiquidGlassCard>
            </div>

            <div className="mt-4 flex items-start justify-between gap-4 px-1">
                <h3 className="text-[18px] font-semibold text-white transition-colors group-hover:text-white/80">{title}</h3>
                <p className="text-[16px] font-medium text-white/60">{price}</p>
            </div>
            
            <div className="mt-2 flex flex-wrap items-center gap-2 px-1 text-[14px] text-white/40">
                <Users className="h-4 w-4" />
                <span>{users}</span>
                {rating && (
                    <>
                        <span className="text-white/20">•</span>
                        <Star className="h-4 w-4 fill-white/80 text-white/80" />
                        <span className="font-medium text-white/80">{rating}</span>
                    </>
                )}
                <span className="text-white/20">•</span>
                <span>by {author}</span>
            </div>
        </article>
    );
}