"use client";

import { useEffect, useState, useMemo } from "react";
import { ReactLenis } from "lenis/react";
import type { LenisOptions } from "lenis";

interface SmoothScrollingProps {
  children: React.ReactNode;
  options?: Partial<LenisOptions>;
}

export default function SmoothScrolling({ children, options = {} }: SmoothScrollingProps) {
  // 1. Accessibility State: Check for reduced motion preferences
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    // Modern event listener syntax
    mediaQuery.addEventListener("change", handleMotionChange);
    return () => mediaQuery.removeEventListener("change", handleMotionChange);
  }, []);

  // 2. Performance: Memoize the configuration object
  const lenisOptions = useMemo<LenisOptions>(
    () => ({
      // Adjusted lerp to 0.1 (0.008 is artificially slow and can cause UX frustration)
      lerp: 0.8, 
      duration: 1.2,
      smoothWheel: true,
      // Keep false to rely on iOS/Android native momentum scrolling
      smoothTouch: false, 
      wheelMultiplier: 1,
      orientation: "vertical",
      gestureOrientation: "vertical",
      ...options,
    }),
    [options]
  );

  // 3. Fallback: If user prefers reduced motion, bypass Lenis entirely
  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={lenisOptions}>
      {children}
    </ReactLenis>
  );
}