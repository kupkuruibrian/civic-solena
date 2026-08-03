import { useMemo } from "react";

type Variant = "infrastructure" | "radial" | "contour" | "routing";

function mulberry(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Line = { d: string; dash: number; delay: number; dur: number; tone: string };
type Node = { x: number; y: number; delay: number; tone: string };

const TONES = ["var(--rule)", "var(--rule)", "var(--rule)", "var(--bronze)", "var(--steel)", "var(--civic)"];

/**
 * Reusable civic SVG library: infrastructure flows, administrative routing,
 * radial propagation and contour layers. Lines extend imperceptibly slowly.
 */
export function CivicNetwork({
  variant = "infrastructure",
  seed = 7,
  count = 18,
  className = "",
  opacity = 0.55,
}: {
  variant?: Variant;
  seed?: number;
  count?: number;
  className?: string;
  opacity?: number;
}) {
  const { lines, nodes } = useMemo(() => {
    const rnd = mulberry(seed * 977 + variant.length);
    const ls: Line[] = [];
    const ns: Node[] = [];
    const tone = (): string => TONES[Math.floor(rnd() * TONES.length)] ?? "var(--rule)";

    for (let i = 0; i < count; i++) {
      const t = i / Math.max(count - 1, 1);
      let d = "";
      if (variant === "infrastructure") {
        const y = 40 + t * 720 + rnd() * 24;
        const midY = y + (rnd() - 0.5) * 180;
        d = `M -20 ${y.toFixed(1)} C 220 ${y.toFixed(1)}, 340 ${midY.toFixed(1)}, 520 ${midY.toFixed(1)} S 860 ${(midY + (rnd() - 0.5) * 140).toFixed(1)}, 1220 ${(midY + (rnd() - 0.5) * 90).toFixed(1)}`;
        ns.push({ x: Math.round(200 + rnd() * 820), y: Math.round(midY), delay: rnd() * 9, tone: tone() });
      } else if (variant === "radial") {
        const a = t * Math.PI * 2 + rnd() * 0.25;
        const r1 = 60 + rnd() * 40;
        const r2 = 300 + rnd() * 320;
        const cx = 600;
        const cy = 400;
        const bend = (rnd() - 0.5) * 220;
        d = `M ${(cx + Math.cos(a) * r1).toFixed(1)} ${(cy + Math.sin(a) * r1).toFixed(1)} Q ${(cx + Math.cos(a) * r2 * 0.6 + bend).toFixed(1)} ${(cy + Math.sin(a) * r2 * 0.6).toFixed(1)}, ${(cx + Math.cos(a) * r2).toFixed(1)} ${(cy + Math.sin(a) * r2).toFixed(1)}`;
        ns.push({ x: Math.round(cx + Math.cos(a) * r2), y: Math.round(cy + Math.sin(a) * r2), delay: rnd() * 10, tone: tone() });
      } else if (variant === "contour") {
        const cy = 400 + (t - 0.5) * 520;
        const amp = 40 + rnd() * 70;
        d = `M -40 ${cy.toFixed(1)} C 180 ${(cy - amp).toFixed(1)}, 380 ${(cy + amp).toFixed(1)}, 600 ${cy.toFixed(1)} S 1020 ${(cy - amp * 0.8).toFixed(1)}, 1240 ${(cy + amp * 0.3).toFixed(1)}`;
      } else {
        const x = 60 + t * 1080;
        const bendY = 120 + rnd() * 560;
        d = `M ${x.toFixed(1)} -20 L ${x.toFixed(1)} ${bendY.toFixed(1)} L ${(x + (rnd() > 0.5 ? 1 : -1) * (80 + rnd() * 260)).toFixed(1)} ${bendY.toFixed(1)} L ${(x + (rnd() > 0.5 ? 1 : -1) * (80 + rnd() * 260)).toFixed(1)} 820`;
        ns.push({ x: Math.round(x), y: Math.round(bendY), delay: rnd() * 8, tone: tone() });
      }
      ls.push({
        d,
        dash: 2600,
        delay: Math.round(rnd() * 120) / 10,
        dur: Math.round(26 + rnd() * 34),
        tone: rnd() > 0.86 ? tone() : "var(--rule)",
      });
    }
    return { lines: ls, nodes: ns };
  }, [variant, seed, count]);

  return (
    <svg
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={{ opacity }}
    >
      <g fill="none" strokeLinecap="round">
        {lines.map((l, i) => (
          <path
            key={i}
            d={l.d}
            stroke={l.tone}
            strokeWidth={l.tone === "var(--rule)" ? 0.6 : 0.9}
            strokeDasharray={l.dash}
            strokeDashoffset={l.dash}
            style={{
              animation: `solena-draw ${l.dur}s cubic-bezier(0.16,0.6,0.2,1) ${l.delay}s forwards, solena-breathe ${l.dur * 1.6}s ease-in-out ${l.delay}s infinite`,
            }}
          />
        ))}
      </g>
      <g>
        {nodes.map((n, i) => (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={1.8}
            fill={n.tone}
            style={{ animation: `solena-node ${14 + (i % 7) * 3}s ease-in-out ${n.delay}s infinite` }}
          />
        ))}
      </g>
    </svg>
  );
}
