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

    return (
        <AnimatePresence>
            {!isTransitioning && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                    transition={{ duration: 0.8, ease: [0.87, 0, 0.13, 1] }}
                    // Yahan se "flex items-center" hata diya hai taaki absolute layers theek se kaam karein
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
                        <source src="/Loading.mp4" type="video/mp4" />
                    </video>

                    {/* LAYER 2: CORNERS (No Blend Mode needed here, just normal text) */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none uppercase tracking-widest font-mono text-[10px] md:text-xs text-white/60">
                        {/* Top Corners */}
                        <div className="flex justify-between w-full">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full border border-white/40 animate-ping" />
                                <span>Sverkos Workspace</span>
                            </div>
                            <div className="flex gap-4">
                                <span>2026 - Beyond</span>
                            </div>
                        </div>

                        {/* Bottom Corners */}
                        <div className="flex justify-between w-full items-end">
                            <div className="font-bold text-white">
                                System Load
                            </div>
                            <div>01 - 99</div>
                        </div>
                    </div>

                    {/* LAYER 3: CENTER ANIMATION (Blend Mode Applied Here!) */}
                    <div 
                        className="absolute inset-0 flex flex-col items-center justify-center gap-6 pointer-events-none"
                        style={{ mixBlendMode: 'difference', color: 'white' }}
                    >
                        <LiquidText
                            text="SVERKOS"
                            progress={displayProgress}
                            className={`${playfair.className}`}
                        />
                        
                        {/* The Fast Counter */}
                        <div className="font-mono tracking-widest text-xs drop-shadow-md px-4 py-1.5 rounded-full border border-white/40">
                            {displayProgress}%
                        </div>
                    </div>

                </motion.div>
            )}
        </AnimatePresence>
    );
}