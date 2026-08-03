import { useState } from "react";
import { CivicNetwork } from "./CivicNetwork";
import { useReveal } from "@/hooks/use-reveal";

const CAMPAIGNS = [
  ["Vaccination", "Health", "Clinics, radio, chiefs' barazas, SMS"],
  ["Road Safety", "Transport", "Highways, matatu fleets, schools"],
  ["Tourism", "Identity", "Embassies, airports, global press"],
  ["Investment", "Economy", "Missions, county desks, investor portals"],
  ["Environment", "Land", "Counties, schools, community forests"],
  ["Education", "Knowledge", "Enrolment drives, parent communication"],
  ["Tax", "Revenue", "Filing seasons, SME clinics, portals"],
  ["National Celebrations", "Culture", "Stadiums, broadcast, public squares"],
  ["Election Awareness", "Trust", "Registration, civic literacy, results"],
  ["Behaviour Change", "Society", "Long horizons, patient measurement"],
];

export function CampaignSystems() {
  const { ref, shown } = useReveal<HTMLElement>(0.08);
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      id="campaigns"
      ref={ref}
      className="paper-grain relative scroll-mt-24 overflow-hidden bg-background py-24 sm:py-32 md:py-44"
      aria-labelledby="campaigns-title"
    >
      <CivicNetwork
        variant="routing"
        seed={41}
        count={20}
        opacity={0.35}
        className="pointer-events-none absolute inset-0 h-full w-full"
      />

      <div className="relative z-10 mx-auto max-w-[1600px] px-5 sm:px-8 md:px-16 lg:px-24">
        <p className="label-civic">Section Nine — Public Campaign Systems</p>
        <h2
          id="campaigns-title"
          className="font-display mt-8 max-w-3xl text-[clamp(1.9rem,4.6vw,4rem)] leading-[1.03] tracking-[-0.015em]"
          style={{
            opacity: shown ? 1 : 0,
            transform: shown ? "none" : "translateY(20px)",
            transition: "opacity 2.2s cubic-bezier(0.16,0.7,0.16,1), transform 2.2s cubic-bezier(0.16,0.7,0.16,1)",
          }}
        >
          Campaigns are living timelines, not posters.
        </h2>

        <ol className="mt-14 md:mt-20">
          {CAMPAIGNS.map(([name, domain, pathways], i) => {
            const isActive = active === i;
            return (
              <li
                key={name}
                className="rule-hair"
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
              >
                <div
                  tabIndex={0}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-3 py-5 outline-none sm:grid-cols-[3rem_minmax(0,1fr)_9rem_auto] sm:gap-6 sm:py-6"
                  style={{
                    opacity: shown ? 1 : 0,
                    transition: `opacity 1.4s cubic-bezier(0.16,0.7,0.16,1) ${0.15 + i * 0.07}s`,
                  }}
                >
                  <span className="label-civic hidden sm:block">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-display min-w-0 truncate text-[clamp(1.2rem,2.8vw,2.1rem)] leading-none tracking-[-0.01em]">
                    {name}
                  </span>
                  <span className="label-civic shrink-0 text-right sm:text-left">{domain}</span>
                  <span
                    className="col-span-2 text-xs leading-relaxed text-muted-foreground transition-all duration-1000 sm:col-span-1 sm:text-right"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? "none" : "translateY(-4px)",
                    }}
                  >
                    {pathways}
                  </span>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
