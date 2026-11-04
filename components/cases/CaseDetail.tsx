import Link from "next/link";
import type { CaseStudy } from "@/content/types";
import { caseDiagram } from "./diagrams";
import { QantiTopology } from "./QantiTopology";

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="mb-4 font-mono text-xs tracking-[0.14em] text-accent-2">{title}</h2>
      {children}
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 text-[15px] leading-relaxed text-ink/90">
      {items.map((x) => (
        <li key={x} className="flex gap-2"><span className="text-trace">›</span><span>{x}</span></li>
      ))}
    </ul>
  );
}

export function CaseDetail({ c, prev, next }: { c: CaseStudy; prev?: CaseStudy; next?: CaseStudy }) {
  return (
    <article className="mx-auto max-w-5xl px-4 pb-24 pt-24 sm:px-8 sm:pt-28">
      <Link href="/#cases" className="font-mono text-[13px] text-mute hover:text-white">← 설계 사례</Link>
      <p className="mt-8 font-mono text-sm text-trace">CASE {c.index}</p>
      <h1 className="mt-2 text-3xl font-black text-white sm:text-4xl">{c.title}</h1>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-mute">{c.summary}</p>
      {(c.period || c.scope) && (
        <p className="mt-3 font-mono text-[12px] text-mute">{[c.period, c.scope].filter(Boolean).join(" · ")}</p>
      )}
      <ul className="mt-4 flex flex-wrap gap-1.5">
        {c.stack.map((s) => (
          <li key={s} className="rounded border border-line px-1.5 py-0.5 font-mono text-[11px] text-mute">{s}</li>
        ))}
      </ul>

      <div className="mt-10">{caseDiagram(c.slug, "full")}</div>

      {c.slug === "qanti" && (
        <Block title="DEPLOYMENT · 폐쇄망 배포 구성도 (병원 한 곳 기준, 기관 정보 비식별)">
          <QantiTopology />
        </Block>
      )}

      <Block title="PROBLEM · 문제"><List items={c.problem} /></Block>

      <Block title="DECISIONS · 왜 그렇게 정했나">
        <div className="overflow-hidden rounded-lg border border-line">
          <table className="w-full text-left text-[14px]">
            <thead className="bg-bg-2/80 text-[12px] text-mute">
              <tr><th className="px-4 py-2 font-medium">결정</th><th className="px-4 py-2 font-medium">막으려던 위험</th></tr>
            </thead>
            <tbody>
              {c.decisions.map((d) => (
                <tr key={d.decision} className="border-t border-line/60 align-top">
                  <td className="w-[38%] px-4 py-3 font-bold text-white">{d.decision}</td>
                  <td className="px-4 py-3 leading-relaxed text-mute">{d.risk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Block>

      <Block title="RESULT · 결과"><List items={c.results} /></Block>
      <Block title="LIMITS · 남은 한계"><List items={c.limits} /></Block>

      <nav className="mt-16 grid gap-3 border-t border-line/70 pt-8 sm:grid-cols-2">
        {prev ? (
          <Link data-prev href={`/cases/${prev.slug}`} className="rounded-lg border border-line p-4 hover:border-accent/70">
            <span className="font-mono text-[11px] text-mute">← 이전 사례 {prev.index}</span>
            <span className="mt-1 block font-bold text-white">{prev.title}</span>
          </Link>
        ) : <span />}
        {next && (
          <Link data-next href={`/cases/${next.slug}`} className="rounded-lg border border-line p-4 text-right hover:border-accent/70">
            <span className="font-mono text-[11px] text-mute">다음 사례 {next.index} →</span>
            <span className="mt-1 block font-bold text-white">{next.title}</span>
          </Link>
        )}
      </nav>
    </article>
  );
}
