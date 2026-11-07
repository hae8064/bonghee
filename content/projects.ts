import type { Project } from "./types";

export const projects: Project[] = [
  {
    name: "워크유",
    period: "2026.10 – 운영 중",
    role: "설계, 개발, 배포, 인프라 전담",
    summary: "외국인·유학생과 사장님을 잇는 구인·구직 서비스. Next.js + NestJS + PostgreSQL로 전부 구현하고 AWS에 배포해 운영 중입니다.",
    points: [
      "번역 · 메일 · 푸시 · 신분증 판독처럼 기다리지 않아도 되는 일은 BullMQ 큐 11개로 분리, API는 즉시 응답만",
      "비자 · 최저임금 규칙을 공용 패키지 하나로 웹과 API가 함께 사용, 화면은 안내하고 서버가 차단",
      "CI 통과 시 커밋 SHA 이미지를 GHCR에 올리고, SSM으로 DB 백업 → migrate → 배포 → 상태 확인, 이전 SHA로 롤백",
      "신분증은 Claude 판독 후 운영자 승인, 사업자번호는 국세청 진위 확인, 외국인등록번호는 받지 않음",
    ],
    stack: ["Next.js", "NestJS", "PostgreSQL (Prisma)", "Redis · BullMQ", "AWS EC2 / RDS / S3 / SSM", "Docker · GHCR"],
    links: [{ label: "worku.kr", href: "https://worku.kr" }],
  },
  {
    name: "공감블라인드",
    period: "2025.03 – 운영 중",
    role: "개인, 설계부터 배포까지",
    summary: "서버 없는 정적 사이트. Notion 기반 콘텐츠 파이프라인과 단기 자격증명 배포로 서버 없이 서버 기능을 대체했습니다.",
    points: [
      "Notion 블록 트리를 MDX로 바꾸는 변환기 구현, 비개발자가 Git 없이 발행",
      "영구 IAM 키 제거, GitHub Actions OIDC 단기 자격증명으로 배포",
      "Lambda presigned POST 업로드, 용량·타입 검증은 S3 정책 조건에 위임",
    ],
    stack: ["Next.js (static export)", "AWS S3 / CloudFront / Lambda", "GitHub Actions (OIDC)", "Notion API"],
    links: [
      { label: "construction.gonggamblind.com", href: "https://construction.gonggamblind.com" },
      { label: "GitHub", href: "https://github.com/hae8064/gonggamBlind" },
    ],
  },
  {
    name: "dev-reader",
    period: "2026.09 – 2026.10",
    role: "개인",
    summary: "RSS 개발 아티클을 문장 단위로 나누고 단어 뜻을 미리 뽑아 두는 개인용 영어 독해 리더입니다.",
    points: [
      "기사를 문장 단위로 나누고 단어 뜻을 미리 생성",
      "기사별 뜻과 전역 단어장을 분리해 설계",
    ],
    stack: ["Next.js", "NestJS", "TypeORM", "PostgreSQL", "Gemini API", "DeepL API"],
    links: [],
  },
];
