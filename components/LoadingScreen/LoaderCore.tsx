'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Playfair_Display } from 'next/font/google';
import { LiquidText } from './LiquidText';

const playfair = Playfair_Display({
    subsets: ['latin'],
    weight: ['400', '600', '700'],
    display: 'swap',
});

interface LoaderCoreProps {
    progress?: number;
    isTransitioning?: boolean;
}

export function LoaderCore({ progress = 0, isTransitioning = false }: LoaderCoreProps) {
    const [displayProgress, setDisplayProgress] = useState(0);
    const trackingRef = useRef(0);
    const targetRef = useRef(progress);

    useEffect(() => {
        targetRef.current = progress;
    }, [progress]);

    useEffect(() => {
        let frameId: number;
        const animate = () => {
            trackingRef.current += (targetRef.current - trackingRef.current) * 0.1;
            const rounded = Math.round(trackingRef.current);
            setDisplayProgress((prev) => (prev !== rounded ? rounded : prev));
            frameId = requestAnimationFrame(animate);
        };
        frameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frameId);
    }, []);

    // Dynamic text logic based on progress
    const getLoadingText = (prog: number) => {
        if (prog < 30) return "Establishing Connection...";
        if (prog < 70) return "Loading Core Assets...";
        if (prog < 99) return "Rendering Interface...";
        return "System Ready";
    };

    return (
        <AnimatePresence>
            {!isTransitioning && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                    transition={{ duration: 0.8, ease: [0.87, 0, 0.13, 1] }}
                    className="fixed inset-0 z-[9999] bg-black text-white overflow-hidden"
                >
                    {/* LAYER 1: HIGHEST QUALITY VIDEO */}
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    >
                        <source src="/Physics.mp4" type="video/mp4" />
                    </video>

                    {/* LAYER 2: CORNERS */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none uppercase tracking-widest font-mono text-[10px] md:text-xs text-white/60">
                        <div className="flex justify-between w-full">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full border border-white/40 animate-ping" />
                                <span>Sverkos Workspace</span>
                            </div>
                            <div className="flex gap-4">
                                <span>2026 - Beyond</span>
                            </div>
                        </div>
                        <div className="flex justify-between w-full items-end">
                            <div className="font-bold text-white">System Load</div>
                            <div>01 - 99</div>
                        </div>
                    </div>

                    {/* LAYER 3: CENTER ANIMATION WITH ADVANCED PROGRESS BAR */}
                    <div 
                        className="absolute inset-0 flex flex-col items-center justify-center gap-8 pointer-events-none"
                        style={{ mixBlendMode: 'difference', color: 'white' }}
                    >
                        <LiquidText
                            text="SVERKOS"
                            progress={displayProgress}
                            className={`${playfair.className}`}
                        />
                        
                        {/* THE ADVANCED PROGRESS UI */}
                        <div className="w-64 md:w-80 flex flex-col gap-3 opacity-90">
                            <div className="flex justify-between items-center font-mono text-[9px] md:text-[10px] tracking-[0.2em] uppercase">
                                <span className="animate-pulse">{getLoadingText(displayProgress)}</span>
                                {/* Pad start ensures it always shows 3 digits like '042%' */}
                                <span>{displayProgress.toString().padStart(3, '0')}%</span>
                            </div>
                            
                            {/* Sleek Line Progress Bar */}
                            <div className="h-[2px] w-full bg-white/20 overflow-hidden relative rounded-full">
                                <motion.div 
                                    className="absolute top-0 left-0 h-full bg-white"
                                    initial={{ width: '0%' }}
                                    animate={{ width: `${displayProgress}%` }}
                                    transition={{ ease: "easeOut", duration: 0.2 }}
                                />
                            </div>
                        </div>
                    </div>

                </motion.div>
            )}
        </AnimatePresence>
    );
}