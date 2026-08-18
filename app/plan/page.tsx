"use client";

import type { Metadata } from 'next';
import { motion } from "framer-motion";
import { ReactLenis } from "lenis/react";
import { Sidebar } from "@/components/Sidebar/sidebar";
import { AI_Prompt } from "@/components/Chatbox/plan/animated-ai-input";
import { BottomSection } from "@/components/pages/plan/BottomSection";
import { ScrollButtons } from "@/components/ui/scroll-buttons";

export const metadata: Metadata = {
    title: 'Plan AI',
  };

export default function PlanPage() {
    return (
        <div className="flex h-screen w-full overflow-hidden bg-black text-white">
            <Sidebar />

            <main className="relative flex-1 flex flex-col overflow-hidden transition-all duration-300">
                <video
                    src="https://github.com/NipunKachwaha/Sverkos-Assets/releases/download/v1.0/Gold.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
                />

                <ReactLenis
                    className="relative z-10 flex-1 overflow-y-auto w-full h-full flex flex-col"
                    options={{ lerp: 0.08, smoothWheel: true }}
                >
                    {/* Top Section */}
                    <section className="shrink-0 px-5 pt-28 pb-32">
                        <motion.div
                            initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{ duration: 0.55, ease: "easeOut" }}
                            className="mx-auto flex w-full max-w-[980px] flex-col items-center"
                        >
                            <div className="w-full max-w-[920px] h-full min-h-[300px] mt-6">
                                <AI_Prompt />
                            </div>

                            <p className="mt-8 text-center text-[15px] text-gray-300 font-medium">
                                Want an agent that works on its own?{" "}
                                <a
                                    className="font-semibold text-blue-400 underline underline-offset-2 hover:text-red-400 transition-colors"
                                    href="/superagents"
                                >
                                    Create Superagent
                                </a>
                            </p>
                        </motion.div>
                    </section>

                    {/* Bottom Section */}
                    <div className="flex flex-col flex-1">
                        <div className="mt-5 mb-10" />
                        <BottomSection />
                    </div>
                </ReactLenis>
            </main>
            <ScrollButtons />
        </div>
    );
}