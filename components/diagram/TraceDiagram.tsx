"use client";

import anime from "animejs";
import { useEffect, useRef, useState } from "react";
import { useInView } from "@/lib/useInView";
import { useReducedMotion } from "@/lib/useReducedMotion";
import type { TraceProps, TraceTone } from "./types";

const TONE_STROKE: Record<TraceTone, string> = { ok: "var(--trace)", fail: "var(--fail)", muted: "var(--mute)" };
const TONE_PACKET: Record<TraceTone, string> = { ok: "var(--trace-2)", fail: "#fecaca", muted: "#cbd5e1" };

const HEAD = 30;
const TOP = 70;
const ROW = 48;
const PAD = 70;

export function TraceDiagram({ lanes, steps, mode, ariaLabel, compactBelow = 640, colWidth = 190 }: TraceProps) {
  const reduced = useReducedMotion();
  const [wrapRef, inView] = useInView<HTMLDivElement>({ threshold: 0.25 });
  const svgRef = useRef<SVGSVGElement>(null);
  const [compact, setCompact] = useState(false);

  // switch to the vertical list on narrow containers
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(([e]) => setCompact(e.contentRect.width < compactBelow));
    ro.observe(el);
    return () => ro.disconnect();
  }, [wrapRef, compactBelow]);

  const x = (id: string) => PAD + lanes.findIndex((l) => l.id === id) * colWidth;
  const width = PAD * 2 + (lanes.length - 1) * colWidth;
  const height = TOP + steps.length * ROW + 10;
  const animated = !reduced;

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || !animated || compact) return;
    const groups = Array.from(svg.querySelectorAll<SVGGElement>("[data-step]"));
    const tl = anime.timeline({ autoplay: false, easing: "easeInOutQuad" });
    anime.set(groups, { opacity: 0 });
    groups.forEach((g, i) => {
      const line = g.querySelector("[data-line]");
      const pk = g.querySelector("[data-packet]");
      const s = steps[i];
      tl.add({ targets: g, opacity: [0, 1], duration: 160 });
      if (line) tl.add({ targets: line, strokeDashoffset: [anime.setDashoffset, 0], duration: 420 }, "-=160");
      if (pk && s.from !== s.to) {
        tl.add({ targets: pk, cx: [x(s.from), x(s.to)], opacity: [1, 1], duration: 420 }, "-=420");
        tl.add({ targets: pk, opacity: 0, duration: 120 });
      }
    });

    if (mode === "scroll") {
      const onScroll = () => {
        const r = svg.getBoundingClientRect();
        const vh = window.innerHeight;
        const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.35)));
        tl.seek(p * tl.duration);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", onScroll);
        tl.pause();
      };
    }

    if (!inView) return () => tl.pause();
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (mode === "loop") {
      tl.complete = () => {
        timer = setTimeout(() => tl.restart(), 1800);
      };
    }
    tl.play();
    return () => {
      clearTimeout(timer);
      tl.pause();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animated, compact, inView, mode, steps, lanes]);

  if (compact) {
    return (
      <div ref={wrapRef} role="img" aria-label={ariaLabel} className="w-full">
        <ol className="space-y-2">
          {steps.map((s, i) => {
            const from = lanes.find((l) => l.id === s.from)?.label;
            const to = lanes.find((l) => l.id === s.to)?.label;
            return (
              <li key={i} data-step-item
                className={`rounded-md border px-3 py-2 font-mono text-[12px] leading-snug ${s.tone === "fail" ? "border-fail/50 text-fail" : "border-line text-ink"}`}>
                <span className="text-mute">{from}{s.from !== s.to ? ` → ${to}` : ""}</span>
                <div className="mt-0.5">{s.label}</div>
              </li>
            );
          })}
        </ol>
      </div>
    );
  }

  return (
    <div ref={wrapRef} className="w-full overflow-hidden">
      <svg ref={svgRef} viewBox={`0 0 ${width} ${height}`} role="img" aria-label={ariaLabel} className="h-auto w-full">
        {lanes.map((l) => (
          <g key={l.id}>
            <text x={x(l.id)} y={HEAD} textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--ink)" fontFamily="var(--font-jetbrains), monospace">{l.label}</text>
            {l.sub && <text x={x(l.id)} y={HEAD + 15} textAnchor="middle" fontSize="10.5" fill="var(--mute)">{l.sub}</text>}
            <line x1={x(l.id)} y1={HEAD + 24} x2={x(l.id)} y2={height - 4} stroke="#2A3550" strokeDasharray="4 5" />
          </g>
        ))}
        {steps.map((s, i) => {
          const y = TOP + i * ROW;
          const tone = s.tone ?? "ok";
          const a = x(s.from);
          const b = x(s.to);
          const stroke = TONE_STROKE[tone];
          if (a === b) {
            return (
              <g key={i} data-step opacity={animated ? "0" : "1"}>
                <rect data-line x={a - 8} y={y - 14} width={16} height={22} rx={3} fill="none" stroke={stroke} strokeWidth={1.6} />
                <text x={a + 16} y={y + 1} fontSize="11.5" fill="var(--ink)" fontFamily="var(--font-jetbrains), monospace">{s.label}</text>
              </g>
            );
          }
          const d = b > a ? 1 : -1;
          return (
            <g key={i} data-step opacity={animated ? "0" : "1"}>
              <path data-line d={`M${a} ${y} L${b - d * 6} ${y}`} stroke={stroke} strokeWidth={1.6} fill="none" />
              <path d={`M${b - d * 10} ${y - 4} L${b} ${y} L${b - d * 10} ${y + 4}`} fill={stroke} />
              <text x={(a + b) / 2} y={y - 8} textAnchor="middle" fontSize="11.5" fill={tone === "fail" ? "var(--fail)" : "var(--ink)"} fontFamily="var(--font-jetbrains), monospace">{s.label}</text>
              {animated && <circle data-packet cx={a} cy={y} r={4} fill={TONE_PACKET[tone]} opacity={0} />}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
