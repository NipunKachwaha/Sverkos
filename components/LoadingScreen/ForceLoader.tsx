'use client';

import { useLayoutEffect, useEffect } from 'react';
import { useLoading } from '@/providers/LoadingProvider';

// Yeh global variable Next.js ki memory mein save rahega. 
// Hard Reload (F5) par yeh wapas 'true' ho jayega.
// SPA Navigation (Sidebar click) par yeh 'false' hi rahega.
let isFirstMount = true;

export function ForceLoader() {
    const { startLoading, isLoading } = useLoading();

    // TRICK 1: Detect Hard Reload vs Client Navigation
    useLayoutEffect(() => {
        if (isFirstMount && !isLoading) {
            // Sirf F5 ya direct URL aane par trigger hoga
            startLoading();
            isFirstMount = false; // Agli baar (Sidebar click) par trigger nahi hoga
        }
    }, [startLoading, isLoading]);

    // TRICK 2: Browser Engine Interceptor
    useEffect(() => {
        const handleBeforeUnload = () => {
            // Server ko order milte hi sabse pehle loader start karo
            startLoading();
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [startLoading]);

    return null;
}