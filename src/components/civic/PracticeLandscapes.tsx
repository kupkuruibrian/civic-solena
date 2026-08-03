import { useState } from "react";
import { ArtworkLayer } from "./ArtworkLayer";
import { CivicNetwork } from "./CivicNetwork";
import { useReveal } from "@/hooks/use-reveal";
import { civicArt } from "@/lib/civic-assets";

type Practice = {
  id: string;
  index: string;
  title: string;
  statement: string;
  art: string;
  variant: "infrastructure" | "radial" | "contour" | "routing";
  items: string[];
};

const PRACTICES: Practice[] = [
  {
    id: "institutional-identity",
    index: "01",
    title: "Institutional Identity",
    statement: "A state's signature, applied ten thousand times without variance.",
    art: civicArt.civilisation,
    variant: "radial",
    items: ["Typography", "Architecture", "Public symbols", "Wayfinding", "Documents", "Vehicles", "Uniforms", "Buildings", "Environmental graphics", "Maps"],
  },
  {
    id: "civic-communication",
    index: "02",
    title: "Civic Communication",
    statement: "Communication is infrastructure. It carries consent the way a road carries traffic.",
    art: civicArt.artwork,
    variant: "infrastructure",
    items: ["Campaigns", "Public participation", "Emergency communication", "Public education", "Media", "Digital publishing", "Social systems", "Speechwriting", "Reports", "Editorial publications"],
  },
  {
    id: "digital-government",
    index: "03",
    title: "Digital Government",
    statement: "One digital organism, not forty websites that happen to share a flag.",
    art: civicArt.blueprint,
    variant: "routing",
    items: ["Citizen portals", "AI assistants", "Public dashboards", "Permits", "Accessibility", "Open data", "Payments", "Appointments", "GIS", "Knowledge systems"],
  },
  {
    id: "environmental-experience",
    index: "04",
    title: "Environmental Experience",
    statement: "One physical civic language, spoken by every building the public is invited into.",
    art: civicArt.topography,
    variant: "contour",
    items: ["Buildings", "Museums", "Hospitals", "Embassies", "Libraries", "Transport", "Public squares", "Visitor centres", "Wayfinding", "Architecture", "Landscape"],
  },
];

export function PracticeLandscapes() {
  const { ref, shown } = useReveal<HTMLElement>(0.06);
  const [open, setOpen] = useState<string | null>(PRACTICES[0]?.id ?? null);

  return (
    <section
      id="practices"
      ref={ref}
      className="paper-grain relative scroll-mt-24 overflow-hidden bg-background py-24 sm:py-32 md:py-48"
      aria-labelledby="practices-title"
    >
      <div className="relative z-10 mx-auto max-w-[1600px] px-5 sm:px-8 md:px-16 lg:px-24">
        <p className="label-civic mb-10 md:mb-16">Section Six — The Practices</p>
        <h2
          id="practices-title"
          className="font-display max-w-3xl text-[clamp(1.9rem,4.6vw,4rem)] leading-[1.03] tracking-[-0.015em]"
          style={{
            opacity: shown ? 1 : 0,
            transform: shown ? "none" : "translateY(22px)",
            transition: "opacity 2.2s cubic-bezier(0.16,0.7,0.16,1), transform 2.2s cubic-bezier(0.16,0.7,0.16,1)",
          }}
        >
          Each practice is a landscape, not a service.
        </h2>

        <div className="mt-16 md:mt-24">
          {PRACTICES.map((p) => {
            const isOpen = open === p.id;
            return (
              <article key={p.id} className="rule-hair relative overflow-hidden">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`${p.id}-panel`}
                    onClick={() => setOpen(isOpen ? null : p.id)}
                    className="grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-baseline gap-4 py-7 text-left sm:gap-6 md:py-10"
                  >
                    <span className="label-civic shrink-0">{p.index}</span>
                    <span className="font-display min-w-0 text-[clamp(1.5rem,4.4vw,3.25rem)] leading-none tracking-[-0.015em]">
                      {p.title}
                    </span>
                    <span
                      aria-hidden="true"
                      className="label-civic shrink-0 transition-transform duration-[1200ms]"
                      style={{ transform: isOpen ? "rotate(45deg)" : "none" }}
                    >
                      +
                    </span>
                  </button>
                </h3>

                <div
                  id={`${p.id}-panel`}
                  className="relative overflow-hidden transition-all duration-[1400ms] ease-out"
                  style={{ maxHeight: isOpen ? "56rem" : "0rem", opacity: isOpen ? 1 : 0 }}
                >
                  <div className="relative grid gap-10 pb-14 md:grid-cols-12 md:gap-14 md:pb-24">
                    <div className="relative min-h-[220px] overflow-hidden md:col-span-7 md:min-h-[420px]">
                      <ArtworkLayer src={p.art} opacity={0.4} speed={0.08} scale={1.06} />
                      <CivicNetwork
                        variant={p.variant}
                        seed={p.index.charCodeAt(1) * 13}
                        count={14}
                        opacity={0.5}
                        className="absolute inset-0 h-full w-full"
                      />
                    </div>
                    <div className="md:col-span-5">
                      <p className="font-display text-[clamp(1.15rem,2.3vw,1.9rem)] leading-snug">
                        {p.statement}
                      </p>
                      <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3">
                        {p.items.map((item) => (
                          <li key={item} className="label-civic">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
