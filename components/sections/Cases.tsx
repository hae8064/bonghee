import Link from "next/link";
import { cases } from "@/content/cases";
import { caseDiagram } from "@/components/cases/diagrams";
import { SectionHead } from "./SectionHead";

export function Cases() {
  return (
    <section id="cases" className="mx-auto max-w-6xl px-4 py-20 sm:px-8 sm:py-28">
      <SectionHead eyebrow="03 · CASES" title="설계 사례"
        desc="문제, 왜 그렇게 정했는지, 결과, 남은 한계 순서로 적었습니다. 다이어그램은 실제 요청 흐름입니다." />
      <div className="grid gap-6 lg:grid-cols-2">
        {cases.map((c, i) => (
          <article key={c.slug}
            className={`group relative flex min-w-0 cursor-pointer flex-col rounded-xl border border-line bg-bg-2/40 p-4 transition-[border-color,transform,box-shadow] duration-200 hover:-translate-y-1 hover:border-accent/70 hover:shadow-[0_12px_40px_-12px_rgba(59,130,246,.45)] sm:p-6 ${i < 2 ? "lg:col-span-2" : ""}`}>
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-sm text-trace">{c.index}</span>
              <h3 className="text-lg font-bold text-white sm:text-xl">{c.title}</h3>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-mute">{c.summary}</p>
            <div className="mt-5 min-w-0">{caseDiagram(c.slug, "preview")}</div>
            {/* the link's ::after covers the whole card, so a click anywhere opens the case */}
            <Link href={`/cases/${c.slug}`} aria-label={`${c.title} 자세히 보기`}
              className="mt-5 inline-flex items-center gap-2 self-start rounded-lg border border-accent/60 bg-accent/10 px-4 py-2.5 text-sm font-bold text-accent-2 transition-colors after:absolute after:inset-0 after:rounded-xl after:content-[''] group-hover:border-accent group-hover:bg-accent group-hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-2">
              자세히 보기 <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
