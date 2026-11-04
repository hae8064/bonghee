"use client";

import anime from "animejs";
import { useEffect, useRef } from "react";
import { useInView } from "@/lib/useInView";
import { useReducedMotion } from "@/lib/useReducedMotion";

export type PacketTone = "ok" | "fail" | "muted";
const COLOR: Record<PacketTone, string> = { ok: "var(--trace-2)", fail: "var(--fail)", muted: "#64748b" };

/** A looping row of request packets travelling left → right. fail packets stop halfway, muted ones fade out early. */
export function PacketTrack({ tones, duration = 2200, label }: { tones: PacketTone[]; duration?: number; label: string }) {
  const reduced = useReducedMotion();
  const [ref, inView] = useInView<HTMLDivElement>();
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el || reduced || !inView) return;
    const dots = Array.from(el.querySelectorAll<HTMLElement>("[data-packet]"));
    const w = el.clientWidth - 8;
    const anims = dots.map((d, i) => {
      const tone = d.dataset.tone as PacketTone;
      const end = tone === "ok" ? w : tone === "fail" ? w * 0.55 : w * 0.35;
      return anime({
        targets: d,
        translateX: [0, end],
        opacity: tone === "ok" ? [1, 1] : [1, 0],
        duration: tone === "ok" ? duration : duration * 0.6,
        delay: i * (duration / dots.length),
        easing: "linear",
        loop: true,
      });
    });
    return () => anims.forEach((a) => a.pause());
  }, [reduced, inView, duration, tones]);

  return (
    <div ref={ref} aria-label={label} className="relative h-4">
      <div ref={track} className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-line">
        {tones.map((t, i) => (
          <span key={i} data-packet data-tone={t}
            className="absolute -top-[3px] left-0 h-[7px] w-[7px] rounded-full"
            style={{ background: COLOR[t], opacity: reduced ? 0 : 1 }} />
        ))}
      </div>
    </div>
  );
}
