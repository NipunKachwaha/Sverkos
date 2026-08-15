import React, { Suspense } from "react";
import Link from "next/link";
import { SlicedRollingText } from "@/components/ui/SlicedRollingText";

export default function NotFoundPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>}>
            <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
                {/* Background Video */}
                <video
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster="/video-404-cover.jpg"
                >
                    <source src="https://github.com/NipunKachwaha/Sverkos-Assets/releases/download/v1.0/4042.mp4" type="video/mp4" />
                    {/* Fallback text */}
                    Your browser does not support the video tag.
                </video>

                {/* Overlay for darkness/contrast if needed */}
                <div className="absolute inset-0 bg-black bg-opacity-70 z-10" />

                {/* Main content */}
                <div className="relative z-20 flex flex-col items-center gap-6 text-center px-6">
                    <div className="mb-6">
                        <SlicedRollingText
                            text="404"
                            className="text-8xl md:text-9xl lg:text-[12rem] font-extrabold tracking-tight"
                            staggerDelay={0.04}
                        />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-200 mb-5 drop-shadow">
                        Page Not Found
                    </h2>
                    <p className="text-lg text-gray-300 max-w-lg mb-8">
                        The page you are looking for doesn&apos;t exist or an error has occurred.<br />
                        Try going back home or use the navigation.
                    </p>
                    <Link
                        href="/"
                        className="bg-white/80 hover:bg-white text-black px-6 py-3 font-medium rounded-lg shadow transition"
                    >
                        Go back home
                    </Link>
                </div>
            </div>
        </Suspense>
    );
}