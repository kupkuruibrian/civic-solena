import { useEffect } from "react";

/**
 * Lenis smooth scrolling with architectural weight and inertia.
 * Disabled entirely when the visitor prefers reduced motion.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let destroy: (() => void) | undefined;

    void import("lenis").then(({ default: Lenis }) => {
      const lenis = new Lenis({
        duration: 1.6,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        wheelMultiplier: 0.85,
        touchMultiplier: 1.1,
      });

      const loop = (time: number) => {
        lenis.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);

      destroy = () => {
        cancelAnimationFrame(raf);
        lenis.destroy();
      };
    });

    return () => destroy?.();
  }, []);
}
