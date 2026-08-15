// components/FeedbackCard.tsx
"use client";

import { useState, useEffect } from "react";
import {
    Send, ExternalLink, X
} from "lucide-react";

type RatingKey = "bad" | "poor" | "okay" | "good" | "love";
type FeedbackState = "idle" | "feedback" | "submitted";

interface RatingOption {
    key: RatingKey;
    label: string;
    icon: React.ReactNode;
}

const ratings: RatingOption[] = [
    {
        key: "bad",
        label: "Bad",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 14V2" />
                <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
            </svg>
        ),
    },
    {
        key: "poor",
        label: "Poor",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
                <line x1="9" y1="9" x2="9.01" y2="9" />
                <line x1="15" y1="9" x2="15.01" y2="9" />
            </svg>
        ),
    },
    {
        key: "okay",
        label: "Okay",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="8" y1="15" x2="16" y2="15" />
                <line x1="9" y1="9" x2="9.01" y2="9" />
                <line x1="15" y1="9" x2="15.01" y2="9" />
            </svg>
        ),
    },
    {
        key: "good",
        label: "Good",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <line x1="9" y1="9" x2="9.01" y2="9" />
                <line x1="15" y1="9" x2="15.01" y2="9" />
            </svg>
        ),
    },
    {
        key: "love",
        label: "Love it",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
        ),
    },
];

