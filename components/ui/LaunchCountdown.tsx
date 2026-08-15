"use client";

import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';

interface LaunchCountdownProps {
    itemVariants: Variants;
}

const dialOptions = [
    { id: 'seconds', label: 'Sec', angle: -135 },
    { id: 'minutes', label: 'Min', angle: -90 },
    { id: 'hours', label: 'Hrs', angle: -45 },
    { id: 'days', label: 'Day', angle: 0 },
    { id: 'weeks', label: 'Wks', angle: 45 },
    { id: 'months', label: 'Mon', angle: 90 },
    { id: 'years', label: 'Yrs', angle: 135 }
];

export default function LaunchCountdown({ itemVariants }: LaunchCountdownProps) {
    const LAUNCH_DATE = new Date('2026-08-09T12:00:00').getTime();

    const [timePassed, setTimePassed] = useState<number>(new Date().getTime() - LAUNCH_DATE);
    const [viewMode, setViewMode] = useState<string>('hours');

    useEffect(() => {
        const intervalTime = viewMode === 'seconds' || viewMode === 'minutes' ? 1000 : 60000;
        const interval = setInterval(() => {
            setTimePassed(new Date().getTime() - LAUNCH_DATE);
        }, intervalTime);

        return () => clearInterval(interval);
    }, [LAUNCH_DATE, viewMode]);

    const getCalculatedTime = () => {
        const diff = Math.max(timePassed, 0);
        const totalSeconds = Math.floor(diff / 1000);
        const totalMinutes = Math.floor(diff / (1000 * 60));
        const totalHours = Math.floor(diff / (1000 * 60 * 60));
        const totalDays = Math.floor(totalHours / 24);
        const totalWeeks = Math.floor(totalDays / 7);
        const totalMonths = Math.floor(totalDays / 30.436875);
        const totalYears = Math.floor(totalDays / 365.25);

        switch (viewMode) {
            case 'seconds': return { value: totalSeconds, label: 'Seconds' };
            case 'minutes': return { value: totalMinutes, label: 'Minutes' };
            case 'hours': return { value: totalHours, label: 'Hours' };
            case 'days': return { value: totalDays, label: 'Days' };
            case 'weeks': return { value: totalWeeks, label: 'Weeks' };
            case 'months': return { value: totalMonths, label: 'Months' };
            case 'years': return { value: totalYears, label: 'Years' };
            default: return { value: totalHours, label: 'Hours' };
        }
    };

    const { value, label } = getCalculatedTime();

    // Find the angle for the active option
    const activeOption = dialOptions.find(o => o.id === viewMode) || dialOptions[0];
    const activeAngle = activeOption.angle;

    return (
        <motion.div
            variants={itemVariants}
            className="liquid-glass hover:liquid-glass-strong transition-all duration-500 rounded-3xl p-6 md:p-8 flex flex-col justify-between w-full md:w-1/3 h-[320px] md:h-[360px] relative overflow-hidden group"
        >
            {/* Top Section: Value Display */}
            <div className="z-10">
                <h3 className="text-5xl md:text-6xl font-semibold text-white tracking-tight flex items-baseline gap-2">
                    {value} <span className="text-2xl md:text-3xl font-normal text-gray-400">{label}</span>
                </h3>
            </div>

            {/* Bottom Section: Text & Radial Dial */}
            <div className="flex justify-between items-end z-10 w-full flex-1">
                <p className="text-gray-400 text-lg font-medium pb-2">since launch</p>
                <div className="relative w-40 h-40 md:w-44 md:h-44 rounded-full flex items-center justify-center shrink-0 border border-white/10 bg-white/5 backdrop-blur-md shadow-[inset_0_4px_20px_rgba(255,255,255,0.05),0_10px_30px_rgba(0,0,0,0.3)]">

                    {/* Inner Groove (Track for glowing dot) */}
                    <div className="absolute w-24 h-24 md:w-28 md:h-28 rounded-full border border-white/5 bg-black/20 shadow-[inset_0_2px_15px_rgba(0,0,0,0.5)]"></div>

                    {/* Center Knob */}
                    <div className="absolute w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-white/20 to-white/5 border border-white/20 backdrop-blur-xl shadow-[0_4px_15px_rgba(0,0,0,0.3)] flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white/30 shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)]" />
                    </div>

                    {/* Circular Labels */}
                    {dialOptions.map((opt) => (
                        <div
                            key={opt.id}
                            className="absolute inset-0 flex items-start justify-center cursor-pointer pointer-events-none"
                            style={{ transform: `rotate(${opt.angle}deg)` }}
                        >
                            <div
                                className="pointer-events-auto mt-2 md:mt-3 w-8 h-8 flex items-center justify-center transition-transform hover:scale-110"
                                onClick={() => setViewMode(opt.id)}
                            >
                                <span
                                    className="text-[10px] md:text-[11px] font-bold tracking-wider transition-all duration-300"
                                    style={{
                                        // Rotate text upright
                                        transform: `rotate(${-opt.angle}deg)`,
                                        color: viewMode === opt.id ? '#ffffff' : 'rgba(255, 255, 255, 0.3)',
                                        textShadow: viewMode === opt.id ? '0 0 10px rgba(255,255,255,0.8)' : 'none',
                                    }}
                                >
                                    {opt.label}
                                </span>
                            </div>
                        </div>
                    ))}

                    {/* Rotating Indicator & Glowing Dot */}
                    <div
                        className="absolute inset-0 flex items-start justify-center pointer-events-none transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                        style={{ transform: `rotate(${activeAngle}deg)` }}
                    >
                        {/* The glowing dot (precisely on the track) */}
                        <div className="mt-[2.3rem] md:mt-[2.6rem] w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-white shadow-[0_0_15px_3px_rgba(255,255,255,0.9)] z-20" />
                    </div>

                </div>
            </div>
        </motion.div>
    );
}