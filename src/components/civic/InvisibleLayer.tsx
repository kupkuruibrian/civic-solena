import { useState } from "react";
import { ArtworkLayer } from "./ArtworkLayer";
import { CivicNetwork } from "./CivicNetwork";
import { useReveal } from "@/hooks/use-reveal";
import { civicArt } from "@/lib/civic-assets";

const STRATA = [
  { label: "Communication", note: "Language is infrastructure.", tone: "var(--bronze)" },
  { label: "Architecture", note: "Buildings instruct before they shelter.", tone: "var(--steel)" },
  { label: "Movement", note: "How a city routes people is a statement of intent.", tone: "var(--civic)" },
  { label: "Trust", note: "Accumulated by consistency; spent by exception.", tone: "var(--bronze)" },
  { label: "Participation", note: "A threshold, not an invitation.", tone: "var(--steel)" },
  { label: "Accessibility", note: "The measure of whether a system means what it says.", tone: "var(--civic)" },
];

export function InvisibleLayer() {
  const { ref, shown } = useReveal<HTMLElement>(0.15);
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      id="invisible-layer"
      ref={ref}
      className="paper-grain relative scroll-mt-24 overflow-hidden bg-background py-40 md:py-56"
      aria-labelledby="invisible-title"
    >
      <ArtworkLayer src={civicArt.topography} opacity={0.26} speed={0.1} scale={1.18} />
      <CivicNetwork
        variant="routing"
        seed={41}
        count={20}
        opacity={active === null ? 0.45 : 0.75}
        className="absolute inset-0 h-full w-full transition-opacity duration-[2000ms]"
      />

      <div className="relative z-10 mx-auto max-w-[1600px] px-8 md:px-16 lg:px-24">
        <p className="label-civic mb-16">Section Two — The Invisible Layer</p>

        <div className="grid gap-24 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2
              id="invisible-title"
              className="font-display text-[clamp(2rem,4.4vw,4rem)] leading-[1.02] tracking-[-0.015em]"
              style={{
                opacity: shown ? 1 : 0,
                transform: shown ? "none" : "translateY(24px)",
                transition: "opacity 2.4s cubic-bezier(0.16,0.7,0.16,1), transform 2.4s cubic-bezier(0.16,0.7,0.16,1)",
              }}
            >
              One ecosystem, not twelve disciplines.
            </h2>
            <p className="mt-10 max-w-sm text-[0.95rem] leading-relaxed text-muted-foreground">
              Every civic interaction inherits from another. Nothing stands alone.
            </p>
          </div>

          <ul className="lg:col-span-7">
            {STRATA.map((s, i) => (
              <li
                key={s.label}
                className="rule-hair group relative"
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                style={{
                  opacity: shown ? 1 : 0,
                  transform: shown ? "none" : "translateY(18px)",
                  transition: `opacity 1.8s cubic-bezier(0.16,0.7,0.16,1) ${0.3 + i * 0.18}s, transform 1.8s cubic-bezier(0.16,0.7,0.16,1) ${0.3 + i * 0.18}s`,
                }}
              >
                <div
                  tabIndex={0}
                  className="flex flex-wrap items-baseline justify-between gap-4 py-8 outline-none"
                >
                  <span className="font-display text-[clamp(1.6rem,3vw,2.6rem)] leading-none tracking-[-0.01em]">
                    {s.label}
                  </span>
                  <span
                    className="max-w-xs text-sm leading-relaxed text-muted-foreground transition-opacity duration-700"
                    style={{ opacity: active === i ? 1 : 0.22 }}
                  >
                    {s.note}
                  </span>
                </div>
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-px transition-all duration-[1400ms] ease-out"
                  style={{ width: active === i ? "100%" : "0%", background: s.tone }}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
