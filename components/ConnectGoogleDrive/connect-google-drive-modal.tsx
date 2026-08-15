'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { LiquidGlassCard } from '@/components/ui/liquid-glass';

/* ─── Icons ─── */
const CheckCircle = ({ className = 'w-5 h-5' }: { className?: string }) => (
    <svg className={className} viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <circle cx='10' cy='10' r='9' stroke='currentColor' strokeWidth='1.5' />
        <path
            d='M6.5 10.25L8.75 12.5L13.5 7.75'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
        />
    </svg>
);

const GoogleDriveIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
    <svg className={className} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path d='M7.71 3.5L1.15 15C0.82 15.59 0.82 16.31 1.15 16.9L3.07 20.25H20.93L22.85 16.9C23.18 16.31 23.18 15.59 22.85 15L16.29 3.5C15.96 2.91 15.33 2.55 14.65 2.55H9.35C8.67 2.55 8.04 2.91 7.71 3.5Z' fill='#0066DA' />
        <path d='M12 2.55H9.35C8.67 2.55 8.04 2.91 7.71 3.5L1.15 15L12 20.25V2.55Z' fill='#00AC47' />
        <path d='M22.85 15L16.29 3.5C15.96 2.91 15.33 2.55 14.65 2.55H12L1.15 15H22.85Z' fill='#0066DA' opacity='0.6' />
        <path d='M1.15 15L3.07 20.25H12V15H1.15Z' fill='#FFBA00' />
        <path d='M22.85 15H12V20.25H20.93L22.85 15Z' fill='#0066DA' opacity='0.8' />
        <path d='M3.07 20.25L12 15L20.93 20.25H3.07Z' fill='#FFBA00' opacity='0.5' />
    </svg>
);

const CloseIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
    <svg className={className} viewBox='0 0 20 20' fill='currentColor'>
        <path
            fillRule='evenodd'
            d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
            clipRule='evenodd'
        />
    </svg>
);

/* ─── Features (SS1 exact) ─── */
const features = [
    'Import Docs, Sheets, and Slides from your Google Drive',
    'Choose which files to use each time',
    'Selected content is securely stored for use in your app',
];

/* ─── Main Component ─── */
interface ConnectGoogleDriveModalProps {
    isOpen?: boolean;
    onClose?: () => void;
    onConnect?: () => void;
}

