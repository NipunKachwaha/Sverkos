"use client";

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const Ferrofluid = dynamic(() => import('@/components/ui/Ferrofluid/Ferrofluid'), {
    ssr: false,
});
const RippleDistortion = dynamic(() => import('@/components/ui/RippleDistortion/RippleDistortion'), {
    ssr: false,
});

export default function BackgroundEffects() {
    return (
        <>
            {/* 1. Base Layer: Ferrofluid (z-[-10] keeps it behind all components) */}
            <div
                aria-hidden="true"
                className="pointer-events-none fixed inset-0 z-[-10] h-full w-full overflow-hidden opacity-60 transition-opacity duration-700 ease-in-out"
            >
                <Suspense fallback={<div className="h-full w-full bg-slate-900/50" />}>
                    <Ferrofluid
                        dpr={0.5}
                        mouseInteraction={false}
                        speed={0.2}
                        turbulence={0.5}
                    />
                </Suspense>
            </div>

            {/* 2. Top Layer */}
            <div
                aria-hidden="true"
                className="pointer-events-none fixed inset-0 z-[60] h-full w-full mix-blend-screen opacity-50 will-change-transform"
            >
                <Suspense fallback={null}>
                    <RippleDistortion
                        src="data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs="
                        brushSize={120}              
                        strength={0.2}               
                        swirl={1}                    
                        rings={4}                   
                        spread={5}                   
                        fade={3}
                        spacing={15}
                        dispersion={0}
                        glint={0.75}                 
                        tint="#ffffff"
                        tintAmount={0.1}            
                        grayscale={false}
                        quality="high"
                        trigger="hover"
                        enabled={true}
                    />
                </Suspense>
            </div>
        </>
    );
}