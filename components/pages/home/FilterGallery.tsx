'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type Category = 'Apps' | 'Websites' | 'Games' | 'Tools';

export interface GalleryItem {
    id: string;
    category: Category;
    imageUrl: string;
    title: string;
}

const galleryData: GalleryItem[] = [
    // Apps
    { id: 'a1', category: 'Apps', title: 'App 1', imageUrl: '/FilterGallery/distance-duration.webp' },
    { id: 'a2', category: 'Apps', title: 'App 2', imageUrl: '/FilterGallery/total-repetitions.webp' },
    { id: 'a3', category: 'Apps', title: 'App 3', imageUrl: '/FilterGallery/badge-88.webp' },
    { id: 'a4', category: 'Apps', title: 'App 4', imageUrl: '/FilterGallery/footprint-lab.webp' },
    { id: 'a5', category: 'Apps', title: 'App 5', imageUrl: '/FilterGallery/rising-companies.webp' },
    { id: 'a6', category: 'Apps', title: 'App 6', imageUrl: '/FilterGallery/altitude.webp' },
    { id: 'a7', category: 'Apps', title: 'App 7', imageUrl: '/FilterGallery/aftertone.webp' },

    // Websites
    { id: 'w1', category: 'Websites', title: 'Web 1', imageUrl: '/FilterGallery/websites-1-cart.webp' },
    { id: 'w2', category: 'Websites', title: 'Web 2', imageUrl: '/FilterGallery/websites-2-fermented.webp' },
    { id: 'w3', category: 'Websites', title: 'Web 3', imageUrl: '/FilterGallery/websites-3-stateofart.webp' },
    { id: 'w4', category: 'Websites', title: 'Web 4', imageUrl: '/FilterGallery/websites-4-forms.webp' },
    { id: 'w5', category: 'Websites', title: 'Web 5', imageUrl: '/FilterGallery/websites-5-globe.webp' },
    { id: 'w6', category: 'Websites', title: 'Web 6', imageUrl: '/FilterGallery/websites-6-modular.webp' },
    { id: 'w7', category: 'Websites', title: 'Web 7', imageUrl: '/FilterGallery/websites-7.webp' },

    // Games
    { id: 'g1', category: 'Games', title: 'Game 1', imageUrl: '/FilterGallery/games-1-level.webp' },
    { id: 'g2', category: 'Games', title: 'Game 2', imageUrl: '/FilterGallery/games-2-golf.webp' },
    { id: 'g3', category: 'Games', title: 'Game 3', imageUrl: '/FilterGallery/games-3-icon.webp' },
    { id: 'g4', category: 'Games', title: 'Game 4', imageUrl: '/FilterGallery/games-4-castle.webp' },
    { id: 'g5', category: 'Games', title: 'Game 5', imageUrl: '/FilterGallery/games-5-leaderboard.webp' },
    { id: 'g6', category: 'Games', title: 'Game 6', imageUrl: '/FilterGallery/games-6-tetris.webp' },
    { id: 'g7', category: 'Games', title: 'Game 7', imageUrl: '/FilterGallery/games-7.jpg' },

    // Tools
    { id: 't1', category: 'Tools', title: 'Tool 1', imageUrl: '/FilterGallery/tools-1-light.webp' },
    { id: 't2', category: 'Tools', title: 'Tool 2', imageUrl: '/FilterGallery/tools-2-gear.webp' },
    { id: 't3', category: 'Tools', title: 'Tool 3', imageUrl: '/FilterGallery/tools-3-finance.webp' },
    { id: 't4', category: 'Tools', title: 'Tool 4', imageUrl: '/FilterGallery/tools-4-map.webp' },
    { id: 't5', category: 'Tools', title: 'Tool 5', imageUrl: '/FilterGallery/tools-5-weather.webp' },
    { id: 't6', category: 'Tools', title: 'Tool 6', imageUrl: '/FilterGallery/tools-6-sound.webp' },
    { id: 't7', category: 'Tools', title: 'Tool 7', imageUrl: '/FilterGallery/tools-7.jpg' },
];

const categories: Category[] = ['Apps', 'Websites', 'Games', 'Tools'];
const AUTOPLAY_INTERVAL_MS = 5000; 

const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
    exit: { transition: { staggerChildren: 0.05 } }
};

const itemVariants = {
    hidden: { clipPath: 'inset(100% 0 0 0)' },
    show: { 
        clipPath: 'inset(0% 0 0 0)', 
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
    },
    exit: { 
        clipPath: 'inset(100% 0 0 0)', 
        transition: { duration: 0.4, ease: [0.7, 0, 0.84, 0] } 
    }
};

