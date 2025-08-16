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
        "Next.js의 메타데이터 API를 사용하여 SEO 최적화로 검색 엔진 노출도 향상",
        "모듈화된 컴포넌트 구조로 유지보수성 향상",
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
        "의료 AI 솔루션의 형태계측 데이터를 시각화하고 분석하는 웹 애플리케이션입니다. 대용량 어노테이션 처리와 캐싱 된 이미지를 관리하는 서비스입니다. 클라우드로도 서비스를 진행하고 병원 내 On-Premise 서비스로 구축 된 서비스입니다.",
      features: [
        "홀슬라이드 이미지 뷰어 (대용량 의료 이미지 처리) - 대용량 어노테이션들 약 수십만개의 데이터를 한번에 Fetch 하여 렌더링",
        "Redis를 활용하여 대용량 홀슬라이드 이미지를 캐시처리하여 사용성 개선",
        "AWS를 통한 클라우드 배포 (ECS, EKS를 통해 배포), AWS DocumentDB를 활용하여 데이터 저장 및 관리",
        "WebSocket을 통한 대용량 이미지 업로드 시 완료 여부 Frontend에 소켓을 통해 완료 여부 전달 기능 구현",
        "AWS Lambda를 활용한 이미지 리사이징 기능 추가 (썸네일 이미지)",
      ],
      challenges: [
        "대용량 의료 이미지(홀슬라이드)의 효율적인 로딩과 렌더링",
        "Pymongo -> Motor로 전환",
        "병원 내 보안 정책에 대응하기 위한 SSO 적용",
        "git action을 통한 자동화 배포 환경 구축 및 브랜치 전략 강화",
      ],
      solutions: [
        "이미지 타일링과 레이지 로딩을 통한 대용량 이미지 처리 최적화",
        "기존 pymongo는 동기적으로 실행하기 때문에 동시에 여러 API 호출이 들어올 때 병목현상이 발생하였다. 이 때문에 Motor로 전환하여 비동기적으로 실행하도록 하였다. \n부하 테스트인 autocannon으로 테스트 해 본 결과 평균 응답시간이 2초 -> 0.25초로 단축하였고, 요청 수도 304 Requests -> 2000 Requests 성능 향상",
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
        "Next.js를 통해 SSR 방식으로 렌더링 하여 초기 로딩 속도 개선, 검색 엔진 최적화",
        "AWS ECS + Git Action을 통한 자동화 배포 환경 구축",
        "Storybook을 통한 디자인 시스템 구축",
        "VanilaExtract를 통한 스타일링",
      ],
      challenges: [
        "실시간 데이터 동기화와 성능 최적화",
        "대용량 파일 업로드 처리",
        "사용자 인증과 보안 구현",
        "메시지 전송 실패 시 재시도 로직",
      ],
      solutions: [
        "Socket.io를 활용한 실시간 양방향 통신 구현",
        "스트리밍 업로드와 청크 단위 파일 처리",
        "JWT 토큰 기반 인증과 bcrypt 암호화",
        "메시지 큐와 재시도 메커니즘 구현",
      ],
      learnings: [
        "실시간 웹 애플리케이션 아키텍처 설계",
        "WebSocket과 Socket.io의 활용",
        "파일 업로드와 스트리밍 처리",
        "사용자 경험과 성능의 균형",
      ],
      role: "프론트엔드 개발자",
      teamSize: 2,
      images: [
        {
          id: "chat-main",
          url: "/images/projects/chat-app-main.png",
          alt: "채팅 애플리케이션 메인 화면",
          caption: "실시간 채팅 인터페이스",
          type: "screenshot",
        },
        {
          id: "chat-mobile",
          url: "/images/projects/chat-app-mobile.png",
          alt: "모바일 채팅 화면",
          caption: "모바일에서의 채팅 인터페이스",
          type: "screenshot",
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
    title: "할 일 관리 앱",
    description:
      "Vue.js와 Firebase를 사용하여 개발한 할 일 관리 애플리케이션입니다. 실시간 데이터 동기화와 사용자 인증 기능을 포함합니다.",
    technologies: ["Vue.js", "Firebase", "Vuex", "Vue Router"],
    githubUrl: "https://github.com/yourusername/todo-app",
    period: "2023.03 - 2023.04",
    imageUrl: "/images/projects/todo-app-main.png",
    detail: {
      overview:
        "사용자가 할 일을 관리하고 실시간으로 동기화할 수 있는 웹 애플리케이션입니다. Firebase를 활용한 백엔드 서비스를 제공합니다.",
      features: [
        "할 일 생성, 수정, 삭제 기능",
        "실시간 데이터 동기화",
        "사용자 인증 및 프로필 관리",
        "할 일 카테고리 분류",
        "완료된 할 일 통계 및 리포트",
      ],
      challenges: [
        "Firebase 실시간 데이터베이스 연동",
        "사용자 인증과 데이터 보안",
        "Vue.js 상태 관리 최적화",
        "오프라인 지원과 데이터 동기화",
      ],
      solutions: [
        "Firebase Realtime Database와 Firestore 활용",
        "Firebase Authentication을 통한 사용자 인증",
        "Vuex를 활용한 상태 관리 최적화",
        "Service Worker를 활용한 오프라인 지원",
      ],
      learnings: [
        "Firebase 서비스의 활용과 제한사항",
        "Vue.js 생태계와 컴포넌트 설계",
        "실시간 데이터 동기화 패턴",
        "사용자 중심의 UI/UX 설계",
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
