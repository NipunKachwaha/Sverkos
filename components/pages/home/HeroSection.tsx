'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  ProjectIcon,
  WeeklyProjectIcon,
  ScheduleIcon
} from './Icons';
import FadingVideo from './FadingVideo';
import BlurText from './BlurText';
import { AI_Prompt } from "@/components/pages/home/Chatbox/animated-ai-input";
import ScrollExpand from '@/components/ui/ScrollExpand/ScrollExpand';

// --- Types & Interfaces ---
interface StatItem {
  icon: React.ElementType;
  value: string;
  label: string;
}

// --- Constants ---
const STATS_DATA: StatItem[] = [
  { icon: ProjectIcon, value: '34.5M+', label: 'Projects Built on Sverkos' },
  { icon: WeeklyProjectIcon, value: '837K+', label: 'Weekly New Projects' },
  { icon: ScheduleIcon, value: '1.2B+', label: 'Monthly Visits' },
];

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.8,
    },
  },
};

const itemVariants = {
  hidden: { filter: 'blur(10px)', opacity: 0, y: 20 },
  visible: {
    filter: 'blur(0px)',
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' }
  },
};

// --- Sub-Components ---
const StatCard = React.memo(({ stat }: { stat: StatItem }) => {
  const Icon = stat.icon;
  return (
    <motion.div
      variants={itemVariants}
      className="liquid-glass flex flex-col items-center md:items-start p-6 w-full md:w-[220px] rounded-[1.25rem] transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="liquid-glass rounded-2xl p-1.5 w-10 h-10 flex items-center justify-center">
        <Icon className="text-white w-5 h-5" aria-hidden="true" />
      </div>
      <div className="mt-4 font-heading italic text-white text-4xl tracking-tight leading-none">
        {stat.value}
      </div>
      <div className="text-sm text-white/80 font-body font-light mt-2">
        {stat.label}
      </div>
    </motion.div>
  );
});
StatCard.displayName = 'StatCard';

const PartnersList = React.memo(({ partners }: { partners: string[] }) => (
  <motion.div
    variants={itemVariants}
    className="flex flex-wrap items-center justify-center gap-6 md:gap-12 pb-8 w-full px-4"
    aria-label="Our Partners"
  >
    {partners.map((name, index) => (
      <div
        key={name}
        className="flex items-center text-xl md:text-2xl tracking-tight font-heading italic text-white/70 hover:text-white transition-colors duration-300"
      >
        <span>{name}</span>
        {index < partners.length - 1 && (
          <span className="hidden md:inline-block ml-6 md:ml-12 text-white/30" aria-hidden="true">
            &bull;
          </span>
        )}
      </div>
    ))}
  </motion.div>
));
PartnersList.displayName = 'PartnersList';

// --- Main Component ---
export default function HeroSection() {
  const backgroundContent = useMemo(() => (
    <>
      <FadingVideo
        src="/videos/herobg2.mp4"
        className="absolute left-1/2 top-[50%] -translate-x-1/2 -translate-y-1/2 object-cover min-w-full min-h-full z-0"
        style={{ width: '120vw', height: '120vh' }}
      />
      <div className="absolute inset-0 z-[1]" />
    </>
  ), []);

  return (
    <section className="relative w-full">
      <ScrollExpand
        useWindowScroll={true}
        startWidth={100}
        endWidth={85}
        startHeight={100}
        endHeight={85}
        startRadius={0}
        endRadius={40}
        scrollDistance={1.0}
        bgContent={backgroundContent}
      >
        <motion.div
          className="relative z-10 flex flex-col min-h-[100dvh] w-full max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex-1 flex flex-col items-center justify-center pt-24 md:pt-32 px-4 md:px-8">

            <BlurText
              text="Ignite Your Vision. Launch Your App."
              className="text-4xl md:text-6xl lg:text-[5rem] font-heading italic text-white leading-tight md:leading-[0.85] text-center max-w-4xl tracking-[-2px] md:tracking-[-4px] drop-shadow-lg"
            />

            <motion.p
              variants={itemVariants}
              className="mt-6 text-base md:text-lg text-white/90 max-w-2xl font-body font-light leading-relaxed text-center tracking-wide"
            >
              Build your own apps, websites, products and AI agents on Sverkos using your own words. Get ahead — and make sure it stays that way.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="w-full max-w-3xl flex justify-center mt-4 relative z-20"
            >
              <AI_Prompt />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-4 w-full max-w-4xl px-4"
            >
              {STATS_DATA.map((stat, i) => (
                <StatCard key={`stat-${i}`} stat={stat} />
              ))}
            </motion.div>
          </div>
        </motion.div>
      </ScrollExpand>
    </section>
  );
}