export default function FilterGallery() {
    const [activeTab, setActiveTab] = useState<Category>('Websites');

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveTab((currentTab) => {
                const currentIndex = categories.indexOf(currentTab);
                const nextIndex = (currentIndex + 1) % categories.length;
                return categories[nextIndex];
            });
        }, AUTOPLAY_INTERVAL_MS);

        return () => clearInterval(timer);
    }, [activeTab]);

    const filteredItems = useMemo(
        () => galleryData.filter((item) => item.category === activeTab),
        [activeTab]
    );

    return (
        <section className="w-full pt-12 pb-8 relative z-0 flex flex-col items-center">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/[0.03] blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-500/[0.04] blur-[120px] rounded-full pointer-events-none" />

            {/* Navigation Menu */}
            <nav className="liquid-glass-strong rounded-full px-3 py-1 flex items-center space-x-2 mb-5 z-10 shadow-xl border border-white/5">
                {categories.map((category) => {
                    const isActive = activeTab === category;

                    return (
                        <button
                            key={category}
                            onClick={() => setActiveTab(category)}
                            className={`relative px-2.5 py-0.5 transition-all duration-300 ease-out text-[10px] md:text-xs font-semibold tracking-widest uppercase ${
                                isActive ? 'text-white' : 'text-white/50 hover:text-white/80'
                            }`}
                        >
                            {category}
                            {isActive && (
                                <motion.div
                                    layoutId="activeTabIndicator"
                                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-white rounded-full shadow-[0_0_6px_rgba(255,255,255,0.7)]"
                                    initial={false}
                                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                />
                            )}
                        </button>
                    );
                })}
            </nav>

            {/* Gallery Layout */}
            <div className="w-full max-w-[100vw] relative z-10 flex justify-center mt-2">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab} 
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        exit="exit"
                        className="flex flex-row items-center justify-center gap-2 md:gap-3 overflow-x-auto px-2 pb-4 snap-x snap-mandatory scroll-smooth hide-scrollbar w-full"
                    >
                        {filteredItems.map((item) => (
                            <motion.div
                                key={item.id}
                                variants={itemVariants} 
                                className="liquid-glass rounded-2xl flex-shrink-0 w-max h-max snap-center p-1.5 group relative cursor-pointer"
                            >
                                <div className="rounded-[1rem] overflow-hidden relative flex items-center justify-center bg-black/10">
                                    <img
                                        src={item.imageUrl}
                                        alt={item.title}
                                        className="block w-auto h-[70px] sm:h-[90px] md:h-[100px] lg:h-[110px] xl:h-[125px] object-contain transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                                    />
                                    
                                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 translate-y-[150%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none w-max z-20">
                                        <div className="liquid-glass-strong rounded-md px-3 py-1.5 text-center shadow-lg border border-white/10">
                                            <h3 className="text-white font-semibold tracking-wide text-[10px] md:text-xs drop-shadow-md whitespace-nowrap">
                                                {item.title}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }

                .liquid-glass {
                    background: rgba(255, 255, 255, 0.01);
                    background-blend-mode: luminosity;
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                    border: none;
                    box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 8px 32px rgba(0, 0, 0, 0.3);
                    position: relative;
                }

                .liquid-glass::before {
                    content: "";
                    position: absolute;
                    inset: 0;
                    border-radius: inherit;
                    padding: 1.4px;
                    background: linear-gradient(180deg,
                        rgba(255, 255, 255, 0.45) 0%,
                        rgba(255, 255, 255, 0.15) 20%,
                        rgba(255, 255, 255, 0) 40%,
                        rgba(255, 255, 255, 0) 60%,
                        rgba(255, 255, 255, 0.15) 80%,
                        rgba(255, 255, 255, 0.45) 100%);
                    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                    -webkit-mask-composite: xor;
                    mask-composite: exclude;
                    pointer-events: none;
                }

                .liquid-glass-strong {
                    backdrop-filter: blur(50px);
                    -webkit-backdrop-filter: blur(50px);
                    box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.15);
                    background: rgba(255, 255, 255, 0.03);
                    background-blend-mode: luminosity;
                    border: none;
                    position: relative;
                }

                .liquid-glass-strong::before {
                    content: "";
                    position: absolute;
                    inset: 0;
                    border-radius: inherit;
                    padding: 1.4px;
                    background: linear-gradient(180deg,
                        rgba(255, 255, 255, 0.5) 0%,
                        rgba(255, 255, 255, 0.2) 20%,
                        rgba(255, 255, 255, 0) 40%,
                        rgba(255, 255, 255, 0) 60%,
                        rgba(255, 255, 255, 0.2) 80%,
                        rgba(255, 255, 255, 0.5) 100%);
                    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                    -webkit-mask-composite: xor;
                    mask-composite: exclude;
                    pointer-events: none;
                }
            `}} />
        </section>
    );
}