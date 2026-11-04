"use client";

import { projects } from "@/content/projects";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { SectionHead } from "./SectionHead";

const MAX = 8;

export function Projects() {
  const reduced = useReducedMotion();

  function tilt(e: React.PointerEvent<HTMLElement>) {
    if (reduced || e.pointerType !== "mouse") return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * MAX}deg) rotateX(${-y * MAX}deg)`;
    el.style.setProperty("--gx", `${(x + 0.5) * 100}%`);
    el.style.setProperty("--gy", `${(y + 0.5) * 100}%`);
  }
  function reset(e: React.PointerEvent<HTMLElement>) {
    e.currentTarget.style.transform = "";
  }

  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-20 sm:px-8 sm:py-28">
      <SectionHead eyebrow="04 · PROJECTS" title="개인 · 외주 프로젝트" desc="회사 밖에서 설계부터 배포까지 맡아 운영 중인 프로젝트입니다." />
      <div className="grid gap-5 md:grid-cols-3">
        {projects.map((p) => (
          <article key={p.name} onPointerMove={tilt} onPointerLeave={reset}
            className="relative flex flex-col overflow-hidden rounded-xl border border-line bg-bg-2/60 p-5 transition-transform duration-150 will-change-transform"
            style={{ backgroundImage: "radial-gradient(circle at var(--gx,50%) var(--gy,0%), rgba(59,130,246,.14), transparent 55%)" }}>
            <h3 className="text-lg font-bold text-white">{p.name}</h3>
            <p className="mt-1 font-mono text-[11.5px] text-mute">{p.period} · {p.role}</p>
            <p className="mt-3 text-[13.5px] leading-relaxed text-ink/90">{p.summary}</p>
            <ul className="mt-3 space-y-1.5 text-[13px] leading-relaxed text-mute">
              {p.points.map((x) => (
                <li key={x} className="flex gap-2"><span className="text-trace">›</span><span>{x}</span></li>
              ))}
            </ul>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <li key={s} className="rounded border border-line px-1.5 py-0.5 font-mono text-[10.5px] text-mute">{s}</li>
              ))}
            </ul>
            {p.links.length > 0 && (
              <div className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-4 text-[13px]">
                {p.links.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="text-accent-2 hover:text-white">{l.label} ↗</a>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
