import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "manifesto", label: "Manifesto" },
  { id: "invisible-layer", label: "The Invisible Layer" },
  { id: "public-memory", label: "Public Memory" },
  { id: "practice", label: "The Practice" },
];

export function CivicNav() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 bg-gradient-to-b from-background via-background/85 to-transparent transition-opacity duration-[1400ms] ease-out"
      style={{ opacity: visible ? 1 : 0, pointerEvents: visible ? "auto" : "none" }}
    >
      <div className="mx-auto flex max-w-[1600px] items-baseline justify-between px-8 py-8 md:px-16 lg:px-24">
        <a href="#top" className="label-civic hover:text-foreground transition-colors duration-500">
          Solena Civic
        </a>
        <nav aria-label="Sections">
          <ul className="hidden gap-10 md:flex">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="label-civic hover:text-foreground transition-colors duration-500"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
