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
        "Next.js의 이미지 최적화와 코드 스플리팅 적용",
      ],
      learnings: [
        "Next.js 13+ App Router의 새로운 기능과 패턴 학습",
        "TypeScript를 활용한 타입 안전성 확보",
        "모던 CSS 프레임워크(Tailwind CSS)의 효율적인 활용",
        "성능 최적화와 사용자 경험 개선의 중요성",
      ],
      role: "프론트엔드 개발자 (개인 프로젝트)",
      teamSize: 1,
      images: [
        {
          id: "portfolio-main",
          url: "/images/bongheePortPolio.png",
          alt: "포트폴리오 메인 페이지",
          caption: "메인 페이지의 전체적인 레이아웃과 디자인",
          type: "screenshot",
        },
        {
          id: "portfolio-mobile",
          url: "/images/projects/portfolio-mobile.png",
          alt: "모바일 반응형 디자인",
          caption: "모바일에서의 반응형 디자인 확인",
          type: "screenshot",
        },
        {
          id: "portfolio-architecture",
          url: "/images/projects/portfolio-architecture.png",
          alt: "프로젝트 아키텍처",
          caption: "Next.js App Router 기반의 프로젝트 구조",
          type: "diagram",
        },
      ],
      videos: [
        {
          id: "portfolio-demo",
          url: "https://www.youtube.com/watch?v=example",
          title: "포트폴리오 웹사이트 데모",
          description: "포트폴리오 웹사이트의 주요 기능들을 보여주는 데모 영상",
          type: "demo",
        },
      ],
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
      ],
      challenges: [
        "대용량 의료 이미지(홀슬라이드)의 효율적인 로딩과 렌더링",
        "실시간 데이터 처리와 성능 최적화",
        "의료 데이터의 보안 요구사항 충족",
        "복잡한 형태계측 데이터의 시각화",
      ],
      solutions: [
        "이미지 타일링과 레이지 로딩을 통한 대용량 이미지 처리 최적화",
        "WebSocket과 React Query를 활용한 실시간 데이터 동기화",
        "AWS 보안 서비스와 JWT 토큰을 활용한 보안 강화",
        "D3.js와 Chart.js를 활용한 데이터 시각화 구현",
      ],
      learnings: [
        "대용량 데이터 처리와 성능 최적화 기법",
        "의료 데이터 보안과 HIPAA 규정 준수",
        "실시간 웹 애플리케이션 개발 패턴",
        "팀 협업과 코드 리뷰 프로세스",
      ],
      role: "풀스택 개발자",
      teamSize: 5,
      images: [
        {
          id: "aivis-main",
          url: "/images/projects/aivis-main.png",
          alt: "AIVIS 형태계측 뷰어 메인 화면",
          caption: "형태계측 데이터 시각화 메인 화면",
          type: "screenshot",
        },
        {
          id: "aivis-viewer",
          url: "/images/projects/aivis-viewer.png",
          alt: "홀슬라이드 이미지 뷰어",
          caption: "대용량 의료 이미지를 효율적으로 표시하는 뷰어",
          type: "screenshot",
        },
        {
          id: "aivis-architecture",
          url: "/images/projects/aivis-architecture.png",
          alt: "시스템 아키텍처",
          caption: "FastAPI와 Next.js를 활용한 시스템 아키텍처",
          type: "diagram",
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
    title: "실시간 채팅 애플리케이션",
    description:
      "Socket.io를 활용한 실시간 채팅 애플리케이션입니다. 사용자 간 실시간 메시지 전송과 파일 공유 기능을 제공합니다.",
    technologies: ["React", "Socket.io", "Express", "MongoDB"],
    githubUrl: "https://github.com/yourusername/chat-app",
    period: "2023.05 - 2023.07",
    imageUrl: "/images/projects/chat-app-main.png",
    detail: {
      overview:
        "실시간 채팅 기능을 제공하는 웹 애플리케이션으로, 사용자 간 즉시 메시지 전송과 파일 공유가 가능합니다.",
      features: [
        "실시간 메시지 전송 및 수신",
        "파일 업로드 및 공유 기능",
        "사용자 인증 및 프로필 관리",
        "채팅방 생성 및 관리",
        "메시지 히스토리 저장 및 검색",
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
      role: "풀스택 개발자",
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
      videos: [
        {
          id: "chat-demo",
          url: "https://www.youtube.com/watch?v=example2",
          title: "실시간 채팅 데모",
          description: "실시간 메시지 전송과 파일 공유 기능 데모",
          type: "demo",
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
          id: "todo-main",
          url: "/images/projects/todo-app-main.png",
          alt: "할 일 관리 앱 메인 화면",
          caption: "할 일 목록과 관리 인터페이스",
          type: "screenshot",
        },
        {
          id: "todo-mobile",
          url: "/images/projects/todo-app-mobile.png",
          alt: "모바일 할 일 앱",
          caption: "모바일에서의 할 일 관리 인터페이스",
          type: "screenshot",
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
