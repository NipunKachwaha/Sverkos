import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// ---------------------------------------------------------------------------
// CRITICAL & ABOVE-THE-FOLD IMPORTS (Loaded immediately)
// ---------------------------------------------------------------------------
import Navbar from '@/components/navigation/Navbar';
import HeroSection from '@/components/pages/home/HeroSection';
import SmoothScrolling from '@/components/ui/SmoothScrolling';
import BackgroundEffects from '@/components/pages/home/BackgroundEffects';
import { PageLoadTrigger } from '@/components/LoadingScreen/PageLoadTrigger';

// ---------------------------------------------------------------------------
// BELOW-THE-FOLD SECTIONS (Lazy loaded for faster Initial Page Load)
// ---------------------------------------------------------------------------
const FilterGallery = dynamic(() => import('@/components/pages/home/FilterGallery'));
const Tutorial = dynamic(() => import('@/components/pages/home/Tutorial'));
const StackSection = dynamic(() => import('@/components/pages/home/StackSection'));
const BuildSection = dynamic(() => import('@/components/pages/home/BuildSection'));
const DesignFeaturesSection = dynamic(() => import('@/components/pages/home/DesignFeaturesSection'));
const MarketingSection = dynamic(() => import('@/components/pages/home/MarketingSection'));
const CapabilitiesSection = dynamic(() => import('@/components/pages/home/CapabilitiesSection'));
const FounderSection = dynamic(() => import('@/components/pages/home/FounderSection'));
const PricingSection = dynamic(() => import('@/components/pages/home/PricingSection'));
const TeamSection = dynamic(() => import('@/components/pages/home/TeamSection'));
const FAQWrapper = dynamic(() => import('@/components/pages/FAQWrapper'));

// ---------------------------------------------------------------------------
// MAIN PAGE COMPONENT
// ---------------------------------------------------------------------------
export default function Home() {
  return (
    <SmoothScrolling>

      {/* PageLoad Trigger */}
      <PageLoadTrigger />

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
          <FilterGallery />
          <Tutorial />
          <StackSection />
          <BuildSection />
          <DesignFeaturesSection />
          <MarketingSection />

          <section className="m-4 overflow-hidden rounded-3xl bg-background/50 shadow-2xl backdrop-blur-sm">
            <CapabilitiesSection />
          </section>

          <FounderSection />
          <PricingSection />
          <FAQWrapper>
            <TeamSection />
          </FAQWrapper>
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