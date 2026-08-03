import { CivicNetwork } from "./CivicNetwork";

export function CivicFooter() {
  return (
    <footer id="contact" className="paper-grain relative scroll-mt-24 overflow-hidden bg-paper py-28 sm:py-40 md:py-64">
      <CivicNetwork
        variant="contour"
        seed={97}
        count={9}
        opacity={0.3}
        className="absolute inset-0 h-full w-full"
      />
      <div className="relative z-10 mx-auto max-w-[1600px] px-8 md:px-16 lg:px-24">
        <p className="font-display max-w-3xl text-[clamp(1.6rem,3.4vw,3rem)] leading-[1.08] tracking-[-0.015em]">
          Designing institutions that outlast administrations.
        </p>

        <div className="rule-hair mt-40 flex flex-wrap items-baseline justify-between gap-8 pt-8">
          <p className="label-civic text-foreground">Solena Civic</p>
          <a
            href="mailto:studio@solenacivic.com"
            className="label-civic hover:text-foreground transition-colors duration-700"
          >
            Begin the conversation
          </a>
          <p className="label-civic">MMXXVI</p>
        </div>
      </div>
    </footer>
  );
}
