import { useEffect, useRef, useState } from "react";
import { ArtworkLayer } from "./ArtworkLayer";
import { civicArt } from "@/lib/civic-assets";

const ARRIVING = [
  "International organisations",
  "Foreign insurers",
  "Embassies",
  "Development agencies",
  "Multinationals",
];

const SHIFTS = [
  ["Maps", "World regions", "Forty-seven counties"],
  ["Language", "Global English", "Kiswahili, English, mother tongue"],
  ["Photography", "Stock imagery", "Communities, photographed at home"],
  ["Colour", "Corporate contrast", "Softened earth and highland light"],
  ["Voice", "Imported authority", "Local familiarity"],
];

/** The localization transformation: the world arrives, and everything becomes Kenyan. */
export function Localization() {
  const ref = useRef<HTMLElement | null>(null);
  const [t, setT] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = node.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const p = total > 0 ? Math.min(Math.max(-rect.top / total, 0), 1) : 0;
        setT(p);
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
      id="transformation"
      ref={ref}
      className="paper-grain relative scroll-mt-24 bg-paper-deep"
      aria-labelledby="localization-title"
      style={{ minHeight: "220vh" }}
    >
      <div className="sticky top-0 flex min-h-dvh flex-col justify-center overflow-hidden py-20">
        <ArtworkLayer
          src={civicArt.invisibleCity}
          opacity={0.08 + t * 0.16}
          speed={0.04}
          scale={1.05 + t * 0.12}
        />
        <ArtworkLayer
          src={civicArt.topography}
          opacity={t * 0.24}
          speed={0.1}
          scale={1.2 - t * 0.14}
          mask="radial-gradient(60% 60% at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)"
        />

        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-16 lg:px-24">
          <p className="label-civic">Section Eight — Localization</p>
          <h2
            id="localization-title"
            className="font-display mt-8 max-w-3xl text-[clamp(1.9rem,5.4vw,4.5rem)] leading-[1.03] tracking-[-0.02em]"
          >
            Nothing arrives feeling imported.
          </h2>

          <div className="mt-12 grid gap-10 md:mt-20 md:grid-cols-12 md:gap-14">
            <ul className="md:col-span-4">
              {ARRIVING.map((a, i) => (
                <li
                  key={a}
                  className="rule-hair py-3 text-sm text-muted-foreground transition-all duration-1000"
                  style={{
                    opacity: 0.25 + Math.min(Math.max(t * 5 - i * 0.7, 0), 1) * 0.75,
                    transform: `translateX(${(1 - Math.min(Math.max(t * 5 - i * 0.7, 0), 1)) * 24}px)`,
                  }}
                >
                  {a}
                </li>
              ))}
            </ul>

            <dl className="md:col-span-8">
              {SHIFTS.map(([label, from, to], i) => {
                const local = Math.min(Math.max(t * 2.2 - i * 0.22, 0), 1);
                return (
                  <div
                    key={label}
                    className="rule-hair grid grid-cols-[minmax(0,1fr)] gap-1 py-4 sm:grid-cols-[10rem_minmax(0,1fr)] sm:items-baseline sm:gap-6"
                  >
                    <dt className="label-civic">{label}</dt>
                    <dd className="relative min-w-0 font-display text-[clamp(1.05rem,2.4vw,1.85rem)] leading-snug">
                      <span
                        className="block transition-opacity duration-700"
                        style={{ opacity: 1 - local }}
                      >
                        {from}
                      </span>
                      <span
                        className="absolute inset-0 block text-bronze transition-opacity duration-700"
                        style={{ opacity: local }}
                      >
                        {to}
                      </span>
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>

          <p className="mt-12 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Keep scrolling: the institution stays the same, and the country it speaks to becomes
            unmistakably present.
          </p>
        </div>
      </div>
    </section>
  );
}
