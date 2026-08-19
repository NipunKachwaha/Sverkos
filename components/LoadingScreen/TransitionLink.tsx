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

        // Agar loader pehle se chal raha hai toh naye click ko ignore karo
        if (isLoading) return;

        e.preventDefault(); 

        // 1. ORDER MILTE HI INSTANTLY LOADER START KARO
        startLoading();

        // 2. 800ms WAIT KARO TAAKI LOADER SCREEN KO PURI TARAH COVER KAR LE
        setTimeout(() => {
            const currentUrl = `${pathname}${searchParams.toString() ? '?' + searchParams.toString() : ''}`;
            const targetUrl = href.toString().split('#')[0]; 

            if (targetUrl === currentUrl || targetUrl === pathname) {
                // Agar same page hai -> Force Hard Reload karo
                window.location.href = href.toString();
            } else {
                // Agar naya page hai -> Next.js Background Redirect karo
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