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
          <article key={c.slug} className={`group flex min-w-0 flex-col rounded-xl border border-line bg-bg-2/40 p-4 transition-colors hover:border-accent/70 sm:p-6 ${i === 0 ? "lg:col-span-2" : ""}`}>
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-sm text-trace">{c.index}</span>
              <h3 className="text-lg font-bold text-white sm:text-xl">{c.title}</h3>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-mute">{c.summary}</p>
            <div className="mt-5 min-w-0">{caseDiagram(c.slug, "preview")}</div>
            <Link href={`/cases/${c.slug}`} className="mt-5 inline-flex items-center gap-1 self-start font-mono text-[13px] text-accent-2 hover:text-white">
              자세히 보기 <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
