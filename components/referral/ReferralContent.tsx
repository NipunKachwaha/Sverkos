"use client";

import React, { useState } from "react";
import { Copy, Share2, Gift, ArrowLeft, Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

// Interface me phase add karo
interface ReferralContentProps {
    isMaximized: boolean;
    phase?: "closed" | "opening" | "open" | "closing";
}

const glass = (bgOpacity: number = 0.5) => ({
    background: `rgba(255,255,255,${bgOpacity})`,
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.4)",
    boxShadow: `
        inset 1px 1px 1px 0 rgba(255,255,255,0.35),
        inset -1px -1px 1px 0 rgba(255,255,255,0.35),
        0 4px 4px rgba(0,0,0,0.05),
        0 0 12px rgba(0,0,0,0.04),
        0 0 24px rgba(255,255,255,0.1)
    `,
});

const glassHover = `
    inset 1px 1px 1px 0 rgba(255,255,255,0.45),
    inset -1px -1px 1px 0 rgba(255,255,255,0.45),
    0 4px 16px rgba(0,0,0,0.08),
    0 0 24px rgba(255,255,255,0.18)
`;

// Component me phase receive karo
const ReferralContent: React.FC<ReferralContentProps> = ({ isMaximized, phase = "open" }) => {
    const [view, setView] = useState<"main" | "terms">("main");
    const [copied, setCopied] = useState(false);

    const referralLink =
        "https://app.Sverkos.com/register?ref=ZX0GJ7C711QX";

    const handleCopy = () => {
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const steps = [
        {
            icon: Share2,
            text: "Share your unique referral link with friends",
            gradient: "from-orange-400/20 to-amber-300/15",
            border: "rgba(255,180,100,0.25)",
        },
        {
            icon: Gift,
            text: (
                <>
                    They get{" "}
                    <span className="font-semibold">30 credits</span> when
                    they sign up
                </>
            ),
            gradient: "from-amber-400/20 to-yellow-300/15",
            border: "rgba(255,200,80,0.25)",
        },
        {
            icon: Gift,
            text: (
                <>
                    You earn{" "}
                    <span className="font-semibold">30 credits</span> when
                    they publish their first app and send a message
                </>
            ),
            gradient: "from-orange-500/20 to-red-300/15",
            border: "rgba(255,140,58,0.25)",
        },
    ];

    return (
        <AnimatePresence mode="wait">
            {view === "main" ? (
                /* ═══════ MAIN VIEW ═══════ */
                <motion.div
                    key="main"
                    className="flex w-full flex-col md:flex-row h-full"
                    // Main view ke motion.div me yeh changes karo:
                    initial={{ opacity: 0, x: -18, scale: 0.96 }}
                    animate={
                        phase === "opening"
                            ? { opacity: 1, x: 0, scale: 1 }
                            : phase === "closing"
                                ? { opacity: 0, scale: 0.96, y: -8 }
                                : { opacity: 1, x: 0, scale: 1 }
                    }
                    exit={{ opacity: 0, x: 18 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                >
                    {/* ── Left Panel — Animated Gradient ── */}
                    <div
                        className={cn(
                            "hidden md:block relative overflow-hidden",
                            isMaximized ? "w-[35%]" : "w-[45%]"
                        )}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-[#fdfbfb] via-[#fed4a3] to-[#ff8c3a]" />
                        <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px] mix-blend-overlay" />

                        {/* Blob 1 */}
                        <motion.div
                            className="absolute -left-14 top-16 h-48 w-48 rounded-full bg-white/35 blur-2xl"
                            animate={{
                                y: [0, 18, 0],
                                scale: [1, 1.08, 1],
                                x: [0, 8, 0],
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                        {/* Blob 2 */}
                        <motion.div
                            className="absolute bottom-10 right-8 h-36 w-36 rounded-full bg-orange-500/35 blur-2xl"
                            animate={{
                                y: [0, -16, 0],
                                x: [0, 10, 0],
                            }}
                            transition={{
                                duration: 5.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                        {/* Blob 3 */}
                        <motion.div
                            className="absolute inset-x-10 bottom-16 h-28 rounded-full bg-white/20 blur-xl"
                            animate={{ opacity: [0.35, 0.7, 0.35] }}
                            transition={{
                                duration: 3.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />

                        {/* Liquid glass circle accent */}
                        <motion.div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full"
                            style={{
                                background: "rgba(255,255,255,0.12)",
                                backdropFilter: "blur(16px)",
                                border: "1px solid rgba(255,255,255,0.3)",
                                boxShadow:
                                    "inset 0 0 30px rgba(255,255,255,0.15)",
                            }}
                            animate={{
                                scale: [1, 1.05, 0.98, 1],
                                rotate: [0, 5, -3, 0],
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <div className="w-full h-full flex items-center justify-center">
                                <motion.div
                                    animate={{ rotate: [0, 360] }}
                                    transition={{
                                        duration: 20,
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}
                                >
                                    <Sparkles
                                        className="text-white/70"
                                        size={32}
                                        strokeWidth={1.2}
                                    />
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Shimmer sweep */}
                        <motion.div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background:
                                    "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.2) 45%, rgba(255,255,255,0.05) 50%, transparent 55%)",
                                backgroundSize: "300% 100%",
                            }}
                            animate={{
                                backgroundPosition: ["200% 0", "-200% 0"],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                        />
                    </div>

                    {/* ── Right Panel — Content ── */}
                    <div
                        className={cn(
                            "w-full md:flex-1 flex flex-col relative h-full",
                            isMaximized
                                ? "px-12 pt-6 pb-4"
                                : "px-8 pt-10 pb-4"
                        )}
                    >
                        <div className="flex-1 overflow-y-auto custom-scrollbar">
                            {/* Title */}
                            <motion.h2
                                className="text-3xl md:text-4xl font-semibold text-gray-900 leading-tight mb-3"
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                // Title ke motion.h2 me delay badhao:
                                transition={{
                                    delay: phase === "opening" ? 0.2 : 0.05,
                                    duration: 0.25,
                                }}
                            >
                                Invite Friends & <br />
                                Earn Credits
                            </motion.h2>

                            {/* Subtitle */}
                            <motion.p
                                className="text-gray-600 text-[15px] mb-8 pr-4"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                // Subtitle me transition:
                                transition={{
                                    delay: phase === "opening" ? 0.28 : 0.1,
                                    duration: 0.25,
                                }}
                            >
                                Share your link and earn 30 credits when
                                friends publish their first app and send a
                                message
                            </motion.p>

                            {/* ── Link Box — Glass ── */}
                            <motion.div
                                className="flex items-center gap-2 mb-10"
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                // Link box me transition:
                                transition={{
                                    delay: phase === "opening" ? 0.35 : 0.15,
                                    duration: 0.25,
                                }}
                            >
                                <div
                                    className="flex-1 rounded-xl px-4 py-3.5 overflow-hidden transition-all duration-300"
                                    style={{
                                        ...glass(0.6),
                                        transition: "box-shadow 0.3s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.boxShadow =
                                            glassHover;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.boxShadow = `
                                            inset 1px 1px 1px 0 rgba(255,255,255,0.35),
                                            inset -1px -1px 1px 0 rgba(255,255,255,0.35),
                                            0 4px 4px rgba(0,0,0,0.05),
                                            0 0 12px rgba(0,0,0,0.04),
                                            0 0 24px rgba(255,255,255,0.1)
                                        `;
                                    }}
                                >
                                    <p className="text-[13px] font-mono text-gray-500 truncate select-all">
                                        {referralLink}
                                    </p>
                                </div>

                                <motion.button
                                    onClick={handleCopy}
                                    className={cn(
                                        "text-white px-5 py-3.5 rounded-xl flex items-center gap-2 shrink-0 font-medium text-sm transition-all duration-300",
                                        copied
                                            ? "bg-emerald-500 shadow-lg shadow-emerald-500/25"
                                            : "bg-gray-900 hover:bg-gray-800 shadow-lg shadow-gray-900/20"
                                    )}
                                    whileHover={{ y: -2, scale: 1.02 }}
                                    whileTap={{ scale: 0.96 }}
                                >
                                    <AnimatePresence
                                        mode="wait"
                                        initial={false}
                                    >
                                        <motion.span
                                            key={
                                                copied
                                                    ? "check"
                                                    : "copy"
                                            }
                                            initial={{
                                                opacity: 0,
                                                scale: 0.75,
                                                rotate: -12,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                scale: 1,
                                                rotate: 0,
                                            }}
                                            exit={{
                                                opacity: 0,
                                                scale: 0.75,
                                                rotate: 12,
                                            }}
                                            transition={{
                                                duration: 0.16,
                                            }}
                                            className="flex"
                                        >
                                            {copied ? (
                                                <Check size={16} />
                                            ) : (
                                                <Copy size={16} />
                                            )}
                                        </motion.span>
                                    </AnimatePresence>
                                    {copied ? "Copied!" : "Copy"}
                                </motion.button>
                            </motion.div>

                            {/* How it Works */}
                            <motion.h3
                                className="text-gray-500 font-medium text-sm mb-5"
                                // "How it Works" heading me:
                                initial={{ opacity: 0, y: 8 }}
                                animate={phase === "closing" ? { opacity: 0, y: -8 } : { opacity: 1, y: 0 }}
                                transition={{ delay: phase === "opening" ? 0.4 : 0.2 }}
                            >
                                How it Works
                            </motion.h3>

                            <div className="space-y-3">
                                {steps.map((step, i) => (
                                    <motion.div
                                        key={i}
                                        className="group flex gap-4 rounded-2xl p-3 -mx-1 cursor-default"
                                        // Steps map me
                                        initial={{ opacity: 0, x: -12, scale: 0.95 }}
                                        animate={phase === "closing"
                                            ? { opacity: 0, scale: 0.95 }
                                            : { opacity: 1, x: 0, scale: 1 }}
                                        transition={{
                                            delay:
                                                phase === "opening"
                                                    ? 0.45 + i * 0.06
                                                    : 0.25 + i * 0.04,
                                            duration: 0.25,
                                        }}
                                        whileHover={{ x: 6 }}
                                        style={{
                                            background: "transparent",
                                            border:
                                                "1px solid transparent",
                                            transition: "all 0.3s ease",
                                        }}
                                        onMouseEnter={(e) => {
                                            const el = e.currentTarget;
                                            el.style.background =
                                                "rgba(255,255,255,0.6)";
                                            el.style.backdropFilter =
                                                "blur(10px)";
                                            el.style.border =
                                                "1px solid rgba(255,255,255,0.5)";
                                            el.style.boxShadow = glassHover;
                                        }}
                                        onMouseLeave={(e) => {
                                            const el = e.currentTarget;
                                            el.style.background =
                                                "transparent";
                                            el.style.backdropFilter =
                                                "none";
                                            el.style.border =
                                                "1px solid transparent";
                                            el.style.boxShadow = "none";
                                        }}
                                    >
                                        {/* Icon — glass chip */}
                                        <div
                                            className={cn(
                                                "shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br transition-all duration-300",
                                                step.gradient
                                            )}
                                            style={{
                                                border: `1px solid ${step.border}`,
                                                boxShadow:
                                                    "0 2px 8px rgba(0,0,0,0.06)",
                                            }}
                                        >
                                            <step.icon
                                                className="text-gray-800 transition-transform duration-300 group-hover:scale-110"
                                                size={20}
                                                strokeWidth={1.5}
                                            />
                                        </div>
                                        <p className="text-gray-800 text-[15px] leading-snug flex items-center">
                                            {step.text}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Referral Count */}
                            <motion.p
                                className="text-gray-500 font-medium text-sm mt-8"
                                initial={{ opacity: 0 }}
                                animate={phase === "closing" ? { opacity: 0 } : { opacity: 1 }}
                                transition={{ delay: phase === "opening" ? 0.65 : 0.5 }}
                            >
                                Your Referrals (0)
                            </motion.p>
                        </div>

                        {/* Terms Button */}
                        <motion.button
                            onClick={() => setView("terms")}
                            className="w-full py-4 mt-2 text-gray-700 font-medium text-sm shrink-0 transition-all duration-300"
                            style={{
                                borderTop:
                                    "1px solid rgba(0,0,0,0.08)",
                                background: "transparent",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background =
                                    "rgba(0,0,0,0.03)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background =
                                    "transparent";
                            }}
                            whileHover={{ y: -1 }}
                            whileTap={{ scale: 0.995 }}
                        >
                            Terms & Conditions
                        </motion.button>
                    </div>
                </motion.div>
            ) : (
                /* ═══════ TERMS VIEW ═══════ */
                <motion.div
                    key="terms"
                    className="w-full flex flex-col"
                    // Terms view ke motion.div me bhi same:
                    initial={{ opacity: 0, x: 18, scale: 0.96 }}
                    animate={
                        phase === "opening"
                            ? { opacity: 1, x: 0, scale: 1 }
                            : phase === "closing"
                                ? { opacity: 0, scale: 0.96, y: -8 }
                                : { opacity: 1, x: 0, scale: 1 }
                    }
                    exit={{ opacity: 0, x: -18 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-8 pt-4 pb-2 shrink-0">
                        <motion.button
                            onClick={() => setView("main")}
                            className="flex items-center gap-2 text-gray-700 hover:text-black font-medium transition-colors text-sm"
                            whileHover={{ x: -3 }}
                            whileTap={{ scale: 0.96 }}
                        >
                            <ArrowLeft size={18} /> Back
                        </motion.button>
                    </div>

                    <div className="overflow-y-auto px-8 pb-6 custom-scrollbar max-h-[400px]">
                        <h2 className="text-xl font-bold text-gray-900 mb-1.5">
                            Terms & Conditions
                        </h2>
                        <p className="text-gray-500 text-[13px] mb-4">
                            Referral program terms and conditions
                        </p>

                        {/* Eligibility */}
                        <h3 className="font-semibold text-gray-900 text-[14px] mb-2">
                            Eligibility
                        </h3>
                        <div className="text-gray-600 space-y-2 mb-4 text-[13px] leading-relaxed">
                            <p>
                                Only brand-new users can join through this
                                referral offer. Existing accounts aren&apos;t
                                included.
                            </p>
                            <p>
                                We ask that you share your referral link
                                responsibly. Posting it in irrelevant or
                                spammy places may lead to removal from the
                                program.
                            </p>
                        </div>

                        {/* Referral Credits */}
                        <h3 className="font-semibold text-gray-900 text-[14px] mb-2">
                            Referral Credits
                        </h3>
                        <ul className="text-gray-600 space-y-2 mb-4 text-[13px] leading-relaxed list-disc pl-4 marker:text-gray-400">
                            <li className="pl-1">You earn 30 credits when a referred friend publishes their first app and sends a message</li>
                            <li className="pl-1">Referred friends receive 30 bonus credits upon registration</li>
                            <li className="pl-1">Unlimited successful referrals per account</li>
                            <li className="pl-1">Credits have no cash value and cannot be transferred</li>
                        </ul>

                        {/* Restrictions */}
                        <h3 className="font-semibold text-gray-900 text-[14px] mb-2">
                            Restrictions
                        </h3>
                        <ul className="text-gray-600 space-y-2 mb-4 text-[13px] leading-relaxed list-disc pl-4 marker:text-gray-400">
                            <li className="pl-1">Self-referrals are strictly prohibited and will result in account suspension</li>
                            <li className="pl-1">Credits from fraudulent referrals will be reversed</li>
                            <li className="pl-1">Sverkos reserves the right to modify credit amounts at any time</li>
                        </ul>

                        {/* Program Duration */}
                        <h3 className="font-semibold text-gray-900 text-[14px] mb-2">
                            Program Duration
                        </h3>
                        <div className="text-gray-600 text-[13px] leading-relaxed">
                            <p>
                                This referral program is ongoing unless
                                explicitly terminated by Sverkos. We will
                                provide reasonable notice before ending the
                                program.
                            </p>
                        </div>
                    </div>

                    {/* Footer */}
                    <motion.div
                        className="px-8 py-3.5 shrink-0"
                        style={{
                            borderTop: "1px solid rgba(0,0,0,0.08)",
                            background: "rgba(0,0,0,0.02)",
                        }}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.08, duration: 0.22 }}
                    >
                        <p className="text-gray-500 text-[12px] leading-relaxed max-w-xl mx-auto text-center">
                            Sverkos reserves the right to modify or
                            terminate this referral program at any time.
                            Changes will be communicated through the
                            platform.
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ReferralContent;