const ratingActiveColors: Record<RatingKey, { text: string; bg: string; border: string; glow: string; accent: string }> = {
    bad:    { text: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/40", glow: "rgba(239,68,68,0.35)", accent: "#f87171" },
    poor:   { text: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/40", glow: "rgba(249,115,22,0.35)", accent: "#fb923c" },
    okay:   { text: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/40", glow: "rgba(245,158,11,0.35)", accent: "#fbbf24" },
    good:   { text: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/40", glow: "rgba(16,185,129,0.35)", accent: "#34d399" },
    love: { 
        text: "text-rose-500", 
        bg: "bg-rose-500/15", 
        border: "border-rose-400/50", 
        glow: "rgba(251,113,133,0.4)", 
        accent: "#fb7185" 
      }
};

export default function FeedbackCard({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const [state, setState] = useState<FeedbackState>("idle");
    const [selectedRating, setSelectedRating] = useState<RatingKey | null>(null);
    const [feedbackText, setFeedbackText] = useState("");
    const [mounted, setMounted] = useState(false);
    const [exiting, setExiting] = useState(false);
    const [hoveredRating, setHoveredRating] = useState<RatingKey | null>(null);

    const isPositive = selectedRating === "good" || selectedRating === "love";
    const canSend = feedbackText.trim().length > 0;

    useEffect(() => {
        if (isOpen) {
            setMounted(true);
            setExiting(false);
        } else if (mounted) {
            setExiting(true);
            const t = setTimeout(() => {
                setMounted(false);
                setExiting(false);
            }, 320);
            return () => clearTimeout(t);
        }
    }, [isOpen, mounted]);

    function handleRatingSelect(key: RatingKey) {
        setSelectedRating(key);
        setState("feedback");
    }

    function handleSendFeedback() {
        if (isPositive && !canSend) return;
        setState("submitted");
    }

    function handleClose() {
        setExiting(true);
        setTimeout(() => {
            setState("idle");
            setSelectedRating(null);
            setFeedbackText("");
            setMounted(false);
            setExiting(false);
            onClose();
        }, 320);
    }

    if (!mounted) return null;

    const activeColor = selectedRating ? ratingActiveColors[selectedRating] : null;

    return (
        <>
            <style>{`
                /* ---- Core Card ---- */
                @keyframes glassIn {
                    0% { opacity: 0; transform: scale(0.88) translateY(20px); filter: blur(8px); }
                    50% { filter: blur(0px); }
                    65% { transform: scale(1.015) translateY(-3px); }
                    100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0px); }
                }
                @keyframes glassOut {
                    0% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0px); }
                    100% { opacity: 0; transform: scale(0.88) translateY(20px); filter: blur(8px); }
                }

                /* ---- Backdrop ---- */
                @keyframes backdropIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes backdropOut { from { opacity: 1; } to { opacity: 0; } }

                /* ---- Liquid blob ---- */
                @keyframes blobMove1 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    25% { transform: translate(30px, -20px) scale(1.1); }
                    50% { transform: translate(-10px, 20px) scale(0.95); }
                    75% { transform: translate(-25px, -10px) scale(1.05); }
                }
                @keyframes blobMove2 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    25% { transform: translate(-25px, 15px) scale(1.08); }
                    50% { transform: translate(20px, -15px) scale(0.92); }
                    75% { transform: translate(15px, 25px) scale(1.04); }
                }
                @keyframes blobMove3 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(20px, 10px) scale(1.12); }
                    66% { transform: translate(-15px, -20px) scale(0.9); }
                }

                /* ---- Rating Stagger ---- */
                @keyframes ratingStagger {
                    from { opacity: 0; transform: translateY(14px) scale(0.7); filter: blur(4px); }
                    to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0px); }
                }

                /* ---- Select Bounce ---- */
                @keyframes selectBounce {
                    0% { transform: scale(1); }
                    25% { transform: scale(1.18); }
                    45% { transform: scale(0.92); }
                    65% { transform: scale(1.06); }
                    85% { transform: scale(0.98); }
                    100% { transform: scale(1); }
                }

                /* ---- Glow Pulse ---- */
                @keyframes glowPulse {
                    0%, 100% { opacity: 0.4; transform: scale(1); }
                    50% { opacity: 0.7; transform: scale(1.05); }
                }

                /* ---- Feedback Slide ---- */
                @keyframes feedbackSlide {
                    from { opacity: 0; transform: translateY(12px); max-height: 0; }
                    to { opacity: 1; transform: translateY(0); max-height: 300px; }
                }

                /* ---- Thank You ---- */
                @keyframes checkDraw { to { stroke-dashoffset: 0; } }
                @keyframes checkCircleScale {
                    0% { transform: scale(0) rotate(-45deg); opacity: 0; }
                    50% { transform: scale(1.2) rotate(5deg); }
                    100% { transform: scale(1) rotate(0deg); opacity: 1; }
                }
                @keyframes ringExpand {
                    0% { transform: scale(0.8); opacity: 0.6; }
                    100% { transform: scale(2.2); opacity: 0; }
                }
                @keyframes thankFade {
                    from { opacity: 0; transform: translateY(10px) scale(0.95); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }

                /* ---- Button Shimmer & Glow ---- */
                @keyframes btnShimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
                @keyframes btnGlow {
                    0%, 100% { box-shadow: 0 4px 15px rgba(0,0,0,0.2), 0 0 0px rgba(52, 211, 153, 0); }
                    50% { box-shadow: 0 4px 15px rgba(0,0,0,0.2), 0 0 20px rgba(52, 211, 153, 0.4); }
                }
                @keyframes btnShineSweep {
                    0% { transform: translateX(-150%) skewX(-25deg); }
                    100% { transform: translateX(250%) skewX(-25deg); }
                }

                /* ---- Love Pulse ---- */
                @keyframes lovePulse {
                    0%, 100% { transform: scale(1); }
                    15% { transform: scale(1.2); }
                    30% { transform: scale(0.95); }
                    45% { transform: scale(1.1); }
                }

                /* ---- Textarea glow border ---- */
                @keyframes borderGlow {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 0.7; }
                }

                /* ---- Disabled pulse ---- */
                @keyframes disabledPulse {
                    0%, 100% { opacity: 0.5; }
                    50% { opacity: 0.7; }
                }

                .glass-enter { animation: glassIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                .glass-exit { animation: glassOut 0.32s ease-in forwards; }
                .backdrop-enter { animation: backdropIn 0.35s ease-out forwards; }
                .backdrop-exit { animation: backdropOut 0.3s ease-in forwards; }
                .rating-item { animation: ratingStagger 0.5s cubic-bezier(0.16, 1, 0.3, 1) both; }
                .rating-bounce { animation: selectBounce 0.55s cubic-bezier(0.34, 1.56, 0.64, 1); }
                .glow-pulse { animation: glowPulse 2s ease-in-out infinite; }
                .feedback-slide { animation: feedbackSlide 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; overflow: hidden; }
                .check-draw { stroke-dasharray: 30; stroke-dashoffset: 30; animation: checkDraw 0.6s 0.4s ease-out forwards; }
                .check-circle { animation: checkCircleScale 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
                .ring-expand { animation: ringExpand 0.8s 0.2s ease-out forwards; }
                .thank-fade-1 { animation: thankFade 0.5s 0.45s cubic-bezier(0.16, 1, 0.3, 1) both; }
                .thank-fade-2 { animation: thankFade 0.5s 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }
                .btn-shimmer {
                    background-image: linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.08) 50%, transparent 75%);
                    background-size: 200% 100%;
                }
                .btn-shimmer:not(:disabled):hover { animation: btnShimmer 1.5s ease-in-out; }
                .love-pulse { animation: lovePulse 2s ease-in-out infinite; }
                .blob-1 { animation: blobMove1 8s ease-in-out infinite; }
                .blob-2 { animation: blobMove2 10s ease-in-out infinite; }
                .blob-3 { animation: blobMove3 12s ease-in-out infinite; }
                .border-glow { animation: borderGlow 2.5s ease-in-out infinite; }

                /* Glass liquid surface - Fixed Border & Contrast */
                .liquid-glass {
                    background: linear-gradient(
                        135deg,
                        rgba(255,255,255,0.75) 0%,
                        rgba(255,255,255,0.5) 40%,
                        rgba(255,255,255,0.35) 100%
                    );
                    backdrop-filter: blur(40px) saturate(1.8);
                    -webkit-backdrop-filter: blur(40px) saturate(1.8);
                    border: 1px solid rgba(255,255,255,0.6); /* Stronger border to prevent blend */
                    box-shadow:
                        0 8px 32px rgba(0,0,0,0.12),
                        0 2px 8px rgba(0,0,0,0.06),
                        inset 0 1px 0 rgba(255,255,255,0.8),
                        inset 0 -1px 0 rgba(255,255,255,0.2);
                }

                /* Liquid glass rating pill */
                .liquid-pill {
                    background: rgba(255,255,255,0.4);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border: 1px solid rgba(255,255,255,0.5); /* Stronger border */
                    box-shadow: 0 2px 8px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.5);
                    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .liquid-pill:hover {
                    background: rgba(255,255,255,0.6);
                    box-shadow: 0 4px 16px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6);
                }

                /* Liquid glass active pill */
                .liquid-pill-active {
                    backdrop-filter: blur(16px);
                    -webkit-backdrop-filter: blur(16px);
                    border-width: 1.5px;
                    border-style: solid;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6);
                }

                /* Liquid glass textarea */
                .liquid-textarea {
                    background: rgba(255,255,255,0.45);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border: 1.5px solid rgba(255,255,255,0.5);
                    box-shadow: inset 0 1px 0 rgba(255,255,255,0.5), 0 2px 8px rgba(0,0,0,0.04);
                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .liquid-textarea:focus {
                    background: rgba(255,255,255,0.65);
                    border-color: rgba(255,255,255,0.8);
                    box-shadow:
                        inset 0 1px 0 rgba(255,255,255,0.6),
                        0 4px 20px rgba(0,0,0,0.08),
                        0 0 0 3px rgba(16,185,129,0.12);
                }

                /* Liquid glass button - Premium Effects Added */
                .liquid-btn {
                    background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border: 1px solid rgba(255,255,255,0.15);
                    box-shadow: 0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1);
                    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                    position: relative;
                    overflow: hidden;
                    isolation: isolate;
                }
                .liquid-btn:not(:disabled) {
                    animation: btnGlow 2.5s ease-in-out infinite;
                }
                .liquid-btn::before {
                    content: '';
                    position: absolute;
                    top: 0; left: 0;
                    width: 100%; height: 100%;
                    background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%);
                    transform: translateX(-150%) skewX(-25deg);
                    z-index: 1;
                    pointer-events: none;
                }
                .liquid-btn:not(:disabled):hover::before {
                    animation: btnShineSweep 0.8s ease-out forwards;
                }
                .liquid-btn:not(:disabled):hover {
                    transform: translateY(-2px);
                    background: linear-gradient(135deg, #374151 0%, #1f2937 100%);
                }
                .liquid-btn:not(:disabled):active {
                    transform: translateY(0) scale(0.97);
                    box-shadow: 0 2px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1);
                }
                .liquid-btn:disabled {
                    background: linear-gradient(135deg, rgba(80,80,80,0.6) 0%, rgba(60,60,60,0.5) 100%);
                    border-color: rgba(255,255,255,0.05);
                    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
                    cursor: not-allowed;
                    animation: disabledPulse 2.5s ease-in-out infinite;
                }

                /* Glass close button */
                .glass-close {
                    background: rgba(255,255,255,0.3);
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                    border: 1px solid rgba(255,255,255,0.4);
                    transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .glass-close:hover {
                    background: rgba(255,255,255,0.5);
                    transform: rotate(90deg) scale(1.1);
                    box-shadow: 0 2px 12px rgba(0,0,0,0.1);
                }
            `}</style>

            <div className="fixed inset-0 z-50 flex items-center justify-center">
                {/* Backdrop */}
                <div
                    className={`absolute inset-0 bg-black/30 backdrop-blur-md ${exiting ? "backdrop-exit" : "backdrop-enter"}`}
                    onClick={handleClose}
                />

                {/* Card */}
                <div
                    className={`relative z-10 w-full max-w-[520px] mx-4 rounded-3xl p-7 overflow-hidden ${exiting ? "glass-exit" : "glass-enter"}`}
                    style={{ background: "transparent" }}
                >
                    {/* === LIQUID BLOBS (background) === */}
                    <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                        <div
                            className="blob-1 absolute -top-10 -left-10 w-40 h-40 rounded-full opacity-30 blur-3xl"
                            style={{ background: activeColor?.accent || "#34d399" }}
                        />
                        <div
                            className="blob-2 absolute -bottom-8 -right-8 w-36 h-36 rounded-full opacity-25 blur-3xl"
                            style={{ background: activeColor?.accent || "#60a5fa" }}
                        />
                        <div
                            className="blob-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full opacity-20 blur-2xl"
                            style={{ background: activeColor?.accent || "#a78bfa" }}
                        />
                    </div>

                    {/* === GLASS SURFACE === */}
                    <div className="liquid-glass relative z-10 rounded-3xl p-7">
                        {state === "submitted" ? (
                            /* ---------- THANK YOU STATE ---------- */
                            <div className="flex flex-col items-center justify-center py-8 text-center">
                                {/* Expanding ring */}
                                <div className="relative flex items-center justify-center mb-6">
                                    <div
                                        className="absolute w-16 h-16 rounded-full ring-expand opacity-0"
                                        style={{ border: `2px solid ${activeColor?.accent || "#34d399"}` }}
                                    />
                                    <div className="w-16 h-16 rounded-full flex items-center justify-center check-circle opacity-0"
                                        style={{
                                            background: `linear-gradient(135deg, ${activeColor?.accent || "#34d399"}22, ${activeColor?.accent || "#34d399"}44)`,
                                            border: `1.5px solid ${activeColor?.accent || "#34d399"}55`,
                                            boxShadow: `0 4px 20px ${activeColor?.accent || "#34d399"}33`
                                        }}
                                    >
                                        <svg
                                            width="28"
                                            height="28"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke={activeColor?.accent || "#10b981"}
                                            strokeWidth="2.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="check-draw"
                                        >
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    </div>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-1.5 thank-fade-1 opacity-0">
                                    Thank you!
                                </h3>
                                <p className="text-sm text-gray-600 max-w-[240px] thank-fade-2 opacity-0">
                                    Your feedback helps us improve.
                                </p>
                            </div>
                        ) : (
                            <>
                                {/* ---------- HEADER ---------- */}
                                <div className="text-center mb-7">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                        How&apos;s your experience?
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Your feedback shapes what we build next.
                                    </p>
                                </div>

                                {/* ---------- RATING OPTIONS ---------- */}
                                <div className="flex items-center justify-center gap-2 mb-6">
                                    {ratings.map((option, i) => {
                                        const isSelected = selectedRating === option.key;
                                        const isHovered = hoveredRating === option.key && !isSelected;
                                        const colors = ratingActiveColors[option.key];
                                        return (
                                            <button
                                                key={option.key}
                                                onClick={() => handleRatingSelect(option.key)}
                                                onMouseEnter={() => setHoveredRating(option.key)}
                                                onMouseLeave={() => setHoveredRating(null)}
                                                style={{ animationDelay: `${i * 70}ms` }}
                                                className={`
                                                    rating-item relative flex flex-col items-center gap-2 px-4 py-3.5 rounded-2xl cursor-pointer min-w-[68px]
                                                    hover:scale-110 hover:-translate-y-1.5
                                                    active:scale-95
                                                    ${isSelected
                                                        ? `liquid-pill-active ${colors.bg} ${colors.text} ${colors.border} shadow-lg rating-bounce`
                                                        : isHovered
                                                            ? `liquid-pill ${colors.bg} ${colors.text}`
                                                            : `liquid-pill text-gray-500 hover:text-gray-700`
                                                    }
                                                `}
                                            >
                                                {/* Glow ring on selected */}
                                                {isSelected && (
                                                    <span
                                                        className="glow-pulse absolute -inset-1 rounded-2xl pointer-events-none"
                                                        style={{
                                                            background: `radial-gradient(ellipse at center, ${colors.glow}, transparent 70%)`,
                                                        }}
                                                    />
                                                )}
                                                <span className={`relative z-10 [&>svg]:w-[22px] [&>svg]:h-[22px] transition-transform duration-300 ${isSelected && option.key === "love" ? "love-pulse" : ""}`}>
                                                    {option.icon}
                                                </span>
                                                <span className="relative z-10 text-[11px] font-medium leading-none tracking-wide text-gray-700">
                                                    {option.label}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* ---------- FEEDBACK AREA ---------- */}
                                {state === "feedback" && (
                                    <div className="feedback-slide">
                                        {isPositive ? (
                                            <div className="flex flex-col gap-3.5">
                                                {/* Textarea wrapper */}
                                                <div className="relative group">
                                                    <textarea
                                                        value={feedbackText}
                                                        onChange={(e) => setFeedbackText(e.target.value)}
                                                        placeholder="Tell us what's on your mind..."
                                                        rows={3}
                                                        className="liquid-textarea w-full resize-none rounded-2xl px-4 py-3.5 text-sm text-gray-900 placeholder:text-gray-500 outline-none"
                                                    />
                                                    {/* Animated focus border glow */}
                                                    <div
                                                        className="border-glow absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"
                                                        style={{
                                                            boxShadow: `inset 0 0 0 1.5px ${activeColor?.accent || "#34d399"}44, 0 0 16px ${activeColor?.accent || "#34d399"}11`
                                                        }}
                                                    />
                                                    {/* Character indicator */}
                                                    <div className="absolute bottom-2.5 right-3.5 flex items-center gap-1.5">
                                                        {feedbackText.length > 0 && (
                                                            <span className={`text-[10px] font-medium transition-all duration-300 ${canSend ? "text-emerald-600" : "text-gray-400"}`}>
                                                                {feedbackText.length}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Send button (Enhanced) */}
                                                <div className="relative group/btn">
                                                    <button
                                                        onClick={handleSendFeedback}
                                                        disabled={!canSend}
                                                        className="btn-shimmer liquid-btn relative w-full py-3 rounded-2xl text-white text-sm font-medium flex items-center justify-center gap-2.5 overflow-hidden"
                                                    >
                                                        {/* Disabled overlay text */}
                                                        {!canSend && (
                                                            <span className="absolute inset-0 flex items-center justify-center text-xs text-white/40 font-medium z-20">
                                                                Type something to send...
                                                            </span>
                                                        )}
                                                        <Send className={`relative z-10 w-4 h-4 shrink-0 transition-all duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 ${canSend ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`} />
                                                        <span className={`relative z-10 transition-all duration-300 ${canSend ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"}`}>
                                                            Send feedback
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={handleSendFeedback}
                                                className="btn-shimmer liquid-btn relative w-full py-3 rounded-2xl text-white text-sm font-medium flex items-center justify-center gap-2.5 overflow-hidden group"
                                            >
                                                <ExternalLink className="relative z-10 w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                                <span className="relative z-10">Open a support ticket</span>
                                            </button>
                                        )}
                                    </div>
                                )}
                            </>
                        )}

                        {/* ---------- CLOSE BUTTON ---------- */}
                        <button
                            onClick={handleClose}
                            className="glass-close absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-full text-gray-600 hover:text-gray-900 cursor-pointer z-20"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}