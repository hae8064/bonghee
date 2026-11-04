import { profile } from "@/content/profile";
import { MetricsStrip } from "./MetricsStrip";
import { SectionHead } from "./SectionHead";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-20 sm:px-8 sm:py-28">
      <SectionHead eyebrow="01 · ABOUT" title={profile.roleKo} />
      <div className="max-w-3xl space-y-4 text-[15px] leading-relaxed text-ink/90 sm:text-base">
        {profile.intro.map((p, i) => (
          <p key={i} className={i === 0 ? "text-lg font-bold text-white sm:text-xl" : ""}>{p}</p>
        ))}
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
