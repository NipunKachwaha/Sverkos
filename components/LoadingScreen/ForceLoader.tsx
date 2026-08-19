'use client';

import { useLayoutEffect, useEffect } from 'react';
import { useLoading } from '@/providers/LoadingProvider';

// This global variable persists in Next.js memory.
// It resets to 'true' on a full page reload (F5), but remains 'false' through SPA navigation.
let isFirstMount = true;

export function ForceLoader() {
    const { startLoading, isLoading } = useLoading();

    // Detects full page reloads (like F5) versus client-side navigation.
    useLayoutEffect(() => {
        if (isFirstMount && !isLoading) {
            // Triggers loader ONLY on first load or a hard reload.
            startLoading();
            isFirstMount = false; // Disables trigger for subsequent SPA navigations.
        }
    }, [startLoading, isLoading]);

    // Intercepts browser unload to trigger the loader before navigating away or reloading.
    useEffect(() => {
        const handleBeforeUnload = () => {
            startLoading();
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [startLoading]);

    return null;
}