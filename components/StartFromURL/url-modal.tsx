"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/Chatbox/button";
import { Globe, Layers, Palette, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface UrlModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function UrlModal({ isOpen, onClose }: UrlModalProps) {
    const [selected, setSelected] = useState<"content" | "design">("content");

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            {/* AnimatePresence for smooth exit */}
            <AnimatePresence>
                {isOpen && (
                    <DialogContent 
                        // Remove default radix styling slightly to allow framer motion to takeover scale
                        className="p-0 border-none bg-transparent shadow-none sm:max-w-[500px]"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            transition={{
                                type: "spring",
                                damping: 25,
                                stiffness: 300,
                            }}
                            className={cn(
                                "w-full p-6 rounded-3xl border transition-all duration-300",
                                // Liquid Glass Base Style
                                "bg-white/70 dark:bg-neutral-950/70 backdrop-blur-2xl backdrop-saturate-150",
                                "border-white/40 dark:border-white/10",
                                "shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.2)]"
                            )}
                        >
                            {/* Header Section */}
                            <DialogHeader className="space-y-1">
                                <DialogTitle className="flex items-center gap-2 text-xl font-bold text-black dark:text-white">
                                    <Globe className="w-5 h-5 text-blue-500 dark:text-blue-400 animate-pulse" /> 
                                    Start from URL
                                </DialogTitle>
                                <p className="text-sm text-black/60 dark:text-white/60 font-medium">
                                    Use any website as a starting point for your new site.
                                </p>
                            </DialogHeader>

                            {/* Body Content */}
                            <div className="py-4 space-y-5">
                                {/* Input Field */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-black/60 dark:text-white/60">
                                        Website URL
                                    </label>
                                    <Input 
                                        placeholder="e.g., www.example.com" 
                                        className={cn(
                                            "h-12 rounded-xl border px-4 transition-all duration-300 text-sm",
                                            "bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-black dark:text-white",
                                            "placeholder:text-black/40 dark:placeholder:text-white/40",
                                            "focus-visible:ring-2 focus-visible:ring-blue-500/30 dark:focus-visible:ring-blue-400/30 focus-visible:border-blue-500"
                                        )}
                                    />
                                </div>

                                {/* Mode Cards Grid */}
                                <div className="grid grid-cols-2 gap-3.5">
                                    {/* Option 1: Content & Design */}
                                    <div 
                                        onClick={() => setSelected("content")}
                                        className={cn(
                                            "p-4 border rounded-2xl cursor-pointer transition-all duration-300 relative flex flex-col justify-between overflow-hidden",
                                            "bg-white/20 dark:bg-white/5",
                                            "hover:scale-[1.02] active:scale-[0.98]",
                                            selected === "content" 
                                                ? "border-blue-500 dark:border-blue-400 bg-white/40 dark:bg-white/10 shadow-lg shadow-blue-500/5" 
                                                : "border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20"
                                        )}
                                    >
                                        <div>
                                            <Layers className={cn(
                                                "w-5 h-5 mb-2.5 transition-colors",
                                                selected === "content" ? "text-blue-500 dark:text-blue-400" : "text-black/60 dark:text-white/60"
                                            )} />
                                            <h4 className="font-bold text-sm text-black dark:text-white">Content & Design</h4>
                                            <p className="text-[11px] text-black/50 dark:text-white/50 mt-0.5 leading-normal">Build a similar site.</p>
                                        </div>
                                        {selected === "content" && (
                                            <CheckCircle2 className="absolute top-3 right-3 w-4 h-4 text-blue-500 dark:text-blue-400" />
                                        )}
                                    </div>

                                    {/* Option 2: Design Only */}
                                    <div 
                                        onClick={() => setSelected("design")}
                                        className={cn(
                                            "p-4 border rounded-2xl cursor-pointer transition-all duration-300 relative flex flex-col justify-between overflow-hidden",
                                            "bg-white/20 dark:bg-white/5",
                                            "hover:scale-[1.02] active:scale-[0.98]",
                                            selected === "design" 
                                                ? "border-blue-500 dark:border-blue-400 bg-white/40 dark:bg-white/10 shadow-lg shadow-blue-500/5" 
                                                : "border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20"
                                        )}
                                    >
                                        <div>
                                            <Palette className={cn(
                                                "w-5 h-5 mb-2.5 transition-colors",
                                                selected === "design" ? "text-blue-500 dark:text-blue-400" : "text-black/60 dark:text-white/60"
                                            )} />
                                            <h4 className="font-bold text-sm text-black dark:text-white">Design only</h4>
                                            <p className="text-[11px] text-black/50 dark:text-white/50 mt-0.5 leading-normal">Create a new site in the same style.</p>
                                        </div>
                                        {selected === "design" && (
                                            <CheckCircle2 className="absolute top-3 right-3 w-4 h-4 text-blue-500 dark:text-blue-400" />
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Footer Buttons with Glass Styling */}
                            <DialogFooter className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                                <button className="text-xs font-semibold text-blue-500 dark:text-blue-400 hover:underline transition-all self-start sm:self-center">
                                    Learn about creating from a URL
                                </button>
                                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                                    <Button 
                                        variant="ghost" 
                                        onClick={onClose}
                                        className="h-10 px-4 rounded-xl text-xs font-bold border border-transparent hover:bg-black/5 dark:hover:bg-white/5 text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white"
                                    >
                                        Cancel
                                    </Button>
                                    <Button 
                                        className={cn(
                                            "h-10 px-5 rounded-xl text-xs font-bold transition-all duration-300",
                                            "bg-black dark:bg-white text-white dark:text-black",
                                            "hover:scale-[1.03] active:scale-[0.97] hover:opacity-90"
                                        )}
                                    >
                                        Add
                                    </Button>
                                </div>
                            </DialogFooter>
                            
                            {/* Warning Footer Notice */}
                            <div className="mt-5 pt-3.5 border-t border-black/10 dark:border-white/10 flex items-start gap-2 text-[11px] text-black/50 dark:text-white/40 font-medium leading-normal">
                                <span className="text-amber-500 dark:text-amber-400 shrink-0 text-xs">⚠️</span> 
                                <span>Only use URLs where you have rights to the content.</span>
                            </div>
                        </motion.div>
                    </DialogContent>
                )}
            </AnimatePresence>
        </Dialog>
    );
}