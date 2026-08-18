'use client';

import React, { createContext, useContext, useState, useEffect, useRef, useCallback, useMemo, PropsWithChildren } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { LoaderCore } from '@/components/LoadingScreen/LoaderCore';

type LoadingContextProps = {
    startLoading: () => void;
    stopLoading: () => void;
    isLoading: boolean;
    progress: number;
};

const LoadingContext = createContext<LoadingContextProps | null>(null);

const MAX_PROGRESS = 99; 
const ANIMATION_DELAY = 600; 

export function LoadingProvider({ children }: PropsWithChildren) {
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const [isPageReady, setIsPageReady] = useState(false); 

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentUrl = `${pathname}?${searchParams.toString()}`;
    const previousUrlRef = useRef(currentUrl);

    const pageReadyRef = useRef(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const fadeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const clearTimers = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
    }, []);

    // Cleanup on unmount
    useEffect(() => clearTimers, [clearTimers]);

    const executeComplete = useCallback(() => {
        clearTimers(); 
        setProgress(100); 
        setIsFadingOut(true); 

        fadeTimeoutRef.current = setTimeout(() => {
            setIsLoading(false); 
            setIsFadingOut(false);
            setProgress(0); 
        }, ANIMATION_DELAY);
    }, [clearTimers]);

    // Progress Bar Logic
    useEffect(() => {
        if (isLoading && !isFadingOut) {
            setProgress(0);
            clearTimers();
            
            intervalRef.current = setInterval(() => {
                setProgress((prev) => {
                    if (pageReadyRef.current) {
                        return Math.min(prev + 15, MAX_PROGRESS); // Speed up when ready
                    } 
                    if (prev >= MAX_PROGRESS) {
                        return MAX_PROGRESS; // Hold at 99%
                    }
                    // Natural easing logic for loading
                    const increment = prev < 60 ? Math.random() * 4 + 1 : prev < 90 ? Math.random() * 2 + 0.5 : 0.2; 
                    return Math.min(prev + increment, MAX_PROGRESS);
                });
            }, 100); 
        }
    }, [isLoading, isFadingOut, clearTimers]); 

    const stopLoading = useCallback(() => {
        pageReadyRef.current = true; 
        setIsPageReady(true); 
    }, []);

    // 99% Check / Watchdog Logic
    useEffect(() => {
        if (isLoading && !isFadingOut && progress >= MAX_PROGRESS) {
            if (isPageReady) {
                executeComplete();
            } else {
                // WATCHDOG: If stuck at 99% for 3 seconds without route change (same page load/error)
                const watchdogTimer = setTimeout(() => {
                    stopLoading();
                }, 3000); 
                return () => clearTimeout(watchdogTimer);
            }
        }
    }, [progress, isLoading, isFadingOut, isPageReady, executeComplete, stopLoading]);

    // SERVER LOAD CHECKER: Detect if the page actually changed
    useEffect(() => {
        if (previousUrlRef.current !== currentUrl) {
            previousUrlRef.current = currentUrl;
            if (isLoading) {
                stopLoading();
            }
        }
    }, [currentUrl, isLoading, stopLoading]);

    const startLoading = useCallback(() => {
        if (isLoading) return;
        clearTimers(); 
        pageReadyRef.current = false; 
        setIsPageReady(false); 
        setIsLoading(true);
        setIsFadingOut(false);
        previousUrlRef.current = currentUrl;
    }, [isLoading, currentUrl, clearTimers]);

    const contextValue = useMemo(
        () => ({ startLoading, stopLoading, isLoading, progress }), 
        [startLoading, stopLoading, isLoading, progress]
    );

    return (
        <LoadingContext.Provider value={contextValue}>
            {children}
            {(isLoading || isFadingOut) && (
                <LoaderCore progress={progress} isTransitioning={isFadingOut} />
            )}
        </LoadingContext.Provider>
    );
}

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) throw new Error('useLoading must be used within a LoadingProvider');
    return context;
};