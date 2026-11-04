import type { Experience } from "./types";

export const experience: Experience = {
  company: "(주)에이비스 · 헬스케어 AI 솔루션",
  role: "백엔드, 인프라",
  period: "2023.05 – 현재",
  groups: [
    {
      title: "분석 파이프라인 설계와 리팩토링",
      bullets: [
        "2GB 이상 WSI 이미지를 비동기 큐(AWS SQS / RabbitMQ)로 분산 처리",
        "한 파일에 몰린 분석 서비스를 worker, dispatcher, handler, runner로 분리",
        "pytest PR 자동 테스트, Sentry에서 Slack으로 오류 알림",
      ],
    },
    {
      title: "성능 최적화",
      bullets: [
        "PyMongo를 Motor로 전환, 평균 응답 1.78초에서 0.26초로",
        "Aggregation Pipeline 재설계, Compound Index, N+1 쿼리 제거",
        "동적 타일 서빙 p95 1008ms에서 97ms로, SDK 호출은 Rust 워커로 격리",
        "Sectra 결과 JSON을 10×10 좌표 그리드로 분할, 첫 렌더 1.6초에서 0.6초로",
      ],
    },
    {
      title: "외부 시스템 연동 (EMR, LIS, PACS)",
      bullets: [
        "인터페이스 정의서를 직접 작성한 뒤 연동 API 설계와 개발",
        "Sectra, INFINITT, Philips IMS 등 PACS/DPS 벤더 연동",
        "병원 OCS 대상 Polling / Callback 이중 연동 규격 설계",
      ],
    },
    {
      title: "인증과 보안 설계, 배포",
      bullets: [
        "JWT 기반 SSO 위임 흐름과 OIDC SSO(Authorization Code + PKCE) 연동",
        "보안성 평가 대응으로 방화벽, 계정 정책, DB 계정 분리와 체크리스트 작성",
        "GitHub Actions와 ECS/ECR 무중단 배포 시간 20분에서 5분, 같은 도커 이미지를 On-Prem에 반입",
      ],
    },
  ],
};
