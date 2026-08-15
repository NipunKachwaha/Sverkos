'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CheckIcon, ChevronDown, XCircle, XIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MultiSelectProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
    disable?: boolean;
  }[];
  onValueChange: (value: string[]) => void;
  defaultValue?: string[];
  placeholder?: string;
  animation?: number;
  maxCount?: number;
  modalPopover?: boolean;
  asChild?: boolean;
  className?: string;
  popoverClass?: string;
  showall?: boolean;
}

export const MultiSelect = React.forwardRef<HTMLButtonElement, MultiSelectProps>(
  (
    {
      options,
      onValueChange,
      defaultValue = [],
      placeholder = 'Select options',
      animation = 0,
      maxCount = 3,
      modalPopover = false,
      asChild = false,
      className,
      popoverClass,
      showall = false,
      ...props
    },
    ref
  ) => {
    const [selectedValues, setSelectedValues] = useState<string[]>(defaultValue);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [phase, setPhase] = useState<'closed' | 'opening' | 'open' | 'closing'>('closed');
    const [isHovered, setIsHovered] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    /* ── Dynamic hue shift ── */
    const [tint, setTint] = useState(0);
    useEffect(() => {
      if (phase !== 'open' && phase !== 'opening') return;
      const id = setInterval(() => setTint((p) => (p + 0.3) % 360), 50);
      return () => clearInterval(id);
    }, [phase]);

    /* ── Phase: OPEN trigger ── */
    useEffect(() => {
      if (isPopoverOpen && phase === 'closed') {
        setPhase('opening');
      }
      if (!isPopoverOpen && (phase === 'open' || phase === 'opening')) {
        setPhase('closing');
      }
    }, [isPopoverOpen, phase]);

    /* ── Phase: opening → open ── */
    useEffect(() => {
      if (phase === 'opening') {
        const t = setTimeout(() => setPhase('open'), 550);
        return () => clearTimeout(t);
      }
    }, [phase]);

    /* ── Phase: closing → closed ── */
    useEffect(() => {
      if (phase === 'closing') {
        const t = setTimeout(() => setPhase('closed'), 420);
        return () => clearTimeout(t);
      }
    }, [phase]);

    const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        setIsPopoverOpen(true);
      } else if (event.key === 'Backspace' && !event.currentTarget.value) {
        const newSelectedValues = [...selectedValues];
        newSelectedValues.pop();
        setSelectedValues(newSelectedValues);
        onValueChange(newSelectedValues);
      }
    };

    const toggleOption = useCallback(
      (option: string) => {
        setSelectedValues((prev) => {
          const next = prev.includes(option)
            ? prev.filter((v) => v !== option)
            : [...prev, option];
          onValueChange(next);
          return next;
        });
      },
      [onValueChange]
    );

    const handleClear = useCallback(() => {
      setSelectedValues([]);
      onValueChange([]);
    }, [onValueChange]);

    const handleTogglePopover = useCallback(() => {
      setIsPopoverOpen((prev) => !prev);
    }, []);

    const clearExtraOptions = useCallback(() => {
      const next = selectedValues.slice(0, maxCount);
      setSelectedValues(next);
      onValueChange(next);
    }, [selectedValues, maxCount, onValueChange]);

    const filteredOptions = options.filter((o) => !o.disable);
    const toggleAll = useCallback(() => {
      if (selectedValues.length === filteredOptions.length) {
        handleClear();
      } else {
        const all = filteredOptions.map((o) => o.value);
        setSelectedValues(all);
        onValueChange(all);
      }
    }, [selectedValues, filteredOptions, handleClear, onValueChange]);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      const r = e.currentTarget.getBoundingClientRect();
      setMousePos({ x: e.clientX - r.left, y: e.clientY - r.top });
    };

    const liquidSpring = 'cubic-bezier(0.5, 1.5, 0.5, 1)';

    /* ── Liquid burst particles ── */
    const particles = useMemo(
      () =>
        Array.from({ length: 10 }, (_, i) => ({
          id: i,
          angle: (i / 10) * Math.PI * 2 + (Math.random() - 0.5) * 0.4,
          distance: 25 + Math.random() * 55,
          size: 2 + Math.random() * 3,
          delay: Math.random() * 0.08,
          duration: 0.2 + Math.random() * 0.3,
        })),
      []
    );

    /* ── Implosion particles ── */
    const implosionParticles = useMemo(
      () =>
        Array.from({ length: 6 }, (_, i) => ({
          id: i,
          angle: (i / 6) * Math.PI * 2,
          distance: 40 + Math.random() * 30,
          size: 1.5 + Math.random() * 2,
          delay: Math.random() * 0.05,
        })),
      []
    );

    /* ── clip-path morph variants ── */
    const containerAnim = {
      opening: {
        clipPath: 'circle(150% at 50% 50%)',
        scale: [1, 1.02, 0.998, 1.003, 1],
        opacity: 1,
        filter: 'blur(0px)',
        transition: {
          clipPath: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
          scale: { duration: 0.6, ease: 'easeOut' },
          opacity: { duration: 0.2 },
          filter: { duration: 0.35 },
        },
      },
      open: {
        clipPath: 'circle(150% at 50% 50%)',
        scale: 1,
        opacity: 1,
        filter: 'blur(0px)',
      },
      closing: {
        clipPath: 'circle(0% at 50% 0%)',
        scale: 0.92,
        opacity: 0,
        filter: 'blur(8px)',
        transition: {
          clipPath: { duration: 0.38, ease: [0.65, 0, 0.35, 1] },
          scale: { duration: 0.35, ease: [0.65, 0, 0.35, 1] },
          opacity: { duration: 0.2, delay: 0.1 },
          filter: { duration: 0.3 },
        },
      },
      closed: {
        clipPath: 'circle(0% at 50% 0%)',
        scale: 0.92,
        opacity: 0,
        filter: 'blur(8px)',
      },
    };

    return (
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen} modal={modalPopover}>
        {/* ═══════════ TRIGGER ═══════════ */}
        <PopoverTrigger asChild>
          <motion.button
            ref={ref}
            {...props}
            onClick={handleTogglePopover}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
            whileHover={{ scale: 1.012 }}
            whileTap={{ scale: 0.985 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className={cn(
              'relative flex w-full p-1 min-h-11 h-auto items-center justify-between',
              'rounded-2xl cursor-pointer overflow-hidden group',
              /* Liquid Glass base */
              'bg-[linear-gradient(135deg,rgba(255,255,255,0.45)_0%,rgba(255,255,255,0.18)_50%,rgba(255,255,255,0.08)_100%)]',
              'dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0.04)_50%,rgba(255,255,255,0.015)_100%)]',
              'backdrop-blur-2xl backdrop-saturate-[1.8]',
              'border border-white/50 dark:border-white/12',
              'shadow-[0_8px_32px_rgba(0,0,0,0.06),0_2px_8px_rgba(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,0.6),inset_0_-1px_1px_rgba(255,255,255,0.1)]',
              'dark:shadow-[0_8px_32px_rgba(0,0,0,0.35),0_2px_8px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.12),inset_0_-1px_1px_rgba(255,255,255,0.02)]',
              'text-black/75 dark:text-white/75',
              'outline-none focus-visible:ring-2 focus-visible:ring-blue-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
              className
            )}
          >
            {/* Cursor-following specular */}
            <motion.div
              className='pointer-events-none absolute inset-0 rounded-2xl'
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.4 }}
              style={{
                background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.35), transparent 40%)`,
              }}
            />

            {/* Top edge highlight */}
            <motion.div
              className='pointer-events-none absolute inset-x-0 top-0 h-[1px] rounded-t-2xl'
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 30%, rgba(255,255,255,0.95) 50%, rgba(255,255,255,0.8) 70%, transparent 100%)',
              }}
              animate={{ opacity: isHovered ? 1 : 0.5 }}
              transition={{ duration: 0.4 }}
            />

            {/* Bottom caustic */}
            <div className='pointer-events-none absolute inset-x-0 bottom-0 h-[1px] rounded-b-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-white/5' />

            {/* Hover shimmer (from ReferralModal) */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  key='trigger-shimmer'
                  initial={{ x: '-100%', opacity: 0 }}
                  animate={{ x: '200%', opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
                  className='absolute inset-0 pointer-events-none z-20'
                  style={{
                    background:
                      'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 45%, rgba(255,255,255,0.06) 50%, transparent 55%)',
                  }}
                />
              )}
            </AnimatePresence>

            {/* Open-state glow ring */}
            <motion.div
              className='pointer-events-none absolute inset-[-8px] rounded-3xl'
              style={{
                background: `radial-gradient(ellipse, hsla(${tint}, 60%, 70%, 0.15) 0%, transparent 70%)`,
                filter: 'blur(12px)',
              }}
              animate={{ opacity: isPopoverOpen ? 0.7 : 0 }}
              transition={{ duration: 0.5 }}
            />

            {/* ── Content ── */}
            <div className='relative z-10 w-full'>
              {selectedValues.length > 0 ? (
                <div className='flex justify-between items-center w-full'>
                  <div className='flex flex-nowrap overflow-x-auto items-center gap-1.5 p-1 flex-1 min-w-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
                    <AnimatePresence mode='popLayout'>
                      {(showall ? selectedValues : selectedValues.slice(0, maxCount)).map(
                        (value, idx) => {
                          const option = options.find((o) => o.value === value);
                          const Icon = option?.icon;
                          return (
                            <motion.div
                              key={value}
                              layout
                              initial={{ opacity: 0, scale: 0.8, filter: 'blur(4px)' }}
                              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                              exit={{ opacity: 0, scale: 0.7, filter: 'blur(4px)' }}
                              transition={{
                                duration: 0.35,
                                delay: idx * 0.03,
                                ease: [0.22, 1, 0.36, 1],
                                layout: { type: 'spring', stiffness: 350, damping: 28 },
                              }}
                              className='relative inline-flex items-center rounded-xl px-2.5 py-1 text-xs font-medium bg-[linear-gradient(135deg,rgba(255,255,255,0.6)_0%,rgba(255,255,255,0.3)_100%)] dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0.04)_100%)] backdrop-blur-lg backdrop-saturate-150 border border-white/60 dark:border-white/10 shadow-[0_2px_8px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.5)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.08)] text-black/75 dark:text-white/80'
                            >
                              <div className='pointer-events-none absolute inset-x-0 top-0 h-[1px] rounded-t-xl bg-gradient-to-r from-transparent via-white/50 to-transparent dark:via-white/10' />
                              {Icon && <Icon className='h-3.5 w-3.5 mr-1.5 opacity-70' />}
                              {option?.label}
                              <XCircle
                                className='ml-1.5 h-3.5 w-3.5 cursor-pointer opacity-40 hover:opacity-100 hover:text-red-500 dark:hover:text-red-400 transition-all duration-200 hover:scale-110'
                                onPointerDown={(e) => e.stopPropagation()}
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  toggleOption(value);
                                }}
                              />
                            </motion.div>
                          );
                        }
                      )}
                    </AnimatePresence>

                    {!showall && selectedValues.length > maxCount && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className='relative inline-flex items-center rounded-xl px-2.5 py-1 text-xs font-medium bg-[linear-gradient(135deg,rgba(255,255,255,0.4)_0%,rgba(255,255,255,0.15)_100%)] dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.07)_0%,rgba(255,255,255,0.02)_100%)] backdrop-blur-lg border border-white/40 dark:border-white/8 shadow-[0_2px_8px_rgba(0,0,0,0.03),inset_0_1px_0_rgba(255,255,255,0.4)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.06)] text-black/60 dark:text-white/60'
                        style={{ animationDuration: `${animation}s` }}
                      >
                        <div className='pointer-events-none absolute inset-x-0 top-0 h-[1px] rounded-t-xl bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-white/8' />
                        {`+ ${selectedValues.length - maxCount} more`}
                        <XCircle
                          className='ml-1.5 h-3.5 w-3.5 cursor-pointer opacity-40 hover:opacity-100 hover:text-red-500 dark:hover:text-red-400 transition-all duration-200 hover:scale-110'
                          onClick={(e) => {
                            e.stopPropagation();
                            clearExtraOptions();
                          }}
                        />
                      </motion.div>
                    )}
                  </div>

                  <div className='relative z-10 flex items-center flex-shrink-0'>
                    <motion.button
                      className='p-1 cursor-pointer opacity-30 hover:opacity-80 transition-colors duration-300 rounded-lg'
                      style={{ background: 'transparent' }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.04)')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClear();
                      }}
                      whileHover={{ scale: 1.15, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <XIcon className='h-4 w-4' />
                    </motion.button>
                    <motion.div
                      animate={{ rotate: isPopoverOpen ? 180 : 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className='mx-1.5 opacity-30'
                    >
                      <ChevronDown className='h-4 w-4' />
                    </motion.div>
                  </div>
                </div>
              ) : (
                <div className='flex items-center justify-between w-full mx-auto'>
                  <span className='text-sm opacity-50 mx-3 select-none'>{placeholder}</span>
                  <motion.div
                    animate={{ rotate: isPopoverOpen ? 180 : 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className='opacity-30 mx-2'
                  >
                    <ChevronDown className='h-4 w-4' />
                  </motion.div>
                </div>
              )}
            </div>
          </motion.button>
        </PopoverTrigger>

        {/* ═══════════ POPOVER ═══════════ */}
        <PopoverContent
          className={cn('w-[var(--radix-popover-trigger-width)] min-w-[200px] p-0', popoverClass)}
          align='start'
          sideOffset={8}
          onEscapeKeyDown={() => setIsPopoverOpen(false)}
          style={{
            background: 'transparent',
            border: 'none',
            boxShadow: 'none',
            backdropFilter: 'none',
            WebkitBackdropFilter: 'none',
            padding: 0,
            overflow: 'visible',
          }}
        >
          {/* ── Floating Orbs (from ReferralModal) ── */}
          <motion.div
            className='absolute w-[180px] h-[180px] rounded-full pointer-events-none'
            style={{
              background: 'radial-gradient(circle, rgba(255,140,58,0.15) 0%, transparent 70%)',
              filter: 'blur(40px)',
              top: '5%',
              left: '10%',
            }}
            animate={{
              x: [0, 15, -10, 0],
              y: [0, -10, 8, 0],
              scale: [1, 1.1, 0.95, 1],
              opacity: phase === 'closing' ? [1, 0] : phase === 'opening' ? [0, 1] : 1,
            }}
            transition={{
              duration: 6,
              repeat: phase === 'open' ? Infinity : 0,
              ease: 'easeInOut',
              opacity: { duration: 0.35 },
            }}
          />
          <motion.div
            className='absolute w-[140px] h-[140px] rounded-full pointer-events-none'
            style={{
              background: 'radial-gradient(circle, rgba(254,212,163,0.12) 0%, transparent 70%)',
              filter: 'blur(35px)',
              bottom: '10%',
              right: '5%',
            }}
            animate={{
              x: [0, -12, 8, 0],
              y: [0, 10, -6, 0],
              scale: [1, 0.9, 1.08, 1],
              opacity: phase === 'closing' ? [1, 0] : phase === 'opening' ? [0, 1] : 1,
            }}
            transition={{
              duration: 5,
              repeat: phase === 'open' ? Infinity : 0,
              ease: 'easeInOut',
              opacity: { duration: 0.35, delay: 0.05 },
            }}
          />
          <motion.div
            className='absolute w-[100px] h-[100px] rounded-full pointer-events-none'
            style={{
              background: 'radial-gradient(circle, rgba(255,200,100,0.1) 0%, transparent 70%)',
              filter: 'blur(30px)',
              top: '45%',
              right: '30%',
            }}
            animate={{
              x: [0, 8, -6, 0],
              y: [0, -6, 5, 0],
              scale: [1, 1.15, 0.9, 1],
              opacity: phase === 'closing' ? [1, 0] : phase === 'opening' ? [0, 1] : 1,
            }}
            transition={{
              duration: 7,
              repeat: phase === 'open' ? Infinity : 0,
              ease: 'easeInOut',
              opacity: { duration: 0.35, delay: 0.1 },
            }}
          />

          {/* ── clip-path morph container (from ReferralModal) ── */}
          <motion.div
            initial={{
              clipPath: 'circle(0% at 50% 0%)',
              scale: 0.75,
              opacity: 0,
              filter: 'blur(8px)',
            }}
            animate={containerAnim[phase]}
            className='relative overflow-hidden rounded-2xl'
          >
            {/* ── Glass Materialize Overlay (from ReferralModal) ── */}
            <motion.div
              className='absolute inset-0 pointer-events-none'
              style={{
                zIndex: 35,
                borderRadius: 16,
                background: 'rgba(248,249,252,0.95)',
              }}
              initial={{ opacity: 1 }}
              animate={
                phase === 'opening'
                  ? { opacity: 0 }
                  : phase === 'closing'
                    ? { opacity: 1 }
                    : { opacity: 0 }
              }
              transition={{
                duration: 0.4,
                delay: phase === 'opening' ? 0.1 : 0,
                ease: 'easeOut',
              }}
            />

            {/* ── Glow Ring (from ReferralModal) ── */}
            <motion.div
              className='absolute inset-[-15px] pointer-events-none'
              style={{
                zIndex: 25,
                borderRadius: 28,
                background:
                  'radial-gradient(ellipse, rgba(255,180,100,0.2) 0%, transparent 70%)',
                filter: 'blur(18px)',
              }}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={
                phase === 'opening'
                  ? { opacity: [0, 0.7, 0.3], scale: [0.7, 1.08, 1] }
                  : phase === 'closing'
                    ? { opacity: 0, scale: 0.7 }
                    : { opacity: 0.3, scale: 1 }
              }
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />

            {/* ── Liquid Burst Particles (from ReferralModal) ── */}
            {phase === 'opening' && (
              <div className='absolute inset-0 flex items-start justify-center pointer-events-none z-[100] pt-4'>
                {particles.map((p) => (
                  <motion.div
                    key={p.id}
                    className='absolute rounded-full'
                    style={{
                      width: p.size,
                      height: p.size,
                      background: 'rgba(255,255,255,0.8)',
                      boxShadow:
                        '0 0 6px rgba(255,200,100,0.6), 0 0 2px rgba(255,255,255,0.9)',
                    }}
                    initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                    animate={{
                      x: Math.cos(p.angle) * p.distance,
                      y: Math.sin(p.angle) * p.distance,
                      opacity: [0, 1, 0],
                      scale: [0, 1.2, 0.2],
                    }}
                    transition={{
                      delay: 0.05 + p.delay,
                      duration: p.duration,
                      ease: 'easeOut',
                    }}
                  />
                ))}
              </div>
            )}

            {/* ── Implosion Particles (from ReferralModal) ── */}
            {phase === 'closing' && (
              <div className='absolute inset-0 flex items-start justify-center pointer-events-none z-[100] pt-4'>
                {implosionParticles.map((p) => (
                  <motion.div
                    key={p.id}
                    className='absolute rounded-full'
                    style={{
                      width: p.size,
                      height: p.size,
                      background: 'rgba(255,255,255,0.6)',
                      boxShadow: '0 0 4px rgba(255,180,100,0.4)',
                    }}
                    initial={{
                      x: Math.cos(p.angle) * p.distance,
                      y: Math.sin(p.angle) * p.distance,
                      opacity: 0.8,
                      scale: 1,
                    }}
                    animate={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                    transition={{
                      delay: p.delay,
                      duration: 0.3,
                      ease: [0.65, 0, 0.35, 1],
                    }}
                  />
                ))}
              </div>
            )}

            {/* ═══════════ LIQUID GLASS CONTENT ═══════════ */}
            <div
              className='relative z-30 overflow-hidden rounded-2xl'
              style={{
                background: `linear-gradient(135deg, rgba(248,249,252,0.88) 0%, rgba(255,255,255,0.75) 40%, hsla(${tint}, 60%, 70%, 0.06) 100%)`,
                darkBackground: `linear-gradient(135deg, rgba(20,20,22,0.88) 0%, rgba(15,15,18,0.75) 40%, hsla(${tint}, 40%, 20%, 0.06) 100%)`,
                border: '1px solid rgba(255,255,255,0.5)',
                boxShadow:
                  '0 24px 80px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.08), inset 0 1px 1px rgba(255,255,255,0.5), inset 0 -1px 1px rgba(255,255,255,0.1)',
              }}
            >
              {/* Top edge highlight (from ReferralModal) */}
              <div
                className='absolute top-0 left-0 right-0 h-[1px] z-40 pointer-events-none'
                style={{
                  background:
                    'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 30%, rgba(255,255,255,0.95) 50%, rgba(255,255,255,0.8) 70%, transparent 100%)',
                }}
              />

              {/* Shimmer (from ReferralModal) */}
              <AnimatePresence>
                {phase === 'open' && (
                  <motion.div
                    key='dropdown-shimmer'
                    initial={{ x: '-100%', opacity: 0 }}
                    animate={{ x: '200%', opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'linear',
                      repeatDelay: 3,
                    }}
                    className='absolute inset-0 pointer-events-none z-40'
                    style={{
                      background:
                        'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.04) 50%, transparent 55%)',
                    }}
                  />
                )}
              </AnimatePresence>

              {/* ── Command list ── */}
              <Command className='relative z-30'>
                <CommandInput
                  placeholder='Search...'
                  onKeyDown={handleInputKeyDown}
                  className='h-11 text-sm'
                />
                <CommandList>
                  <CommandEmpty className='py-6 text-center text-sm opacity-50'>
                    No results found.
                  </CommandEmpty>
                  <CommandGroup>
                    {/* Select All */}
                    <CommandItem
                      key='all'
                      onSelect={toggleAll}
                      className='cursor-pointer rounded-xl mx-1.5 my-0.5 transition-all duration-300 hover:bg-white/40 dark:hover:bg-white/8 active:bg-white/50 dark:active:bg-white/12'
                    >
                      <div
                        className={cn(
                          'mr-2.5 flex h-[18px] w-[18px] items-center justify-center rounded-md transition-all duration-300 border',
                          selectedValues.length === filteredOptions.length
                            ? 'bg-gradient-to-br from-blue-500 to-blue-600 border-blue-400/50 shadow-[0_2px_8px_rgba(59,130,246,0.35)]'
                            : 'bg-white/40 dark:bg-white/8 border-white/50 dark:border-white/15 shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] dark:shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]'
                        )}
                      >
                        <motion.div
                          animate={{
                            scale: selectedValues.length === filteredOptions.length ? 1 : 0,
                            opacity: selectedValues.length === filteredOptions.length ? 1 : 0,
                          }}
                          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <CheckIcon className='h-3 w-3 text-white' />
                        </motion.div>
                      </div>
                      <span className='text-black/70 dark:text-white/70 text-sm'>
                        (Select All)
                      </span>
                    </CommandItem>

                    {options.map((option) => {
                      const isSelected = selectedValues.includes(option.value);
                      const isDisabled = option.disable;

                      return (
                        <CommandItem
                          key={option.value}
                          onSelect={() => !isDisabled && toggleOption(option.value)}
                          className={cn(
                            'cursor-pointer rounded-xl mx-1.5 my-0.5 transition-all duration-300',
                            'hover:bg-white/40 dark:hover:bg-white/8 active:bg-white/50 dark:active:bg-white/12',
                            isDisabled &&
                              'opacity-40 cursor-not-allowed hover:bg-transparent dark:hover:bg-transparent'
                          )}
                        >
                          <div
                            className={cn(
                              'mr-2.5 flex h-[18px] w-[18px] items-center justify-center rounded-md transition-all duration-300 border',
                              isSelected && !isDisabled
                                ? 'bg-gradient-to-br from-blue-500 to-blue-600 border-blue-400/50 shadow-[0_2px_8px_rgba(59,130,246,0.35)]'
                                : 'bg-white/40 dark:bg-white/8 border-white/50 dark:border-white/15 shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] dark:shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]',
                              isDisabled && 'opacity-50'
                            )}
                          >
                            <motion.div
                              animate={{
                                scale: isSelected && !isDisabled ? 1 : 0,
                                opacity: isSelected && !isDisabled ? 1 : 0,
                              }}
                              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            >
                              <CheckIcon className='h-3 w-3 text-white' />
                            </motion.div>
                          </div>
                          {option.icon && (
                            <option.icon
                              className={cn(
                                'mr-2 h-4 w-4 opacity-70 transition-opacity duration-300',
                                isDisabled && 'opacity-30'
                              )}
                            />
                          )}
                          <span
                            className={cn(
                              'text-sm transition-colors duration-300',
                              isSelected && !isDisabled
                                ? 'text-black/90 dark:text-white/90 font-medium'
                                : 'text-black/60 dark:text-white/60'
                            )}
                          >
                            {option.label}
                          </span>
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>

                  <CommandSeparator className='bg-white/30 dark:bg-white/8 mx-2' />

                  <CommandGroup>
                    <div className='flex items-center justify-between py-1 px-1'>
                      {selectedValues.length > 0 && (
                        <CommandItem
                          onSelect={handleClear}
                          className='flex-1 justify-center cursor-pointer rounded-xl transition-all duration-300 hover:bg-white/40 dark:hover:bg-white/8 text-sm text-black/60 dark:text-white/60 hover:text-red-500 dark:hover:text-red-400'
                        >
                          Clear
                        </CommandItem>
                      )}
                      <CommandItem
                        onSelect={() => setIsPopoverOpen(false)}
                        className={cn(
                          'flex-1 justify-center cursor-pointer rounded-xl transition-all duration-300 hover:bg-white/40 dark:hover:bg-white/8 text-sm text-black/60 dark:text-white/60',
                          selectedValues.length > 0 && 'border-l border-white/30 dark:border-white/8'
                        )}
                      >
                        Close
                      </CommandItem>
                    </div>
                  </CommandGroup>
                </CommandList>
              </Command>

              {/* Bottom caustic (from ReferralModal) */}
              <div
                className='absolute bottom-0 left-0 right-0 h-[1px] z-40 pointer-events-none'
                style={{
                  background:
                    'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                }}
              />
            </div>
          </motion.div>
        </PopoverContent>
      </Popover>
    );
  }
);

MultiSelect.displayName = 'MultiSelect';