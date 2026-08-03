import { useReveal } from "@/hooks/use-reveal";

/** A pause between systems. One sentence, given room to breathe. */
export function EditorialInsert({
  lines,
  attribution,
  tone = "paper",
}: {
  lines: string[];
  attribution?: string;
  tone?: "paper" | "deep";
}) {
  const { ref, shown } = useReveal<HTMLElement>(0.25);

  return (
    <section
      ref={ref}
      className={`relative overflow-hidden py-28 sm:py-40 md:py-56 ${
        tone === "deep" ? "bg-paper-deep" : "bg-background"
      }`}
    >
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 md:px-16 lg:px-24">
        <p
          className="font-display max-w-5xl text-[clamp(1.9rem,6.4vw,5.25rem)] leading-[1.04] tracking-[-0.02em]"
          style={{
            opacity: shown ? 1 : 0,
            transform: shown ? "none" : "translateY(26px)",
            transition:
              "opacity 2.6s cubic-bezier(0.16,0.7,0.16,1), transform 2.6s cubic-bezier(0.16,0.7,0.16,1)",
          }}
        >
          {lines.map((l, i) => (
            <span key={l} className="block" style={{ transitionDelay: `${i * 0.2}s` }}>
              {l}
            </span>
          ))}
        </p>
        {attribution ? <p className="label-civic mt-10">{attribution}</p> : null}
      </div>
    </section>
  );
}
