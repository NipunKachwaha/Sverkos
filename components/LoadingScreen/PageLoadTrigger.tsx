'use client';

import { useEffect, useRef } from 'react';
import { useLoading } from '@/providers/LoadingProvider'; 

export function PageLoadTrigger() {
    const { startLoading, stopLoading } = useLoading();
    const hasRun = useRef(false);

    useEffect(() => {
        if (!hasRun.current) {
            startLoading();
            hasRun.current = true;
        }

        const handleLoad = () => stopLoading();

        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            window.addEventListener('load', handleLoad);
        }

        return () => window.removeEventListener('load', handleLoad);
    }, [startLoading, stopLoading]);

    return null; 
}