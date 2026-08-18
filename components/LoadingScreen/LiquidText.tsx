'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface LiquidTextProps {
    text?: string;
    progress?: number;
    className?: string;
}

export function LiquidText({ text = 'SVERKOS', className = '' }: LiquidTextProps) {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1, 
                delayChildren: 0.2,
            },
        },
    };

    const letter = {
        hidden: { opacity: 0, y: 40, scale: 0.8, filter: 'blur(10px)' },
        show: {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            transition: { type: 'spring', damping: 14, stiffness: 100 },
        },
    };

    return (
        <div className={`relative flex items-center justify-center ${className}`}>
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="flex items-center justify-center"
                style={{
                    color: 'white',
                    fontFamily: 'Impact, "Arial Black", sans-serif',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    transform: 'scaleY(1.15)',
                    letterSpacing: 'normal',
                }}
            >
                {text.split('').map((char, i) => (
                    <motion.span 
                        key={i} 
                        variants={letter} 
                        className="inline-block"
                        style={{ fontSize: 'clamp(4rem, 15vw, 12rem)' }} 
                    >
                        {char}
                    </motion.span>
                ))}
            </motion.div>
        </div>
    );
}