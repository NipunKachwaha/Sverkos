import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/navigation/Navbar';
import HeroSection from '@/components/pages/resources/partners/main/HeroSection';
import SmoothScrolling from '@/components/ui/SmoothScrolling';
import BackgroundEffects from '@/components/pages/resources/partners/main/BackgroundEffects';

const PartnershipSolutions = dynamic(() => import('@/components/pages/resources/partners/main/PartnershipSolutions'));
const PartnersImpactSection = dynamic(() => import('@/components/pages/resources/partners/main/PartnersImpactSection'));
const OtherWaysToPartner = dynamic(() => import('@/components/pages/resources/partners/main/OtherWaysToPartner'));

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
                <div className="w-4/5 mx-auto my-2 border-t border-gray-200 dark:border-gray-400" />

                {/* Below the fold - Wrapped in Suspense boundaries */}
                <Suspense fallback={<SectionLoader />}>
                    <PartnershipSolutions />
                    <div className="h-14" />
                    <div className="w-full border-t border-gray-200 dark:border-gray-400" />
                    <PartnersImpactSection />
                    <div className="w-4/5 mx-auto my-2 border-t border-gray-200 dark:border-gray-400" />
                    <div className="h-20" />
                    <OtherWaysToPartner />
                </Suspense>
            </main>
        </SmoothScrolling>
    );
}

// ---------------------------------------------------------------------------
// HELPER COMPONENT: Loader
// ---------------------------------------------------------------------------
const SectionLoader = () => (
    <div className="flex h-32 w-full items-center justify-center animate-pulse">
        <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
    </div>
);