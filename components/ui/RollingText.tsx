"use client";

import React, { useMemo } from 'react';
import { motion, Variants } from 'framer-motion';

// --- TYPES ---
interface RollingTextProps {
    /** The paragraph or sentence to be animated */
    text: string;
    /** Standard Tailwind classes for typography styling */
    className?: string;
    /** Delay between each word animating in (seconds) */
    staggerDelay?: number;
    /** Optional boolean to trigger animation only once (default: true) */
    playOnce?: boolean;
}

// --- COMPONENT ---
const RollingText = React.memo(({
    text,
    className = "",
    staggerDelay = 0.03,
    playOnce = true
}: RollingTextProps) => {

    // Memoize the string splitting so it doesn't recalculate on re-renders
    const words = useMemo(() => text.split(" "), [text]);

    // Animation Configurations
    const containerVariants: Variants = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: staggerDelay,
                delayChildren: 0.1, // Slight pause before animation starts
            }
        }
    };

    const wordVariants: Variants = {
        hidden: {
            y: "110%", // Pushed down outside the clipping mask
            opacity: 0,
            rotateX: -45, // Adds a 3D "rolling" effect
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
        // The container manages the viewport triggering and staggering
        <motion.p
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: playOnce, margin: "-20px" }}
            className={`flex flex-wrap ${className}`}
            aria-label={text} // Screen readers read the full text seamlessly
        >
            {words.map((word, i) => (
                // Overflow-hidden mask ensures the text "rolls" out from nowhere
                <span
                    key={`word-${i}`}
                    className="inline-flex overflow-hidden mr-[0.25em] pb-1"
                >
                    <motion.span
                        variants={wordVariants}
                        className="inline-block origin-bottom"
                        aria-hidden="true" // Hides broken-up words from screen readers
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </motion.p>
    );
});

RollingText.displayName = 'RollingText';
export default RollingText;