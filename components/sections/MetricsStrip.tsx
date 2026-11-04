"use client";

import anime from "animejs";
import { useEffect, useRef } from "react";
import { metrics } from "@/content/metrics";
import { useInView } from "@/lib/useInView";
import { useReducedMotion } from "@/lib/useReducedMotion";

const fmt = (v: number, d = 0) => v.toFixed(d);

export function MetricsStrip() {
  const reduced = useReducedMotion();
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.3 });
  const played = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced || !inView || played.current) return;
    played.current = true;
    el.querySelectorAll<HTMLElement>("[data-count]").forEach((n, i) => {
      const m = metrics[i];
      const o = { v: 0 };
      anime({ targets: o, v: m.to, duration: 1600, delay: i * 120, easing: "easeOutCubic", update: () => (n.textContent = fmt(o.v, m.decimals)) });
    });
    anime({ targets: el.querySelectorAll("[data-metric]"), opacity: [0, 1], translateY: [14, 0], delay: anime.stagger(90), duration: 700, easing: "easeOutQuad" });
  }, [ref, reduced, inView]);

  return (
    <div ref={ref} className="mt-12">
      <p className="mb-4 font-mono text-[11px] text-mute">측정한 값만 적었습니다 · 부하 테스트와 운영 로그</p>
      <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((m) => (
          <div key={m.label} data-metric className="bg-bg p-5">
            <p className="text-[12.5px] text-mute">{m.label}</p>
            <p className="mt-2 font-mono text-3xl font-semibold text-white">
              <span data-count>{fmt(m.to, m.decimals)}</span>
              <span className="text-lg text-accent-2">{m.unit}</span>
            </p>
            <p className="mt-1 font-mono text-[12px] text-mute">{m.before} → {m.after}</p>
            <p className="mt-2 text-[12px] leading-snug text-mute/90">{m.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
