import { useReveal } from "@/hooks/use-reveal";
import { CivicNetwork } from "./CivicNetwork";

const METRICS: [string, string, string, number][] = [
  ["Citizen trust", "68", "index, national average", 0.68],
  ["Communication health", "74", "clarity across ministries", 0.74],
  ["Regional participation", "52", "counties actively engaged", 0.52],
  ["Campaign effectiveness", "81", "recall and behaviour shift", 0.81],
  ["Institutional consistency", "63", "identity applied correctly", 0.63],
  ["Accessibility", "77", "services usable by everyone", 0.77],
];

/** Civic intelligence: an editorial dashboard, not an analytical one. */
export function CivicIntelligence() {
  const { ref, shown } = useReveal<HTMLElement>(0.1);

  return (
    <section
      id="knowledge"
      ref={ref}
      className="civic-dark relative scroll-mt-24 overflow-hidden py-24 sm:py-32 md:py-48"
      aria-labelledby="intelligence-title"
    >
      <CivicNetwork
        variant="radial"
        seed={83}
        count={22}
        opacity={0.3}
        className="pointer-events-none absolute inset-0 h-full w-full"
      />

      <div className="relative z-10 mx-auto max-w-[1600px] px-5 sm:px-8 md:px-16 lg:px-24">
        <p className="label-civic">Section Ten — Civic Intelligence</p>
        <h2
          id="intelligence-title"
          className="font-display mt-8 max-w-3xl text-[clamp(1.9rem,5vw,4.25rem)] leading-[1.03] tracking-[-0.02em]"
          style={{
            opacity: shown ? 1 : 0,
            transform: shown ? "none" : "translateY(22px)",
            transition: "opacity 2.4s cubic-bezier(0.16,0.7,0.16,1), transform 2.4s cubic-bezier(0.16,0.7,0.16,1)",
          }}
        >
          Trust is measurable. Quietly.
        </h2>

        <dl className="mt-16 grid gap-x-14 gap-y-10 sm:grid-cols-2 md:mt-24 lg:grid-cols-3">
          {METRICS.map(([label, value, note, ratio], i) => (
            <div
              key={label}
              className="min-w-0"
              style={{
                opacity: shown ? 1 : 0,
                transform: shown ? "none" : "translateY(18px)",
                transition: `opacity 1.8s cubic-bezier(0.16,0.7,0.16,1) ${0.2 + i * 0.12}s, transform 1.8s cubic-bezier(0.16,0.7,0.16,1) ${0.2 + i * 0.12}s`,
              }}
            >
              <dt className="label-civic">{label}</dt>
              <dd className="font-display mt-4 text-[clamp(3rem,7vw,5.5rem)] leading-none tracking-[-0.03em]">
                {value}
              </dd>
              <div className="mt-5 h-px w-full bg-current/20">
                <div
                  className="h-px bg-bronze transition-[width] duration-[3000ms] ease-out"
                  style={{ width: shown ? `${ratio * 100}%` : "0%" }}
                />
              </div>
              <p className="mt-3 text-xs text-muted-foreground">{note}</p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
