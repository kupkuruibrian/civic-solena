import { useEffect, useRef, useState } from "react";
import { ArtworkLayer } from "./ArtworkLayer";
import { CivicNetwork } from "./CivicNetwork";
import { civicArt } from "@/lib/civic-assets";

/** Opening is silent. Three seconds later the buried city emerges. */
export function Hero() {
  const [phase, setPhase] = useState(0);
  const surfaceRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setPhase(3);
      return;
    }
    const t1 = setTimeout(() => setPhase(1), 2800);
    const t2 = setTimeout(() => setPhase(2), 5200);
    const t3 = setTimeout(() => setPhase(3), 7600);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, []);

  // Cursor subtly influences the invisible infrastructure.
  useEffect(() => {
    const node = surfaceRef.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      node.style.transform = `translate3d(${(x * 12).toFixed(2)}px, ${(y * 8).toFixed(2)}px, 0)`;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const ease = "cubic-bezier(0.16, 0.7, 0.16, 1)";

  return (
    <section
      id="top"
      className="paper-grain relative flex min-h-dvh flex-col justify-between overflow-hidden bg-background"
    >
      <div
        ref={surfaceRef}
        className="pointer-events-none absolute inset-0 transition-transform duration-[1200ms] ease-out will-change-transform"
      >
        <ArtworkLayer
          src={civicArt.civilisation}
          opacity={phase >= 1 ? 0.3 : 0.06}
          speed={0.05}
          scale={1.12}
          style={{ transition: `opacity 6s ${ease}` }}
        />
        <ArtworkLayer
          src={civicArt.blueprint}
          opacity={phase >= 2 ? 0.16 : 0}
          speed={0.12}
          scale={1.22}
          mask="radial-gradient(60% 70% at 70% 40%, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)"
          style={{ transition: `opacity 7s ${ease}` }}
        />
        <CivicNetwork
          variant="infrastructure"
          seed={11}
          count={16}
          opacity={phase >= 1 ? 0.6 : 0}
          className="absolute inset-0 h-full w-full transition-opacity duration-[6000ms]"
        />
      </div>

      <div className="relative z-10 flex items-start justify-between px-8 pt-8 md:px-16 lg:px-24">
        <p className="label-civic text-foreground">Solena Civic</p>
        <p className="label-civic hidden md:block">Phase I — The Institution</p>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-8 pb-24 md:px-16 lg:px-24">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h1
              className="font-display text-[clamp(2.75rem,8.5vw,8.5rem)] leading-[0.92] tracking-[-0.02em] text-foreground"
              style={{
                opacity: phase >= 2 ? 1 : 0,
                transform: phase >= 2 ? "none" : "translateY(24px)",
                transition: `opacity 3s ${ease}, transform 3s ${ease}`,
              }}
            >
              Public trust
              <br />
              is designed.
            </h1>
          </div>
          <div className="flex flex-col justify-end lg:col-span-4">
            <p
              className="max-w-sm text-[0.95rem] leading-relaxed text-muted-foreground"
              style={{
                opacity: phase >= 3 ? 1 : 0,
                transform: phase >= 3 ? "none" : "translateY(16px)",
                transition: `opacity 3s ${ease} 0.4s, transform 3s ${ease} 0.4s`,
              }}
            >
              Designing the systems through which governments, institutions and citizens
              experience one another.
            </p>
          </div>
        </div>

        <div
          className="rule-hair mt-20 flex items-center justify-between pt-6"
          style={{
            opacity: phase >= 3 ? 1 : 0,
            transition: `opacity 3s ${ease} 1.2s`,
          }}
        >
          <a href="#manifesto" className="label-civic hover:text-foreground transition-colors duration-700">
            <span aria-hidden="true" className="mr-3 inline-block">
              ↓
            </span>
            Scroll
          </a>
          <p className="label-civic hidden md:block">N 01°17′23″ · E 36°49′30″</p>
        </div>
      </div>
    </section>
  );
}
