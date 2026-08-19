'use client';

import Link, { LinkProps } from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useLoading } from '@/providers/LoadingProvider'; 
import React, { useCallback } from 'react';

interface TransitionLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>, LinkProps {
    children: React.ReactNode;
    className?: string;
    href: string;
}

export default function TransitionLink({ children, href, className, onClick, ...props }: TransitionLinkProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { startLoading, isLoading } = useLoading();

    const handleTransition = useCallback((e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (onClick) onClick(e);

        // If the loader is already running, ignore new clicks
        if (isLoading) return;

        e.preventDefault();

        // 1. Start the loader instantly when the click is registered
        startLoading();

        // 2. Wait for 800ms so the loading screen has time to appear
        setTimeout(() => {
            const currentUrl = `${pathname}${searchParams.toString() ? '?' + searchParams.toString() : ''}`;
            const targetUrl = href.toString().split('#')[0];

            if (targetUrl === currentUrl || targetUrl === pathname) {
                // If it's the same page, force a hard reload
                window.location.href = href.toString();
            } else {
                // If it's a different page, use Next.js router to navigate
                router.push(href.toString());
            }
        }, 800);

    }, [isLoading, href, onClick, startLoading, router, pathname, searchParams]);

    return (
        <Link
            href={href}
            onClick={handleTransition}
            className={`transition-opacity hover:opacity-80 ${className || ''}`}
            {...props}
        >
            {children}
        </Link>
    );
}