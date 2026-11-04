"use client";

import anime from "animejs";
import { useEffect, useRef } from "react";
import { useInView } from "@/lib/useInView";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { TerminalFrame } from "./TerminalFrame";

// One closed-network hospital install, de-identified: no institution, IP, hostname or vendor names.

type Box = { x: number; y: number; w: number; h: number; title: string; sub?: string; lines?: string[]; port?: string; tone?: "app" | "host" | "ext" | "db" | "store" };

const ext: Box[] = [
  { x: 40, y: 80, w: 200, h: 80, title: "판독의 PC", sub: "웹 브라우저", tone: "ext" },
  { x: 40, y: 220, w: 200, h: 140, title: "병원 미들웨어", sub: "병리 영상 시스템 (연동 대상)", lines: ["분석 요청", "분석 완료 통지 수신", "판독의에게 뷰어 링크 제공"], tone: "ext" },
  { x: 40, y: 430, w: 200, h: 70, title: "백신 관리 서버", sub: "백신 정책 · 검사", tone: "ext" },
  { x: 40, y: 540, w: 200, h: 70, title: "원내 NTP 서버", sub: "시각 기준", tone: "ext" },
];

const host: Box[] = [
  { x: 395, y: 80, w: 150, h: 100, title: "Nginx", lines: ["리버스 프록시", "승인 IP만 서비스", "그 외는 안내 페이지"], tone: "host" },
  { x: 395, y: 430, w: 150, h: 70, title: "백신 에이전트", tone: "host" },
  { x: 395, y: 540, w: 150, h: 70, title: "chrony", sub: "시각 동기화", tone: "host" },
];

const apps: Box[] = [
  { x: 595, y: 100, w: 265, h: 125, title: "web · Next.js", lines: ["슬라이드 뷰어 · 분석 결과 화면", "/api · /ims 요청을 내부로 전달"], port: "3000 · 내부 전용", tone: "app" },
  { x: 885, y: 100, w: 265, h: 125, title: "ims · Spring Boot", lines: ["원본 슬라이드 등록 · 타일 생성", "AI 분석 결과 수신 · 저장"], port: "8080 · 내부 전용", tone: "app" },
  { x: 595, y: 280, w: 265, h: 125, title: "analysis · FastAPI", lines: ["미들웨어 연동 API · 완료 통지", "분석 작업 관리 · 사용자 인증"], port: "8000 · 미들웨어에만 공개", tone: "app" },
  { x: 885, y: 280, w: 265, h: 125, title: "ai · FastAPI", lines: ["IHC 분석 (HER2 · Ki-67 · ER · PR)", "GPU 추론 작업 실행"], port: "8806 · 내부 전용", tone: "app" },
  { x: 595, y: 525, w: 555, h: 90, title: "mongo · MongoDB", lines: ["인증 필수 · 서비스 전용 계정"], port: "27017 · 내부 전용", tone: "db" },
];

const stores: Box[] = [
  { x: 395, y: 660, w: 180, h: 46, title: "원본 슬라이드", tone: "store" },
  { x: 595, y: 660, w: 180, h: 46, title: "뷰어 타일", tone: "store" },
  { x: 795, y: 660, w: 180, h: 46, title: "분석 결과", tone: "store" },
  { x: 995, y: 660, w: 180, h: 46, title: "DB 데이터", tone: "store" },
];

const ports = [
  { y: 120, port: "80/tcp", note: "웹 · 승인 IP" },
  { y: 270, port: "8000/tcp", note: "미들웨어만" },
  { y: 465, port: "백신 포트", note: "관리 서버만" },
  { y: 575, port: "123/udp", note: "송신만" },
];

// flows in the order a request actually travels
const flows = [
  { n: 1, d: "M240 270 H575 V342 H595", label: "분석 요청", at: [400, 262], dashed: false, color: "#a78bfa" },
  { n: 2, d: "M760 280 V255 H1000 V225", label: "영상 등록", at: [880, 248], dashed: false, color: "var(--accent-2)" },
  { n: 3, d: "M860 342 H885", label: "", at: [872, 330], dashed: false, color: "var(--accent-2)" },
  { n: 4, d: "M1080 280 V225", label: "결과 저장", at: [1088, 256], dashed: false, color: "var(--accent-2)" },
  { n: 5, d: "M595 385 H560 V330 H240", label: "분석 완료 통지", at: [400, 322], dashed: true, color: "#a78bfa" },
  { n: 6, d: "M140 220 V160", label: "뷰어 링크", at: [148, 195], dashed: true, color: "#a78bfa" },
  { n: 7, d: "M240 120 H395", label: "", at: [262, 112], dashed: false, color: "var(--trace)" },
  { n: 8, d: "M545 130 H575 V162 H595", label: "", at: [560, 122], dashed: false, color: "var(--trace)" },
  { n: 9, d: "M860 162 H885", label: "", at: [872, 152], dashed: false, color: "var(--trace)" },
];

