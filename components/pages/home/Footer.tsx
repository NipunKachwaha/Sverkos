"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SlicedRollingText } from "@/components/ui/SlicedRollingText";
import MetallicPaint from "@/components/ui/MetallicPaint/MetallicPaint";
import GitHub from '@/components/ui/IconShareButton/GitHub'
import Facebook from '@/components/ui/IconShareButton/Facebook'
import X from '@/components/ui/IconShareButton/X'
import Reddit from '@/components/ui/IconShareButton/Reddit'
import Discord from '@/components/ui/IconShareButton/Discord'
import Telegram from '@/components/ui/IconShareButton/Telegram'
import Pinterest from '@/components/ui/IconShareButton/Pinterest'
import Youtube from '@/components/ui/IconShareButton/Youtube'
import Linkedin from '@/components/ui/IconShareButton/Linkedin'
import Whatsapp from '@/components/ui/IconShareButton/Whatsapp'
import Instagram from '@/components/ui/IconShareButton/Instagram'

// -- Column data for footer navigation
const FOOTER_COLUMNS = [
  { title: "Company", links: ["About Us", "Careers", "Press & media", "Enterprise", "Security", "Trust center"] },
  { title: "Product", links: ["Features", "Integrations", "Pricing", "Roadmap", "Changelog", "Feature Request", "Use Cases"] },
  { title: "Resources", links: ["Docs & FAQs", "Learn", "Templates", "Guides", "Community", "Blog", "Hire a Partner"] },
  { title: "Legal", links: ["Privacy policy", "Terms of Service", "Cookie settings", "Report Misuse", "Accessibility Statement"] }
];

// -- Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 20 } }
};

