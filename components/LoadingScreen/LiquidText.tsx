'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LiquidTextProps {
    text?: string;
    progress?: number;
    className?: string;
}

// 4 possible axes and directions from which the text can flip in
const DIRECTIONS = ['up', 'down', 'left', 'right'];

export function LiquidText({ text = 'SVERKOS', className = '' }: LiquidTextProps) {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState('up');

    // Sequence controller: every 500ms, change both letter and direction
    useEffect(() => {
        if (!text) return;

        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % text.length);
            // On every new letter, pick a random direction
            setDirection(DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)]);
        }, 500);

        return () => clearInterval(interval);
    }, [text]);

    // Framer Motion dynamic variants
    const letterVariants = {
        initial: (dir: string) => {
            switch (dir) {
                case 'up': return { rotateX: 90, y: 30, opacity: 0, filter: 'blur(8px)', scale: 0.8 };
                case 'down': return { rotateX: -90, y: -30, opacity: 0, filter: 'blur(8px)', scale: 0.8 };
                case 'left': return { rotateY: -90, x: -30, opacity: 0, filter: 'blur(8px)', scale: 0.8 };
                case 'right': return { rotateY: 90, x: 30, opacity: 0, filter: 'blur(8px)', scale: 0.8 };
                default: return { rotateX: 90, y: 30, opacity: 0 };
            }
        },
        animate: {
            rotateX: 0,
            rotateY: 0,
            x: 0,
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            scale: 1,
            transition: {
                type: 'spring',
                stiffness: 120,
                damping: 14,
                mass: 0.8
            }
        },
        exit: (dir: string) => {
            switch (dir) {
                case 'up': return { rotateX: -90, y: -30, opacity: 0, filter: 'blur(8px)', scale: 0.8 };
                case 'down': return { rotateX: 90, y: 30, opacity: 0, filter: 'blur(8px)', scale: 0.8 };
                case 'left': return { rotateY: 90, x: 30, opacity: 0, filter: 'blur(8px)', scale: 0.8 };
                case 'right': return { rotateY: -90, x: -30, opacity: 0, filter: 'blur(8px)', scale: 0.8 };
                default: return { rotateX: -90, y: -30, opacity: 0 };
            }
        }
    };

    return (
        <div
            className={`relative flex items-center justify-center ${className}`}
            style={{ perspective: '1200px' }} // Preserves 3D depth
        >
            {/* Invisible placeholder: prevents layout jumping */}
            <span
                className="invisible pointer-events-none select-none"
                style={{
                    fontFamily: 'Impact, "Arial Black", sans-serif',
                    fontWeight: 900
                }}
            >
                W {/* Uses a wide letter to ensure the container remains large enough */}
            </span>

            <AnimatePresence mode="popLayout" custom={direction}>
                <motion.div
                    key={index}
                    custom={direction} // Passes current direction to variant
                    variants={letterVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute flex items-center justify-center uppercase"
                    style={{
                        transformStyle: 'preserve-3d',

                        // ---------------------------------------------------
                        // INVERTED BACKGROUND UI STYLING
                        // ---------------------------------------------------
                        // 1. Solid white color for text
                        color: 'white',

                        // 2. This property inverts the background colors behind the text
                        mixBlendMode: 'difference',

                        // 3. Thick, blocky font matching the SR video
                        fontFamily: 'Impact, "Arial Black", sans-serif',
                        fontWeight: 900,
                    }}
                >
                    {text[index]}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}