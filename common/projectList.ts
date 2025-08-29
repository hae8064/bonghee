import { ProjectType } from "@/types/projectType";

export const projects: ProjectType[] = [
  {
    id: 1,
    title: "이봉희 포트폴리오 웹사이트",
    description:
      "Next.js와 TypeScript를 사용하여 만든 개인 포트폴리오 웹사이트입니다. 반응형 디자인과 모던한 UI/UX를 적용했습니다.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    githubUrl: "https://github.com/hae8064/bonghee",
    liveUrl: "https://hae8064.github.io/bonghee/",
    period: "2025.08 - 2025.08",
    imageUrl: "/images/bongheePortPolio.png",
    detail: {
      overview:
        "프론트엔드 개발을 할 줄 안다면 개인 포트폴리오를 웹사이트로 만들어 보는 것은 어떨까? 라는 생각에서 시작된 프로젝트입니다. 디자인부터 기획, 개발까지 모두 직접 해보았습니다. tailwind css, framer motion은 사용 해 본 적이 없어서 공부 목적으로 기술 적용을 해보았습니다.",
      features: [
        "Tailwind CSS를 사용하여 반응형 디자인으로 모든 디바이스에서 최적화된 경험 제공",
        "Framer Motion을 사용하여 부드러운 애니메이션과 인터랙션 효과",
        "모듈화된 컴포넌트 구조로 유지보수성 향상",
        "Git Action을 통한 자동화 배포 환경 구축",
      ],
      challenges: [
        "다양한 디바이스에서 일관된 사용자 경험 제공",
        "성능 최적화와 로딩 속도 개선",
      ],
      solutions: [
        "Tailwind CSS의 반응형 클래스를 활용한 모바일 퍼스트 디자인",
        "SSR 방식으로 서버에서 이미 만들어진 HTML을 만들어서 렌더링 하여 초기 로딩 속도 개선, 검색 엔진 최적화",
      ],
      learnings: [
        "Next.js 15+ App Router의 새로운 기능과 패턴 학습",
        "모던 CSS 프레임워크(Tailwind CSS)의 효율적인 활용",
        "성능 최적화와 사용자 경험 개선의 중요성",
      ],
      role: "프론트엔드 개발자 (개인 프로젝트)",
      teamSize: 1,
    },
    metadata: {
      category: "web",
      status: "completed",
      priority: "high",
      tags: ["portfolio", "nextjs", "typescript", "responsive"],
    },
  },
  {
    id: 2,
    title: "AIVIS 형태계측 뷰어",
    description:
      "AIVIS 사내 솔루션 형태계측 뷰어입니다. Next.js와 FastAPI를 사용하여 개발했습니다. 대용량 크기 홀슬라이드 이미지 뷰어, 형태계측 데이터 시각화, 형태계측 데이터 분석 기능을 제공합니다.",
    technologies: [
      "FastAPI",
      "MongoDB",
      "AWS",
      "Motor",
      "Redis",
      "SQS Worker",
      "Next.js",
      "VanilaExtract",
      "Storybook",
      "Tanstack-query",
      "Recoil",
    ],
    githubUrl: "비공개",
    liveUrl: "비공개",
    period: "2023.08 -",
    detail: {
      overview:
        "의료 AI 솔루션의 형태계측 데이터를 시각화·분석하는 웹 애플리케이션입니다. 대용량 어노테이션과 캐싱된 이미지를 효율적으로 관리하며, 클라우드 및 병원 내 On-Premise 환경 모두에서 구축할 수 있습니다. 또한, 2GB 이상의 대용량 이미지를 SQS 기반 큐 처리로 안정적으로 업로드하고, AI 모델과 연동하여 분석을 수행합니다.",
      features: [
        "2GB 이상 대용량 이미지를 안정적으로 처리하고, Motor(Async Driver) 기반으로 평균 응답 속도를 6.7배 개선. API 응답 지연/타임아웃 0건 → 안정성 확보.",
        "Redis를 활용하여 대용량 홀슬라이드 이미지를 캐시처리하여 사용성 개선",
        "AWS를 통한 클라우드 배포 (ECS, EKS를 통해 배포), AWS DocumentDB를 활용하여 데이터 저장 및 관리",
        "WebSocket을 통한 대용량 이미지 업로드 시 완료 여부 Frontend에 소켓을 통해 완료 여부 전달 기능 구현",
        "AWS Lambda를 활용한 이미지 리사이징 기능 추가 (썸네일 이미지)",
        "AWS Document DB 터널링을 활용하여 MongoDB 설계 및 최적화",
      ],
      challenges: [
        "대용량 의료 이미지(홀슬라이드)의 효율적인 로딩과 렌더링",
        "Pymongo -> Motor로 전환",
        "2GB 이상 대용량 이미지를 동시에 업로드할 경우 서버에 과부하 발생 병렬 업로드 요청 시 네트워크 지연 및 프로세스 충돌로 안정성 저하, On-Premise 환경에서는 FastAPI Background Task + 내부 큐를 활용하여 안정적으로 처리",
        "병원 내 보안 정책에 대응하기 위한 SSO 적용",
        "git action을 통한 자동화 배포 환경 구축 및 브랜치 전략 강화",
      ],
      solutions: [
        "이미지 타일링과 레이지 로딩을 통한 대용량 이미지 처리 최적화",
        "기존 pymongo는 동기적으로 실행하기 때문에 동시에 여러 API 호출이 들어올 때 병목현상이 발생하였다. 이 때문에 Motor로 전환하여 비동기적으로 실행하도록 하였다. \n부하 테스트인 autocannon으로 테스트 해 본 결과 평균 응답시간이 2초 -> 0.25초로 단축하였고, 요청 수도 304 Requests -> 2000 Requests 성능 향상",
        "AWS SQS(Simple Queue Service) 기반의 큐 처리 방식 적용",
        "기존 jwt 토큰 정책으로만 관리하는 것이 아닌, SSO를 통해 인증을 관리. \n 병원 내 미들웨어에서 로그인 한 유저에 대한 session id를 세션으로 관리하여 병원 내 보안 정책에 대응. \n 사용자 움직임을 감지하여 30분간 동작 없으면 세션을 초기화 하는 기능 추가",
        "특정 브랜치 merge 시 자동으로 aws eks로 배포하는 자동화 파이프라인 구축, 브랜치 전략 강화를 위해 merge된 브랜치 커밋 내역 기록 - 아래와 같은 mark down 형식으로 기록",
      ],
      learnings: [
        "TanStack Query의 Infinite Query를 활용한 대용량 데이터의 점진적 로딩 및 가상화로 메모리 사용량 최적화",
        "FastAPI의 비동기 처리와 Pydantic을 활용한 데이터 검증 및 API 응답 시간 단축",
        "MongoDB Aggregation Pipeline을 활용한 복잡한 데이터 분석 및 실시간 통계 기능 구현",
        "AWS 클라우드 구축 및 git action을 통한 자동화 배포 환경 구축",
        "팀 협업과 코드 리뷰 프로세스",
      ],
      role: "풀스택 개발자",
      teamSize: 5,
      images: [
        {
          isNull: true,
        },
        {
          id: "pymongo-to-motor",
          url: "/images/pymongo-to-motor.png",
          alt: "pymongo -> motor 전환 테스트 결과",
          caption: "pymongo -> motor 전환 테스트 결과",
          type: "screenshot",
        },
        {
          isNull: true,
        },
        {
          id: "git-branch",
          url: "/images/git-branch.png",
          alt: "git branch 전략",
          caption: "git branch 전략",
          type: "screenshot",
        },
      ],
      videos: [
        {
          id: "aivis-demo",
          url: "/videos/aivis-demo-compressed.mp4",
          title: "AIVIS 형태계측 뷰어 데모 영상",
          description:
            "수십만개의 어노테이션들을 렌더링 하는 영상, 캐싱 된 이미지를 보여주는 영상입니다.",
          type: "demo",
        },
      ],
    },
    metadata: {
      category: "web",
      status: "in-progress",
      priority: "high",
      tags: ["medical", "ai", "big-data", "real-time"],
    },
  },
  {
    id: 3,
    title: "AIVIS 홈페이지",
    description:
      "AIVIS 사내 홈페이지입니다. Next.js를 통해 SSR 방식으로 렌더링 하여 초기 로딩 속도 개선, 검색 엔진 최적화, AWS ECS + Git Action을 통한 자동화 배포 환경 구축 하였습니다.",
    technologies: [
      "Next.js",
      "VanilaExtract",
      "Storybook",
      "Zustand",
      "AWS",
      "Git Action",
    ],
    githubUrl: "비공개",
    period: "2025.02 - 2025.04",
    liveUrl: "https://aivis.kr",
    imageUrl: "/images/projectDetails/aivis-homepage.png",
    detail: {
      overview:
        "AIVIS 사내 홈페이지입니다. Next.js를 통해 SSR 방식으로 렌더링 하여 초기 로딩 속도 개선, 검색 엔진 최적화, AWS ECS + Git Action을 통한 자동화 배포 환경 구축 하였습니다.",
      features: [
        "초기 로딩 속도를 2.1초 → 0.8초로 단축, 검색 결과 노출률 개선. 기존 수동 배포(20~30분) → 무중단 자동 배포 5분 이내로 단축.",
        "AWS ECS + Git Action을 통한 자동화 배포 환경 구축",
        "Storybook을 통한 디자인 시스템 구축",
        "VanilaExtract를 통한 스타일링",
        "Notion API를 활용한 뉴스 데이터 주기적인 자동 업데이트",
      ],
      challenges: [],
      solutions: [],
      learnings: [
        "Framer Motion을 통한 애니메이션 효과 구현",
        "SEO 최적화를 위한 메타데이터 적용 - Open Graph 등",
        "Notion API를 활용한 뉴스 데이터 자동 업데이트",
      ],
      role: "프론트엔드 개발자",
      teamSize: 2,
      images: [
        {
          isNull: true,
        },
        {
          isNull: true,
        },
      ],
    },
    metadata: {
      category: "web",
      status: "completed",
      priority: "medium",
      tags: ["real-time", "chat", "websocket", "file-sharing"],
    },
  },
  {
    id: 4,
    title: "중고차 판매 및 매물 등록 웹 사이트",
    description:
      "외주를 통해 프론트엔드 개발을 맡아 중고차 판매 및 매물 등록 웹 사이트입니다. 중고차 판매 및 매물 등록 기능을 제공합니다.",
    technologies: [
      "React",
      "TypeScript",
      "Styled-Components",
      "S3",
      "AWS",
      "Firebase",
    ],
    githubUrl: "비공개",
    period: "2024.04 - 2024.07",
    imageUrl: "/images/projectDetails/usedCar.png",
    liveUrl: "https://autostockglobal.com/",
    detail: {
      overview:
        "중고차 판매 및 매물 등록 웹 사이트입니다. 중고차 판매 및 매물 등록 기능을 제공합니다. 외주를 통해 React를 사용하여 개발하였고, 현재도 서비스 중입니다.",
      features: [
        "Firebase로 관리하던 이미지들을 AWS S3로 마이그레이션",
        "6만개가 넘는 매물 데이터 Pagination처리로 안정적인 서비스 제공",
        "JWT 토큰 기반 사용자 인증 및 권한 관리",
      ],
      challenges: [],
      solutions: [],
      learnings: ["AWS S3를 통한 이미지 관리"],
      role: "프론트엔드 개발자",
      teamSize: 4,
      images: [
        {
          isNull: true,
        },
        {
          isNull: true,
        },
      ],
    },
    metadata: {
      category: "web",
      status: "completed",
      priority: "low",
      tags: ["todo", "vue", "firebase", "real-time"],
    },
  },
  {
    id: 5,
    title: "공감블라인드 랜딩페이지",
    description:
      "커튼 블라인드 설치 서비스 랜딩페이지입니다. 기획부터 디자인 개발까지 전부 다 1인 개발로 진행하였습니다.",
    technologies: [
      "Next.js",
      "TypeScript",
      "VanilaExtract",
      "Zustand",
      "AWS",
      "S3",
      "EmailJS",
      "Git Action",
    ],
    githubUrl: "비공개",
    period: "2025.03 - 2025.05",
    imageUrl: "/images/projectDetails/gonggambliind.png",
    liveUrl: "https://construction.gonggamblind.com",
    detail: {
      overview:
        "커튼 블라인드 설치 서비스 랜딩페이지입니다. 기획부터 디자인 개발까지 전부 다 1인 개발로 진행하였습니다.",
      features: [
        "SEO 최적화 및 퍼포먼스 개선으로 네이버·구글 검색 결과 상위 노출 달성, 실제 고객 유입 건수 증가.",
        "S3를 통한 이미지 관리 - Cloud Front를 통한 캐싱 처리",
        "EmailJS를 통한 문의사항 및 사진 전달",
      ],
      challenges: [
        "사용자에 문의사항을 Email로 받는 과정에서 Text이외에 사진은 유료 서비스를 이용해야만 했던 문제",
      ],
      solutions: [
        "사진을 S3로 먼저 업로드 후 S3 경로를 Email JS에 전달하여 사진을 볼 수 있도록 구조 변경",
      ],
      learnings: [
        "AWS S3를 통한 이미지 관리",
        "EmailJS를 통한 문의사항 및 사진 전달",
      ],
      role: "프론트엔드 개발자",
      teamSize: 1,
      images: [
        {
          isNull: true,
        },
        {
          isNull: true,
        },
      ],
    },
    metadata: {
      category: "web",
      status: "completed",
      priority: "low",
      tags: ["todo", "vue", "firebase", "real-time"],
    },
  },
];
