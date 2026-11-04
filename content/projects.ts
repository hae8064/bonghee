import type { Project } from "./types";

export const projects: Project[] = [
  {
    name: "워크유",
    period: "2026.10 – 운영 중",
    role: "외주, 설계부터 배포까지",
    summary: "유학생 구인·구직 서비스. Next.js + NestJS + PostgreSQL로 전부 구현하고 AWS에 배포해 운영 중입니다.",
    points: [
      "Next.js + NestJS + PostgreSQL 모노레포로 전부 구현",
      "신분증 업로드 후 운영자 승인하는 신분 확인, 운영자 이메일 코드 2FA",
      "유료 외부 호출(번역)을 어댑터 뒤에 두고 환경변수로 실제·테스트 구현 교체",
    ],
    stack: ["Next.js", "NestJS", "PostgreSQL", "Redis", "AWS EC2 / RDS / S3", "Docker"],
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
