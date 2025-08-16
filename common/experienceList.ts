import { WorkExperienceType } from "@/types/workExperienceType";

export const workExperiences: WorkExperienceType[] = [
  {
    id: 1,
    company: "AIVIS",
    position: "풀스택 개발자",
    period: "2023.05 - 현재",
    description: [
      "AIVIS 형태계측 서비스 최초 개발",
      "Storybook 도입을 통한 디자인팀과 협업 개선",
      "monorepo 도입을 통한 프로젝트 관리",
      "motor 도입을 통한 API 성능 개선",
      "병원 내 On-Premise 서비스 구축",
    ],
    technologies: ["FrontEnd 개발", "BackEnd 개발", "DevOps"],
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
