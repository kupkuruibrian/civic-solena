import { useMemo, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArtworkLayer } from "./ArtworkLayer";
import { useReveal } from "@/hooks/use-reveal";
import { civicArt } from "@/lib/civic-assets";
import {
  ATLAS_EDGES,
  ATLAS_LAYERS,
  ATLAS_NODES,
  NODE_BY_ID,
  neighboursOf,
  type AtlasLayer,
} from "@/lib/civic-atlas-data";

const W = 1200;
const H = 760;

function edgePath(ax: number, ay: number, bx: number, by: number, i: number) {
  const mx = (ax + bx) / 2;
  const my = (ay + by) / 2;
  const dx = bx - ax;
  const dy = by - ay;
  const bend = (i % 2 === 0 ? 1 : -1) * 0.14;
  return `M ${ax} ${ay} Q ${(mx - dy * bend).toFixed(1)} ${(my + dx * bend).toFixed(1)}, ${bx} ${by}`;
}

/**
 * The master civic atlas: one living ecosystem of institutions.
 * Hover, focus or keyboard-select any node to illuminate everything it touches.
 */
export function CivicAtlas() {
  const { ref, shown } = useReveal<HTMLElement>(0.08);
  const [active, setActive] = useState<string | null>(null);
  const [layer, setLayer] = useState<AtlasLayer | null>(null);
  const isMobile = useIsMobile();

  const lit = useMemo(() => (active ? neighboursOf(active) : null), [active]);
  const activeNode = active ? NODE_BY_ID.get(active) : null;
  const layerMeta = ATLAS_LAYERS.find((l) => l.id === layer) ?? null;

  const inLayer = (ids: AtlasLayer[]) => !layer || ids.includes(layer);

  return (
    <section
      id="atlas"
      ref={ref}
      className="paper-grain relative scroll-mt-24 overflow-hidden bg-paper py-24 sm:py-32 md:py-44"
      aria-labelledby="atlas-title"
    >
      <ArtworkLayer
        src={civicArt.invisibleCity}
        opacity={0.12}
        speed={0.05}
        scale={1.12}
        mask="radial-gradient(75% 70% at 50% 45%, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0) 100%)"
      />

      <div className="relative z-10 mx-auto max-w-[1600px] px-5 sm:px-8 md:px-16 lg:px-24">
        <header className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4 sm:flex sm:flex-wrap sm:justify-between">
          <p className="label-civic min-w-0">Phase II — The System</p>
          <p className="label-civic hidden shrink-0 sm:block">Master Civic Atlas</p>
        </header>

        <h2
          id="atlas-title"
          className="font-display mt-10 max-w-4xl text-[clamp(2rem,6vw,4.75rem)] leading-[1.02] tracking-[-0.02em]"
          style={{
            opacity: shown ? 1 : 0,
            transform: shown ? "none" : "translateY(22px)",
            transition: "opacity 2.2s cubic-bezier(0.16,0.7,0.16,1), transform 2.2s cubic-bezier(0.16,0.7,0.16,1)",
          }}
        >
          Governments are ecosystems.
        </h2>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
          Every institution a citizen touches belongs to one connected network. Select a system to
          see everything it quietly holds together.
        </p>

        {/* Layer strata */}
        <div className="mt-12 sm:mt-16">
          <p className="label-civic mb-4">Institutional layers</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-3 pb-2">
            {ATLAS_LAYERS.map((l) => (
              <li key={l.id}>
                <button
                  type="button"
                  aria-pressed={layer === l.id}
                  onClick={() => setLayer(layer === l.id ? null : l.id)}
                  className="label-civic whitespace-nowrap py-1 transition-colors duration-500 hover:text-foreground"
                  style={{ color: layer === l.id ? "var(--bronze)" : undefined }}
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-3 h-5 text-xs italic text-muted-foreground transition-opacity duration-700">
            {layerMeta?.note ?? ""}
          </p>
        </div>

        {/* Atlas plane */}
        <div className="relative mt-10 md:mt-14">
          <div className="relative w-full">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              preserveAspectRatio="xMidYMid meet"
              className="h-auto w-full max-w-full touch-pan-y"
              role="img"
              aria-labelledby="atlas-svg-title atlas-svg-desc"
            >
              <title id="atlas-svg-title">Solena Civic atlas of national institutions</title>
              <desc id="atlas-svg-desc">
                A network diagram of {ATLAS_NODES.length} public institutions and the relationships
                between them. The same relationships are listed as buttons beneath the diagram.
              </desc>

              <g fill="none" strokeLinecap="round">
                {ATLAS_EDGES.map(([a, b], i) => {
                  const na = NODE_BY_ID.get(a);
                  const nb = NODE_BY_ID.get(b);
                  if (!na || !nb) return null;
                  const isLit = !!lit && lit.has(a) && lit.has(b);
                  const dim = (!!lit && !isLit) || (!!layer && !(inLayer(na.layers) && inLayer(nb.layers)));
                  return (
                    <path
                      key={`${a}-${b}`}
                      d={edgePath(na.x, na.y, nb.x, nb.y, i)}
                      stroke={isLit ? "var(--bronze)" : "var(--rule)"}
                      strokeWidth={isLit ? 1.1 : 0.6}
                      strokeDasharray={2600}
                      strokeDashoffset={shown ? 0 : 2600}
                      style={{
                        opacity: dim ? 0.12 : isLit ? 0.85 : 0.45,
                        transition:
                          "stroke-dashoffset 26s cubic-bezier(0.16,0.6,0.2,1), opacity 1.1s ease, stroke-width 0.8s ease",
                        transitionDelay: `${(i % 12) * 0.35}s, 0s, 0s`,
                      }}
                    />
                  );
                })}
              </g>

              <g>
                {ATLAS_NODES.map((n, i) => {
                  const isActive = active === n.id;
                  const isLit = !!lit && lit.has(n.id);
                  const dim = (!!lit && !isLit) || !inLayer(n.layers);
                  const r = (2 + n.scale * 1.7) * (isMobile ? 2 : 1);
                  const showLabel = !isMobile || isActive || (n.scale >= 2.4 && !lit);
                  return (
                    <g
                      key={n.id}
                      tabIndex={0}
                      role="button"
                      aria-label={`${n.label}. ${n.note}`}
                      aria-pressed={isActive}
                      className="cursor-pointer outline-none"
                      onMouseEnter={() => !isMobile && setActive(n.id)}
                      onMouseLeave={() => !isMobile && setActive(null)}
                      onFocus={() => setActive(n.id)}
                      onBlur={() => setActive(null)}
                      onClick={() => setActive(isActive ? null : n.id)}
                      style={{ opacity: dim ? 0.22 : 1, transition: "opacity 1s ease" }}
                    >
                      <circle cx={n.x} cy={n.y} r={r + (isMobile ? 34 : 16)} fill="transparent" />
                      <circle
                        cx={n.x}
                        cy={n.y}
                        r={r + (isActive ? (isMobile ? 14 : 8) : 0)}
                        fill="none"
                        stroke={isLit ? "var(--bronze)" : "var(--rule)"}
                        strokeWidth={isMobile ? 1.6 : 0.8}
                        style={{
                          transition: "r 1.2s cubic-bezier(0.16,0.7,0.16,1), stroke 0.8s ease",
                          animation: `solena-node ${16 + (i % 6) * 3}s ease-in-out ${(i % 9) * 0.7}s infinite`,
                        }}
                      />
                      <circle
                        cx={n.x}
                        cy={n.y}
                        r={r * 0.42}
                        fill={isLit ? "var(--bronze)" : "var(--foreground)"}
                        style={{ transition: "fill 0.8s ease" }}
                      />
                      {showLabel ? (
                        <text
                          x={n.x + r + (isMobile ? 14 : 9)}
                          y={n.y + (isMobile ? 8 : 3.5)}
                          fontSize={isMobile ? 22 : n.scale >= 2 ? 11 : 9.5}
                          fill="currentColor"
                          className={`pointer-events-none font-sans ${isActive ? "fill-foreground" : "fill-muted-foreground"}`}
                          style={{
                            letterSpacing: "0.06em",
                            opacity: isLit || !lit ? 1 : 0.4,
                            transition: "opacity 0.8s ease",
                          }}
                        >
                          {n.label}
                        </text>
                      ) : null}

                    </g>
                  );
                })}
              </g>
            </svg>
          </div>

          <div className="rule-hair mt-6 pt-6 md:absolute md:bottom-2 md:right-0 md:mt-0 md:max-w-xs md:border-0 md:bg-background/70 md:p-5 md:backdrop-blur-sm">
            <p className="label-civic">{activeNode ? "Connected systems" : "Select a system"}</p>
            <p className="font-display mt-3 text-[clamp(1.15rem,2.4vw,1.7rem)] leading-tight">
              {activeNode ? activeNode.label : "Everything is connected."}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              {activeNode ? activeNode.note : "Hover, tap or tab through the atlas to reveal relationships."}
            </p>
          </div>
        </div>

        {/* Keyboard / no-hover equivalent */}
        <div className="mt-10">
          <p className="label-civic mb-4">Index of systems</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {ATLAS_NODES.map((n) => (
              <li key={n.id}>
                <button
                  type="button"
                  onClick={() => setActive(active === n.id ? null : n.id)}
                  onFocus={() => setActive(n.id)}
                  className="label-civic transition-colors duration-500 hover:text-foreground"
                  style={{ color: active === n.id ? "var(--bronze)" : undefined }}
                >
                  {n.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
