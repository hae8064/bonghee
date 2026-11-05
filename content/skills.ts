import type { SkillRow } from "./types";

export const skills: SkillRow[] = [
  { area: "백엔드", items: "FastAPI, Spring Boot, NestJS, MongoDB (Motor), PostgreSQL (TypeORM), Redis, RabbitMQ / SQS", how: "비동기 API와 큐 기반 파이프라인을 설계하고 외부 시스템 연동을 직접 만들었습니다" },
  { area: "인증 / 보안", items: "OAuth2 / OIDC (PKCE), JWT SSO, AWS IAM, Nginx, UFW / iptables", how: "병원 SSO 흐름과 단기 자격증명 배포를 설계하고 보안성 평가에 대응했습니다" },
  { area: "인프라 / DevOps", items: "AWS (ECS, EKS, Lambda, SQS, S3/CloudFront, RDS), Docker, GitHub Actions, ArgoCD, Prometheus, Grafana, Loki", how: "클라우드와 On-Prem에서 같은 이미지를 운영하고 배포 자동화와 관측 스택을 직접 구성했습니다" },
  { area: "프론트엔드", items: "Next.js, React, TypeScript, OpenLayers, WebGL, TanStack Query, Zustand, Vanilla Extract, Storybook", how: "2GB급 이미지를 타일로 나눠 그리고 수십만 건 오버레이를 WebGL로 렌더링했습니다" },
];
