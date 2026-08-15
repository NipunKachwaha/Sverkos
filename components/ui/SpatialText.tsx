"use client";

import React, { useEffect, useMemo, useRef } from 'react';
import { motion, useAnimation, useReducedMotion, Variants } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Utility function to merge Tailwind classes safely */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface SpatialRollingTextProps {
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

export const SpatialRollingText: React.FC<SpatialRollingTextProps> = ({
    text,
    className,
    staggerDelay = 0.05,
    sliceOffset = 0.12,
    duration = 0.9,
    pauseDuration = 3,
}) => {
    const controls = useAnimation();
    const shouldReduceMotion = useReducedMotion();
    const isAnimating = useRef(true);

    if (!text) return null;

    const wordData = useMemo(() => {
        const words = text.split(" ");
        let globalCharIndex = 0;

        return words.map(word => {
            const chars = word.split("").map(char => ({
                char,
                globalIndex: globalCharIndex++
            }));
            globalCharIndex++;
            return chars;
        });
    }, [text]);

    useEffect(() => {
        if (shouldReduceMotion) return;

        isAnimating.current = true;
        let timeoutId: NodeJS.Timeout;

        const runAnimation = async () => {
            while (isAnimating.current) {
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

        return () => {
            isAnimating.current = false;
            clearTimeout(timeoutId);
            controls.stop();
        };
    }, [controls, pauseDuration, shouldReduceMotion]);

    // === THE 3D SPATIAL FOLD ANIMATION ===
    // A buttery-smooth, premium UI/UX easing curve
    const easeCurve = [0.22, 1, 0.36, 1];

    const topVariants: Variants = {
        initial: { y: "0%", rotateX: "0deg", scale: 1 },
        animate: (i: number) => ({
            y: "-100%",
            // Folds backward like a hinge, then snaps down flat
            rotateX: ["0deg", "75deg", "0deg"],
            // Gentle pop to emphasize the fold
            scale: [1, 1.08, 1],
            transition: { duration, ease: easeCurve, delay: i * staggerDelay }
        })
    };

    const bottomVariants: Variants = {
        initial: { y: "0%", rotateX: "0deg", scale: 1 },
        animate: (i: number) => ({
            y: "-100%",
            // Folds forward like a hinge, then snaps up flat
            rotateX: ["0deg", "-75deg", "0deg"],
            scale: [1, 1.08, 1],
            transition: { duration, ease: easeCurve, delay: i * staggerDelay + sliceOffset }
        })
    };

    return (
        <div
            className={cn(
                "flex flex-wrap leading-none",
                "text-5xl md:text-7xl font-bold uppercase tracking-tighter text-white",
                className
            )}
            aria-label={text}
            // Perspective is critical here to make the rotateX actually look 3D
            style={{ perspective: "800px" }}
        >
            {wordData.map((word, wordIdx) => (
                <span key={`word-${wordIdx}`} className="inline-flex">
                    {word.map((item) => (
                        <SpatialCharacter
                            key={`char-${item.globalIndex}`}
                            char={item.char}
                            globalIndex={item.globalIndex}
                            controls={controls}
                            topVariants={topVariants}
                            bottomVariants={bottomVariants}
                            shouldReduceMotion={shouldReduceMotion}
                        />
                    ))}

                    {wordIdx !== wordData.length - 1 && (
                        <span className="inline-block w-[0.25em]" />
                    )}
                </span>
            ))}
        </div>
    );
};

// --- SUB-COMPONENTS ---

interface SpatialCharacterProps {
    char: string;
    globalIndex: number;
    controls: any;
    topVariants: Variants;
    bottomVariants: Variants;
    shouldReduceMotion: boolean | null;
}

const SpatialCharacter: React.FC<SpatialCharacterProps> = React.memo(({
    char,
    globalIndex,
    controls,
    topVariants,
    bottomVariants,
    shouldReduceMotion
}) => {
    if (shouldReduceMotion) {
        return <span className="relative inline-block">{char}</span>;
    }

    return (
        <span className="relative inline-block" aria-hidden="true" style={{ transformStyle: "preserve-3d" }}>
            <span className="opacity-0">{char}</span>

            {/* Top Half */}
            <span className="absolute inset-0 z-10" style={{ clipPath: 'inset(0 0 50% 0)' }}>
                <motion.span
                    // origin-bottom is crucial so the hinge happens right at the cut line
                    className="absolute inset-0 origin-bottom"
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
            <span className="absolute inset-0 z-0" style={{ clipPath: 'inset(50% 0 0 0)' }}>
                <motion.span
                    // origin-top is crucial so the hinge happens right at the cut line
                    className="absolute inset-0 origin-top"
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

SpatialCharacter.displayName = "SpatialCharacter";