const legend = [
  "병원 미들웨어가 분석 서버에 분석 요청 (8000, 미들웨어 IP만 허용)",
  "분석 서버가 영상을 IMS에 등록",
  "분석 서버가 AI 서버에 분석 실행, GPU 작업 컨테이너 생성",
  "AI 분석 결과를 IMS에 저장",
  "분석 서버가 미들웨어에 완료 통지",
  "미들웨어가 판독의에게 뷰어 링크 제공",
  "판독의 PC → Nginx (80, 승인 IP만)",
  "Nginx → 웹 뷰어 (내부 3000)",
  "웹 뷰어 → IMS 조회 (내부 8080)",
];

const FILL: Record<NonNullable<Box["tone"]>, [string, string]> = {
  ext: ["#111b30", "#2c3e63"],
  host: ["#141c2c", "#3a4660"],
  app: ["#0f1d36", "#3b82f6"],
  db: ["#0f2a22", "#34d399"],
  store: ["#2a2412", "#d4a24a"],
};

function BoxEl({ b }: { b: Box }) {
  const [fill, stroke] = FILL[b.tone ?? "ext"];
  const head = b.tone === "app" || b.tone === "db";
  return (
    <g>
      <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={8} fill={fill} stroke={stroke} strokeOpacity={0.8} />
      {head && <rect x={b.x} y={b.y} width={b.w} height={4} rx={2} fill={stroke} />}
      <text x={b.x + 14} y={b.y + (b.tone === "store" ? 28 : 26)} fontSize="14" fontWeight="700" fill="var(--ink)">{b.title}</text>
      {b.sub && <text x={b.x + 14} y={b.y + 45} fontSize="11.5" fill="var(--mute)">{b.sub}</text>}
      {b.lines?.map((l, i) => (
        <text key={l} x={b.x + 14} y={b.y + (b.sub ? 66 : 48) + i * 18} fontSize="11.5" fill="var(--mute)">· {l}</text>
      ))}
      {b.port && (
        <g>
          <rect x={b.x + 12} y={b.y + b.h - 28} width={b.port.length * 8 + 20} height={20} rx={10} fill={stroke} fillOpacity={0.15} />
          <text x={b.x + 22} y={b.y + b.h - 14} fontSize="11" fontWeight="600" fill={b.port.includes("공개") ? "#fca5a5" : stroke} fontFamily="var(--font-jetbrains), monospace">{b.port}</text>
        </g>
      )}
    </g>
  );
}

