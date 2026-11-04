export const profile = {
  name: "이봉희",
  role: "BACKEND · CLOUD ENGINEER",
  roleKo: "백엔드 / 클라우드 엔지니어",
  tagline: "설계에서 끝내지 않고 운영까지",
  heroLine: "병리 AI 분석 서비스의 백엔드를 설계하고, 클라우드와 병원 폐쇄망 양쪽에서 3년 넘게 운영해 왔습니다.",
  intro: [
    "병리 AI 분석 서비스의 백엔드를 설계하고, 클라우드와 병원 폐쇄망 양쪽에서 운영합니다.",
    "FastAPI 분석 서버와 Spring Boot 업로드 서버, 병원 미들웨어·PACS 연동 API, SSO 인증 흐름을 직접 설계하고 운영해 왔습니다. 같은 서비스를 인터넷이 되는 곳과 안 되는 곳에서 동시에 돌려야 해서, 환경 차이를 코드 밖으로 밀어내는 설계를 계속 해왔습니다.",
    "화면이 필요하면 WebGL 슬라이드 뷰어와 Next.js 서비스 프론트까지 직접 구현합니다.",
  ],
  pillars: [
    {
      title: "백엔드 설계",
      points: [
        "큐 기반 업로드·분석 파이프라인 설계",
        "분석 서비스를 worker, dispatcher, handler 계층으로 분리",
        "병원 미들웨어·PACS 연동 API 설계와 명세서 작성",
      ],
    },
    {
      title: "대용량 처리와 성능",
      points: [
        "2GB가 넘는 슬라이드 업로드를 비동기 큐로 분산 처리",
        "DB 비동기 전환과 인덱스 재설계로 응답 6.7배 개선",
        "동적 타일 서빙 p95 1008ms에서 97ms로 단축",
      ],
    },
    {
      title: "인증과 보안 설계",
      points: [
        "공용 계정 자동 로그인을 JWT 기반 SSO 위임으로 교체",
        "OIDC(PKCE) SSO와 OIDC 단기 자격증명 배포 구현",
        "병원 보안성 평가에 방화벽·계정 정책 설계로 대응",
      ],
    },
  ],
  email: "hae8064@gmail.com",
  github: "https://github.com/hae8064",
  site: "bonghee.vercel.app",
};
