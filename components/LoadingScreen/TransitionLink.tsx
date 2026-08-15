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

        const currentUrl = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
        const targetUrl = href.toString().split('#')[0]; // Ignoring hash for comparisons

        // Prevent double triggers
        if (!isLoading && href) {
            
            // SECURITY CHECK: If navigating to the exact same page, let Next.js handle it normally
            // without triggering the loading screen to avoid an infinite loading hang.
            if (targetUrl === currentUrl || targetUrl === pathname) {
                return;
            }

            e.preventDefault();
            startLoading();
            router.push(href.toString());
        }
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