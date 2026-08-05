import { ArtworkLayer } from "./ArtworkLayer";
import { CivicNetwork } from "./CivicNetwork";
import { useReveal } from "@/hooks/use-reveal";
import { civicArt } from "@/lib/civic-assets";

export function Manifesto() {
  const { ref, shown } = useReveal<HTMLElement>(0.2);

  return (
    <section
      id="manifesto"
      ref={ref}
      className="paper-grain relative scroll-mt-24 overflow-hidden bg-paper py-40 md:py-56"
      aria-labelledby="manifesto-title"
    >
      <ArtworkLayer src={civicArt.artwork} opacity={0.22} speed={0.08} scale={1.15} />
      <CivicNetwork
        variant="radial"
        seed={23}
        count={22}
        opacity={0.5}
        className="absolute inset-0 h-full w-full"
      />

      <div className="relative z-10 mx-auto max-w-[1600px] px-5 sm:px-8 md:px-16 lg:px-24">
        <p className="label-civic mb-16">Section One — Manifesto</p>
        <div className="grid gap-20 lg:grid-cols-12">
          <h2
            id="manifesto-title"
            className="font-display text-[clamp(2.25rem,5.6vw,5.5rem)] leading-[1] tracking-[-0.015em] lg:col-span-8"
            style={{
              opacity: shown ? 1 : 0,
              transform: shown ? "none" : "translateY(28px)",
              transition: "opacity 2.4s cubic-bezier(0.16,0.7,0.16,1), transform 2.4s cubic-bezier(0.16,0.7,0.16,1)",
            }}
          >
            Better institutions create better societies.
          </h2>
          <div
            className="space-y-8 lg:col-span-4 lg:pt-6"
            style={{
              opacity: shown ? 1 : 0,
              transition: "opacity 2.6s cubic-bezier(0.16,0.7,0.16,1) 0.6s",
            }}
          >
            <p className="text-[0.95rem] leading-relaxed text-muted-foreground">
              A permit queue. A hospital corridor. A ballot. A road sign at dusk. Each one is a
              sentence in a language citizens read every day.
            </p>
            <p className="text-[0.95rem] leading-relaxed text-muted-foreground">
              We work on the grammar.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
