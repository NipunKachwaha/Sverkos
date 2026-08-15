'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LiquidTextProps {
    text?: string;
    progress?: number; 
    className?: string;
}

// 4 alag-alag axes aur directions jahan se text flip hokar aa sakta hai
const DIRECTIONS = ['up', 'down', 'left', 'right']; //

export function LiquidText({ text = 'SVERKOS', className = '' }: LiquidTextProps) {
    const [index, setIndex] = useState(0); //[cite: 14]
    const [direction, setDirection] = useState('up'); //[cite: 14]

    // Sequence controller: Har 500ms mein letter aur direction dono change honge
    useEffect(() => {
        if (!text) return; //[cite: 14]

        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % text.length); //[cite: 14]
            // Har naye letter ke aane par ek random direction pick karein
            setDirection(DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)]); //[cite: 14]
        }, 500); //[cite: 14]

        return () => clearInterval(interval); //[cite: 14]
    }, [text]); //[cite: 14]

    // Framer Motion Dynamic Variants
    const letterVariants = {
        initial: (dir: string) => {
            switch (dir) {
                case 'up': return { rotateX: 90, y: 30, opacity: 0, filter: 'blur(8px)', scale: 0.8 }; //[cite: 14]
                case 'down': return { rotateX: -90, y: -30, opacity: 0, filter: 'blur(8px)', scale: 0.8 }; //[cite: 14]
                case 'left': return { rotateY: -90, x: -30, opacity: 0, filter: 'blur(8px)', scale: 0.8 }; //[cite: 14]
                case 'right': return { rotateY: 90, x: 30, opacity: 0, filter: 'blur(8px)', scale: 0.8 }; //[cite: 14]
                default: return { rotateX: 90, y: 30, opacity: 0 }; //[cite: 14]
            }
        },
        animate: {
            rotateX: 0, //[cite: 14]
            rotateY: 0, //[cite: 14]
            x: 0, //[cite: 14]
            y: 0, //[cite: 14]
            opacity: 1, //[cite: 14]
            filter: 'blur(0px)', //[cite: 14]
            scale: 1, //[cite: 14]
            transition: { 
                type: 'spring', //[cite: 14]
                stiffness: 120, //[cite: 14]
                damping: 14, //[cite: 14]
                mass: 0.8 //[cite: 14]
            }
        },
        exit: (dir: string) => {
            switch (dir) {
                case 'up': return { rotateX: -90, y: -30, opacity: 0, filter: 'blur(8px)', scale: 0.8 }; //[cite: 14]
                case 'down': return { rotateX: 90, y: 30, opacity: 0, filter: 'blur(8px)', scale: 0.8 }; //[cite: 14]
                case 'left': return { rotateY: 90, x: 30, opacity: 0, filter: 'blur(8px)', scale: 0.8 }; //[cite: 14]
                case 'right': return { rotateY: -90, x: -30, opacity: 0, filter: 'blur(8px)', scale: 0.8 }; //[cite: 14]
                default: return { rotateX: -90, y: -30, opacity: 0 }; //[cite: 14]
            }
        }
    };

    return (
        <div 
            className={`relative flex items-center justify-center ${className}`} //[cite: 14]
            style={{ perspective: '1200px' }} // 3D depth preserve karne ke liye[cite: 14]
        >
            {/* Invisible placeholder: Layout jump ko rokne ke liye */}
            <span 
                className="invisible pointer-events-none select-none"
                style={{ 
                    fontFamily: 'Impact, "Arial Black", sans-serif', 
                    fontWeight: 900 
                }}
            >
                W {/* Using a wide letter to ensure the container stays large enough[cite: 14] */}
            </span>

            <AnimatePresence mode="popLayout" custom={direction}> 
                <motion.div
                    key={index} //[cite: 14]
                    custom={direction} // Variant ko current direction pass karna[cite: 14]
                    variants={letterVariants} //[cite: 14]
                    initial="initial" //[cite: 14]
                    animate="animate" //[cite: 14]
                    exit="exit" //[cite: 14]
                    className="absolute flex items-center justify-center uppercase"
                    style={{ 
                        transformStyle: 'preserve-3d', //[cite: 14]
                        
                        // ---------------------------------------------------
                        // INVERTED BACKGROUND UI STYLING
                        // ---------------------------------------------------
                        // 1. Solid White Color 
                        color: 'white', 
                        
                        // 2. The Magic Property: Inverts the background colors behind the text
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