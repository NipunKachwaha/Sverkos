"use client";

import React, { useMemo } from 'react';
import { motion, Variants } from 'framer-motion';

interface CharRollingTextProps {
    text: string;
    className?: string;
    staggerDelay?: number;
    playOnce?: boolean;
}

const CharRollingText = React.memo(({
    text,
    className = "",
    staggerDelay = 0.03,
    playOnce = true
}: CharRollingTextProps) => {

    const words = useMemo(() => text.split(" "), [text]);

    const containerVariants: Variants = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: staggerDelay,
                delayChildren: 0.1,
            }
        }
    };

    const charVariants: Variants = {
        hidden: {
            y: "110%",
            opacity: 0,
            rotateX: -45,
        },
        show: {
            y: "0%",
            opacity: 1,
            rotateX: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 150
            }
        }
    };

    return (
        <motion.p
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: playOnce, margin: "-20px" }}
            className={`flex flex-wrap ${className}`}
            aria-label={text}
        >
            {words.map((word, wordIndex) => (
                <span
                    key={`word-${wordIndex}`}
                    className="inline-flex overflow-hidden mr-[0.25em] pb-1"
                >
                    {word.split("").map((char, charIndex) => (
                        <motion.span
                            key={`char-${wordIndex}-${charIndex}`}
                            variants={charVariants}
                            className="inline-block origin-bottom"
                            aria-hidden="true"
                        >
                            {char}
                        </motion.span>
                    ))}
                </span>
            ))}
        </motion.p>
    );
});

CharRollingText.displayName = 'CharRollingText';
export default CharRollingText;