export const ConnectGoogleDriveModal = ({
    isOpen = true,
    onClose,
    onConnect,
}: ConnectGoogleDriveModalProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [phase, setPhase] = useState<'closed' | 'opening' | 'open' | 'closing'>('closed');
    const [isConnecting, setIsConnecting] = useState(false);
    const [shouldConnect, setShouldConnect] = useState(false);

    /* ── Dynamic blue tint ── */
    const [tint, setTint] = useState(220);
    useEffect(() => {
        if (!isVisible) return;
        const id = setInterval(
            () => setTint((p) => 220 + Math.sin(p * 0.015) * 12),
            50
        );
        return () => clearInterval(id);
    }, [isVisible]);

    /* ── Phase: OPEN trigger ── */
    useEffect(() => {
        if (isOpen && phase === 'closed') {
            setIsVisible(true);
            requestAnimationFrame(() => setPhase('opening'));
        }
        if (!isOpen && (phase === 'open' || phase === 'opening')) {
            setPhase('closing');
        }
    }, [isOpen, phase]);

    /* ── Phase: opening → open ── */
    useEffect(() => {
        if (phase === 'opening') {
            const t = setTimeout(() => setPhase('open'), 650);
            return () => clearTimeout(t);
        }
    }, [phase]);

    /* ── Phase: closing → closed → notify parent ── */
    useEffect(() => {
        if (phase === 'closing') {
            const t = setTimeout(() => {
                setIsVisible(false);
                setPhase('closed');
                if (shouldConnect) {
                    onConnect?.();
                    setShouldConnect(false);
                } else {
                    onClose?.();
                }
            }, 520);
            return () => clearTimeout(t);
        }
    }, [phase, onClose, onConnect, shouldConnect]);

    /* ── Close handler ── */
    const handleClose = useCallback(() => {
        if (phase === 'closing' || phase === 'closed') return;
        setPhase('closing');
    }, [phase]);

    /* ── Connect handler ── */
    const handleConnect = async () => {
        if (isConnecting) return;
        setIsConnecting(true);
        await new Promise((r) => setTimeout(r, 1200));
        setIsConnecting(false);
        setShouldConnect(true);
        setPhase('closing');
    };

    /* ── Escape key ── */
    useEffect(() => {
        if (!isVisible) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') handleClose();
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [isVisible, handleClose]);

    const liquidSpring = 'cubic-bezier(0.5, 1.5, 0.5, 1)';

    /* ── Burst particles (open) ── */
    const particles = useMemo(
        () =>
            Array.from({ length: 12 }, (_, i) => ({
                id: i,
                angle: (i / 12) * Math.PI * 2 + (Math.random() - 0.5) * 0.4,
                distance: 45 + Math.random() * 65,
                size: 2 + Math.random() * 4,
                delay: Math.random() * 0.1,
                duration: 0.3 + Math.random() * 0.3,
            })),
        []
    );

    /* ── Implosion particles (close) ── */
    const implosionParticles = useMemo(
        () =>
            Array.from({ length: 8 }, (_, i) => ({
                id: i,
                angle: (i / 8) * Math.PI * 2,
                distance: 75 + Math.random() * 50,
                size: 2 + Math.random() * 3,
                delay: Math.random() * 0.08,
            })),
        []
    );

    /* ── Container animation variants ── */
    const clipCloseOrigin = '95% 8%';

    const containerAnim = {
        opening: {
            clipPath: 'circle(150% at 50% 50%)',
            scale: [1, 1.008, 0.998, 1.003, 1],
            opacity: 1,
            filter: 'blur(0px)',
            transition: {
                clipPath: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                scale: { duration: 0.7, ease: 'easeOut' },
                opacity: { duration: 0.25 },
                filter: { duration: 0.4 },
            },
        },
        open: {
            clipPath: 'circle(150% at 50% 50%)',
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)',
        },
        closing: {
            clipPath: `circle(0% at ${clipCloseOrigin})`,
            scale: 0.9,
            opacity: 0,
            filter: 'blur(8px)',
            transition: {
                clipPath: { duration: 0.45, ease: [0.65, 0, 0.35, 1] },
                scale: { duration: 0.4, ease: [0.65, 0, 0.35, 1] },
                opacity: { duration: 0.25, delay: 0.12 },
                filter: { duration: 0.35 },
            },
        },
        closed: {
            clipPath: `circle(0% at ${clipCloseOrigin})`,
            scale: 0.9,
            opacity: 0,
            filter: 'blur(8px)',
        },
    };

    /* ── Backdrop visibility (CSS-driven) ── */
    const backdropVisible = phase === 'opening' || phase === 'open';
    const backdropOpacity = backdropVisible ? 1 : 0;

    if (!isVisible) return null;

    return (
        <>
            {/* ════════════════════════════════════════════
                BACKDROP — Pure CSS, NO framer-motion
                This is what actually blurs the page.
                framer-motion's backdropFilter is unreliable. 
            ════════════════════════════════════════════ */}
            <div
                className='fixed inset-0 z-50'
                style={{
                    background: 'rgba(0, 0, 0, 0.55)',
                    WebkitBackdropFilter: 'blur(8px)',
                    backdropFilter: 'blur(8px)',
                    opacity: backdropOpacity,
                    transition: `opacity ${phase === 'closing' ? '0.35s' : '0.25s'} ease`,
                    pointerEvents: backdropVisible ? 'auto' : 'none',
                }}
                onClick={handleClose}
            />

            {/* ════════════════════════════════════════════
                MODAL LAYER — framer-motion for card effects only
                pointer-events-none so backdrop clicks pass through
            ════════════════════════════════════════════ */}
            <div className='fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none'>
                {/* ── Floating Orbs ── */}
                <motion.div
                    className='absolute w-[250px] h-[250px] rounded-full pointer-events-none'
                    style={{
                        background: 'radial-gradient(circle, rgba(0,102,218,0.15) 0%, transparent 70%)',
                        filter: 'blur(50px)',
                        top: '15%',
                        left: '20%',
                    }}
                    animate={{
                        x: [0, 20, -15, 0],
                        y: [0, -15, 10, 0],
                        scale: [1, 1.08, 0.95, 1],
                        opacity:
                            phase === 'closing'
                                ? [1, 0]
                                : phase === 'opening'
                                  ? [0, 1]
                                  : 1,
                    }}
                    transition={{
                        duration: 8,
                        repeat: phase === 'open' ? Infinity : 0,
                        ease: 'easeInOut',
                        opacity: { duration: 0.4 },
                    }}
                />
                <motion.div
                    className='absolute w-[180px] h-[180px] rounded-full pointer-events-none'
                    style={{
                        background: 'radial-gradient(circle, rgba(0,172,71,0.12) 0%, transparent 70%)',
                        filter: 'blur(40px)',
                        bottom: '20%',
                        right: '15%',
                    }}
                    animate={{
                        x: [0, -18, 12, 0],
                        y: [0, 14, -10, 0],
                        scale: [1, 0.92, 1.06, 1],
                        opacity:
                            phase === 'closing'
                                ? [1, 0]
                                : phase === 'opening'
                                  ? [0, 1]
                                  : 1,
                    }}
                    transition={{
                        duration: 7,
                        repeat: phase === 'open' ? Infinity : 0,
                        ease: 'easeInOut',
                        opacity: { duration: 0.4, delay: 0.05 },
                    }}
                />
                <motion.div
                    className='absolute w-[140px] h-[140px] rounded-full pointer-events-none'
                    style={{
                        background: 'radial-gradient(circle, rgba(255,186,0,0.08) 0%, transparent 70%)',
                        filter: 'blur(35px)',
                        top: '55%',
                        right: '28%',
                    }}
                    animate={{
                        x: [0, 12, -8, 0],
                        y: [0, -10, 7, 0],
                        scale: [1, 1.12, 0.9, 1],
                        opacity:
                            phase === 'closing'
                                ? [1, 0]
                                : phase === 'opening'
                                  ? [0, 1]
                                  : 1,
                    }}
                    transition={{
                        duration: 9,
                        repeat: phase === 'open' ? Infinity : 0,
                        ease: 'easeInOut',
                        opacity: { duration: 0.4, delay: 0.1 },
                    }}
                />

                {/* ── Close Ripple ── */}
                {phase === 'closing' && (
                    <motion.div
                        className='absolute pointer-events-none z-[100] rounded-full'
                        style={{
                            top: 'calc(50% - 140px)',
                            right: 'calc(50% - 180px)',
                            width: 24,
                            height: 24,
                            background:
                                'radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(0,102,218,0.15) 40%, transparent 70%)',
                        }}
                        initial={{ scale: 0, opacity: 0.9 }}
                        animate={{ scale: 30, opacity: 0 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                    />
                )}

                {/* ── Modal Card ── */}
                <motion.div
                    initial={{
                        clipPath: 'circle(0% at 50% 50%)',
                        scale: 0.75,
                        opacity: 0,
                        filter: 'blur(8px)',
                    }}
                    animate={containerAnim[phase]}
                    className='relative overflow-hidden pointer-events-auto'
                    style={{
                        width: 'min(420px, calc(100vw - 32px))',
                        borderRadius: 20,
                    }}
                >
                    {/* ── Glass Materialize Overlay ── */}
                    <motion.div
                        className='absolute inset-0 pointer-events-none'
                        style={{
                            zIndex: 35,
                            borderRadius: 20,
                            background: 'rgba(15,17,21,0.95)',
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
                            duration: 0.45,
                            delay: phase === 'opening' ? 0.12 : 0,
                            ease: 'easeOut',
                        }}
                    />

                    {/* ── Glow Ring ── */}
                    <motion.div
                        className='absolute inset-[-20px] pointer-events-none'
                        style={{
                            zIndex: 25,
                            borderRadius: 40,
                            background:
                                'radial-gradient(ellipse, rgba(0,102,218,0.15) 0%, transparent 70%)',
                            filter: 'blur(20px)',
                        }}
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={
                            phase === 'opening'
                                ? {
                                      opacity: [0, 0.6, 0.25],
                                      scale: [0.7, 1.06, 1],
                                  }
                                : phase === 'closing'
                                  ? { opacity: 0, scale: 0.7 }
                                  : { opacity: 0.25, scale: 1 }
                        }
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                    />

                    {/* ── Burst Particles ── */}
                    {phase === 'opening' && (
                        <div className='absolute inset-0 flex items-center justify-center pointer-events-none z-[100]'>
                            {particles.map((p) => (
                                <motion.div
                                    key={p.id}
                                    className='absolute rounded-full'
                                    style={{
                                        width: p.size,
                                        height: p.size,
                                        background: 'rgba(255,255,255,0.7)',
                                        boxShadow:
                                            '0 0 6px rgba(0,102,218,0.5), 0 0 2px rgba(255,255,255,0.8)',
                                    }}
                                    initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                                    animate={{
                                        x: Math.cos(p.angle) * p.distance,
                                        y: Math.sin(p.angle) * p.distance,
                                        opacity: [0, 1, 0],
                                        scale: [0, 1.2, 0.2],
                                    }}
                                    transition={{
                                        delay: 0.06 + p.delay,
                                        duration: p.duration,
                                        ease: 'easeOut',
                                    }}
                                />
                            ))}
                        </div>
                    )}

                    {/* ── Implosion Particles ── */}
                    {phase === 'closing' && (
                        <div className='absolute inset-0 flex items-center justify-center pointer-events-none z-[100]'>
                            {implosionParticles.map((p) => (
                                <motion.div
                                    key={p.id}
                                    className='absolute rounded-full'
                                    style={{
                                        width: p.size,
                                        height: p.size,
                                        background: 'rgba(255,255,255,0.5)',
                                        boxShadow:
                                            '0 0 5px rgba(0,102,218,0.3)',
                                    }}
                                    initial={{
                                        x: Math.cos(p.angle) * p.distance,
                                        y: Math.sin(p.angle) * p.distance,
                                        opacity: 0.7,
                                        scale: 1,
                                    }}
                                    animate={{
                                        x: 0,
                                        y: 0,
                                        opacity: 0,
                                        scale: 0,
                                    }}
                                    transition={{
                                        delay: p.delay,
                                        duration: 0.35,
                                        ease: [0.65, 0, 0.35, 1],
                                    }}
                                />
                            ))}
                        </div>
                    )}

                    {/* ── LiquidGlassCard ── */}
                    <LiquidGlassCard
                        draggable={false}
                        expandable={false}
                        width='100%'
                        height='100%'
                        blurIntensity='xl'
                        shadowIntensity='md'
                        glowIntensity='sm'
                        borderRadius='0px'
                        className='overflow-hidden'
                    >
                        {/* Opaque content — hides SVG distortion */}
                        <div
                            className='relative z-30 flex flex-col w-full overflow-hidden'
                            style={{
                                background: `linear-gradient(135deg, rgba(15,17,21,0.93) 0%, rgba(20,22,28,0.9) 40%, hsla(${tint}, 40%, 25%, 0.05) 100%)`,
                                borderRadius: 20,
                            }}
                        >
                            {/* Top edge highlight */}
                            <div
                                className='absolute top-0 left-0 right-0 h-[1px] z-40 pointer-events-none'
                                style={{
                                    background:
                                        'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 30%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.3) 70%, transparent 100%)',
                                }}
                            />

                            {/* Hover shimmer */}
                            {phase === 'open' && isHovered && (
                                <motion.div
                                    key='shimmer'
                                    initial={{ x: '-100%', opacity: 0 }}
                                    animate={{ x: '200%', opacity: 1 }}
                                    transition={{
                                        duration: 1.4,
                                        repeat: Infinity,
                                        ease: 'linear',
                                    }}
                                    className='absolute inset-0 pointer-events-none z-40'
                                    style={{
                                        background:
                                            'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.05) 45%, rgba(255,255,255,0.025) 50%, transparent 55%)',
                                    }}
                                />
                            )}

                            {/* ── Content ── */}
                            <div
                                className='relative z-30 p-6'
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            >
                                {/* Header */}
                                <div className='flex items-start justify-between mb-4'>
                                    <div className='flex items-center gap-3'>
                                        <div className='flex items-center justify-center w-10 h-10 rounded-[12px] bg-white/[0.07] border border-white/[0.1]'>
                                            <GoogleDriveIcon className='w-5 h-5' />
                                        </div>
                                        <h2 className='text-[15px] font-semibold text-white/95 tracking-[-0.01em]'>
                                            Connect to Google Drive
                                        </h2>
                                    </div>
                                    <button
                                        onClick={handleClose}
                                        className='flex items-center justify-center w-7 h-7 rounded-lg text-white/40 hover:text-white/80 hover:bg-white/[0.08] transition-all duration-150'
                                    >
                                        <CloseIcon className='w-3.5 h-3.5' />
                                    </button>
                                </div>

                                {/* Description */}
                                <p className='text-[13px] text-white/45 leading-[1.5] mb-5 pl-[52px]'>
                                    Grant access to your Google Drive files to
                                    use them as context for AI conversations.
                                </p>

                                {/* Features */}
                                <div className='space-y-2.5 mb-5'>
                                    {features.map((title, i) => (
                                        <div
                                            key={i}
                                            className='flex items-start gap-3 group'
                                        >
                                            <div className='flex-shrink-0 mt-[2px] text-emerald-400/70 group-hover:text-emerald-400 transition-colors duration-200'>
                                                <CheckCircle className='w-4 h-4' />
                                            </div>
                                            <div className='pt-[1px]'>
                                                <p className='text-[13px] font-medium text-white/80'>
                                                    {title}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Divider */}
                                <div className='h-px bg-white/[0.06] mb-4' />

                                {/* Buttons */}
                                <div className='flex items-center gap-2.5'>
                                    <button
                                        onClick={handleClose}
                                        className='flex-1 h-9 rounded-[12px] text-[13px] font-medium text-white/50 hover:text-white/80 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-150'
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleConnect}
                                        disabled={isConnecting}
                                        className='relative flex-1 h-9 rounded-[12px] text-[13px] font-semibold text-neutral-900 bg-white hover:bg-white/90 shadow-sm shadow-white/10 transition-all duration-150 overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed'
                                    >
                                        <span className='relative flex items-center justify-center gap-2'>
                                            {isConnecting ? (
                                                <>
                                                    <svg
                                                        className='animate-spin w-3.5 h-3.5'
                                                        viewBox='0 0 24 24'
                                                        fill='none'
                                                    >
                                                        <circle
                                                            className='opacity-25'
                                                            cx='12'
                                                            cy='12'
                                                            r='10'
                                                            stroke='currentColor'
                                                            strokeWidth='3'
                                                        />
                                                        <path
                                                            className='opacity-75'
                                                            fill='currentColor'
                                                            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z'
                                                        />
                                                    </svg>
                                                    Connecting…
                                                </>
                                            ) : (
                                                <>
                                                    <GoogleDriveIcon className='w-3.5 h-3.5' />
                                                    Connect Google Drive
                                                </>
                                            )}
                                        </span>
                                    </button>
                                </div>

                                {/* Footer */}
                                <p className='mt-3.5 text-[10.5px] text-white/25 leading-[1.5] text-center'>
                                    We&apos;ll only access the files you
                                    select. You can disconnect at any time from
                                    Account Settings.
                                </p>
                            </div>
                        </div>
                    </LiquidGlassCard>
                </motion.div>
            </div>
        </>
    );
};