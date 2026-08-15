'use client'

import React, { useEffect, useMemo, useRef } from 'react';
import { motion, useAnimation, useReducedMotion, Variants } from 'framer-motion';

interface UncommonBlurTextProps {
    /** The text to be animated */
    text: string;
    /** Standard Tailwind classes for typography styling */
    className?: string;
    /** Duration of the continuous roll animation in seconds */
    duration?: number;
    /** Delay between each consecutive character starting the roll */
    staggerDelay?: number;
    /** The time gap between the top half and bottom half moving */
    sliceDelay?: number;
    /** Pause duration between animation loops (in seconds) */
    loopPause?: number;
}

export default function UncommonBlurText({
    text,
    className = '',
    duration = 1.2,
    staggerDelay = 0.03,
    sliceDelay = 0.1,
    loopPause = 3,
}: UncommonBlurTextProps) {
    const controls = useAnimation();
    const shouldReduceMotion = useReducedMotion();
    const isPlaying = useRef(true);

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

        isPlaying.current = true;
        let timeoutId: NodeJS.Timeout;

        const startAnimationLoop = async () => {
            await new Promise((resolve) => {
                timeoutId = setTimeout(resolve, 2500); 
            });

            while (isPlaying.current) {
                if (!isPlaying.current) break;
                await controls.start("animate");

                if (!isPlaying.current) break;
                controls.set("initial");

                await new Promise((resolve) => {
                    timeoutId = setTimeout(resolve, loopPause * 1000);
                });
            }
        };

        startAnimationLoop();

        return () => {
            isPlaying.current = false;
            clearTimeout(timeoutId);
            controls.stop();
        };
    }, [controls, loopPause, shouldReduceMotion]);

    const ease = [0.25, 1, 0.3, 1];

    // FIX 1: We animate to -140% instead of -100%. This accounts for the new vertical safe zone.
    const topVariants: Variants = {
        initial: { y: "0%", x: "0%" },
        animate: (i: number) => ({
            y: "-140%", 
            x: ["0%", "15%", "0%"], 
            transition: { duration, ease, delay: i * staggerDelay },
        }),
    };

    const bottomVariants: Variants = {
        initial: { y: "0%", x: "0%" },
        animate: (i: number) => ({
            y: "-140%", 
            x: ["0%", "-15%", "0%"], 
            transition: { duration, ease, delay: i * staggerDelay + sliceDelay },
        }),
    };

    return (
        <p className={`flex flex-wrap justify-center ${className}`} style={{ rowGap: '0.1em' }}>
            {wordData.map((wordChars, wordIdx) => (
                <motion.span
                    key={`word-${wordIdx}`}
                    initial={{ filter: 'blur(10px)', opacity: 0, y: 50 }}
                    whileInView={{
                        filter: ['blur(10px)', 'blur(5px)', 'blur(0px)'],
                        opacity: [0, 0.5, 1],
                        y: [50, -5, 0],
                    }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{
                        duration: 0.7,
                        times: [0, 0.5, 1],
                        ease: 'easeOut',
                        delay: wordIdx * 0.1, 
                    }}
                    // FIX 2: Removed all overflow-hidden and padding hacks. Let the words breathe naturally.
                    className="inline-flex" 
                    style={{ marginRight: '0.28em' }}
                >
                    {wordChars.map((item) => (
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
                </motion.span>
            ))}
        </p>
    );
}

// --- SUB-COMPONENTS ---

interface SlicedCharacterProps {
    char: string;
    globalIndex: number;
    controls: any;
    topVariants: Variants;
    bottomVariants: Variants;
    shouldReduceMotion: boolean | null;
}

const SlicedCharacter: React.FC<SlicedCharacterProps> = React.memo(({
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
        <span 
            className="relative inline-block" 
            aria-hidden="true"
            // FIX 3: The Master Mask. Allows 30% vertical bleed for ascenders/descenders, and INFINITE (-1000%) horizontal bleed for italic slants.
            style={{ 
                clipPath: 'inset(-30% -1000% -30% -1000%)',
                WebkitClipPath: 'inset(-30% -1000% -30% -1000%)' // Safari support
            }}
        >
            <span className="opacity-0">{char}</span>

            {/* Top Half */}
            <span 
                className="absolute inset-0 z-10" 
                // Cuts exactly at the 50% bottom line, but lets the top and sides bleed infinitely
                style={{ 
                    clipPath: 'inset(-30% -1000% 50% -1000%)',
                    WebkitClipPath: 'inset(-30% -1000% 50% -1000%)'
                }}
            >
                <motion.span
                    className="absolute inset-0"
                    custom={globalIndex}
                    variants={topVariants}
                    initial="initial"
                    animate={controls}
                >
                    <span className="absolute left-0" style={{ top: '0%' }}>{char}</span>
                    {/* FIX 4: Pushed the duplicated text to 140% to keep it safely hidden in the invisible zone before rolling */}
                    <span className="absolute left-0" style={{ top: '140%' }}>{char}</span>
                </motion.span>
            </span>

            {/* Bottom Half */}
            <span 
                className="absolute inset-0 z-0" 
                // Cuts exactly at the 50% top line, but lets the bottom and sides bleed infinitely
                style={{ 
                    clipPath: 'inset(50% -1000% -30% -1000%)',
                    WebkitClipPath: 'inset(50% -1000% -30% -1000%)'
                }}
            >
                <motion.span
                    className="absolute inset-0"
                    custom={globalIndex}
                    variants={bottomVariants}
                    initial="initial"
                    animate={controls}
                >
                    <span className="absolute left-0" style={{ top: '0%' }}>{char}</span>
                    <span className="absolute left-0" style={{ top: '140%' }}>{char}</span>
                </motion.span>
            </span>
        </span>
    );
});

SlicedCharacter.displayName = "SlicedCharacter";