'use client';

import React, { useEffect, useState, useRef, useMemo } from 'react';
import Link from 'next/link';
import { SignInButton, SignUpButton, UserButton, useAuth } from "@clerk/nextjs";
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import localFont from 'next/font/local';
import MenuLayout from './MenuLayout';
import MetallicPaint from "@/components/ui/MetallicPaint/MetallicPaint";
import TransitionLink from '@/components/LoadingScreen/TransitionLink';
import { NAVIGATION_DATA } from '@/data/navigation';

const Zaslia = localFont({
  src: '../../public/fonts/Zaslia.otf',
  display: 'swap',
});

const MENU_CONFIG = {
  Solutions: { width: 700, height: 360, data: NAVIGATION_DATA.solutions },
  Resources: { width: 750, height: 360, data: NAVIGATION_DATA.resources },
  Products: { width: 700, height: 340, data: NAVIGATION_DATA.products },
} as const;

type MenuKey = keyof typeof MENU_CONFIG;

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
    <>
      <span className="relative w-7 h-7 flex items-center justify-center overflow-hidden rounded-full">
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
      <span
        className={`${Zaslia.className} italic text-white text-2xl leading-none mt-1 tracking-wide flex items-center w-15 h-15 justify-center`}
        style={{ minWidth: '2.25rem', minHeight: '2.25rem' }}
      >
        SVERKOS
      </span>
    </>
  );
}

