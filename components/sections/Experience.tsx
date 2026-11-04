"use client";

import anime from "animejs";
import { useEffect, useRef } from "react";
import { experience } from "@/content/experience";
import { useInView } from "@/lib/useInView";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { SectionHead } from "./SectionHead";

export function Experience() {
  const reduced = useReducedMotion();
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.15 });
  const line = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (reduced || !inView || !line.current) return;
    const a = anime({ targets: line.current, scaleY: [0, 1], duration: 1400, easing: "easeOutCubic" });
    const b = anime({ targets: ref.current?.querySelectorAll("[data-group]"), opacity: [0, 1], translateX: [-10, 0], delay: anime.stagger(160, { start: 200 }), duration: 600, easing: "easeOutQuad" });
    return () => { a.pause(); b.pause(); };
  }, [reduced, inView, ref]);

  return (
    <section id="experience" className="mx-auto max-w-6xl px-4 py-20 sm:px-8 sm:py-28">
      <SectionHead eyebrow="02 · EXPERIENCE" title="경력" />
      <div ref={ref} className="relative pl-6 sm:pl-8">
        <span ref={line} aria-hidden className="absolute left-[5px] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-accent via-trace to-transparent" />
        <span aria-hidden className="absolute left-0 top-1.5 h-[11px] w-[11px] rounded-full border-2 border-accent bg-bg" />
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="text-xl font-bold text-white">{experience.company}</h3>
          <span className="text-sm text-accent-2">{experience.role}</span>
          <span className="font-mono text-xs text-mute">{experience.period}</span>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {experience.groups.map((g) => (
            <div key={g.title} data-group className="rounded-lg border border-line bg-bg-2/50 p-5">
              <h4 className="font-bold text-white">{g.title}</h4>
              <ul className="mt-3 space-y-1.5 text-[13.5px] leading-relaxed text-mute">
                {g.bullets.map((b) => (
                  <li key={b} className="flex gap-2"><span className="text-trace">›</span><span>{b}</span></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
