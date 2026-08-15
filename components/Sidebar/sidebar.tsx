"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ReactLenis } from "lenis/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import {
    Search, ChevronsUpDown, AppWindow, Bot, Home,
    LayoutGrid, LayoutTemplate, Plug, Rocket, Handshake,
    ChevronRight, Gem, MessageSquareText, Languages, Gift, Bell, Star,
    LogOut, Settings, PlusCircle, User, Check, ExternalLink,
    PanelLeft, Loader2, FileCode2, Briefcase, MessageSquare,
    Megaphone, MoreHorizontal, Trash2, Edit2, Users, Info, HelpCircle, MessageCircleHeart, Key,
    Hammer,
    Calendar, Brain,
    MessageSquareCheck,
    MessageSquareCodeIcon,
    MessageSquareDashed,
    MessageSquareDashedIcon,
    MessageSquareDiff,
} from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuPortal,
    DropdownMenuSubContent
} from "@/components/Chatbox/dropdown-menu";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReferralModal } from "@/components/referral/ReferralModal";
import FeedbackCard from "@/components/Feedback/FeedbackCard";
import NotificationCard from "@/components/Notification/NotificationCard";
import TransitionLink from "@/components/LoadingScreen/TransitionLink"; 

// ========== language Selector Hook ==========
import { useLanguage } from "@/hooks/useLanguage";
// ======================================
import { useLoading } from "@/providers/LoadingProvider";

// --- NEW INTERFACE FOR PROJECTS ---
interface Project {
    id: string;
    name: string;
    status: string;
    updatedAt: string;
}

