import Image from "next/image";
import { profile } from "@/content/profile";
import { MetricsStrip } from "./MetricsStrip";
import { SectionHead } from "./SectionHead";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-20 sm:px-8 sm:py-28">
      <SectionHead eyebrow="01 · ABOUT" title={profile.roleKo} />
      <div className="grid gap-8 md:grid-cols-[220px_1fr] md:gap-12">
        <div className="flex items-center gap-5 md:block">
          <div className="relative w-28 shrink-0 overflow-hidden rounded-xl border border-line md:w-full">
            <Image src="/images/profile.jpg" alt="이봉희 프로필 사진" width={518} height={675} className="h-auto w-full" priority={false} />
          </div>
          <div className="md:mt-5">
            <p className="text-2xl font-black text-white">{profile.name}</p>
            <p className="mt-1 text-sm text-accent-2">{profile.roleKo}</p>
            <ul className="mt-3 space-y-1.5 font-mono text-[12.5px]">
              <li><a href={`mailto:${profile.email}`} className="text-ink hover:text-accent-2">✉ {profile.email}</a></li>
              <li><a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-ink hover:text-accent-2">⌂ github.com/hae8064</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-3xl space-y-4 text-[15px] leading-relaxed text-ink/90 sm:text-base">
          {profile.intro.map((p, i) => (
            <p key={i} className={i === 0 ? "text-lg font-bold text-white sm:text-xl" : ""}>{p}</p>
          ))}
        </div>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {profile.pillars.map((p) => (
          <div key={p.title} className="rounded-lg border border-line bg-bg-2/60 p-5">
            <h3 className="font-bold text-white">{p.title}</h3>
            <ul className="mt-3 space-y-1.5 text-[13.5px] leading-relaxed text-mute">
              {p.points.map((x) => (
                <li key={x} className="flex gap-2"><span className="text-trace">›</span><span>{x}</span></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <MetricsStrip />
    </section>
  );
}
