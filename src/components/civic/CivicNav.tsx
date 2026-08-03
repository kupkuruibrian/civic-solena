import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "atlas", label: "Atlas" },
  { id: "practices", label: "Practices" },
  { id: "campaigns", label: "Systems" },
  { id: "knowledge", label: "Knowledge" },
  { id: "transformation", label: "Transformation" },
  { id: "contact", label: "Conversation" },
];

export function CivicNav() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

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
      <div className="mx-auto grid max-w-[1600px] grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4 px-5 py-6 sm:px-8 md:flex md:justify-between md:px-16 md:py-8 lg:px-24">
        <a href="#top" className="label-civic min-w-0 truncate transition-colors duration-500 hover:text-foreground">
          Solena Civic
        </a>
        <nav aria-label="Sections" className="shrink-0">
          <ul className="hidden gap-8 md:flex lg:gap-10">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="label-civic transition-colors duration-500 hover:text-foreground"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="label-civic md:hidden"
            aria-expanded={open}
            aria-controls="civic-mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Index"}
          </button>
        </nav>
      </div>

      <div
        id="civic-mobile-nav"
        className="overflow-hidden bg-background/95 backdrop-blur-sm transition-all duration-700 ease-out md:hidden"
        style={{ maxHeight: open ? "22rem" : "0rem", opacity: open ? 1 : 0 }}
      >
        <ul className="px-5 pb-6 sm:px-8">
          {SECTIONS.map((s) => (
            <li key={s.id} className="rule-hair">
              <a
                href={`#${s.id}`}
                onClick={() => setOpen(false)}
                className="label-civic block py-4"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
