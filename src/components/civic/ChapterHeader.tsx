import { Link } from "@tanstack/react-router";

export function ChapterHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <section className="paper-grain relative overflow-hidden bg-background pt-32 pb-10 sm:pt-40 md:pt-52 md:pb-16">
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-16 lg:px-24">
        <p className="label-civic">{eyebrow}</p>
        <h1 className="font-display mt-8 max-w-4xl text-[clamp(2.1rem,6.5vw,5rem)] leading-[1.02] tracking-[-0.02em]">
          {title}
        </h1>
        <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
          {intro}
        </p>
      </div>
    </section>
  );
}

export function ChapterFootLink({ to, label }: { to: string; label: string }) {
  return (
    <div className="mx-auto w-full max-w-[1600px] px-5 pb-20 sm:px-8 md:px-16 md:pb-28 lg:px-24">
      <Link to={to} className="label-civic transition-colors duration-500 hover:text-foreground">
        Next — {label}
      </Link>
    </div>
  );
}
