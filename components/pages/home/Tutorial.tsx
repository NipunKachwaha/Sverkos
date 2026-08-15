"use client";

import React, { useState, useRef, useEffect } from 'react';
import TextPressure from '@/components/ui/TextPressure';

const Tutorial = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);

    const videoRef = useRef<HTMLVideoElement>(null);

    const steps = [
        {
            title: "Start with an idea",
            description: "Describe the app or website you want to create, or drop in screenshots and docs.",
            videoSrc: "https://github.com/NipunKachwaha/Sverkos-Assets/releases/download/v1.0/scene-1.webm",
        },
        {
            title: "Watch it come to life",
            description: "See your vision transform into a working prototype in real time as AI builds it for you.",
            videoSrc: "https://github.com/NipunKachwaha/Sverkos-Assets/releases/download/v1.0/scene-2.webm",
        },
        {
            title: "Refine and ship",
            description: "Iterate on your creation with simple feedback and deploy it to the world with one click.",
            videoSrc: "https://github.com/NipunKachwaha/Sverkos-Assets/releases/download/v1.0/scene-3.webm",
        },
    ];

    useEffect(() => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current
                    .play()
                    .catch((e) => console.log("Autoplay issue:", e));
            } else {
                videoRef.current.pause();
            }
        }
    }, [currentIndex, isPlaying]);

    const handleVideoEnd = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % steps.length);
    };

    const togglePlayPause = () => {
        setIsPlaying((playing) => !playing);
    };

    return (
        <div className="w-full text-white px-6 md:px-12 lg:px-20 pt-8 pb-16 font-sans">

            {/* Main Wrapper */}
            <div className="max-w-6xl mx-auto w-full">

                {/* Heading with TextPressure Animation */}
                <div className="w-[300px] md:w-[350px] h-12 md:h-16 mb-12 relative">
                    <TextPressure
                        text="Meet Sverkos."
                        flex
                        alpha={false}
                        stroke={false}
                        width
                        weight
                        italic
                        textColor="#ffffff"
                        strokeColor="#5227FF"
                        minFontSize={36}
                    />
                </div>

                {/* Content Section */}
                <div className="flex flex-col lg:flex-row gap-12 items-stretch">

                    {/* Left Side: Video Section */}
                    <div className="relative w-full lg:w-[60%] rounded-2xl overflow-hidden shadow-2xl liquid-glass-strong min-h-[250px] lg:min-h-0">
                        <video
                            ref={videoRef}
                            src={steps[currentIndex].videoSrc}
                            className="w-full h-full object-cover aspect-video lg:aspect-auto lg:absolute lg:inset-0"
                            onEnded={handleVideoEnd}
                            muted
                            playsInline
                        />

                        {/* Play/Pause Button */}
                        <button
                            onClick={togglePlayPause}
                            className="absolute bottom-5 right-5 p-3 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full transition-all duration-300 flex items-center justify-center text-white z-10"
                            aria-label={isPlaying ? "Pause" : "Play"}
                        >
                            {isPlaying ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                                    <rect x="6" y="4" width="4" height="16" rx="1"></rect>
                                    <rect x="14" y="4" width="4" height="16" rx="1"></rect>
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                                    <path d="M5 3l14 9-14 9V3z"></path>
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Right Side: Steps Section */}
                    <div className="w-full lg:w-[40%] flex flex-col justify-between gap-6 py-2">
                        {steps.map((step, index) => {
                            const isActive = index === currentIndex;

                            return (
                                <div
                                    key={index}
                                    onClick={() => {
                                        setCurrentIndex(index);
                                        setIsPlaying(true);
                                    }}
                                    className={`cursor-pointer transition-all duration-500 ease-in-out p-6 rounded-2xl flex-1 flex flex-col justify-center ${isActive
                                        ? "liquid-glass opacity-100 transform scale-[1.02]"
                                        : "opacity-40 hover:opacity-60 border border-transparent"
                                        }`}
                                >
                                    <h2
                                        className={`liquid-glass flex items-center justify-center shrink-0 text-2xl font-semibold mb-3 tracking-wide transition-colors ${isActive ? 'text-white' : 'text-gray-300'}`}
                                        style={{ borderRadius: '0.5rem' }}
                                    >
                                        {step.title}
                                    </h2>
                                    <p className={`text-base leading-relaxed ${isActive ? 'text-gray-200' : 'text-gray-400'}`}>
                                        {step.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tutorial;