import { Suspense } from 'react';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Navbar from '@/components/navigation/Navbar';
import SmoothScrolling from '@/components/ui/SmoothScrolling';
import BackgroundEffects from '@/components/pages/home/BackgroundEffects';

const HeroSection = dynamic(() => import('@/components/pages/solutions/founders/HeroSection'));
const Cofounder = dynamic(() => import('@/components/pages/solutions/founders/cofounder'));
const FAQSection = dynamic(() => import('@/components/pages/home/FAQSection'));
const ChatBoxSection = dynamic(() => import('@/components/pages/solutions/founders/ChatBoxSection'));
const FAQWrapper = dynamic(() => import('@/components/pages/FAQWrapper'));

export const metadata: Metadata = {
    title: 'Founders',
};

export default function Home() {
    return (
        <SmoothScrolling>

            {/* Background Effects */}
            <BackgroundEffects />

            {/* Navigation */}
            <Navbar />

            {/* Main Content */}
            <main className="relative z-10 flex min-h-screen flex-col bg-transparent">

                {/* Above the fold - Renders immediately */}
                <HeroSection />

                {/* Below the fold - Wrapped in Suspense boundaries */}
                <Suspense fallback={<SectionLoader />}>
                    <Cofounder />
                    <FAQSection />
                    <FAQWrapper>
                        <ChatBoxSection />
                    </FAQWrapper>
                </Suspense>
            </main>
        </SmoothScrolling>
    );
}

const SectionLoader = () => (
    <div className="flex h-32 w-full items-center justify-center animate-pulse">
        <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
    </div>
);