"use client";
import { useEffect, useRef } from "react";
import Lenis from "lenis";

// Singleton ref so other components can access the lenis instance
export let globalLenis: Lenis | null = null;

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.9,                               // Reduced from 1.4 — feels snappier
      easing: (t: number) => 1 - Math.pow(1 - t, 3), // Cubic ease-out — fast start, smooth stop
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.8,                        // Limit wheel speed to prevent overshoot
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;
    globalLenis = lenis;

    let animationFrameId: number;

    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
      globalLenis = null;
    };
  }, []);

  return lenisRef;
}