export function Sidebar({ className }: { className?: string }) {
    const router = useRouter();
    const pathname = usePathname();
    const { user, isLoaded } = useUser();
    const searchParams = useSearchParams();
    const currentProjectId = searchParams.get("id");
    const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
    const [isProjectsOpen, setIsProjectsOpen] = useState(true);
    const [isPartnersOpen, setIsPartnersOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isReferralOpen, setIsReferralOpen] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const [showNotification, setShowNotification] = useState(false);

    // --- API STATE FOR PROJECTS ---
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { startLoading } = useLoading();

    // --- FETCH PROJECTS API LOGIC ---
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch("/api/projects");
                if (res.ok) {
                    const data = await res.json();
                    setProjects(data);
                }
            } catch (err) {
                console.error("Failed to fetch projects");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProjects();

        const handleProjectSaved = () => {
            fetchProjects();
        };

        window.addEventListener("projectSaved", handleProjectSaved);

        return () => {
            window.removeEventListener("projectSaved", handleProjectSaved);
        };
    }, [pathname]);

    // --- RENAME HANDLER ---
    const handleRename = async (projectId: string, currentName: string) => {
        const newName = window.prompt("Enter new project name:", currentName);
        if (!newName || newName === currentName) return;

        try {
            const res = await fetch(`/api/projects/${projectId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: newName }),
            });
            if (res.ok) {
                window.dispatchEvent(new Event("projectSaved"));
            }
        } catch (error) {
            console.error("Failed to rename", error);
        }
    };

    // --- DELETE HANDLER ---
    const handleDelete = async (projectId: string) => {
        if (!window.confirm("Are you sure you want to delete this project? This cannot be undone.")) return;

        try {
            const res = await fetch(`/api/projects/${projectId}`, { method: "DELETE" });
            if (res.ok) {
                window.dispatchEvent(new Event("projectSaved"));
                if (pathname === '/build' && new URLSearchParams(window.location.search).get('id') === projectId) {
                    startLoading();
                    router.push('/build');
                }
            }
        } catch (error) {
            console.error("Failed to delete", error);
        }
    };

    const PublicSvgIcon = ({ src, className, ...props }) => {
        return (
            <div
                className={cn("bg-current inline-block", className)}
                style={{
                    WebkitMask: `url(${src}) no-repeat center / contain`,
                    mask: `url(${src}) no-repeat center / contain`,
                }}
                {...props}
            />
        );
    };

    const primaryNav = [
        {
            name: "Build",
            icon: (props) => <PublicSvgIcon src="/icons/build.png" {...props} />,
            href: "/build"
        },
        {
            name: "Discuss",
            icon: (props) => <PublicSvgIcon src="/icons/dashcube.svg" {...props} />,
            href: "/ai/discuss"
        },
        {
            name: "Plan",
            icon: (props) => <PublicSvgIcon src="/icons/plan2.png" {...props} />,
            href: "/plan"
        },
        {
            name: "Agents",
            icon: (props) => <PublicSvgIcon src="/icons/ai.png" {...props} />,
            href: "/ai/agents"
        },
    ];

    const secondaryNav = [
        { name: "Home", icon: Home, href: "/" },
        { name: "All apps", icon: LayoutGrid, href: "/apps" },
        { name: "Templates", icon: LayoutTemplate, href: "/templates" },
        { name: "Integrations", icon: Plug, href: "/integrations" },
        { name: "Launchpad", icon: Rocket, href: "/launchpad" }
    ];

    const { selectedCode, setLanguage } = useLanguage();

    const softSurface = "bg-white border border-neutral-200 shadow-sm";
    const softHover = "hover:bg-neutral-50 hover:border-neutral-300 transition-all duration-200 ease-in-out";
    const softDropdown = "bg-white border border-neutral-200 shadow-lg text-black";
    const softActive = "bg-neutral-100 text-black font-semibold shadow-sm";
    const softNavIdle = "text-black/80 hover:bg-neutral-50 hover:text-black font-medium";
    const softIconButton = "hover:bg-neutral-100 hover:text-black";

    return (
        <TooltipProvider>
            <Tooltip>
                {/* ===== NOTIFICATION BACKDROP ===== */}
                <AnimatePresence>
                    {showNotification && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setShowNotification(false)}
                            className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-[2px]"
                        />
                    )}
                </AnimatePresence>

                {/* ===== NOTIFICATION CARD CENTERED ===== */}
                <div className="fixed inset-0 z-[70] flex items-center justify-center pointer-events-none">
                    <div className="pointer-events-auto">
                        <NotificationCard
                            isOpen={showNotification}
                            onClose={() => setShowNotification(false)}
                        />
                    </div>
                </div>

                <aside className={cn(
                    "flex flex-col h-screen py-4 select-none transition-[width,padding] duration-300 ease-in-out relative z-50",
                    "bg-white border-r border-neutral-200 text-black",
                    isCollapsed ? "w-[58px] px-2" : "w-[260px] px-3",
                    className
                )}>
                    {/* 1. Header (Smart Logo & Toggle Logic) */}
                    <div className={cn("flex items-center transition-all duration-300", isCollapsed ? "mb-6 justify-center" : "mb-4 justify-between px-1")}>
                        <div className="flex items-center gap-2">
                            <AnimatePresence mode="wait">
                                {isCollapsed ? (
                                    <motion.button
                                        key="collapsed-logo"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        onClick={() => setIsCollapsed(false)}
                                        className="relative w-8 h-8 flex items-center justify-center rounded-lg hover:bg-neutral-100 transition-all group"
                                    >
                                        <Image
                                            src="/sverkoslogo-removebg.png"
                                            alt="Sverkos Logo"
                                            width={24}
                                            height={24}
                                            className="object-contain brightness-0 opacity-80 group-hover:hidden transition-all"
                                        />
                                        <PanelLeft className="w-4 h-4 hidden group-hover:block text-black" />
                                    </motion.button>
                                ) : (
                                    <motion.div
                                        key="expanded-logo"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="relative w-32 h-8 flex items-center justify-center"
                                    >
                                        <div className="flex items-center p-0 m-0 gap-0 space-x-0">
                                            <Image
                                                src="/sverkoslogo-removebg.png"
                                                alt="Sverkos Logo"
                                                width={24}
                                                height={24}
                                                className="object-contain brightness-0 opacity-80 m-0 p-0"
                                                priority
                                            />
                                            <Image
                                                src="/sverkosnamed-logo-removebg.png"
                                                alt="Sverkos Named Logo"
                                                width={190}
                                                height={168}
                                                className="object-contain brightness-0 opacity-80 m-0 p-0 -mt-1.5"
                                                priority
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {!isCollapsed && (
                            <div className="flex items-center gap-1 text-black/70">
                                <Tooltip delayDuration={0}>
                                    <TooltipTrigger asChild>
                                        <button type="button" suppressHydrationWarning className={cn("outline-none flex items-center justify-center w-8 h-8 rounded-lg transition-colors", softIconButton)}>
                                            <Search className="w-4 h-4" />
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent className={softDropdown}>Search</TooltipContent>
                                </Tooltip>

                                <Tooltip delayDuration={0}>
                                    <TooltipTrigger asChild>
                                        <button onClick={() => setIsCollapsed(true)} className={cn("outline-none flex items-center justify-center w-8 h-8 rounded-lg transition-colors", softIconButton)}>
                                            <PanelLeft className="w-4 h-4" />
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent className={softDropdown}>Collapse</TooltipContent>
                                </Tooltip>
                            </div>
                        )}
                    </div>

                    {/* 3. Main Navigation Group */}
                    <div className={cn(
                        "mb-4 transition-all",
                        isCollapsed
                            ? "flex flex-col items-center gap-1.5 p-1 rounded-[16px] border border-neutral-200 bg-white mx-auto shadow-sm w-fit overflow-hidden"
                            : "grid grid-cols-2 gap-1 rounded-xl p-1 bg-white border border-neutral-200 shadow-sm"
                    )}>
                        {primaryNav.map((item) => {
                            const isActive = pathname === item.href;
                            const linkContent = (
                                <TransitionLink href={item.href} onClick={() => startLoading()} className={cn(
                                    "flex items-center transition-all duration-200 group w-full",
                                    isCollapsed
                                        ? "justify-center w-8 h-8 mx-auto rounded-[10px]"
                                        : "justify-center gap-1.5 py-1.5 px-2 rounded-lg",
                                    isActive
                                        ? "bg-[#F4EFEA] text-black font-semibold shadow-sm"
                                        : "text-black/80 hover:bg-neutral-50 hover:text-black font-medium"
                                )}>
                                    <item.icon
                                        className={cn(
                                            "shrink-0 w-4 h-4 transition-colors",
                                            isActive ? "text-[#FF6B00]" : "text-black group-hover:text-black"
                                        )}
                                        strokeWidth={isActive ? 2.5 : 2}
                                    />
                                    {!isCollapsed && <span className="text-xs truncate">{item.name === "Superagents" ? "Agents" : item.name}</span>}
                                </TransitionLink>
                            );

                            if (isCollapsed) {
                                return (
                                    <Tooltip key={item.name} delayDuration={0}>
                                        <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                                        <TooltipContent side="right" sideOffset={14} className={cn("font-semibold text-xs rounded-lg", softDropdown)}>{item.name}</TooltipContent>
                                    </Tooltip>
                                );
                            }

                            return <React.Fragment key={item.name}>{linkContent}</React.Fragment>;
                        })}
                    </div>

                    <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar pb-2">
                        {/* 4. Secondary Navigation */}
                        <nav className="flex flex-col gap-1 mb-4">
                            {secondaryNav.map((item) => {
                                const isActive = pathname === item.href;
                                const linkContent = (
                                    <TransitionLink href={item.href} className={cn(
                                        "flex items-center transition-all duration-200",
                                        isCollapsed ? "justify-center w-9 h-9 mx-auto rounded-xl" : "w-full gap-3 px-3 py-2 rounded-lg",
                                        isActive
                                            ? softActive
                                            : softNavIdle
                                    )}>
                                        <item.icon className="shrink-0 w-4 h-4" strokeWidth={isActive ? 2.5 : 2} />
                                        {!isCollapsed && <span className="text-sm truncate">{item.name}</span>}
                                    </TransitionLink>
                                );

                                if (isCollapsed) {
                                    return (
                                        <Tooltip key={item.name} delayDuration={0}>
                                            <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                                            <TooltipContent side="right" sideOffset={14} className={cn("font-semibold text-xs rounded-lg", softDropdown)}>{item.name}</TooltipContent>
                                        </Tooltip>
                                    );
                                }

                                return <React.Fragment key={item.name}>{linkContent}</React.Fragment>;
                            })}

                            {/* --- PARTNERS SECTION --- */}
                            {isCollapsed ? (
                                <Tooltip delayDuration={0}>
                                    <TooltipTrigger asChild>
                                        <button
                                            onClick={() => {
                                                setIsCollapsed(false);
                                                setIsPartnersOpen(true);
                                            }}
                                            className={cn(
                                                "flex items-center justify-center w-9 h-9 mx-auto rounded-xl transition-all duration-200 outline-none",
                                                pathname.startsWith("/partners") ? softActive : softNavIdle
                                            )}
                                        >
                                            <Briefcase className="w-4 h-4" strokeWidth={pathname.startsWith("/partners") ? 2.5 : 2} />
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent side="right" sideOffset={14} className={cn("font-semibold text-xs rounded-lg", softDropdown)}>
                                        Partners
                                    </TooltipContent>
                                </Tooltip>
                            ) : (
                                <div className="flex flex-col">
                                    <button
                                        onClick={() => setIsPartnersOpen(!isPartnersOpen)}
                                        className={cn(
                                            "flex items-center justify-between w-full px-3 py-2 rounded-lg group transition-colors",
                                            softNavIdle
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Briefcase className="w-4 h-4 shrink-0" strokeWidth={pathname.startsWith("/partners") ? 2.5 : 2} />
                                            <span className="text-sm">Partners</span>
                                        </div>
                                        <motion.div animate={{ rotate: isPartnersOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
                                            <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                                        </motion.div>
                                    </button>

                                    <AnimatePresence>
                                        {isPartnersOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="ml-5 pl-3 py-1 my-1 space-y-1 border-l border-neutral-200">
                                                    <TransitionLink
                                                        href="/partners/messages"
                                                        onClick={() => startLoading()}
                                                        className={cn(
                                                            "w-full text-left px-3 py-1.5 rounded-lg text-sm flex items-center gap-2.5 transition-colors",
                                                            pathname === "/partners/messages" ? softActive : "text-black/70 hover:bg-neutral-100 hover:text-black"
                                                        )}
                                                    >
                                                        <MessageSquareText className="w-4 h-4 shrink-0" />
                                                        <span className="truncate">Messages</span>
                                                    </TransitionLink>
                                                    <TransitionLink
                                                        href="/partners"
                                                        className={cn(
                                                            "w-full text-left px-3 py-1.5 rounded-lg text-sm flex items-center gap-2.5 transition-colors",
                                                            pathname === "/partners" ? softActive : "text-black/70 hover:bg-neutral-100 hover:text-black"
                                                        )}
                                                    >
                                                        <Handshake className="w-4 h-4 shrink-0" />
                                                        <span className="truncate">Hire a partner</span>
                                                    </TransitionLink>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            )}
                        </nav>

                        {/* --- RECENT PROJECTS SECTION --- */}
                        {!isCollapsed && (
                            <div className="flex flex-col mb-1">
                                <button
                                    onClick={() => setIsProjectsOpen(!isProjectsOpen)}
                                    className="flex items-center justify-between w-full px-3 py-2 text-black/60 hover:text-black transition-colors group rounded-lg hover:bg-neutral-50"
                                >
                                    <span className="text-sm font-medium">Recent projects</span>
                                    <motion.div animate={{ rotate: isProjectsOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
                                        <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                                    </motion.div>
                                </button>

                                <AnimatePresence>
                                    {isProjectsOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-2 py-1 mt-1 space-y-1">
                                                {isLoading ? (
                                                    <div className="flex justify-center py-4">
                                                        <Loader2 className="w-4 h-4 text-black/40 animate-spin" />
                                                    </div>
                                                ) : projects.length === 0 ? (
                                                    <div className="flex items-center gap-3 px-3 py-2 text-xs font-medium text-black/50 border border-dashed border-neutral-200 rounded-lg bg-neutral-50/50">
                                                        <span className="truncate">No projects yet</span>
                                                    </div>
                                                ) : (
                                                    projects.map((project) => {
                                                        const isActive = pathname === `/build` && currentProjectId === project.id;

                                                        return (
                                                            <div key={project.id} className={cn(
                                                                "group relative flex items-center justify-between w-full rounded-lg transition-colors",
                                                                isActive ? softActive : "hover:bg-neutral-50 text-black/70 hover:text-black"
                                                            )}>
                                                                <button
                                                                    onClick={() => { startLoading(); router.push(`/build?id=${project.id}`); }}
                                                                    className="flex items-center gap-3 px-3 py-2 flex-1 overflow-hidden outline-none"
                                                                >
                                                                    <FileCode2 className="w-4 h-4 shrink-0 opacity-70" />
                                                                    <div className="truncate flex-1 text-left">
                                                                        <p className="truncate text-xs font-medium">{project.name}</p>
                                                                    </div>
                                                                </button>
                                                                <DropdownMenu>
                                                                    <DropdownMenuTrigger asChild>
                                                                        <button className="opacity-0 group-hover:opacity-100 p-1.5 mr-1 rounded-md hover:bg-neutral-200 transition-all outline-none">
                                                                            <MoreHorizontal className="w-3.5 h-3.5" />
                                                                        </button>
                                                                    </DropdownMenuTrigger>
                                                                    <DropdownMenuContent align="end" className="w-32 rounded-lg shadow-md border-neutral-200 bg-white">
                                                                        <DropdownMenuItem
                                                                            onClick={() => handleRename(project.id, project.name)}
                                                                            className="cursor-pointer text-xs flex items-center gap-2 hover:bg-neutral-50 text-black"
                                                                        >
                                                                            <Edit2 className="w-3.5 h-3.5" /> Rename
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuSeparator className="bg-neutral-100" />
                                                                        <DropdownMenuItem
                                                                            onClick={() => handleDelete(project.id)}
                                                                            className="cursor-pointer text-xs flex items-center gap-2 text-red-600 hover:bg-red-50 hover:text-red-700"
                                                                        >
                                                                            <Trash2 className="w-3.5 h-3.5" /> Delete
                                                                        </DropdownMenuItem>
                                                                    </DropdownMenuContent>
                                                                </DropdownMenu>
                                                            </div>
                                                        );
                                                    })
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}

                        {/* 5. Favorite Apps Expandable Dropdown */}
                        {!isCollapsed && (
                            <div className="flex flex-col mb-2">
                                <button
                                    onClick={() => setIsFavoritesOpen(!isFavoritesOpen)}
                                    className="flex items-center justify-between w-full px-3 py-2 text-black/60 hover:text-black transition-colors group rounded-lg hover:bg-neutral-50"
                                >
                                    <span className="text-sm font-medium">Favorite apps</span>
                                    <motion.div animate={{ rotate: isFavoritesOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
                                        <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                                    </motion.div>
                                </button>

                                <AnimatePresence>
                                    {isFavoritesOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-3 py-2 mt-1">
                                                <div className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-black/60 border border-dashed border-neutral-300 rounded-lg bg-neutral-50">
                                                    <Star className="w-4 h-4 opacity-50 shrink-0" />
                                                    <span className="truncate">No favorites yet</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>

                    {/* 6. Upgrade Card */}
                    {isCollapsed ? (
                        <Tooltip delayDuration={0}>
                            <TooltipTrigger asChild>
                                <div className={cn(
                                    "flex items-center justify-center w-9 h-9 rounded-xl mx-auto mb-6 cursor-pointer shadow-sm hover:shadow-md group shrink-0",
                                    "bg-white border border-neutral-200 hover:border-neutral-300 transition-all"
                                )}>
                                    <Gem className="text-orange-500 group-hover:scale-110 transition-transform shrink-0 w-4 h-4" />
                                </div>
                            </TooltipTrigger>
                            <TooltipContent side="right" sideOffset={14} className={cn("font-semibold text-xs rounded-lg", softDropdown)}>Upgrade Plan</TooltipContent>
                        </Tooltip>
                    ) : (
                        <div className={cn(
                            "flex items-center justify-between p-3 mb-4 rounded-xl cursor-pointer transition-all group shrink-0",
                            "bg-white border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 hover:shadow-md shadow-sm"
                        )}>
                            <div className="flex flex-col truncate pr-2">
                                <span className="text-sm font-bold text-black group-hover:text-black transition-colors">Upgrade your plan</span>
                                <span className="text-xs text-black/55 mt-0.5 truncate">Get more out of your apps</span>
                            </div>
                            <Gem className="text-orange-500 group-hover:scale-110 transition-transform shrink-0 w-5 h-5" />
                        </div>
                    )}

                    {/* 7. Footer Actions & Workspace Card */}
                    <div className={cn(
                        "flex transition-all",
                        isCollapsed ? "flex-col-reverse items-center gap-5 pt-2 pb-2 border-transparent" : "items-center justify-between px-1 pt-2 pb-1 border-t border-neutral-200"
                    )}>

                        {/* Workspace Selector Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className={cn(
                                    "flex items-center outline-none shrink-0 transition-all group",
                                    isCollapsed
                                        ? "justify-center mx-auto rounded-xl"
                                        : "justify-between w-full max-w-[185px] p-1.5 rounded-xl hover:bg-neutral-100"
                                )}>
                                    <div className="flex items-center gap-2 overflow-hidden">
                                        <div className={cn(
                                            "bg-[#FDF0E6] text-black flex items-center justify-center font-bold shrink-0",
                                            isCollapsed ? "w-8 h-8 text-[11px] rounded-lg" : "w-8 h-8 text-[11px] rounded-md border border-[#FDF0E6]"
                                        )}>
                                            NW
                                        </div>
                                        {!isCollapsed && <span className="text-sm font-semibold text-black truncate">Nipun's Workspace</span>}
                                    </div>
                                    {!isCollapsed && <ChevronsUpDown className="w-4 h-4 text-black/45 group-hover:text-black transition-colors shrink-0 ml-1" />}
                                </button>
                            </DropdownMenuTrigger>
                            <TooltipContent
                                side={isCollapsed ? "right" : "top"}
                                sideOffset={10}
                                className={cn("font-semibold text-xs rounded-lg", softDropdown)}
                            >
                                Workspace
                            </TooltipContent>
                            <DropdownMenuContent side={isCollapsed ? "right" : "top"} align={isCollapsed ? "end" : "start"} sideOffset={12} className={cn("w-[300px] p-0 rounded-xl overflow-hidden shadow-xl", softDropdown)}>

                                {/* Dropdown Header */}
                                <div className="flex items-center gap-3 p-4 border-b border-neutral-100 bg-white">
                                    <div className="w-10 h-10 rounded-lg bg-[#FDF0E6] text-black flex items-center justify-center font-bold text-sm shrink-0">NW</div>
                                    <div className="flex flex-col flex-1 overflow-hidden">
                                        <span className="text-sm font-semibold text-black truncate">Nipun's Workspace</span>
                                        <span className="text-xs text-black/60 truncate">1 member · Free plan</span>
                                    </div>
                                    <ChevronsUpDown className="w-4 h-4 shrink-0 text-black/40" />
                                </div>

                                <div className="p-3 max-h-[60vh] overflow-y-auto no-scrollbar">
                                    {/* Credits Box */}
                                    <div className="bg-[#F9F9F9] rounded-lg p-3.5 mb-4 border border-neutral-100">
                                        <div className="flex items-center gap-1.5 mb-0.5">
                                            <span className="text-sm font-medium">Credits</span>
                                            <Info className="w-3.5 h-3.5 text-black/50" />
                                        </div>
                                        <p className="text-[11px] text-black/50 mb-4">Renews at Aug 1, 2026 | 12:00 AM UTC</p>

                                        <div className="space-y-3.5">
                                            <div>
                                                <div className="flex justify-between text-xs mb-1.5">
                                                    <span className="text-black/80 font-medium">Message credits</span>
                                                    <span className="text-black/60">4/25</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-neutral-200 rounded-full overflow-hidden">
                                                    <div className="h-full bg-[#FF6B00] rounded-full" style={{ width: '16%' }}></div>
                                                </div>
                                            </div>
                                            <div className="border-t border-neutral-200/60 pt-3">
                                                <div className="flex justify-between text-xs mb-1.5">
                                                    <span className="text-black/80 font-medium">Daily limit</span>
                                                    <span className="text-black/60">0/5</span>
                                                </div>
                                            </div>
                                            <div className="border-t border-neutral-200/60 pt-3">
                                                <div className="flex justify-between text-xs mb-1.5">
                                                    <span className="text-black/80 font-medium">Integration credits</span>
                                                    <span className="text-black/60">0/100</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-neutral-200 rounded-full overflow-hidden">
                                                    <div className="h-full bg-neutral-300 rounded-full" style={{ width: '0%' }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <button className="w-full py-2 mb-4 rounded-lg border border-[#FF6B00] text-[#FF6B00] text-sm font-medium hover:bg-[#FFF6F0] active:bg-[#FFE5D1] transition-colors">
                                        Upgrade your plan
                                    </button>

                                    <DropdownMenuSeparator className="bg-neutral-100 mb-2" />

                                    {/* Workspace Section */}
                                    <div className="mb-2">
                                        <p className="text-[11px] text-black/50 font-medium mb-1 px-2 uppercase tracking-wide">Workspace</p>
                                        <DropdownMenuItem className="cursor-pointer rounded-lg text-black hover:bg-neutral-100 focus:bg-neutral-100 data-[highlighted]:bg-neutral-100 active:bg-neutral-200 outline-none transition-colors px-2 py-2 flex items-center gap-3 font-medium">
                                            <Users className="w-4 h-4 text-black/70" /> Add members
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="cursor-pointer rounded-lg text-black hover:bg-neutral-100 focus:bg-neutral-100 data-[highlighted]:bg-neutral-100 active:bg-neutral-200 outline-none transition-colors px-2 py-2 flex items-center gap-3 font-medium">
                                            <Settings className="w-4 h-4 text-black/70" /> Settings
                                        </DropdownMenuItem>
                                    </div>

                                    <DropdownMenuSeparator className="bg-neutral-100 mb-2" />

                                    {/* User & Action Section */}
                                    <div>
                                        <p className="text-xs text-black/50 mb-2 px-2 truncate">
                                            {!isLoaded ? "Loading..." : user?.primaryEmailAddress?.emailAddress}
                                        </p>
                                        <DropdownMenuItem className="cursor-pointer rounded-lg text-black hover:bg-neutral-100 focus:bg-neutral-100 data-[highlighted]:bg-neutral-100 active:bg-neutral-200 outline-none transition-colors px-2 py-2 flex items-center gap-3 font-medium">
                                            {user?.hasImage ? (
                                                <Image
                                                    src={user.imageUrl}
                                                    alt="Profile"
                                                    width={20}
                                                    height={20}
                                                    className="rounded-full"
                                                />
                                            ) : (
                                                <div className="w-5 h-5 rounded-full bg-pink-500 text-white flex items-center justify-center text-[10px] font-bold">
                                                    {user?.firstName?.charAt(0) || user?.primaryEmailAddress?.emailAddress?.charAt(0)?.toUpperCase() || "U"}
                                                </div>
                                            )}
                                            View profile
                                        </DropdownMenuItem>

                                        <DropdownMenuItem className="cursor-pointer rounded-lg text-black hover:bg-neutral-100 focus:bg-neutral-100 data-[highlighted]:bg-neutral-100 active:bg-neutral-200 outline-none transition-colors px-2 py-2 flex items-center gap-3 font-medium">
                                            <Megaphone className="w-4 h-4 text-black/70" /> Become an affiliate
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setIsReferralOpen(true)} className="cursor-pointer rounded-lg text-black hover:bg-neutral-100 focus:bg-neutral-100 data-[highlighted]:bg-neutral-100 active:bg-neutral-200 outline-none transition-colors px-2 py-2 flex items-center gap-3 font-medium">
                                            <Gift className="w-4 h-4 text-black/70" /> Refer a friend
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => { startLoading(); router.push('/api-setup'); }} className="cursor-pointer rounded-lg text-black hover:bg-neutral-100 focus:bg-neutral-100 data-[highlighted]:bg-neutral-100 active:bg-neutral-200 outline-none transition-colors px-2 py-2 flex items-center gap-3 font-medium">
                                            <Key className="w-4 h-4 text-black/70" /> Insert Your API Key
                                        </DropdownMenuItem>

                                        {/* Sub-menu for Language */}
                                        <DropdownMenuSub>
                                            <DropdownMenuSubTrigger className="cursor-pointer rounded-lg text-black hover:bg-neutral-100 focus:bg-neutral-100 data-[highlighted]:bg-neutral-100 active:bg-neutral-200 outline-none transition-colors px-2 py-2 flex items-center justify-between font-medium">
                                                <div className="flex items-center gap-3"><Languages className="w-4 h-4 text-black/70" /> Language</div>
                                            </DropdownMenuSubTrigger>
                                            <DropdownMenuPortal>
                                                <DropdownMenuSubContent className="w-[180px] rounded-xl bg-white border border-neutral-200 shadow-lg p-1.5" sideOffset={8}>
                                                    {[
                                                        { code: "en", label: "English" },
                                                        { code: "hi", label: "हिन्दी" },
                                                        { code: "ja", label: "日本語" },
                                                        { code: "de", label: "Deutsch" },
                                                        { code: "es", label: "Español" },
                                                        { code: "fr", label: "Français" },
                                                        { code: "pt", label: "Português" },
                                                        { code: "zh", label: "中文" },
                                                        { code: "ar", label: "العربية" },
                                                        { code: "ko", label: "한국어" },
                                                        { code: "ru", label: "Русский" },
                                                        { code: "it", label: "Italiano" },
                                                    ].map((lang) => (
                                                        <DropdownMenuItem
                                                            key={lang.code}
                                                            onClick={() => setLanguage(lang.code)}
                                                            className="cursor-pointer rounded-lg px-3 py-2 flex items-center justify-between text-sm font-medium hover:bg-neutral-100 focus:bg-neutral-100 data-[highlighted]:bg-neutral-100 active:bg-neutral-200 outline-none transition-colors text-black"
                                                        >
                                                            {lang.label}
                                                            {selectedCode === lang.code && <Check className="w-4 h-4 text-black" />}
                                                        </DropdownMenuItem>
                                                    ))}
                                                </DropdownMenuSubContent>
                                            </DropdownMenuPortal>
                                        </DropdownMenuSub>

                                        {/* Sub-menu for Help & Support */}
                                        <DropdownMenuSub>
                                            <DropdownMenuSubTrigger className="cursor-pointer rounded-lg text-black hover:bg-neutral-100 focus:bg-neutral-100 data-[highlighted]:bg-neutral-100 active:bg-neutral-200 outline-none transition-colors px-2 py-2 flex items-center justify-between font-medium">
                                                <div className="flex items-center gap-3"><HelpCircle className="w-4 h-4 text-black/70" /> Help & support</div>
                                            </DropdownMenuSubTrigger>
                                            <DropdownMenuPortal>
                                                <DropdownMenuSubContent className="w-[200px] rounded-xl bg-white border border-neutral-200 shadow-lg p-1.5" sideOffset={8}>
                                                    <DropdownMenuItem className="cursor-pointer rounded-lg px-3 py-2 flex items-center gap-3 text-sm font-medium hover:bg-neutral-100 focus:bg-neutral-100 data-[highlighted]:bg-neutral-100 active:bg-neutral-200 outline-none transition-colors text-black">
                                                        <ExternalLink className="w-4 h-4 text-black/70" /> Documentation
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="cursor-pointer rounded-lg px-3 py-2 flex items-center gap-3 text-sm font-medium hover:bg-neutral-100 focus:bg-neutral-100 data-[highlighted]:bg-neutral-100 active:bg-neutral-200 outline-none transition-colors text-black">
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black/70">
                                                            <path d="M7 11v-1a5 5 0 0 1 10 0v1" />
                                                            <rect x="4" y="11" width="16" height="10" rx="2" />
                                                        </svg>
                                                        Discord community
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="cursor-pointer rounded-lg px-3 py-2 flex items-center gap-3 text-sm font-medium hover:bg-neutral-100 focus:bg-neutral-100 data-[highlighted]:bg-neutral-100 active:bg-neutral-200 outline-none transition-colors text-black">
                                                        <HelpCircle className="w-4 h-4 text-black/70" /> Support
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => setShowFeedback(true)} className="cursor-pointer rounded-lg px-3 py-2 flex items-center gap-3 text-sm font-medium hover:bg-neutral-100 focus:bg-neutral-100 data-[highlighted]:bg-neutral-100 active:bg-neutral-200 outline-none transition-colors text-black">
                                                        <MessageCircleHeart className="w-4 h-4 text-black/70" /> Feedback
                                                    </DropdownMenuItem>
                                                </DropdownMenuSubContent>
                                            </DropdownMenuPortal>
                                        </DropdownMenuSub>

                                        <DropdownMenuItem className="cursor-pointer rounded-lg text-black hover:bg-neutral-100 focus:bg-neutral-100 data-[highlighted]:bg-neutral-100 active:bg-neutral-200 outline-none transition-colors px-2 py-2 flex items-center gap-3 mt-1 font-medium">
                                            <LogOut className="w-4 h-4 text-black/70" /> Log out
                                        </DropdownMenuItem>
                                    </div>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Footer Icons Group */}
                        <div className={cn("flex text-black/80 transition-all", isCollapsed ? "flex-col items-center gap-4" : "items-center gap-1 pr-1")}>

                            {/* Notification (Bell) Only */}
                            <Tooltip delayDuration={0}>
                                <TooltipTrigger asChild>
                                    <button
                                        type="button"
                                        onClick={() => setShowNotification(true)}
                                        className="relative outline-none flex p-1.5 rounded-md hover:bg-neutral-100 transition-all"
                                    >
                                        <Bell className="transition-colors w-4 h-4" />
                                        <span
                                            className={cn(
                                                "absolute bg-red-500 rounded-full border border-white",
                                                isCollapsed
                                                    ? "top-1 right-1 w-2 h-2"
                                                    : "top-1 right-1 w-2 h-2"
                                            )}
                                        />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent
                                    side={isCollapsed ? "right" : "top"}
                                    sideOffset={10}
                                    className={cn("font-semibold text-xs rounded-lg", softDropdown)}
                                >
                                    Notifications
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </div>
                </aside>

                <ReferralModal
                    isOpen={isReferralOpen}
                    onClose={() => setIsReferralOpen(false)}
                />
                <FeedbackCard
                    isOpen={showFeedback}
                    onClose={() => setShowFeedback(false)}
                />
            </Tooltip>
        </TooltipProvider>
    );
}