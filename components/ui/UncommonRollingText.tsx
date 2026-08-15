"use client";

import React, { useEffect, useRef } from "react";
import { motion, useAnimation, Variants } from "framer-motion";

interface UncommonRollingTextProps {
    /** The text to animate */
    text: string;
    /** Additional Tailwind classes for the wrapper */
    className?: string;
    /** Duration of the roll animation in seconds */
    duration?: number;
    /** Delay between each character in seconds */
    staggerDelay?: number;
    /** Delay between the top half and bottom half moving */
    sliceDelay?: number;
    /** How long to wait before looping the animation again */
    loopPause?: number;
}

export const UncommonRollingText: React.FC<UncommonRollingTextProps> = ({
    text,
    className = "",
    duration = 1.2,
    staggerDelay = 0.03,
    sliceDelay = 0.1,
    loopPause = 2.5,
}) => {
    const controls = useAnimation();
    const isPlaying = useRef(true);

    // Split text into words, then characters, preserving spaces
    const words = text.split(" ");
    let globalCharIndex = 0;

    useEffect(() => {
        isPlaying.current = true;
        let timeout: NodeJS.Timeout;

        const startAnimationLoop = async () => {
            while (isPlaying.current) {
                // Wait for the pause duration
                await new Promise((resolve) => {
                    timeout = setTimeout(resolve, loopPause * 1000);
                });

                if (!isPlaying.current) break;

                // Trigger the animation
                await controls.start("animate");

                if (!isPlaying.current) break;

                // Instantly reset to the starting position secretly
                controls.set("initial");
            }
        };

        startAnimationLoop();

        return () => {
            isPlaying.current = false;
            clearTimeout(timeout);
            controls.stop();
        };
    }, [controls, loopPause]);

    // Custom cubic-bezier for a sharp, modern snap effect
    const ease = [0.25, 1, 0.3, 1];

    const topVariants: Variants = {
        initial: { y: "0%", x: "0%" },
        animate: (i: number) => ({
            y: "-100%",
            // Shifts right during the roll, then snaps back to center
            x: ["0%", "15%", "0%"],
            transition: { duration, ease, delay: i * staggerDelay },
        }),
    };

    const bottomVariants: Variants = {
        initial: { y: "0%", x: "0%" },
        animate: (i: number) => ({
            y: "-100%",
            // Shifts left during the roll, then snaps back to center
            x: ["0%", "-15%", "0%"],
            transition: {
                duration,
                ease,
                delay: i * staggerDelay + sliceDelay,
            },
        }),
    };

    return (
        <div
            className={`flex flex-wrap justify-center leading-[0.85] text-white font-black tracking-tighter uppercase text-7xl md:text-8xl lg:text-9xl ${className}`}
            aria-label={text}
        >
            {words.map((word, wordIdx) => (
                <span key={`word-${wordIdx}`} className="inline-flex overflow-hidden">
                    {word.split("").map((char) => {
                        const currentIndex = globalCharIndex++;
                        return (
                            <span key={`char-${currentIndex}`} className="relative inline-block">
                                {/* Invisible structural element to maintain document flow width/height */}
                                <span className="invisible opacity-0">{char}</span>

                                {/* TOP HALF MASK */}
                                <span
                                    className="absolute inset-0 z-10"
                                    style={{ clipPath: "inset(0 0 50% 0)" }}
                                >
                                    <motion.span
                                        className="absolute inset-0 flex flex-col"
                                        custom={currentIndex}
                                        variants={topVariants}
                                        initial="initial"
                                        animate={controls}
                                    >
                                        <span>{char}</span>
                                        <span>{char}</span>
                                    </motion.span>
                                </span>

                                {/* BOTTOM HALF MASK */}
                                <span
                                    className="absolute inset-0 z-0"
                                    style={{ clipPath: "inset(50% 0 0 0)" }}
                                >
                                    <motion.span
                                        className="absolute inset-0 flex flex-col"
                                        custom={currentIndex}
                                        variants={bottomVariants}
                                        initial="initial"
                                        animate={controls}
                                    >
                                        <span>{char}</span>
                                        <span>{char}</span>
                                    </motion.span>
                                </span>
                            </span>
                        );
                    })}
                    {/* Preserve natural spacing between words */}
                    {wordIdx !== words.length - 1 && (
                        <span className="inline-block w-[0.25em]" />
                    )}
                </span>
            ))}
        </div>
    );
};