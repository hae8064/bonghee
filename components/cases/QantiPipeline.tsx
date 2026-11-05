"use client";

import anime from "animejs";
import { useEffect, useRef, useState } from "react";
import { useInView } from "@/lib/useInView";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { TerminalFrame } from "./TerminalFrame";

type Env = "cloud" | "onprem";

const stages: { name: string; sub: Record<Env, string> }[] = [
  { name: "스캐너", sub: { cloud: "WSI · SVS, MRXS", onprem: "WSI · SVS, MRXS" } },
  { name: "수집", sub: { cloud: "공유폴더 감시 · CIFS + cron", onprem: "공유폴더 감시 · CIFS + cron" } },
  { name: "API", sub: { cloud: "업로드 접수 · Spring Boot", onprem: "업로드 접수 · Spring Boot" } },
  { name: "큐", sub: { cloud: "AWS SQS", onprem: "RabbitMQ" } },
  { name: "추론", sub: { cloud: "GPU 컨테이너 · FastAPI, CUDA", onprem: "GPU 컨테이너 · FastAPI, CUDA" } },
  { name: "저장", sub: { cloud: "결과, 좌표 · MongoDB", onprem: "결과, 좌표 · MongoDB" } },
  { name: "뷰어", sub: { cloud: "WebGL 뷰어 · EMR/LIS/PACS 회신", onprem: "WebGL 뷰어 · EMR/LIS/PACS 회신" } },
];

const envRows: { k: string; v: Record<Env, string> }[] = [
  { k: "이미지 전달", v: { cloud: "ECR에서 pull, 태그 교체로 버전 지정", onprem: "tar로 save, 암호화 전송 후 반입해 load" } },
  { k: "실행", v: { cloud: "ECS / EKS 롤링 배포, ArgoCD GitOps", onprem: "서버실 GPU 서버 직접 구성 (RTX A5000, 4080S)" } },
  { k: "관측", v: { cloud: "CloudWatch", onprem: "Prometheus · Grafana · Loki" } },
];

export function QantiPipeline({ variant }: { variant: "preview" | "full" }) {
  const [env, setEnv] = useState<Env>("cloud");
  const reduced = useReducedMotion();
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.2 });
  const rowRef = useRef<HTMLOListElement>(null);
  const envRef = useRef<HTMLDivElement>(null);
  const full = variant === "full";

  // a slide "packet" lights each stage in turn
  useEffect(() => {
    const el = rowRef.current;
    if (!el || reduced || !inView) return;
    const nodes = el.querySelectorAll("[data-stage]");
    const a = anime({
      targets: nodes,
      borderColor: ["#23395e", "#34d399", "#23395e"],
      boxShadow: ["0 0 0 rgba(52,211,153,0)", "0 0 18px rgba(52,211,153,.45)", "0 0 0 rgba(52,211,153,0)"],
      delay: anime.stagger(260),
      duration: 700,
      easing: "easeInOutSine",
      loop: true,
      endDelay: 600,
    });
    return () => a.pause();
  }, [reduced, inView]);

  // morph changed parts on toggle — never on first mount, so nothing starts hidden
  const firstEnv = useRef(true);
  useEffect(() => {
    if (firstEnv.current) {
      firstEnv.current = false;
      return;
    }
    if (reduced) return;
    const targets = [
      ...(rowRef.current?.querySelectorAll("[data-env-part]") ?? []),
      ...(envRef.current?.querySelectorAll("[data-env-part]") ?? []),
    ];
    if (!targets.length) return;
    const a = anime({ targets, opacity: [0, 1], translateY: [8, 0], delay: anime.stagger(60), duration: 420, easing: "easeOutQuad" });
    // finish rather than freeze mid-fade if interrupted
    return () => a.seek(a.duration);
  }, [env, reduced]);

  return (
    <TerminalFrame title="qanti — one image, two deploy paths">
      <div ref={ref}>
        <div className="relative z-10 mb-4 flex flex-wrap items-center gap-2" role="group" aria-label="배포 환경">
          {(["cloud", "onprem"] as Env[]).map((e) => (
            <button key={e} type="button" aria-pressed={env === e} onClick={() => setEnv(e)}
              className={`cursor-pointer rounded-md border px-3 py-1.5 font-mono text-xs transition-[color,background-color,border-color,transform] duration-150 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-trace ${env === e ? "border-trace bg-trace/15 text-trace" : "border-line text-mute hover:border-trace/60 hover:bg-trace/10 hover:text-ink"}`}>
              {e === "cloud" ? "Cloud" : "On-Prem"}
            </button>
          ))}
          <span className="ml-1 font-mono text-[11px] text-mute">같은 Docker 이미지, 부품만 교체</span>
        </div>

        <ol ref={rowRef} className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
          {stages.map((s, i) => {
            const varies = s.sub.cloud !== s.sub.onprem;
            return (
              <li key={s.name} data-stage
                className={`relative rounded-md border border-line bg-bg-2/60 px-2.5 py-2 ${varies ? "ring-1 ring-trace/30" : ""}`}>
                <div className="font-mono text-[10px] text-mute">{String(i + 1).padStart(2, "0")}</div>
                <div className="text-sm font-bold text-ink">{s.name}</div>
                <div key={varies ? env : "same"} data-env-part={varies ? "" : undefined}
                  className={`mt-0.5 text-[11px] leading-snug ${varies ? "font-mono text-trace" : "text-mute"}`}>{s.sub[env]}</div>
              </li>
            );
          })}
        </ol>

        {full && (
          <div ref={envRef} className="mt-5 overflow-hidden rounded-md border border-line">
            <table className="w-full text-left text-[13px]">
              <tbody>
                {envRows.map((r) => (
                  <tr key={r.k} className="border-b border-line/60 last:border-0">
                    <th className="w-24 whitespace-nowrap bg-bg-2/60 px-3 py-2 font-medium text-mute sm:w-32">{r.k}</th>
                    <td className="px-3 py-2 text-ink"><span key={env} data-env-part="" className="inline-block">{r.v[env]}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p key={env} data-env-part="" className="mt-4 text-[13px] leading-relaxed text-mute">
          {env === "onprem"
            ? "상급종합병원 중심 10곳 이상, 병원 서버실에 GPU 서버를 직접 설치해 On-Prem으로 구축·운영했습니다. 자동 업데이트 차단, 드라이버 버전 고정, 이미지 암호화 반입을 설정과 스크립트로 고정했습니다."
            : "소스에서 빌드한 Docker 이미지 하나를 태그로 고정합니다. 어느 쪽이든 앱 재빌드 없이 모델만 교체하고 되돌립니다."}
        </p>
      </div>
    </TerminalFrame>
  );
}
