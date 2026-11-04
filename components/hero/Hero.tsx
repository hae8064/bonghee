"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/content/profile";
import { canUseWebGL } from "@/lib/webgl";
import { useInView } from "@/lib/useInView";
import { useReducedMotion } from "@/lib/useReducedMotion";

const ArchitectureScene = dynamic(() => import("./ArchitectureScene"), { ssr: false });

export function Hero() {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0 });
  const reduced = useReducedMotion();
  const [webgl, setWebgl] = useState(false);
  const [compact, setCompact] = useState(false);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setWebgl(canUseWebGL());
    const mq = window.matchMedia?.("(max-width: 767px)");
    setCompact(!!mq?.matches);
  }, []);

  function onPointerMove(e: React.PointerEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    pointer.current = { x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 };
  }

  return (
    <section
      ref={ref}
      id="top"
      onPointerMove={onPointerMove}
      className="relative flex min-h-[92svh] items-center overflow-hidden"
      style={{ background: "radial-gradient(ellipse at 70% 40%, #1d3561 0%, #0B1222 70%)" }}
    >
      {webgl ? (
        <ArchitectureScene active={inView} reduced={reduced} compact={compact} pointer={pointer} />
      ) : (
        <div data-hero-fallback aria-hidden className="absolute inset-0 opacity-60"
          style={{ background: "radial-gradient(circle at 75% 45%, rgba(59,130,246,.35) 0, transparent 40%)" }} />
      )}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-r from-bg/80 via-bg/30 to-transparent md:from-bg/50 md:via-transparent" />
      <div className="pointer-events-none relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-8">
        <p className="font-mono text-xs tracking-[0.12em] text-accent-2 sm:text-sm">{profile.role}</p>
        <h1 className="mt-3 text-5xl font-black tracking-tight text-white sm:text-7xl">{profile.name}</h1>
        <p className="mt-3 text-lg font-medium text-ink sm:text-2xl">{profile.tagline}</p>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-mute sm:text-base">{profile.heroLine}</p>
        <div className="pointer-events-auto mt-8 flex flex-wrap gap-3 text-sm">
          <a href="#cases" className="rounded-md bg-accent px-4 py-2 font-medium text-white hover:bg-accent/85">설계 사례 보기</a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer"
            className="rounded-md border border-line px-4 py-2 text-ink hover:border-accent-2">GitHub</a>
        </div>
      </div>
      <div aria-hidden className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[11px] text-mute/70">scroll ↓</div>
    </section>
  );
}
