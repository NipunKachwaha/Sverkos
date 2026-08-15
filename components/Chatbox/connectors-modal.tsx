"use client";

import { useState } from "react";
import { Plug, X, Search, ArrowDownUp, ChevronDown, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// --- FULL DATA FOR CONNECTORS ---
const CONNECTORS = [
    { name: "Instagram Business", desc: "Publish content and manage comments on your Business...", color: "text-pink-500 bg-pink-50/80" },
    { name: "Hugging Face", desc: "AI inference and model repos.", color: "text-yellow-600 bg-yellow-50/80" },
    { name: "Calendly", desc: "Automated appointment scheduling.", color: "text-blue-500 bg-blue-50/80" },
    { name: "Contentful", desc: "Headless CMS and content management.", color: "text-red-500 bg-red-50/80" },
    { name: "Supabase", desc: "Browse schemas, read data, and view project status (rea...", color: "text-green-500 bg-green-50/80" },
    { name: "Snowflake", desc: "Cloud data warehouse and analytics.", color: "text-blue-400 bg-blue-50/80" },
    { name: "Databricks", desc: "Data lakehouse and AI platform.", color: "text-orange-500 bg-orange-50/80" },
    { name: "QuickBooks", desc: "Accounting and financial management.", color: "text-green-600 bg-green-50/80" },
    { name: "Square", desc: "Payments, point of sale, and commerce.", color: "text-neutral-800 bg-neutral-100/80" },
    { name: "Stripe", desc: "Sell products or subscriptions and get paid online.", color: "text-indigo-500 bg-indigo-50/80" },
    { name: "Gmail", desc: "Automate email sending and inbox management.", color: "text-red-500 bg-red-50/80" },
    { name: "Google Calendar", desc: "Manage your schedule and calendar events.", color: "text-blue-500 bg-blue-50/80" },
    { name: "Google Sheets", desc: "Sync and manage spreadsheet data.", color: "text-green-500 bg-green-50/80" },
    { name: "Google Drive", desc: "Export and back up app-generated files.", color: "text-yellow-500 bg-yellow-50/80" },
    { name: "LinkedIn", desc: "Share updates and access professional profiles.", color: "text-blue-600 bg-blue-50/80" },
    { name: "Google Analytics", desc: "Track website traffic and user insights.", color: "text-orange-400 bg-orange-50/80" },
    { name: "Google Forms", desc: "Build forms and collect responses.", isNew: true, color: "text-purple-500 bg-purple-50/80" },
    { name: "Google Docs", desc: "Manage and automate document creation.", color: "text-blue-500 bg-blue-50/80" },
    { name: "Outlook", desc: "Email and calendar.", color: "text-blue-600 bg-blue-50/80" },
    { name: "FreshBooks", desc: "Accounting, invoicing, and time tracking.", isNew: true, color: "text-blue-500 bg-blue-50/80" },
    { name: "GitHub API", desc: "Manage repos, issues, and pull requests.", color: "text-neutral-800 bg-neutral-100/80" },
    { name: "Slack Bot", desc: "Post as a branded bot in your Slack workspace.", color: "text-purple-600 bg-purple-50/80" },
    { name: "Notion", desc: "Organize and sync knowledge or project data.", color: "text-neutral-800 bg-neutral-100/80" },
    { name: "HubSpot", desc: "Sync CRM data and automate marketing.", color: "text-orange-500 bg-orange-50/80" },
    { name: "Google Slides", desc: "Generate and manage presentations.", color: "text-yellow-500 bg-yellow-50/80" },
    { name: "Slack User", desc: "Send messages and manage Slack as a user.", color: "text-purple-600 bg-purple-50/80" },
    { name: "TikTok", desc: "Track your profile stats and browse your videos.", color: "text-black bg-neutral-100/80" },
    { name: "Wix", desc: "Access Wix site data and business tools.", color: "text-black bg-neutral-100/80" },
    { name: "Google BigQuery", desc: "Query and sync analytics data.", color: "text-blue-500 bg-blue-50/80" },
    { name: "Discord", desc: "Notify channels and integrate with your Discord community.", color: "text-indigo-500 bg-indigo-50/80" },
    { name: "Dropbox", desc: "Store and sync files in the cloud.", color: "text-blue-500 bg-blue-50/80" },
    { name: "ClickUp", desc: "Organize projects and track team work.", color: "text-purple-500 bg-purple-50/80" },
    { name: "Google Search Console", desc: "SEO and search analytics.", color: "text-green-500 bg-green-50/80" },
    { name: "Salesforce", desc: "Automate and sync CRM records.", color: "text-blue-400 bg-blue-50/80" },
    { name: "Box", desc: "Secure cloud content management.", color: "text-blue-500 bg-blue-50/80" },
    { name: "Airtable", desc: "Flexible databases and spreadsheets.", color: "text-yellow-500 bg-yellow-50/80" },
    { name: "Splitwise", desc: "Expense splitting and group bills.", color: "text-green-500 bg-green-50/80" },
    { name: "Google Classroom", desc: "Education and course management.", color: "text-green-600 bg-green-50/80" },
    { name: "Wrike", desc: "Project planning and team coordination.", color: "text-green-500 bg-green-50/80" },
    { name: "Linear", desc: "Issue tracking and project management.", color: "text-indigo-500 bg-indigo-50/80" },
    { name: "Microsoft Teams", desc: "Team chat, channels, and meetings.", color: "text-indigo-600 bg-indigo-50/80" },
    { name: "SharePoint", desc: "Document management and collaboration.", color: "text-teal-600 bg-teal-50/80" },
    { name: "OneDrive", desc: "Cloud file storage.", color: "text-blue-500 bg-blue-50/80" },
    { name: "Typeform", desc: "Forms, surveys, and data collection.", color: "text-black bg-neutral-100/80" },
    { name: "GitLab", desc: "Manage projects, MRs, and CI/CD pipelines.", color: "text-orange-500 bg-orange-50/80" },
    { name: "Jira", desc: "Track issues and project work.", isNew: true, color: "text-blue-600 bg-blue-50/80" },
    { name: "Todoist", desc: "Plan tasks and projects.", isNew: true, color: "text-red-500 bg-red-50/80" },
    { name: "BambooHR", desc: "Employee directory and HR management.", color: "text-green-500 bg-green-50/80" },
    { name: "Google Tasks", desc: "Manage to-do lists and tasks.", color: "text-blue-500 bg-blue-50/80" },
    { name: "Google Meet", desc: "Video conferences and meetings.", color: "text-green-600 bg-green-50/80" }
];

export function ConnectorsComponent() {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredConnectors = CONNECTORS.filter((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            {/* 1. Liquid Glass Trigger Button with Enhanced Hover Effect */}
            <button
                onClick={() => setIsOpen(true)}
                className={cn(
                    "flex items-center justify-center h-9 w-9 rounded-xl transition-all duration-300 cursor-pointer outline-none",
                    "bg-white/30 dark:bg-black/30 backdrop-blur-xl backdrop-saturate-150",
                    "border border-white/40 dark:border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]",
                    // Added better hover effects here (glow and slight lift)
                    "hover:bg-white/50 dark:hover:bg-black/50 hover:shadow-[0_8px_16px_rgba(0,0,0,0.08)] hover:scale-[1.05] active:scale-[0.95]"
                )}
                aria-label="Open Connectors"
            >
                <Plug className="w-[18px] h-[18px] text-black/70 dark:text-white/70" strokeWidth={2.2} />
            </button>

            {/* 2. Modal Dialog */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/20 dark:bg-black/40 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.96, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96, y: 15 }}
                            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                            // --- LIQUID GLASS EFFECT APPLIED TO MODAL ---
                            className={cn(
                                "w-full max-w-[760px] rounded-[24px] flex flex-col overflow-hidden max-h-[85vh]",
                                "bg-white/70 dark:bg-neutral-900/70 backdrop-blur-3xl backdrop-saturate-200",
                                "border border-white/60 dark:border-white/10",
                                "shadow-[0_24px_60px_rgba(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,0.6)]"
                            )}
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-black/5 dark:border-white/5">
                                <div>
                                    <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">Connectors</h2>
                                    <p className="text-[14px] text-neutral-600 dark:text-neutral-400 mt-1">
                                        Connect tools and data sources to power your app.{" "}
                                        <a href="#" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
                                            Learn more about connectors
                                        </a>
                                    </p>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1.5 text-neutral-500 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors outline-none"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Toolbar */}
                            <div className="px-6 py-4 flex items-center gap-4">
                                <div className="relative flex-1 group">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 transition-colors group-focus-within:text-blue-500" />
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        // Liquid Glass Input
                                        className={cn(
                                            "w-full pl-9 pr-4 py-2 rounded-xl text-[14px] transition-all outline-none",
                                            "bg-white/50 dark:bg-black/20 backdrop-blur-md border border-white/40 dark:border-white/10",
                                            "placeholder:text-neutral-500 text-neutral-900 dark:text-white",
                                            "focus:bg-white/80 dark:focus:bg-black/40 focus:border-blue-400/50 focus:ring-4 focus:ring-blue-500/10 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
                                        )}
                                    />
                                </div>
                                <button
                                    className={cn(
                                        "flex items-center gap-2 px-3 py-2 rounded-xl text-[14px] font-medium transition-all outline-none",
                                        "bg-white/50 dark:bg-black/20 backdrop-blur-md border border-white/40 dark:border-white/10",
                                        "text-neutral-700 dark:text-neutral-200 hover:bg-white/80 dark:hover:bg-white/10 shadow-sm"
                                    )}
                                >
                                    <ArrowDownUp className="w-3.5 h-3.5 opacity-60" />
                                    Most popular
                                    <ChevronDown className="w-4 h-4 opacity-60" />
                                </button>
                            </div>

                            {/* 3. Connectors Grid */}
                            <div className="flex-1 overflow-y-auto px-6 pb-6 pt-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-black/10 [&::-webkit-scrollbar-thumb]:rounded-full">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                                    {filteredConnectors.map((connector, idx) => (
                                        <div
                                            key={idx}
                                            // Liquid Glass Connector Cards
                                            className={cn(
                                                "group flex items-center gap-3.5 p-3 rounded-2xl transition-all duration-300 cursor-pointer relative overflow-hidden",
                                                "bg-white/40 dark:bg-white/5 backdrop-blur-md border border-white/50 dark:border-white/10",
                                                "hover:bg-white/70 dark:hover:bg-white/10 hover:border-white/80 dark:hover:border-white/20 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
                                            )}
                                        >
                                            {/* Logo Wrapper */}
                                            <div className={cn(
                                                "w-[42px] h-[42px] rounded-[14px] flex items-center justify-center text-lg font-bold shrink-0 shadow-sm transition-transform group-hover:scale-105",
                                                connector.color,
                                                "border border-white/60 dark:border-white/10 backdrop-blur-md"
                                            )}>
                                                {connector.name.charAt(0)}
                                            </div>

                                            {/* Text Content */}
                                            <div className="flex-1 min-w-0 pr-10">
                                                <div className="flex items-center gap-2">
                                                    <h3 className="text-[14px] font-medium text-neutral-900 dark:text-white truncate">
                                                        {connector.name}
                                                    </h3>
                                                    {connector.isNew && (
                                                        <span className="px-1.5 py-0.5 rounded-md bg-white/60 dark:bg-white/10 border border-white/60 dark:border-white/5 text-[10px] font-semibold text-neutral-600 dark:text-neutral-300 leading-none shadow-sm backdrop-blur-md">
                                                            New
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-[13px] text-neutral-600 dark:text-neutral-400 mt-0.5 truncate">
                                                    {connector.desc}
                                                </p>
                                            </div>

                                            {/* + Button (Appears on Hover) - Liquid Glass styled */}
                                            <button className={cn(
                                                "absolute right-3 opacity-0 group-hover:opacity-100 transition-all duration-300",
                                                "w-7 h-7 rounded-lg flex items-center justify-center outline-none",
                                                "bg-white/80 dark:bg-white/20 backdrop-blur-xl border border-white dark:border-white/10 shadow-sm",
                                                "text-neutral-700 dark:text-white hover:scale-110 hover:bg-white dark:hover:bg-white/30"
                                            )}>
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                {filteredConnectors.length === 0 && (
                                    <div className="text-center py-12 text-neutral-500 dark:text-neutral-400 text-sm">
                                        No connectors found matching "{searchQuery}"
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}