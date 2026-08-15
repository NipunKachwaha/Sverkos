"use client";

import React, { useEffect, useMemo, useRef } from 'react';
import { motion, useAnimation, useReducedMotion, Variants } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Utility function to merge Tailwind classes safely */
function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface SlicedRollingTextProps {
    /** The text to be animated */
    text: string;
    /** Standard Tailwind classes for typography styling */
    className?: string;
    /** Delay between each consecutive character starting (in seconds) */
    staggerDelay?: number;
    /** The time gap between the top half and bottom half moving, creating the "slice" (in seconds) */
    sliceOffset?: number;
    /** Speed of the vertical roll (in seconds) */
    duration?: number;
    /** Pause duration between animation loops (in seconds) */
    pauseDuration?: number;
}

export const SlicedRollingText: React.FC<SlicedRollingTextProps> = ({
    text,
    className,
    staggerDelay = 0.04,
    sliceOffset = 0.1,
    duration = 0.8,
    pauseDuration = 3,
}) => {
    const controls = useAnimation();
    const shouldReduceMotion = useReducedMotion();
    const isAnimating = useRef(true);

    // Fail-safe for empty text
    if (!text) return null;

    // Memoize word grouping to prevent unnecessary recalculations on re-renders
    const wordData = useMemo(() => {
        const words = text.split(" ");
        let globalCharIndex = 0;

        return words.map(word => {
            const chars = word.split("").map(char => ({
                char,
                globalIndex: globalCharIndex++
            }));
            globalCharIndex++; // Account for the space character
            return chars;
        });
    }, [text]);

    // Robust animation orchestration with proper cleanup
    useEffect(() => {
        if (shouldReduceMotion) return; // Skip animation if user prefers reduced motion

        isAnimating.current = true;
        let timeoutId: NodeJS.Timeout;

        const runAnimation = async () => {
            while (isAnimating.current) {
                // Configurable pause instead of the hardcoded 3 seconds
                await new Promise(resolve => {
                    timeoutId = setTimeout(resolve, pauseDuration * 1000);
                });
                
                if (!isAnimating.current) break;
                
                await controls.start("animate");
                
                if (!isAnimating.current) break;
                
                controls.set("initial");
            }
        };

        runAnimation();

        // Strict cleanup to prevent memory leaks
        return () => {
            isAnimating.current = false;
            clearTimeout(timeoutId);
            controls.stop();
        };
    }, [controls, pauseDuration, shouldReduceMotion]);

    // Shared easing curve for consistent motion
    const easeCurve = [0.85, 0, 0.15, 1];

    const topVariants: Variants = {
        initial: { y: "0%" },
        animate: (i: number) => ({
            y: "-100%",
            transition: { duration, ease: easeCurve, delay: i * staggerDelay }
        })
    };

    const bottomVariants: Variants = {
        initial: { y: "0%" },
        animate: (i: number) => ({
            y: "-100%",
            transition: { duration, ease: easeCurve, delay: i * staggerDelay + sliceOffset }
        })
    };

    return (
        <div
            className={cn(
                "flex flex-wrap leading-none",
                "text-5xl md:text-7xl font-bold uppercase tracking-tighter text-white", // Default styles
                className
            )}
            aria-label={text}
        >
            {wordData.map((word, wordIdx) => (
                <span key={`word-${wordIdx}`} className="inline-flex">
                    {word.map((item) => (
                        <SlicedCharacter
                            key={`char-${item.globalIndex}`}
                            char={item.char}
                            globalIndex={item.globalIndex}
                            controls={controls}
                            topVariants={topVariants}
                            bottomVariants={bottomVariants}
                            shouldReduceMotion={shouldReduceMotion}
                        />
                    ))}

                    {/* Native spacing between words[cite: 1] */}
                    {wordIdx !== wordData.length - 1 && (
                        <span className="inline-block w-[0.25em]" />
                    )}
                </span>
            ))}
        </div>
    );
};

// --- SUB-COMPONENTS ---

interface SlicedCharacterProps {
    char: string;
    globalIndex: number;
    controls: any;
    topVariants: Variants;
    bottomVariants: Variants;
    shouldReduceMotion: boolean | null;
}

/** 
 * Modularized character component. 
 * Breaking this out improves readability and React's diffing performance.
 */
const SlicedCharacter: React.FC<SlicedCharacterProps> = React.memo(({
    char,
    globalIndex,
    controls,
    topVariants,
    bottomVariants,
    shouldReduceMotion
}) => {
    // If a11y settings request reduced motion, render standard static text
    if (shouldReduceMotion) {
        return <span className="relative inline-block">{char}</span>;
    }

    return (
        <span className="relative inline-block" aria-hidden="true">
            {/* Invisible base to maintain natural document flow[cite: 1] */}
            <span className="opacity-0">{char}</span>

            {/* Top Half */}
            <span className="absolute inset-0" style={{ clipPath: 'inset(0 0 50% 0)' }}>
                <motion.span
                    className="absolute inset-0"
                    custom={globalIndex}
                    variants={topVariants}
                    initial="initial"
                    animate={controls}
                >
                    <span className="absolute top-0 left-0">{char}</span>
                    <span className="absolute top-full left-0">{char}</span>
                </motion.span>
            </span>

            {/* Bottom Half */}
            <span className="absolute inset-0" style={{ clipPath: 'inset(50% 0 0 0)' }}>
                <motion.span
                    className="absolute inset-0"
                    custom={globalIndex}
                    variants={bottomVariants}
                    initial="initial"
                    animate={controls}
                >
                    <span className="absolute top-0 left-0">{char}</span>
                    <span className="absolute top-full left-0">{char}</span>
                </motion.span>
            </span>
        </span>
    );
});

SlicedCharacter.displayName = "SlicedCharacter";