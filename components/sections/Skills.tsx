import { education } from "@/content/education";
import { skills } from "@/content/skills";
import { SectionHead } from "./SectionHead";

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 py-20 sm:px-8 sm:py-28">
      <SectionHead eyebrow="05 · SKILLS" title="보유 기술" desc="실무에서 직접 사용한 기술만 적었습니다." />
      <div className="grid gap-4 md:grid-cols-2">
        {skills.map((s) => (
          <div key={s.area} className="rounded-lg border border-line bg-bg-2/50 p-5">
            <h3 className="font-bold text-white">{s.area}</h3>
            <p className="mt-2 font-mono text-[12.5px] leading-relaxed text-accent-2">{s.items}</p>
            <p className="mt-2 text-[13px] leading-relaxed text-mute">{s.how}</p>
          </div>
        ))}
      </div>

      <h3 className="mt-16 text-xl font-black text-white">학력, 자격, 수상</h3>
      <ul className="mt-5 divide-y divide-line/70 rounded-lg border border-line">
        {education.map((e) => (
          <li key={e.name} className="grid gap-1 px-5 py-4 sm:grid-cols-[4rem_1fr_9rem] sm:items-baseline sm:gap-4">
            <span className="font-mono text-xs text-trace">{e.kind}</span>
            <span>
              <span className="font-bold text-white">{e.name}</span>
              <span className="mt-0.5 block text-[13px] text-mute">{e.detail}</span>
            </span>
            <span className="font-mono text-[12px] text-mute sm:text-right">{e.period}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
