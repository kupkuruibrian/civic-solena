import { useState } from "react";
import { ArtworkLayer } from "./ArtworkLayer";
import { useReveal } from "@/hooks/use-reveal";
import { civicArt } from "@/lib/civic-assets";

const DISCIPLINES = [
  ["Identity Systems", "A state's signature, applied ten thousand times without variance."],
  ["Public Communication", "Clarity is the shortest distance between authority and consent."],
  ["Institutional Publishing", "Records designed to be read a century from now."],
  ["Wayfinding", "Orientation is the first courtesy a public place extends."],
  ["Environmental Graphics", "Buildings speak; we decide what they say."],
  ["Digital Government", "Services that behave the way they promise to behave."],
  ["Public Campaigns", "Persuasion without condescension."],
  ["Localization", "One institution, many mother tongues, a single tone of voice."],
  ["AI Knowledge Systems", "Institutional memory made answerable."],
  ["Trust Analytics", "Measuring the distance between intention and experience."],
  ["Citizen Experience", "The sum of every interaction nobody was assigned to design."],
];

export function Practice() {
  const { ref, shown } = useReveal<HTMLElement>(0.1);
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      id="practice"
      ref={ref}
      className="paper-grain relative overflow-hidden bg-background py-40 md:py-56"
      aria-labelledby="practice-title"
    >
      <ArtworkLayer
        src={civicArt.blueprint}
        opacity={0.14}
        speed={0.07}
        scale={1.1}
        mask="radial-gradient(70% 60% at 80% 30%, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)"
      />

      <div className="relative z-10 mx-auto max-w-[1600px] px-8 md:px-16 lg:px-24">
        <p className="label-civic mb-16">Section Four — The Practice</p>
        <h2
          id="practice-title"
          className="font-display max-w-3xl text-[clamp(2rem,4.4vw,4rem)] leading-[1.02] tracking-[-0.015em]"
          style={{
            opacity: shown ? 1 : 0,
            transform: shown ? "none" : "translateY(24px)",
            transition:
              "opacity 2.4s cubic-bezier(0.16,0.7,0.16,1), transform 2.4s cubic-bezier(0.16,0.7,0.16,1)",
          }}
        >
          Eleven civic disciplines, practised as one.
        </h2>

        <ol className="mt-24 grid gap-x-16 md:grid-cols-2">
          {DISCIPLINES.map(([title, note], i) => (
            <li
              key={title}
              className="rule-hair group relative"
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              style={{
                opacity: shown ? 1 : 0,
                transition: `opacity 1.6s cubic-bezier(0.16,0.7,0.16,1) ${0.2 + i * 0.09}s`,
              }}
            >
              <div tabIndex={0} className="py-8 outline-none" onFocus={() => setActive(i)} onBlur={() => setActive(null)}>
                <div className="flex items-baseline gap-6">
                  <span className="label-civic w-8 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-[clamp(1.35rem,2.2vw,2rem)] leading-none tracking-[-0.01em]">
                    {title}
                  </h3>
                </div>
                <p
                  className="overflow-hidden pl-14 text-sm leading-relaxed text-muted-foreground transition-all duration-[1100ms] ease-out"
                  style={{
                    maxHeight: active === i ? "5rem" : "0rem",
                    opacity: active === i ? 1 : 0,
                    marginTop: active === i ? "1rem" : "0rem",
                  }}
                >
                  {note}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
