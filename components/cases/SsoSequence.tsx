"use client";

import { TraceDiagram } from "@/components/diagram/TraceDiagram";
import type { Lane, TraceStep } from "@/components/diagram/types";
import { TerminalFrame } from "./TerminalFrame";

const lanes: Lane[] = [
  { id: "mw", label: "병원 미들웨어" },
  { id: "br", label: "브라우저" },
  { id: "an", label: "분석 서버" },
  { id: "ims", label: "IMS (인증)" },
];

const base: TraceStep[] = [
  { from: "mw", to: "br", label: "① 티켓 발급 · JWT 60초 · jti" },
  { from: "br", to: "an", label: "② 티켓을 URL에 담아 진입" },
  { from: "an", to: "ims", label: "③ 티켓 중계" },
  { from: "ims", to: "ims", label: "④ 서명 · 만료 · jti · slideId 검증" },
  { from: "ims", to: "an", label: "⑤ 30초 일회용 code" },
  { from: "an", to: "br", label: "⑥ 302 리다이렉트 (code)" },
  { from: "br", to: "ims", label: "⑦ code를 POST로 교환" },
  { from: "ims", to: "br", label: "⑧ 세션 토큰 (응답 본문)" },
];

const failStep: TraceStep = { from: "ims", to: "br", label: "✕ 만료 · 위변조 · 재사용 → '미들웨어에서 접속' 안내", tone: "fail" };

export function SsoSequence({ variant }: { variant: "preview" | "full" }) {
  const full = variant === "full";
  return (
    <TerminalFrame title="sso — ticket → code → session">
      <TraceDiagram
        lanes={lanes}
        steps={full ? [...base, failStep] : base}
        mode={full ? "scroll" : "loop"}
        ariaLabel="병원 미들웨어 SSO 로그인 흐름: 티켓 발급부터 세션 토큰까지 8단계"
        colWidth={200}
      />
    </TerminalFrame>
  );
}