export default function Navbar() {
  const { isSignedIn, isLoaded } = useAuth();

  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileExpandedMenu, setMobileExpandedMenu] = useState<MenuKey | null>(null);

  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Scroll lock for mobile menu
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';

      const preventBackgroundScroll = (e: TouchEvent) => {
        const target = e.target as HTMLElement;
        if (!target.closest('#mobile-menu-drawer')) {
          e.preventDefault();
        }
      };

      document.addEventListener('touchmove', preventBackgroundScroll, { passive: false });

      return () => {
        document.body.style.overflow = '';
        document.removeEventListener('touchmove', preventBackgroundScroll);
      };
    }
  }, [isMobileMenuOpen]);

  const handleMouseEnter = (menuName: MenuKey) => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setActiveMenu(menuName);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    hoverTimeout.current = setTimeout(() => setActiveMenu(null), 150);
  };

  const closeMenuInstantly = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setActiveMenu(null);
  };

  const toggleMobileSubmenu = (menu: MenuKey) => {
    setMobileExpandedMenu(mobileExpandedMenu === menu ? null : menu);
  };

  const currentDimensions = useMemo(() =>
    activeMenu ? MENU_CONFIG[activeMenu] : { width: 700, height: 0 },
    [activeMenu]
  );

  if (!mounted) return null;

  return (
    <header className="fixed top-4 left-0 w-full px-4 lg:px-16 z-[100] flex items-center justify-between"
      onMouseLeave={handleMouseLeave}>

      {/* Brand Logo & Mobile Hamburger */}
      <div className="flex items-center gap-3 relative z-[110]">
        <button
          onClick={() => setIsMobileMenuOpen((v) => !v)}
          className="lg:hidden p-2 liquid-glass border border-white/20 rounded-full text-white/80 hover:text-white focus-visible:ring-2 focus-visible:ring-white transition-transform active:scale-95"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <div className="relative w-5 h-5 flex items-center justify-center">
            <X className={`absolute transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`} />
            <Menu className={`absolute transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`} />
          </div>
        </button>

        <TransitionLink
          href="/"
          onClick={() => setIsMobileMenuOpen(false)}
          className="h-12 px-6 liquid-glass border border-white/20 rounded-full flex items-center justify-center shrink-0 relative z-20 focus-visible:ring-2 focus-visible:ring-white"
        >
          <Logo />
        </TransitionLink>
      </div>

      {/* Desktop Navigation */}
      <nav className="absolute left-0 w-full flex justify-center pointer-events-none z-10 hidden lg:flex" aria-label="Main Navigation">
        <ul className="flex items-center liquid-glass border border-white/20 rounded-full p-1.5 gap-1 pointer-events-auto shadow-xl">
          {(Object.keys(MENU_CONFIG) as MenuKey[]).map((menu) => (
            <li key={menu}>
              <button
                onMouseEnter={() => handleMouseEnter(menu)}
                onFocus={() => handleMouseEnter(menu)}
                aria-expanded={activeMenu === menu}
                aria-haspopup="true"
                className={`px-4 py-2 text-sm font-medium transition-all rounded-full flex items-center gap-1.5 ${activeMenu === menu ? 'text-white bg-white/10' : 'text-white/70 hover:text-white hover:bg-white/5'}`}
                type="button"
              >
                {menu}
                <ChevronDown className={`w-3 h-3 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${activeMenu === menu ? 'rotate-180 opacity-100' : 'opacity-70'}`} />
              </button>
            </li>
          ))}
          {['Community', 'Enterprise', 'Security'].map((item) => (
            <li key={item}>
              <TransitionLink
                href={`/${item.toLowerCase()}`}
                onMouseEnter={closeMenuInstantly}
                onFocus={closeMenuInstantly}
                className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-white"
              >
                {item}
              </TransitionLink>
            </li>
          ))}
          <li>
            <TransitionLink 
                  href="/pricing" 
                  onMouseEnter={closeMenuInstantly}
                  className="bg-white text-black rounded-full px-5 py-2 text-sm font-semibold flex items-center gap-1.5 ml-2 hover:bg-gray-100 transition-colors focus-visible:ring-2 focus-visible:ring-white shadow-md"
            >
              Pricing <ArrowUpRight className="h-4 w-4" />
            </TransitionLink>
          </li>
        </ul>
      </nav>

      {/* Auth Actions */}
      <div className={`
        flex items-center justify-center gap-3 shrink-0 liquid-glass
        border border-white/20 rounded-full w-12 h-12
        z-[110] relative transition-opacity duration-300
        ${isMobileMenuOpen ? 'opacity-0 pointer-events-none lg:opacity-100 lg:pointer-events-auto' : 'opacity-100'}
      `}>
        {!isLoaded ? (
          <div className="w-10 h-10 animate-pulse bg-white/10 rounded-full flex items-center justify-center" />
        ) : !isSignedIn ? (
          <>
            <SignInButton mode="modal">
              <button className="rounded-full px-4 py-1.5 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-white">
                Log in
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="rounded-full bg-white/90 text-black px-4 py-1.5 text-sm font-semibold hover:bg-white transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-white">
                Start your Journey
              </button>
            </SignUpButton>
          </>
        ) : (
          <div className="flex items-center justify-center w-10 h-10">
            <UserButton afterSignOutUrl="/" />
          </div>
        )}
      </div>

      {/* Mobile Full-Screen Menu */}
      <div
        id="mobile-menu-drawer"
        data-lenis-prevent="true"
        className={`fixed inset-[-20px] z-[105] bg-[#050505]/95 backdrop-blur-3xl lg:hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col pt-[100px] overscroll-contain ${isMobileMenuOpen
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className={`absolute top-20 right-[-10%] w-64 h-64 bg-blue-500/20 rounded-full blur-[100px] transition-transform duration-1000 ease-out ${isMobileMenuOpen ? 'scale-100 translate-y-0' : 'scale-50 -translate-y-20'}`} />

        <div className="flex-1 overflow-y-auto px-6 pb-24 w-full relative z-10">
          <nav className="flex flex-col w-full max-w-md mx-auto">
            {(Object.keys(MENU_CONFIG) as MenuKey[]).map((menu, idx) => (
              <div
                key={menu}
                className={`border-b border-white/10 overflow-hidden transform transition-all duration-500 ease-out ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                style={{ transitionDelay: `${isMobileMenuOpen ? idx * 75 + 100 : 0}ms` }}
              >
                <button
                  onClick={() => toggleMobileSubmenu(menu)}
                  className="w-full flex items-center justify-between py-5 text-left text-xl font-medium text-white focus-visible:outline-none group"
                  type="button"
                  aria-expanded={mobileExpandedMenu === menu}
                  aria-controls={`mobile-menu-submenu-${menu}`}
                >
                  <span className="transition-transform duration-300 group-hover:translate-x-2">{menu}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${mobileExpandedMenu === menu ? 'rotate-180 text-white' : 'text-white/40'}`} />
                </button>
                <div
                  id={`mobile-menu-submenu-${menu}`}
                  className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${mobileExpandedMenu === menu ? 'max-h-[800px] opacity-100 pb-5' : 'max-h-0 opacity-0'}`}
                  aria-hidden={mobileExpandedMenu !== menu}
                >
                  <div className="flex flex-col gap-5 pl-4 border-l border-white/10 ml-2 mt-2">
                    <h4 className="text-[10px] text-white/40 uppercase font-bold tracking-widest mt-2 flex items-center gap-2">
                      <span className="w-3 h-px bg-white/40"></span>
                      {MENU_CONFIG[menu].data.leftMenu.title}
                    </h4>
                    {MENU_CONFIG[menu].data.leftMenu.items?.map(item => (
                      <TransitionLink key={item.title} href={item.link || '#'} onClick={() => setIsMobileMenuOpen(false)} className="block text-white/70 hover:text-white text-base font-medium transition-colors">
                        {item.title}
                      </TransitionLink>
                    ))}
                    <h4 className="text-[10px] text-white/40 uppercase font-bold tracking-widest mt-4 flex items-center gap-2">
                      <span className="w-3 h-px bg-white/40"></span>
                      {MENU_CONFIG[menu].data.rightMenu.title}
                    </h4>
                    {MENU_CONFIG[menu].data.rightMenu.items?.map(item => (
                      <TransitionLink key={item.title} href={item.link || '#'} onClick={() => setIsMobileMenuOpen(false)} className="block text-white/70 hover:text-white text-base font-medium transition-colors">
                        {item.title}
                      </TransitionLink>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {['Community', 'Enterprise', 'Security', 'Pricing'].map((item, idx) => (
              <TransitionLink
                key={item}
                href={`/${item.toLowerCase()}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`py-5 text-xl font-medium text-white border-b border-white/10 flex items-center justify-between group transform transition-all duration-500 ease-out ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                style={{ transitionDelay: `${isMobileMenuOpen ? (Object.keys(MENU_CONFIG).length + idx) * 75 + 100 : 0}ms` }}
              >
                <span className="transition-transform duration-300 group-hover:translate-x-2">{item}</span>
                {item === 'Pricing' && <ArrowUpRight className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />}
              </TransitionLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Desktop Dropdown */}
      <div className="fixed top-[74px] left-0 w-full flex justify-center pointer-events-none z-[90] hidden lg:flex">
        <div
          className={`relative max-w-[95vw] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-top will-change-transform ${activeMenu ? 'opacity-100 translate-y-0 visible pointer-events-auto' : 'opacity-0 -translate-y-4 invisible pointer-events-none'}`}
          style={{ width: `${currentDimensions.width}px`, height: `${currentDimensions.height}px` }}
          onMouseEnter={() => { if (hoverTimeout.current) clearTimeout(hoverTimeout.current); }}
          onMouseLeave={handleMouseLeave}
        >
          <div className="absolute -top-[20px] left-0 w-full h-[20px] bg-transparent z-50" />
          <div className="absolute inset-0 liquid-glass-dropdown rounded-3xl z-0 pointer-events-none border border-white/10 shadow-2xl backdrop-blur-2xl" />
          <div className="relative w-full h-full overflow-hidden rounded-3xl z-10">
            {/* Menu Layouts */}
            <div className={`absolute top-0 left-0 w-full h-full p-7 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${activeMenu === 'Solutions' ? 'opacity-100 translate-x-0 blur-0 delay-100 pointer-events-auto' : 'opacity-0 -translate-x-6 blur-sm pointer-events-none delay-0'}`}>
              <MenuLayout isActive={activeMenu === 'Solutions'} leftTitle={MENU_CONFIG.Solutions.data.leftMenu.title} leftItems={MENU_CONFIG.Solutions.data.leftMenu.items} rightTitle={MENU_CONFIG.Solutions.data.rightMenu.title} rightItems={MENU_CONFIG.Solutions.data.rightMenu.items} />
            </div>
            <div className={`absolute top-0 left-0 w-full h-full p-7 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${activeMenu === 'Resources' ? 'opacity-100 translate-x-0 blur-0 delay-100 pointer-events-auto' : activeMenu === 'Solutions' ? 'opacity-0 translate-x-6 blur-sm pointer-events-none delay-0' : 'opacity-0 -translate-x-6 blur-sm pointer-events-none delay-0'}`}>
              <MenuLayout isActive={activeMenu === 'Resources'} leftTitle={MENU_CONFIG.Resources.data.leftMenu.title} leftItems={MENU_CONFIG.Resources.data.leftMenu.items} rightTitle={MENU_CONFIG.Resources.data.rightMenu.title} rightItems={MENU_CONFIG.Resources.data.rightMenu.items} rightCard={MENU_CONFIG.Resources.data.rightMenu.card} />
            </div>
            <div className={`absolute top-0 left-0 w-full h-full p-7 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${activeMenu === 'Products' ? 'opacity-100 translate-x-0 blur-0 delay-100 pointer-events-auto' : 'opacity-0 translate-x-6 blur-sm pointer-events-none delay-0'}`}>
              <MenuLayout isActive={activeMenu === 'Products'} leftTitle={MENU_CONFIG.Products.data.leftMenu.title} leftItems={MENU_CONFIG.Products.data.leftMenu.items} rightTitle={MENU_CONFIG.Products.data.rightMenu.title} rightItems={MENU_CONFIG.Products.data.rightMenu.items} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}