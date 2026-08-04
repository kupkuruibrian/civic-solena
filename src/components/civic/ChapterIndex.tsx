import { Link } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";

const CHAPTERS = [
  {
    to: "/atlas",
    index: "01",
    title: "The Civic Atlas",
    note: "Twenty-seven institutions, one connected network, ten institutional layers.",
  },
  {
    to: "/practices",
    index: "02",
    title: "The Practices",
    note: "Institutional identity, civic communication, digital government, environmental experience.",
  },
  {
    to: "/systems",
    index: "03",
    title: "Systems in Public",
    note: "Localization into Kenya, and campaign systems that carry a nation's attention.",
  },
  {
    to: "/intelligence",
    index: "04",
    title: "Civic Intelligence",
    note: "Trust, clarity and accessibility, measured the way infrastructure is measured.",
  },
];

export function ChapterIndex() {
  const { ref, shown } = useReveal<HTMLElement>(0.08);

  return (
    <section
      id="chapters"
      ref={ref}
      className="paper-grain relative scroll-mt-24 overflow-hidden bg-paper py-24 sm:py-32 md:py-40"
      aria-labelledby="chapters-title"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-16 lg:px-24">
        <p className="label-civic mb-10 md:mb-14">The Index</p>
        <h2
          id="chapters-title"
          className="font-display max-w-3xl text-[clamp(1.8rem,4.4vw,3.6rem)] leading-[1.05] tracking-[-0.015em]"
          style={{
            opacity: shown ? 1 : 0,
            transform: shown ? "none" : "translateY(20px)",
            transition: "opacity 1.8s cubic-bezier(0.16,0.7,0.16,1), transform 1.8s cubic-bezier(0.16,0.7,0.16,1)",
          }}
        >
          Four chapters of the operating system.
        </h2>

        <ul className="mt-14 md:mt-20">
          {CHAPTERS.map((c) => (
            <li key={c.to} className="rule-hair">
              <Link
                to={c.to}
                className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-baseline gap-4 py-7 transition-colors duration-500 hover:text-foreground sm:gap-8 md:py-9"
              >
                <span className="label-civic shrink-0">{c.index}</span>
                <span className="min-w-0">
                  <span className="font-display block text-[clamp(1.35rem,3.4vw,2.6rem)] leading-tight tracking-[-0.015em]">
                    {c.title}
                  </span>
                  <span className="mt-2 block max-w-md text-sm leading-relaxed text-muted-foreground">
                    {c.note}
                  </span>
                </span>
                <span aria-hidden="true" className="label-civic shrink-0">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
