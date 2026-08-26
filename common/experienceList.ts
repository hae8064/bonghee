import { WorkExperienceType } from "@/types/workExperienceType";

export const workExperiences: WorkExperienceType[] = [
  {
    id: 1,
    company: "AIVIS",
    position: "솔루션 서비스팀 팀장 / 풀스택 개발자",
    period: "2023.05 - 현재",
    description: [
      "솔루션 서비스팀 팀장으로서 팀 리딩, 개발 일정 관리 및 프로젝트 매니지먼트",
      "AIVIS 형태계측 서비스 초기 구축 참여 및 핵심 기능 개발",
      "Motor(Async Driver) 도입으로 API 평균 응답 시간 2초 → 0.25초 (6.7배 개선)",
      "Git Action + AWS ECS 자동화 배포 파이프라인 구축 (수동 20~30분 → 5분 이내)",
      "Storybook 기반 디자인 시스템 및 monorepo 환경 도입",
      "병원 내 On-Premise 서버실 구축 및 서비스 셋팅",
      "병원 LIS·EMR 시스템 연동 인터페이스 문서 작성 및 개발",
      "SSO 연동을 통한 병원 보안 정책 대응",
    ],
    technologies: ["FrontEnd 개발", "BackEnd 개발", "DevOps", "팀 리딩", "시스템 연동"],
  },
  {
    id: 2,
    company: "라이즈이엔엠",
    position: "프론트엔드 개발자(인턴)",
    period: "2023.01 - 2023.04",
    description: [
      "사내 홈페이지 프론트엔드 개발",
      "Admin 페이지 개발",
      "React -> Next.js로 마이그레이션",
    ],
    technologies: ["FrontEnd 개발"],
  },
];