// -- Logo with metallic paint
function Logo() {
  const [params, setParams] = useState(() => ({
    seed: Math.floor(Math.random() * 10000),
    scale: 4 + Math.random() * 6,
    patternSharpness: 0.25 + Math.random() * 0.75,
    noiseScale: 0.5 + Math.random() * 1.1,
    speed: 0.2 + Math.random() * 0.7,
    liquid: 0.5 + Math.random() * 0.6,
    brightness: 1.5 + Math.random() * 2,
    contrast: 0.25 + Math.random() * 1,
    refraction: 0.005 + Math.random() * 0.03,
    blur: 0.008 + Math.random() * 0.02,
    chromaticSpread: 1 + Math.random() * 3,
    fresnel: 0.7 + Math.random() * 1.3,
    angle: Math.random() * 360,
    waveAmplitude: 0.6 + Math.random() * 1.4,
    distortion: 0.6 + Math.random() * 1.4,
    contour: 0.1 + Math.random() * 0.4,
    lightColor: `#${(0xf8 + Math.floor(Math.random() * 0x07)).toString(16)}${(0xf8 + Math.floor(Math.random() * 0x07)).toString(16)}${(0xf8 + Math.floor(Math.random() * 0x07)).toString(16)}`,
    darkColor: `#${(Math.floor(Math.random() * 0x08)).toString(16).padStart(2, '0')}${(Math.floor(Math.random() * 0x08)).toString(16).padStart(2, '0')}${(Math.floor(Math.random() * 0x08)).toString(16).padStart(2, '0')}`,
    tintColor: `#feb${["0","1","2","3","4","a","b","c","d","e","f"][Math.floor(Math.random()*12)]}${["0","1","2","3","4","a","b","c","d","e","f"][Math.floor(Math.random()*12)]}`
  }));

  useEffect(() => {
    const interval = setInterval(() => {
      setParams({
        seed: Math.floor(Math.random() * 10000),
        scale: 4 + Math.random() * 6,
        patternSharpness: 0.25 + Math.random() * 0.75,
        noiseScale: 0.5 + Math.random() * 1.1,
        speed: 0.2 + Math.random() * 0.7,
        liquid: 0.5 + Math.random() * 0.6,
        brightness: 1.5 + Math.random() * 2,
        contrast: 0.25 + Math.random() * 1,
        refraction: 0.005 + Math.random() * 0.03,
        blur: 0.008 + Math.random() * 0.02,
        chromaticSpread: 1 + Math.random() * 3,
        fresnel: 0.7 + Math.random() * 1.3,
        angle: Math.random() * 360,
        waveAmplitude: 0.6 + Math.random() * 1.4,
        distortion: 0.6 + Math.random() * 1.4,
        contour: 0.1 + Math.random() * 0.4,
        lightColor: `#${(0xf8 + Math.floor(Math.random() * 0x07)).toString(16)}${(0xf8 + Math.floor(Math.random() * 0x07)).toString(16)}${(0xf8 + Math.floor(Math.random() * 0x07)).toString(16)}`,
        darkColor: `#${(Math.floor(Math.random() * 0x08)).toString(16).padStart(2, '0')}${(Math.floor(Math.random() * 0x08)).toString(16).padStart(2, '0')}${(Math.floor(Math.random() * 0x08)).toString(16).padStart(2, '0')}`,
        tintColor: `#feb${["0","1","2","3","4","a","b","c","d","e","f"][Math.floor(Math.random()*12)]}${["0","1","2","3","4","a","b","c","d","e","f"][Math.floor(Math.random()*12)]}`
      });
    }, 10000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <span className="relative w-8 h-8 md:w-10 md:h-10 flex items-center justify-center overflow-hidden rounded-full shrink-0">
      <MetallicPaint
        imageSrc="/sverkoslogo-removebg.png"
        seed={params.seed}
        scale={params.scale}
        patternSharpness={params.patternSharpness}
        noiseScale={params.noiseScale}
        speed={params.speed}
        liquid={params.liquid}
        mouseAnimation={false}
        brightness={params.brightness}
        contrast={params.contrast}
        refraction={params.refraction}
        blur={params.blur}
        chromaticSpread={params.chromaticSpread}
        fresnel={params.fresnel}
        angle={params.angle}
        waveAmplitude={params.waveAmplitude}
        distortion={params.distortion}
        contour={params.contour}
        lightColor={params.lightColor}
        darkColor={params.darkColor}
        tintColor={params.tintColor}
      />
    </span>
  );
}

export default function Footer() {
  // --- Fix: Add missing state for language dropdown
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("EN");

  return (
    <div className="w-full h-full flex flex-col justify-between font-['MyCustomFont'] relative z-10 px-4 md:px-0">

      <motion.div variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }} className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

        {/* --- LEFT SECTION: Brand & Description --- */}
        <motion.div variants={itemVariants} className="lg:col-span-4 flex flex-col pr-0 lg:pr-8">

          {/* Custom Logo Component */}
          <div className="flex items-center gap-3 mb-8 cursor-pointer select-none">
            <Logo />
            <SlicedRollingText text="Sverkos" className="text-3xl md:text-4xl font-semibold text-white tracking-tight" staggerDelay={0.05} />
          </div>

          <p className="text-xs md:text-sm text-white font-['MyCustomFont'] leading-relaxed mb-8 max-w-[90%] tracking-widest md:tracking-[0.18em]">
            Sverkos is an AI platform for building fully functioning apps in minutes. Describe what you need — a productivity tool, a back-office system, a customer portal, or a complete enterprise product — and Sverkos builds it. No code, no integrations, ready to ship on day one and built to grow with you.
          </p>

          {/* Social Icons */}
          <div className="liquid-glass flex flex-col justify-center items-center gap-2 px-5 py-3 rounded-xl shadow-lg">
            <div className="flex justify-center items-center gap-6">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Sverkos GitHub"
                className="flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded"
              >
                <GitHub />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Sverkos Facebook"
                className="flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded"
              >
                <Facebook />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Sverkos X"
                className="flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded"
              >
                <X />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Sverkos Youtube"
                className="flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded"
              >
                <Youtube />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Sverkos Discord"
                className="flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded"
              >
                <Discord />
              </a>
            </div>
            <div className="flex justify-center items-center gap-6 mt-2">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Sverkos Telegram"
                className="flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded"
              >
                <Telegram />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Sverkos Instagram"
                className="flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded"
              >
                <Instagram />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Sverkos Reddit"
                className="flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded"
              >
                <Reddit />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Sverkos Linkedin"
                className="flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded"
              >
                <Linkedin />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Sverkos Whatsapp"
                className="flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded"
              >
                <Whatsapp />
              </a>
            </div>
          </div>
        </motion.div>

        {/* --- RIGHT SECTION: Navigation Grid --- */}
        <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mt-4 lg:mt-0">
          {FOOTER_COLUMNS.map((column) => (
            <motion.div key={column.title} variants={itemVariants} className="flex flex-col">
              <h4 className="text-white font-semibold mb-6 tracking-wide text-base">{column.title}</h4>
              <ul className="flex flex-col gap-4">
                {column.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* --- BOTTOM SECTION: Language & Copyright --- */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="w-full max-w-7xl mx-auto pt-8 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-6 mt-16 pb-8"
      >
        <div className="relative">
          <motion.button
            className="liquid-glass flex items-center gap-2 px-5 py-2.5 rounded-xl text-gray-300 hover:text-white transition-colors duration-300"
            whileHover={{ scale: 1.07, boxShadow: "0 2px 16px 0 rgba(146, 193, 250, 0.25)" }}
            whileTap={{ scale: 0.96, rotate: -2 }}
            onClick={() => setDropdownOpen((open) => !open)}
            aria-haspopup="listbox"
            aria-expanded={dropdownOpen ? "true" : "false"}
            type="button"
          >
            <motion.svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{ rotate: dropdownOpen ? 180 : 0 }}
              transition={{ duration: 0.45, type: "spring", stiffness: 160 }}
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              <path d="M2 12h20"></path>
            </motion.svg>
            <span className="text-sm font-medium">{currentLang}</span>
            <motion.svg
              className="w-3 h-3 ml-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{ rotate: dropdownOpen ? 180 : 0 }}
              transition={{ duration: 0.3, type: 'spring', stiffness: 200 }}
            >
              <path d="m6 9 6 6 6-6" />
            </motion.svg>
            </motion.button>
            <AnimatePresence>
            {dropdownOpen && (
              <motion.ul
                key="dropdown"
                initial={{ opacity: 0, y: 24, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 24, scale: 0.95 }}
                transition={{ duration: 0.26, type: "spring", bounce: 0.2 }}
                className="absolute left-0 bottom-full mb-2 z-10 min-w-[90px] bg-neutral-900 border border-white/10 shadow-lg rounded-lg overflow-hidden"
                tabIndex={-1}
                role="listbox"
              >
                {[
                  { label: "EN", code: "EN" },
                  { label: "ES", code: "ES" },
                  { label: "FR", code: "FR" },
                  { label: "DE", code: "DE" },
                  { label: "RU", code: "RU" }
                ].map((lang, idx) => (
                  <motion.li
                    key={lang.code}
                    className={`px-4 py-2 text-sm text-gray-200 hover:bg-white/10 cursor-pointer transition-colors`}
                    role="option"
                    aria-selected={lang.code === currentLang}
                    onClick={() => {
                      setCurrentLang(lang.code);
                      setDropdownOpen(false);
                    }}
                    initial={{ x: -14, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.03 * idx }}
                    whileHover={{ scale: 1.08, backgroundColor: "rgba(255,255,255,0.09)" }}
                  >
                    {lang.label}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        <p className="text-m text-white font-medium">
          © {new Date().getFullYear()} 
          <svg
            width="4"
            height="4"
            viewBox="0 0 8 8"
            fill="currentColor"
            aria-hidden="true"
            className="inline mx-2 mb-0.5"
            style={{ verticalAlign: 'middle' }}
          >
            <circle cx="4" cy="4" r="4" />
          </svg>
          Black&nbsp;Greater
          <svg
            width="4"
            height="4"
            viewBox="0 0 8 8"
            fill="currentColor"
            aria-hidden="true"
            className="inline mx-2 mb-0.5"
            style={{ verticalAlign: 'middle' }}
          >
            <circle cx="4" cy="4" r="4" />
          </svg>
          All&nbsp;rights&nbsp;reserved.
        </p>
      </motion.div>
    </div>
  );
}