export function QantiTopology() {
  const reduced = useReducedMotion();
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.2 });
  const svg = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = svg.current;
    if (!el || reduced || !inView) return;
    const groups = Array.from(el.querySelectorAll<SVGGElement>("[data-flow]"));
    const tl = anime.timeline({ loop: true, easing: "easeInOutQuad" });
    anime.set(groups.map((g) => g.querySelector("[data-path]")), { opacity: 0.25 });
    groups.forEach((g) => {
      const path = g.querySelector<SVGPathElement>("[data-path]")!;
      const dot = g.querySelector<SVGCircleElement>("[data-dot]");
      const len = path.getTotalLength();
      const o = { t: 0 };
      // move the dot in SVG user units (anime.path works in screen px and drifts when the SVG is scaled)
      tl.add({ targets: path, opacity: [0.25, 1], duration: 150 })
        .add({
          targets: o,
          t: [0, 1],
          duration: 650,
          begin: () => dot?.setAttribute("opacity", "1"),
          update: () => {
            const pt = path.getPointAtLength(o.t * len);
            dot?.setAttribute("cx", String(pt.x));
            dot?.setAttribute("cy", String(pt.y));
          },
          complete: () => dot?.setAttribute("opacity", "0"),
        }, "-=100");
    });
    tl.add({ targets: groups.map((g) => g.querySelector("[data-path]")), opacity: 0.25, duration: 600, delay: 1200 });
    return () => {
      tl.pause();
      anime.set(groups.map((g) => g.querySelector("[data-path]")), { opacity: 1 });
    };
  }, [reduced, inView]);

  return (
    <TerminalFrame title="deploy — closed-network install (de-identified)">
      <div ref={ref}>
        <div className="-mx-1 overflow-x-auto pb-2">
          <svg ref={svg} viewBox="0 0 1200 720" role="img" className="h-auto w-full min-w-[860px]"
            aria-label="병원 폐쇄망 한 곳의 배포 구성도: 방화벽, 호스트 서비스, Docker 컨테이너 5개와 요청 흐름 9단계">
            <defs>
              {["a7", "pur", "acc", "trc"].map((id, i) => (
                <marker key={id} id={`arr-${id}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                  <path d="M0 0 L10 5 L0 10 z" fill={["#9aabc6", "#a78bfa", "#7fb0ff", "#34d399"][i]} />
                </marker>
              ))}
            </defs>

            {/* zones */}
            <rect x="20" y="40" width="240" height="600" rx="10" fill="none" stroke="#2c3e63" strokeDasharray="6 5" />
            <text x="36" y="64" fontSize="13" fontWeight="700" fill="var(--mute)">병원 내부망</text>

            <rect x="285" y="40" width="90" height="600" rx="10" fill="#3b1218" fillOpacity="0.55" stroke="#f87171" strokeOpacity="0.5" />
            <text x="330" y="64" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#fca5a5">UFW 방화벽</text>
            <text x="330" y="80" textAnchor="middle" fontSize="10.5" fill="#fca5a5" fillOpacity="0.8">기본 정책: 차단</text>
            {ports.map((p) => (
              <g key={p.port}>
                <rect x="291" y={p.y - 18} width="78" height="36" rx="6" fill="#1a0f14" stroke="#f87171" strokeOpacity="0.7" />
                <text x="330" y={p.y - 3} textAnchor="middle" fontSize="11" fontWeight="700" fill="#fca5a5" fontFamily="var(--font-jetbrains), monospace">{p.port}</text>
                <text x="330" y={p.y + 11} textAnchor="middle" fontSize="9.5" fill="#fecaca">{p.note}</text>
              </g>
            ))}

            <text x="470" y="64" textAnchor="middle" fontSize="12" fill="var(--mute)">호스트 서비스</text>

            <rect x="565" y="40" width="615" height="600" rx="12" fill="#0d1a30" fillOpacity="0.6" stroke="#3b82f6" strokeOpacity="0.6" />
            <text x="582" y="64" fontSize="13.5" fontWeight="700" fill="var(--accent-2)">Docker Engine</text>
            <rect x="580" y="78" width="585" height="395" rx="8" fill="none" stroke="#3b82f6" strokeOpacity="0.35" strokeDasharray="5 5" />
            <text x="1155" y="94" textAnchor="end" fontSize="10.5" fill="var(--mute)">앱 네트워크</text>
            <rect x="885" y="425" width="265" height="38" rx="6" fill="none" stroke="#3b82f6" strokeOpacity="0.6" strokeDasharray="5 4" />
            <text x="900" y="449" fontSize="11.5" fill="var(--accent-2)">AI 추론 작업 컨테이너 (GPU · 분석 시 생성)</text>
            <path d="M1017 405 V425" stroke="#7fb0ff" strokeDasharray="3 3" markerEnd="url(#arr-acc)" />
            <rect x="580" y="490" width="585" height="135" rx="8" fill="none" stroke="#34d399" strokeOpacity="0.35" strokeDasharray="5 5" />
            <text x="1155" y="506" textAnchor="end" fontSize="10.5" fill="var(--mute)">DB 네트워크 (분리)</text>

            <text x="300" y="688" fontSize="12" fill="var(--mute)">데이터 저장소</text>

            {[...ext, ...host, ...apps, ...stores].map((b) => <BoxEl key={b.title} b={b} />)}

            {/* management / DB links */}
            <path d="M240 465 H395" stroke="#9aabc6" strokeOpacity="0.7" markerEnd="url(#arr-a7)" fill="none" />
            <path d="M395 575 H240" stroke="#9aabc6" strokeOpacity="0.7" markerEnd="url(#arr-a7)" fill="none" />
            <path d="M727 405 V525" stroke="#34d399" strokeOpacity="0.8" markerEnd="url(#arr-trc)" fill="none" />
            <text x="735" y="470" fontSize="10.5" fill="#34d399">DB 접속</text>
            <path d="M1150 162 H1170 V572 H1150" stroke="#34d399" strokeOpacity="0.8" markerEnd="url(#arr-trc)" fill="none" />

            {/* request flows */}
            {flows.map((f) => {
              const marker = f.color === "#a78bfa" ? "pur" : f.color === "var(--trace)" ? "trc" : "acc";
              const start = f.d.match(/M(\d+) (\d+)/)!;
              return (
                <g key={f.n} data-flow>
                  <path data-path d={f.d} stroke={f.color} strokeWidth="1.8" fill="none" strokeDasharray={f.dashed ? "6 4" : undefined} markerEnd={`url(#arr-${marker})`} />
                  <circle cx={f.at[0]} cy={f.at[1]} r="9" fill={f.color} />
                  <text x={f.at[0]} y={f.at[1] + 4} textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#0b1222">{f.n}</text>
                  {f.label && <text x={f.at[0] + 14} y={f.at[1] + 4} fontSize="11" fill={f.color}>{f.label}</text>}
                  {!reduced && <circle data-dot cx={start[1]} cy={start[2]} r="4.5" fill="#fff" opacity="0" />}
                </g>
              );
            })}
          </svg>
        </div>

        <div className="mt-4 grid gap-4 text-[12.5px] md:grid-cols-[1fr_auto]">
          <ol data-legend className="grid gap-1 text-mute sm:grid-cols-2">
            {legend.map((l, i) => (
              <li key={l} className="flex gap-2"><span className="font-mono text-trace">{i + 1}</span><span>{l}</span></li>
            ))}
          </ol>
        </div>
        <p className="mt-3 text-[12px] leading-relaxed text-fail/90">
          웹은 승인 IP만 서비스에 접근 · 내부 포트(3000 · 8080 · 8806 · 27017)는 서버 내부에만 바인딩 · SSH/원격제어 미사용
        </p>
      </div>
    </TerminalFrame>
  );
}
