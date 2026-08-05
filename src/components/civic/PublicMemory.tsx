import { useEffect, useRef, useState } from "react";
import { CivicNetwork } from "./CivicNetwork";
import { civicArt } from "@/lib/civic-assets";

const STATEMENTS = [
  ["Institutions leave memories.", "Design determines whether those memories endure."],
  ["An archive is not the past.", "It is the terms on which the future may argue."],
  ["Continuity is a public service.", "Most of it is invisible, and that is the point."],
];

/** Slow zoom through the institutional landscape, two sentences at a time. */
export function PublicMemory() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    if (!section || !image) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = section.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const p = Math.min(Math.max(-rect.top / Math.max(total, 1), 0), 1);
        if (!reduced) {
          image.style.transform = `scale(${(1.06 + p * 0.34).toFixed(3)}) translate3d(${(-p * 3).toFixed(2)}%, ${(-p * 5).toFixed(2)}%, 0)`;
        }
        setIndex(Math.min(STATEMENTS.length - 1, Math.floor(p * STATEMENTS.length * 0.999)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      id="public-memory"
      ref={sectionRef}
      className="relative h-[300vh] scroll-mt-24 bg-paper-deep"
      aria-labelledby="memory-title"
    >
      <div className="paper-grain sticky top-0 flex h-dvh items-center overflow-hidden">
        <div
          ref={imageRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-cover bg-center will-change-transform"
          style={{
            backgroundImage: `url(${civicArt.topography})`,
            opacity: 0.32,
            mixBlendMode: "multiply",
            filter: "grayscale(0.5) contrast(0.92)",
            WebkitMaskImage:
              "radial-gradient(80% 80% at 50% 50%, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%)",
            maskImage: "radial-gradient(80% 80% at 50% 50%, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%)",
          }}
        />
        <CivicNetwork
          variant="contour"
          seed={59}
          count={14}
          opacity={0.4}
          className="absolute inset-0 h-full w-full"
        />

        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-16 lg:px-24">
          <p id="memory-title" className="label-civic mb-16">
            Section Three — Public Memory
          </p>
          <div className="relative h-[9rem] max-w-3xl md:h-[11rem]">
            {STATEMENTS.map((lines, i) => (
              <p
                key={i}
                className="font-display absolute inset-0 text-[clamp(1.8rem,4vw,3.6rem)] leading-[1.08] tracking-[-0.015em]"
                style={{
                  opacity: index === i ? 1 : 0,
                  transform: index === i ? "none" : "translateY(14px)",
                  transition:
                    "opacity 1.6s cubic-bezier(0.16,0.7,0.16,1), transform 1.6s cubic-bezier(0.16,0.7,0.16,1)",
                }}
                aria-hidden={index !== i}
              >
                {lines[0]}
                <br />
                <span className="text-muted-foreground">{lines[1]}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
