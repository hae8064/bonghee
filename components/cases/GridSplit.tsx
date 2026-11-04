"use client";

import anime from "animejs";
import { useEffect, useRef, useState } from "react";
import { useInView } from "@/lib/useInView";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { TerminalFrame } from "./TerminalFrame";

const N = 10;
const CELL = 22;
const GX = 330;
const GY = 30;
// ROI covers grid columns 3–5, rows 2–4
const ROI = { x0: 3, x1: 5, y0: 2, y1: 4 };
/** Below 520px the full 600-wide drawing shrinks text to ~5px, so phones see only the grid half. */
export function gridViewBox(containerWidth: number): string {
  return containerWidth < 520 ? "318 18 244 262" : "0 0 600 270";
}

const inRoi = (x: number, y: number) => x >= ROI.x0 && x <= ROI.x1 && y >= ROI.y0 && y <= ROI.y1;

export function GridSplit({ variant }: { variant: "preview" | "full" }) {
  const reduced = useReducedMotion();
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.3 });
  const svg = useRef<SVGSVGElement>(null);
  const [viewBox, setViewBox] = useState(gridViewBox(1000));

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(([e]) => setViewBox(gridViewBox(e.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  const narrow = viewBox !== gridViewBox(1000);

  useEffect(() => {
    const el = svg.current;
    if (!el || reduced || !inView) return;
    const lit = el.querySelectorAll("[data-lit]");
    const roi = el.querySelector("[data-roi]");
    const pk = el.querySelectorAll("[data-packet]");
    const tl = anime.timeline({ loop: true, easing: "easeInOutQuad" });
    tl.add({ targets: roi, strokeDashoffset: [anime.setDashoffset, 0], duration: 700 })
      .add({ targets: lit, fill: ["#16233d", "#34d399"], fillOpacity: [0.2, 0.55], delay: anime.stagger(50), duration: 300 })
      .add({ targets: pk, translateX: [0, -150], opacity: [1, 0], delay: anime.stagger(40), duration: 650 })
      .add({ targets: lit, fillOpacity: [0.55, 0.2], duration: 500, delay: 900 });
    return () => tl.pause();
  }, [reduced, inView]);

  const cells = [];
  for (let y = 0; y < N; y++)
    for (let x = 0; x < N; x++) {
      const on = inRoi(x, y);
      cells.push(
        <rect key={`${x}-${y}`} data-cell="" data-lit={on ? "" : undefined}
          x={GX + x * CELL} y={GY + y * CELL} width={CELL - 2} height={CELL - 2} rx={2}
          fill={on ? "#34d399" : "#16233d"} fillOpacity={on && reduced ? 0.55 : 0.2} stroke="#23395e" />,
      );
    }

  return (
    <TerminalFrame title="annotation — grid-split content loading">
      <div ref={ref}>
        {narrow && (
          <p className="mb-2 font-mono text-[11.5px] leading-relaxed">
            <span className="text-fail">이전: content.json 172MB ~ 1.9GB 통째로 파싱</span>
            <span className="block text-trace">이후: ROI가 걸치는 칸만 읽기</span>
          </p>
        )}
        <svg ref={svg} viewBox={viewBox} role="img" className="h-auto w-full"
          aria-label="결과 JSON 전체 대신 10×10 좌표 그리드 중 ROI가 걸치는 칸만 읽는 구조">
          {/* before: one big file */}
          <rect x="20" y="40" width="130" height="170" rx="6" fill="#2a1418" stroke="var(--fail)" strokeOpacity=".6" />
          <text x="85" y="110" textAnchor="middle" fontSize="13" fill="var(--ink)" fontFamily="var(--font-jetbrains), monospace">content.json</text>
          <text x="85" y="130" textAnchor="middle" fontSize="11" fill="var(--fail)">172MB ~ 1.9GB</text>
          <text x="85" y="150" textAnchor="middle" fontSize="11" fill="var(--mute)">통째로 파싱</text>
          <text x="85" y="232" textAnchor="middle" fontSize="11" fill="var(--mute)">이전</text>

          {/* viewer */}
          <rect x="185" y="105" width="100" height="44" rx="6" fill="#111b30" stroke="var(--accent-2)" />
          <text x="235" y="132" textAnchor="middle" fontSize="12" fill="var(--ink)" fontFamily="var(--font-jetbrains), monospace">Viewer</text>

          {/* after: grid */}
          {cells}
          <rect data-roi x={GX + ROI.x0 * CELL - 4} y={GY + ROI.y0 * CELL - 4}
            width={(ROI.x1 - ROI.x0 + 1) * CELL + 6} height={(ROI.y1 - ROI.y0 + 1) * CELL + 6}
            fill="none" stroke="var(--trace)" strokeWidth="2" strokeDasharray="5 3" rx="3" />
          <text x={GX + 5 * CELL} y={GY + N * CELL + 20} textAnchor="middle" fontSize="11" fill="var(--mute)">이후: 10×10 분할 파일 중 ROI 칸만</text>
          {!reduced &&
            Array.from({ length: 9 }, (_, i) => (
              <circle key={i} data-packet cx={GX + (ROI.x0 + (i % 3)) * CELL + 10} cy={GY + (ROI.y0 + Math.floor(i / 3)) * CELL + 10} r="3.5" fill="var(--trace-2)" opacity="0" />
            ))}
        </svg>
        <p className="mt-3 font-mono text-[12px] text-trace">172MB · 243,717 cells: 1,618ms → 607ms</p>
        {variant === "full" && (
          <p className="mt-1 text-[12px] text-mute">읽는 순서: 메모리 캐시 → 분할 파일 → 전체 JSON (fallback)</p>
        )}
      </div>
    </TerminalFrame>
  );
}
