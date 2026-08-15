"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { X, Maximize2, Minimize2 } from "lucide-react";
import { motion } from "framer-motion";
import { LiquidGlassCard } from "@/components/ui/liquid-glass";
import ReferralContent from "./ReferralContent";

export function ReferralModal({
    isOpen = true,
    onClose,
}: {
    isOpen?: boolean;
    onClose?: () => void;
}) {
    const [isMaximized, setIsMaximized] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [phase, setPhase] = useState<
        "closed" | "opening" | "open" | "closing"
    >("closed");

    // ── Dynamic hue shift ──
    const [tint, setTint] = useState(0);
    useEffect(() => {
        if (!isVisible) return;
        const id = setInterval(
            () => setTint((p) => (p + 0.3) % 360),
            50
        );
        return () => clearInterval(id);
    }, [isVisible]);

    // ── Phase: OPEN trigger ──
    useEffect(() => {
        if (isOpen && phase === "closed") {
            setIsVisible(true);
            requestAnimationFrame(() => setPhase("opening"));
        }
        // Parent force-closed while open
        if (!isOpen && (phase === "open" || phase === "opening")) {
            setPhase("closing");
        }
    }, [isOpen, phase]);

    // ── Phase: opening → open ──
    useEffect(() => {
        if (phase === "opening") {
            const t = setTimeout(() => setPhase("open"), 650);
            return () => clearTimeout(t);
        }
    }, [phase]);

    // ── Phase: closing → closed → notify parent ──
    useEffect(() => {
        if (phase === "closing") {
            const t = setTimeout(() => {
                setIsVisible(false);
                setPhase("closed");
                setIsMaximized(false);
                onClose?.();
            }, 520);
            return () => clearTimeout(t);
        }
    }, [phase, onClose]);

    // ── Close handler (button / backdrop / escape) ──
    const handleClose = useCallback(() => {
        if (phase === "closing" || phase === "closed") return;
        setPhase("closing");
    }, [phase]);

    // ── Escape key ──
    useEffect(() => {
        if (!isVisible) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") handleClose();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [isVisible, handleClose]);

    const liquidSpring = "cubic-bezier(0.5, 1.5, 0.5, 1)";

    // ── Liquid burst particles ──
    const particles = useMemo(
        () =>
            Array.from({ length: 16 }, (_, i) => ({
                id: i,
                angle:
                    (i / 16) * Math.PI * 2 +
                    (Math.random() - 0.5) * 0.4,
                distance: 60 + Math.random() * 90,
                size: 3 + Math.random() * 5,
                delay: Math.random() * 0.1,
                duration: 0.35 + Math.random() * 0.35,
            })),
        []
    );

    // ── Implosion particles (close) ──
    const implosionParticles = useMemo(
        () =>
            Array.from({ length: 10 }, (_, i) => ({
                id: i,
                angle: (i / 10) * Math.PI * 2,
                distance: 100 + Math.random() * 60,
                size: 2 + Math.random() * 4,
                delay: Math.random() * 0.08,
            })),
        []
    );

    // ── Container animation variants ──
    const clipCloseOrigin = isMaximized ? "96% 3%" : "96% 5%";

    const containerAnim = {
        opening: {
            clipPath: "circle(150% at 50% 50%)",
            scale: [1, 1.012, 0.995, 1.005, 1],
            opacity: 1,
            filter: "blur(0px)",
            transition: {
                clipPath: {
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                },
                scale: {
                    duration: 0.7,
                    ease: "easeOut",
                },
                opacity: { duration: 0.25 },
                filter: { duration: 0.4 },
            },
        },
        open: {
            clipPath: "circle(150% at 50% 50%)",
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
        },
        closing: {
            clipPath: `circle(0% at ${clipCloseOrigin})`,
            scale: 0.88,
            opacity: 0,
            filter: "blur(10px)",
            transition: {
                clipPath: {
                    duration: 0.45,
                    ease: [0.65, 0, 0.35, 1],
                },
                scale: {
                    duration: 0.4,
                    ease: [0.65, 0, 0.35, 1],
                },
                opacity: { duration: 0.25, delay: 0.12 },
                filter: { duration: 0.35 },
            },
        },
        closed: {
            clipPath: `circle(0% at ${clipCloseOrigin})`,
            scale: 0.88,
            opacity: 0,
            filter: "blur(10px)",
        },
    };

    if (!isVisible) return null;

    return (
        <motion.div
            key="referral-backdrop"
            className={`fixed inset-0 z-50 flex items-center justify-center ${
                isMaximized ? "p-0" : "p-4"
            }`}
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={
                phase === "opening"
                    ? { opacity: 1, backdropFilter: "blur(6px)" }
                    : phase === "closing"
                      ? {
                            opacity: 0,
                            backdropFilter: "blur(0px)",
                            transition: { duration: 0.4 },
                        }
                      : {
                            opacity: 1,
                            backdropFilter: "blur(6px)",
                        }
            }
            style={{ WebkitBackdropFilter: "blur(6px)" }}
        >
            {/* ── Backdrop ── */}
            <motion.div
                className="absolute inset-0"
                style={{
                    background: isMaximized
                        ? "rgba(0,0,0,0.55)"
                        : "rgba(0,0,0,0.35)",
                    WebkitBackdropFilter: isMaximized
                        ? "blur(12px)"
                        : "blur(6px)",
                    transition: `all 0.4s ${liquidSpring}`,
                }}
                onClick={handleClose}
            />

            {/* ── Floating Orbs ── */}
            <motion.div
                className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
                style={{
                    background:
                        "radial-gradient(circle, rgba(255,140,58,0.18) 0%, transparent 70%)",
                    filter: "blur(60px)",
                    top: "10%",
                    left: "15%",
                }}
                animate={{
                    x: [0, 30, -20, 0],
                    y: [0, -20, 15, 0],
                    scale: [1, 1.1, 0.95, 1],
                    opacity:
                        phase === "closing"
                            ? [1, 0]
                            : phase === "opening"
                              ? [0, 1]
                              : 1,
                }}
                transition={{
                    duration: 8,
                    repeat: phase === "open" ? Infinity : 0,
                    ease: "easeInOut",
                    opacity: { duration: 0.4 },
                }}
            />
            <motion.div
                className="absolute w-[300px] h-[300px] rounded-full pointer-events-none"
                style={{
                    background:
                        "radial-gradient(circle, rgba(254,212,163,0.14) 0%, transparent 70%)",
                    filter: "blur(50px)",
                    bottom: "15%",
                    right: "10%",
                }}
                animate={{
                    x: [0, -25, 15, 0],
                    y: [0, 18, -12, 0],
                    scale: [1, 0.9, 1.08, 1],
                    opacity:
                        phase === "closing"
                            ? [1, 0]
                            : phase === "opening"
                              ? [0, 1]
                              : 1,
                }}
                transition={{
                    duration: 7,
                    repeat: phase === "open" ? Infinity : 0,
                    ease: "easeInOut",
                    opacity: { duration: 0.4, delay: 0.05 },
                }}
            />
            <motion.div
                className="absolute w-[200px] h-[200px] rounded-full pointer-events-none"
                style={{
                    background:
                        "radial-gradient(circle, rgba(255,200,100,0.1) 0%, transparent 70%)",
                    filter: "blur(40px)",
                    top: "50%",
                    right: "30%",
                }}
                animate={{
                    x: [0, 15, -10, 0],
                    y: [0, -12, 8, 0],
                    scale: [1, 1.15, 0.9, 1],
                    opacity:
                        phase === "closing"
                            ? [1, 0]
                            : phase === "opening"
                              ? [0, 1]
                              : 1,
                }}
                transition={{
                    duration: 9,
                    repeat: phase === "open" ? Infinity : 0,
                    ease: "easeInOut",
                    opacity: { duration: 0.4, delay: 0.1 },
                }}
            />

            {/* ── Close Ripple (closing phase) ── */}
            {phase === "closing" && (
                <motion.div
                    className="absolute pointer-events-none z-[100] rounded-full"
                    style={{
                        top: isMaximized ? "20px" : "28px",
                        right: isMaximized ? "28px" : "36px",
                        width: 28,
                        height: 28,
                        background:
                            "radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(255,200,100,0.2) 40%, transparent 70%)",
                    }}
                    initial={{ scale: 0, opacity: 0.9 }}
                    animate={{ scale: 35, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                />
            )}

            {/* ── Size Controller + clip-path morph ── */}
            <motion.div
                initial={{
                    clipPath: "circle(0% at 50% 50%)",
                    scale: 0.75,
                    opacity: 0,
                    filter: "blur(10px)",
                }}
                animate={containerAnim[phase]}
                className="relative overflow-hidden"
                style={{
                    width: isMaximized
                        ? "100%"
                        : "min(880px, calc(100vw - 32px))",
                    height: isMaximized ? "100%" : "auto",
                    minHeight: isMaximized ? undefined : "580px",
                    borderRadius: isMaximized ? 0 : 32,
                    transition: `width 0.4s ${liquidSpring}, height 0.4s ${liquidSpring}, min-height 0.4s ${liquidSpring}, border-radius 0.3s ease`,
                }}
            >
                {/* ── Glass Materialize Overlay ── */}
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        zIndex: 35,
                        borderRadius: isMaximized ? 0 : 32,
                        background: "rgba(248,249,252,0.95)",
                    }}
                    initial={{ opacity: 1 }}
                    animate={
                        phase === "opening"
                            ? { opacity: 0 }
                            : phase === "closing"
                              ? { opacity: 1 }
                              : { opacity: 0 }
                    }
                    transition={{
                        duration: 0.45,
                        delay: phase === "opening" ? 0.12 : 0,
                        ease: "easeOut",
                    }}
                />

                {/* ── Glow Ring (opening) ── */}
                <motion.div
                    className="absolute inset-[-30px] pointer-events-none"
                    style={{
                        zIndex: 25,
                        borderRadius: isMaximized ? 0 : 52,
                        background:
                            "radial-gradient(ellipse, rgba(255,180,100,0.2) 0%, transparent 70%)",
                        filter: "blur(25px)",
                    }}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={
                        phase === "opening"
                            ? {
                                  opacity: [0, 0.7, 0.3],
                                  scale: [0.7, 1.08, 1],
                              }
                            : phase === "closing"
                              ? { opacity: 0, scale: 0.7 }
                              : { opacity: 0.3, scale: 1 }
                    }
                    transition={{ duration: 0.7, ease: "easeOut" }}
                />

                {/* ── Liquid Burst Particles (opening) ── */}
                {phase === "opening" && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[100]">
                        {particles.map((p) => (
                            <motion.div
                                key={p.id}
                                className="absolute rounded-full"
                                style={{
                                    width: p.size,
                                    height: p.size,
                                    background:
                                        "rgba(255,255,255,0.8)",
                                    boxShadow:
                                        "0 0 8px rgba(255,200,100,0.6), 0 0 2px rgba(255,255,255,0.9)",
                                }}
                                initial={{
                                    x: 0,
                                    y: 0,
                                    opacity: 0,
                                    scale: 0,
                                }}
                                animate={{
                                    x: Math.cos(p.angle) * p.distance,
                                    y: Math.sin(p.angle) * p.distance,
                                    opacity: [0, 1, 0],
                                    scale: [0, 1.2, 0.2],
                                }}
                                transition={{
                                    delay: 0.06 + p.delay,
                                    duration: p.duration,
                                    ease: "easeOut",
                                }}
                            />
                        ))}
                    </div>
                )}

                {/* ── Implosion Particles (closing) ── */}
                {phase === "closing" && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[100]">
                        {implosionParticles.map((p) => (
                            <motion.div
                                key={p.id}
                                className="absolute rounded-full"
                                style={{
                                    width: p.size,
                                    height: p.size,
                                    background:
                                        "rgba(255,255,255,0.6)",
                                    boxShadow:
                                        "0 0 6px rgba(255,180,100,0.4)",
                                }}
                                initial={{
                                    x: Math.cos(p.angle) * p.distance,
                                    y: Math.sin(p.angle) * p.distance,
                                    opacity: 0.8,
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
                    width="100%"
                    height="100%"
                    blurIntensity="xl"
                    shadowIntensity="md"
                    glowIntensity="sm"
                    borderRadius="0px"
                    className="overflow-hidden"
                >
                    {/* Content above glass layers */}
                    <div
                        className="relative z-30 flex flex-col w-full h-full overflow-hidden"
                        style={{
                            minHeight: isMaximized
                                ? "100vh"
                                : "580px",
                            background: `linear-gradient(135deg, rgba(248,249,252,0.88) 0%, rgba(255,255,255,0.75) 40%, hsla(${tint}, 60%, 70%, 0.06) 100%)`,
                            transition: `min-height 0.4s ${liquidSpring}`,
                        }}
                    >
                        {/* Top edge highlight */}
                        <div
                            className="absolute top-0 left-0 right-0 h-[1px] z-40 pointer-events-none"
                            style={{
                                background:
                                    "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 30%, rgba(255,255,255,0.95) 50%, rgba(255,255,255,0.8) 70%, transparent 100%)",
                            }}
                        />

                        {/* Hover shimmer */}
                        {phase === "open" && (
                            <>
                                {isHovered && (
                                    <motion.div
                                        key="shimmer"
                                        initial={{
                                            x: "-100%",
                                            opacity: 0,
                                        }}
                                        animate={{
                                            x: "200%",
                                            opacity: 1,
                                        }}
                                        exit={{ opacity: 0 }}
                                        transition={{
                                            duration: 1.4,
                                            repeat: Infinity,
                                            ease: "linear",
                                        }}
                                        className="absolute inset-0 pointer-events-none z-40"
                                        style={{
                                            background:
                                                "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 45%, rgba(255,255,255,0.06) 50%, transparent 55%)",
                                        }}
                                    />
                                )}
                            </>
                        )}

                        {/* ── Controls Bar ── */}
                        <div className="flex items-center justify-between px-5 pt-4 pb-0 relative z-50 shrink-0">
                            {/* Drag dots */}
                            <div className="flex gap-[3px] opacity-25">
                                {[...Array(3)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="flex flex-col gap-[3px]"
                                    >
                                        {[...Array(2)].map((_, j) => (
                                            <div
                                                key={j}
                                                className="w-[3px] h-[3px] rounded-full bg-gray-500"
                                            />
                                        ))}
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center gap-1">
                                {/* Maximize / Minimize */}
                                <motion.button
                                    onClick={() =>
                                        setIsMaximized(!isMaximized)
                                    }
                                    className="p-2 text-gray-400 hover:text-gray-700 rounded-xl transition-all duration-200"
                                    style={{
                                        background: "transparent",
                                    }}
                                    onMouseEnter={(e) =>
                                        (e.currentTarget.style.background =
                                            "rgba(255,255,255,0.5)")
                                    }
                                    onMouseLeave={(e) =>
                                        (e.currentTarget.style.background =
                                            "transparent")
                                    }
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    title={
                                        isMaximized
                                            ? "Minimize"
                                            : "Maximize"
                                    }
                                >
                                    {isMaximized ? (
                                        <Minimize2 size={15} />
                                    ) : (
                                        <Maximize2 size={15} />
                                    )}
                                </motion.button>

                                {/* Close */}
                                <motion.button
                                    onClick={handleClose}
                                    className="p-2 text-gray-400 hover:text-red-500 rounded-xl transition-all duration-200"
                                    style={{
                                        background: "transparent",
                                    }}
                                    onMouseEnter={(e) =>
                                        (e.currentTarget.style.background =
                                            "rgba(239,68,68,0.08)")
                                    }
                                    onMouseLeave={(e) =>
                                        (e.currentTarget.style.background =
                                            "transparent")
                                    }
                                    whileHover={{
                                        scale: 1.1,
                                        rotate: 4,
                                    }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <X size={15} />
                                </motion.button>
                            </div>
                        </div>

                        {/* ── Main Content ── */}
                        <div
                            className="flex-1 overflow-hidden relative z-30"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            <ReferralContent
                                isMaximized={isMaximized}
                                phase={phase}
                            />
                        </div>
                    </div>
                </LiquidGlassCard>
            </motion.div>
        </motion.div>
    );
}