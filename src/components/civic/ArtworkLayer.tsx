import { useEffect, useRef, type CSSProperties } from "react";

/**
 * Artwork embedded into the page material rather than layered on top:
 * multiply blending, soft radial masks, and slow parallax drift.
 */
export function ArtworkLayer({
  src,
  opacity = 0.32,
  speed = 0.06,
  scale = 1.08,
  mask = "radial-gradient(closest-side at 50% 50%, rgba(0,0,0,1) 30%, rgba(0,0,0,0.35) 68%, rgba(0,0,0,0) 100%)",
  className = "",
  style,
}: {
  src: string;
  opacity?: number;
  speed?: number;
  scale?: number;
  mask?: string;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = node.getBoundingClientRect();
        const progress = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
        node.style.transform = `translate3d(0, ${(-progress * speed * 320).toFixed(2)}px, 0) scale(${scale})`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [speed, scale]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 bg-cover bg-center will-change-transform ${className}`}
      style={{
        backgroundImage: `url(${src})`,
        opacity,
        mixBlendMode: "multiply",
        filter: "grayscale(0.35) contrast(0.9)",
        transform: `scale(${scale})`,
        WebkitMaskImage: mask,
        maskImage: mask,
        ...style,
      }}
    />
  );
}
