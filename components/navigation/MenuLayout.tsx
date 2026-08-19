import React from 'react';
import Image from 'next/image';
import TransitionLink from '@/components/LoadingScreen/TransitionLink';

interface MenuItem {
    title: string;
    desc: string;
    link?: string;
}

interface MenuLayoutProps {
    isActive: boolean;
    leftTitle: string;
    leftItems?: MenuItem[];
    rightTitle: string;
    rightItems?: MenuItem[];
    rightCard?: { image: string; text: string; link: string };
}

export default function MenuLayout({ isActive, leftTitle, leftItems = [], rightTitle, rightItems = [], rightCard }: MenuLayoutProps) {
    return (
        // Changed flex direction to support smaller laptop/tablet wrapping safely
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 w-full h-full">
            {/* Left Column */}
            <div className={`flex-1 min-w-[280px] transform transition-all duration-700 ease-out will-change-transform ${isActive ? 'opacity-100 translate-y-0 delay-100' : 'opacity-0 translate-y-4'}`}>
                <h3 className="w-fit liquid-glass-dropdown rounded-full px-3 py-1 text-[11px] text-white/50 font-semibold uppercase tracking-wider mb-5">
                    {leftTitle}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
                    {leftItems.map((item) => (
                        <TransitionLink key={item.title} href={item.link || "#"} className="cursor-pointer group/link block no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-md">
                            <p className="text-white text-sm font-semibold mb-1 group-hover/link:text-white/70 transition-colors">{item.title}</p>
                            <p className="text-white/60 text-xs line-clamp-2">{item.desc}</p>
                        </TransitionLink>
                    ))}
                </div>
            </div>

            {/* Vertical Divider (Hidden on stack/column layout) */}
            <div className={`hidden md:block w-px bg-white/10 transition-opacity duration-700 ease-out ${isActive ? 'opacity-100 delay-150' : 'opacity-0'}`} />

            {/* Right Column */}
            <div className={`w-full md:w-64 shrink-0 transform transition-all duration-700 ease-out will-change-transform ${isActive ? 'opacity-100 translate-y-0 delay-200' : 'opacity-0 translate-y-4'}`}>
                <h3 className="w-fit liquid-glass-dropdown rounded-full px-3 py-1 text-[11px] text-white/50 font-semibold uppercase tracking-wider mb-5">{rightTitle}</h3>

                {rightItems.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-6">
                        {rightItems.map((item) => (
                            <TransitionLink key={item.title} href={item.link || "#"} className="cursor-pointer group/link block no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-md">
                                <p className="text-white text-sm font-semibold mb-1 group-hover/link:text-white/70 transition-colors">{item.title}</p>
                                <p className="text-white/60 text-xs">{item.desc}</p>
                            </TransitionLink>
                        ))}
                    </div>
                )}

                {rightCard && (
                    <TransitionLink href={rightCard.link} className="block cursor-pointer group/card rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50">
                        <div className="h-32 bg-[#1a1a1a] relative overflow-hidden">
                            <Image src={rightCard.image} alt="Featured Content" fill className="object-cover" sizes="(max-width: 768px) 100vw, 256px" />
                        </div>
                        <div className="p-4">
                            <p className="text-white text-sm font-semibold leading-snug mb-3">{rightCard.text}</p>
                            <p className="text-white/60 text-xs font-medium flex items-center gap-1 group-hover/card:text-white transition-colors">
                                Learn more <span aria-hidden="true" className="text-[10px]">&rarr;</span>
                            </p>
                        </div>
                    </TransitionLink>
                )}
            </div>
        </div>
    );
}