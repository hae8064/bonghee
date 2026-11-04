"use client";

import anime from "animejs";
import { useEffect, useRef } from "react";
import { useInView } from "@/lib/useInView";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { PacketTrack, type PacketTone } from "./PacketTrack";
import { TerminalFrame } from "./TerminalFrame";

const stagesP95 = [
  { label: "시작: 동적 타일", ms: 1008 },
  { label: "요청 스케줄링 · stale 취소", ms: 310 },
  { label: "256 PNG · 뷰어 캐시", ms: 99 },
  { label: "Rust 워커 전환", ms: 97 },
];

const before: PacketTone[] = ["ok", "fail", "ok", "fail", "ok", "ok", "fail", "ok", "fail", "ok"];
const after: PacketTone[] = ["ok", "muted", "ok", "ok", "muted", "ok", "muted", "ok", "ok", "ok"];

function Chain({ parts, boxed }: { parts: string[]; boxed?: { from: number; label: string } }) {
  return (
    <ol className="flex flex-wrap items-center gap-1.5 font-mono text-[11.5px]">
      {parts.map((p, i) => (
        <li key={p} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-mute">→</span>}
          <span className={`rounded border px-2 py-1 ${boxed && i >= boxed.from ? "border-trace/70 text-trace" : "border-line text-ink"}`}>{p}</span>
        </li>
      ))}
      {boxed && <li className="w-full pt-1 text-[11px] text-trace">{boxed.label}</li>}
    </ol>
  );
}

function Bars() {
  const reduced = useReducedMotion();
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.4 });
  const box = useRef<HTMLOListElement>(null);
  useEffect(() => {
    if (!box.current || reduced || !inView) return;
    const a = anime({ targets: box.current.querySelectorAll("[data-bar]"), scaleX: [0, 1], delay: anime.stagger(220), duration: 900, easing: "easeOutCubic" });
    return () => a.pause();
  }, [reduced, inView]);
  return (
    <div ref={ref}>
      <p className="mb-2 font-mono text-[11px] text-mute">단계별 p95 (뷰어 측정)</p>
      <ol ref={box} className="space-y-2">
        {stagesP95.map((s) => (
          <li key={s.label} className="grid grid-cols-[minmax(0,9.5rem)_1fr_3.5rem] items-center gap-2 text-[12px] sm:grid-cols-[12rem_1fr_4rem]">
            <span className="truncate text-mute">{s.label}</span>
            <span className="h-2.5 rounded-sm bg-bg-3">
              <span data-bar className="block h-full origin-left rounded-sm"
                style={{ width: `${(s.ms / 1008) * 100}%`, background: s.ms > 500 ? "var(--fail)" : "var(--trace)" }} />
            </span>
            <span className="text-right font-mono text-ink">{s.ms}ms</span>
          </li>
        ))}
      </ol>
      <p className="mt-3 text-[12px] leading-relaxed text-mute">속도를 만든 건 스케줄링과 256 타일입니다. Rust 전환은 99 → 97ms로 거의 차이가 없고, 목적은 장애 격리입니다.</p>
    </div>
  );
}

export function TileServing({ variant }: { variant: "preview" | "full" }) {
  return (
    <TerminalFrame title="ims — on-demand tile serving">
      {variant === "full" && (
        <div className="mb-6 grid gap-5 lg:grid-cols-2">
          <div className="space-y-2">
            <p className="text-[12px] font-bold text-fail">이전 · 한 프로세스</p>
            <Chain parts={["뷰어", "Next 프록시", "IMS (JVM)", "JNI", "Philips SDK"]} />
            <PacketTrack tones={before} label="요청이 몰리면 일부 실패" />
            <p className="text-[11.5px] text-mute">요청 최대 약 1,000개를 순서·취소 없이 모두 디코딩, 실패 175건</p>
          </div>
          <div className="space-y-2">
            <p className="text-[12px] font-bold text-trace">이후 · Rust 워커 분리</p>
            <Chain parts={["뷰어", "IMS (JVM)", "Rust 워커", "Philips SDK"]}
              boxed={{ from: 2, label: "워커: 캐시 확인 · 같은 타일 합치기 · 큐 · stale 취소, 10초 마감" }} />
            <PacketTrack tones={after} label="화면 밖 요청은 취소" />
            <p className="text-[11.5px] text-mute">회색은 화면을 벗어나 취소된 요청, 실패 0건</p>
          </div>
        </div>
      )}
      <Bars />
    </TerminalFrame>
  );
}
