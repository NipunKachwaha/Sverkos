'use client';

import React, { createContext, useContext, useState, useEffect, useRef, useCallback, useMemo, type PropsWithChildren } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { LoaderCore } from '@/components/LoadingScreen/LoaderCore';

type LoadingContextProps = {
    startLoading: () => void;
    stopLoading: () => void;
    isLoading: boolean;
    progress: number;
};

const LoadingContext = createContext<LoadingContextProps | undefined>(undefined);

const MAX_PROGRESS = 99;
const ANIMATION_DELAY = 600;
const PROGRESS_INTERVAL = 100;
const MINIMUM_LOAD_TIME = 10000; // Strict 10-second minimum

export function LoadingProvider({ children }: PropsWithChildren) {
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isFadingOut, setIsFadingOut] = useState(false);
    
    const [isMinTimePassed, setIsMinTimePassed] = useState(false);
    const [isPageReady, setIsPageReady] = useState(false);

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentUrl = `${pathname}${searchParams?.toString() ? '?' + searchParams.toString() : ''}`;
    const previousUrlRef = useRef(currentUrl);

    // Trackers
    const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const fadeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const minTimerRef = useRef<NodeJS.Timeout | null>(null);
    const checkerIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const stopLoading = useCallback(() => {
        setIsPageReady(true);
    }, []);

    const startLoading = useCallback(() => {
        if (isLoading) return;
        if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
        
        setIsPageReady(false);
        setIsMinTimePassed(false);
        setIsLoading(true);
        setIsFadingOut(false);
        setProgress(0);
        previousUrlRef.current = currentUrl;
    }, [isLoading, currentUrl]);

    // 1. STRICT MINIMUM TIMER
    useEffect(() => {
        if (isLoading) {
            minTimerRef.current = setTimeout(() => {
                setIsMinTimePassed(true);
            }, MINIMUM_LOAD_TIME);
            return () => { if (minTimerRef.current) clearTimeout(minTimerRef.current); };
        }
    }, [isLoading]);

    // 2. PROGRESS BAR LOOP
    useEffect(() => {
        if (isLoading && !isFadingOut) {
            setProgress(0);
            progressIntervalRef.current = setInterval(() => {
                setProgress((prev) => {
                    if (isPageReady && isMinTimePassed) return Math.min(prev + 12, MAX_PROGRESS);
                    if (prev >= MAX_PROGRESS) return MAX_PROGRESS; 
                    const increment = prev < 40 ? Math.random() * 4 + 1 : prev < 85 ? Math.random() * 1.5 + 0.5 : 0.2;
                    return Math.min(prev + increment, MAX_PROGRESS);
                });
            }, PROGRESS_INTERVAL);
            return () => { if (progressIntervalRef.current) clearInterval(progressIntervalRef.current); };
        }
    }, [isLoading, isFadingOut, isPageReady, isMinTimePassed]);

    // 3. ROUTE DETECTOR
    useEffect(() => {
        if (previousUrlRef.current !== currentUrl) {
            previousUrlRef.current = currentUrl;
            if (isLoading) stopLoading(); 
        }
    }, [currentUrl, isLoading, stopLoading]);

    // 4. THE MASTER FINISHER & SERVER CHECKER
    const executeComplete = useCallback(() => {
        if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
        if (checkerIntervalRef.current) clearInterval(checkerIntervalRef.current);
        
        setProgress(100);
        setIsFadingOut(true);
        
        fadeTimeoutRef.current = setTimeout(() => {
            setIsLoading(false);
            setIsFadingOut(false);
            setProgress(0);
            setIsMinTimePassed(false);
            setIsPageReady(false);
        }, ANIMATION_DELAY);
    }, []);

    useEffect(() => {
        if (isLoading && !isFadingOut && progress >= MAX_PROGRESS) {
            const checkAndClose = () => {
                const domReady = document.readyState === 'complete';
                const urlChanged = previousUrlRef.current !== currentUrl;

                if (isMinTimePassed && (isPageReady || domReady || urlChanged)) {
                    executeComplete();
                    return true;
                }
                return false;
            };

            const isDone = checkAndClose();
            if (!isDone && isMinTimePassed) {
                checkerIntervalRef.current = setInterval(() => {
                    checkAndClose();
                }, 2000);
                return () => { if (checkerIntervalRef.current) clearInterval(checkerIntervalRef.current); };
            }
        }
    }, [progress, isLoading, isFadingOut, isMinTimePassed, isPageReady, currentUrl, executeComplete]);

    const contextValue = useMemo(() => ({ startLoading, stopLoading, isLoading, progress }), [startLoading, stopLoading, isLoading, progress]);

    return (
        <LoadingContext.Provider value={contextValue}>
            {children}
            {(isLoading || isFadingOut) && (
                <LoaderCore progress={progress} isTransitioning={isFadingOut} />
            )}
        </LoadingContext.Provider>
    );
}

export function useLoading() {
    const context = useContext(LoadingContext);
    if (context === undefined) throw new Error('useLoading must be used within a LoadingProvider');
    return context;
}