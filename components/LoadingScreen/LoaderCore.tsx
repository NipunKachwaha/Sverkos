'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Environment, Float, ContactShadows } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { Playfair_Display } from 'next/font/google';
import { LiquidText } from './LiquidText';

const playfair = Playfair_Display({
    subsets: ['latin'],
    weight: ['400', '600', '700'],
    display: 'swap',
});

// ---------------------------------------------------------------------------
// 1. WEBGL GLASS SPHERE COMPONENT (The "Liquid Lens")
// ---------------------------------------------------------------------------
function LiquidLens({ progress }: { progress: number }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            // Rotating the sphere slowly to make the refraction feel alive (Liquid feel)
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;

            // Subtle pulse based on progress
            const scaleBase = 1.2;
            const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.05;
            const targetScale = scaleBase + pulse + (progress / 100) * 0.2;

            meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
        }
    });

    return (
        <Float floatIntensity={2} rotationIntensity={1} speed={2}>
            <mesh ref={meshRef}>
                <sphereGeometry args={[1, 64, 64]} />
                {/* This material is the secret sauce for the premium glass refraction */}
                <MeshTransmissionMaterial
                    backside
                    samples={4}
                    thickness={2.5}
                    chromaticAberration={0.4}
                    anisotropy={0.3}
                    distortion={0.3}
                    distortionScale={0.5}
                    temporalDistortion={0.1}
                    transmission={1}
                    roughness={0.05}
                    ior={1.2}
                    color="#ffffff"
                    background={new THREE.Color('#020202')}
                />
            </mesh>
        </Float>
    );
}

// ---------------------------------------------------------------------------
// 2. ABSTRACT BACKGROUND (To give the glass something to refract)
// ---------------------------------------------------------------------------
function RefractionBackground() {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.z = state.clock.elapsedTime * 0.1;
        }
    });

    return (
        <group ref={groupRef} position={[0, 0, -10]}>
            {/* Colorful planes moving in the background to simulate the SR video's fast movement */}
            <mesh position={[-4, 2, 0]}>
                <planeGeometry args={[20, 2]} />
                <meshBasicMaterial color="#FF6B00" />
            </mesh>
            <mesh position={[4, -3, 0]}>
                <planeGeometry args={[15, 3]} />
                <meshBasicMaterial color="#00C2FF" />
            </mesh>
            <mesh position={[0, 0, -5]}>
                <planeGeometry args={[30, 30]} />
                <meshBasicMaterial color="#111111" />
            </mesh>
        </group>
    );
}

// ---------------------------------------------------------------------------
// 3. MAIN LOADER UI
// ---------------------------------------------------------------------------
interface LoaderCoreProps {
    progress?: number;
    isTransitioning?: boolean;
}

export function LoaderCore({ progress = 0, isTransitioning = false }: LoaderCoreProps) {
    const [displayProgress, setDisplayProgress] = useState(0);
    const trackingRef = useRef(0);
    const targetRef = useRef(progress);

    // Smoothly animate the progress number
    useEffect(() => {
        targetRef.current = progress;
    }, [progress]);

    useEffect(() => {
        let frameId: number;
        const animate = () => {
            trackingRef.current += (targetRef.current - trackingRef.current) * 0.1;
            const rounded = Math.round(trackingRef.current);
            setDisplayProgress((prev) => (prev !== rounded ? rounded : prev));
            frameId = requestAnimationFrame(animate);
        };
        frameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frameId);
    }, []);

    return (
        <AnimatePresence>
            {!isTransitioning && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                    transition={{ duration: 0.8, ease: [0.87, 0, 0.13, 1] }}
                    className="fixed inset-0 z-[9999] bg-[#020202] text-white overflow-hidden flex items-center justify-center"
                >
                    {/* -- 3D WEBGL LAYER -- */}
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                            <ambientLight intensity={0.5} />
                            <directionalLight position={[10, 10, 5]} intensity={1.5} />
                            <Environment preset="city" />
                            <RefractionBackground />
                            <LiquidLens progress={displayProgress} />
                            <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2} far={4} />
                        </Canvas>
                    </div>

                    {/* -- UI OVERLAY (Inspired by the SR) -- */}
                    <div className="absolute inset-0 z-10 p-6 flex flex-col justify-between pointer-events-none uppercase tracking-widest font-mono text-[10px] md:text-xs text-white/60">

                        {/* Top Corners */}
                        <div className="flex justify-between w-full">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full border border-white/40 animate-ping" />
                                <span>Sverkos Workspace</span>
                            </div>
                            <div className="flex gap-4">
                                <span>2026 - Beyond</span>
                            </div>
                        </div>

                        {/* Center Element (Icon + Percentage) */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-6 z-20 pointer-events-none">

                            {/* Liquid Font Animation */}
                            <LiquidText
                                text="SVERKOS"
                                progress={displayProgress}
                                className={`${playfair.className} text-4xl md:text-6xl lg:text-7xl font-bold tracking-[0.1em]`}
                            />

                            {/* The Fast Counter (Minimalist pill design) */}
                            <div className="text-white/80 font-mono tracking-widest text-xs drop-shadow-md bg-white/5 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/10">
                                {displayProgress}%
                            </div>
                        </div>

                        {/* Bottom Corners */}
                        <div className="flex justify-between w-full items-end">
                            <div className="text-[#FF6B00]">System Load</div>
                            <div>01 - 99</div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}