import type { CaseSlug, CaseStudy } from "./types";

export const cases: CaseStudy[] = [
  {
    slug: "qanti",
    index: "01",
    title: "Qanti: 하나의 이미지, 두 개의 배포 경로",
    summary:
      "병리 IHC 분석 플랫폼. 스캐너에서 뷰어까지 이어지는 분석 파이프라인을 설계하고, 같은 Docker 이미지를 AWS 클라우드와 병원 서버실 On-Prem에 동시에 배포해 운영합니다.",
    period: "2023.08 – 현재",
    scope: "백엔드 설계, 병원 연동 API, 인증 설계, 인프라 (3인 팀)",
    problem: [
      "HER2, Ki-67, ER, PR 4종 IHC 바이오마커를 분석합니다. 슬라이드 1건이 2GB를 넘고, 결과는 수십만에서 수백만 건입니다.",
      "같은 서비스를 인터넷이 되는 클라우드와 인터넷이 안 되는 병원 서버실(On-Prem)에서 동시에 돌려야 했습니다.",
      "병원마다 EMR, LIS, PACS가 달라 결과 회신과 로그인 방식도 병원별로 맞춰야 했습니다.",
    ],
    decisions: [
      { decision: "소스에서 빌드한 Docker 이미지 하나, 태그로 버전 고정", risk: "환경마다 따로 빌드하면 버전이 갈라집니다. 어느 쪽이든 앱 재빌드 없이 모델만 교체하고 되돌립니다." },
      { decision: "업로드는 큐로 분산 (클라우드 SQS, On-Prem RabbitMQ)", risk: "2GB 업로드가 몰리면 API 서버가 버티지 못합니다. 큐만 환경에 맞게 바꾸고 코드는 그대로 둡니다." },
      { decision: "이미지 전달 경로만 분리 (ECR pull / tar 암호화 반입)", risk: "On-Prem은 레지스트리에 닿지 않습니다. 같은 이미지를 save해 암호화 전송 후 load합니다." },
      { decision: "관측 도구도 환경별로 (CloudWatch / Prometheus · Grafana · Loki)", risk: "On-Prem에서는 클라우드 관측 도구를 쓸 수 없어 자체 구성했습니다." },
      { decision: "WebSocket 진행률, Redis 캐싱", risk: "업로드·분석이 길어 사용자가 상태를 모르고, 같은 조회가 반복돼 부하가 쌓였습니다." },
    ],
    results: [
      "상급종합병원 중심 10곳 이상, 병원 서버실에 GPU 서버를 직접 설치해 On-Prem으로 구축·운영. 자동 업데이트 차단, 드라이버 버전 고정, 이미지 암호화 반입을 설정과 스크립트로 고정",
      "동시 업로드 중 서버 다운 0건",
      "EMR / LIS / PACS 결과 회신, Sectra · INFINITT · Philips IMS 연동, 병원 OCS 대상 Polling / Callback 이중 연동 규격",
    ],
    limits: ["On-Prem은 서버실 GPU 서버(RTX A5000, 4080S)를 직접 구성해야 해서, 하드웨어와 드라이버 차이를 스크립트로 고정해 관리합니다."],
    stack: ["Spring Boot", "FastAPI", "MongoDB", "Redis", "AWS SQS / RabbitMQ", "ECS / EKS", "ArgoCD", "Docker"],
  },
  {
    slug: "sso",
    index: "02",
    title: "병원 미들웨어 SSO",
    summary: "공용 계정 자동 로그인을 없애고, 병원 미들웨어가 서명한 티켓으로 사번별 로그인하도록 바꿨습니다.",
    problem: [
      "병원 보안성 평가 지적에서 출발했습니다.",
      "공용 계정 비밀번호가 웹 코드에 하드코딩돼 있었습니다.",
      "뷰어 링크만 알면 누구나 진입할 수 있었습니다.",
      "모두 공용 계정이라 실제 조회자가 남지 않았습니다.",
    ],
    decisions: [
      { decision: "티켓 60초 + jti 1회", risk: "티켓이 URL 쿼리로 와서 브라우저 기록과 프록시 로그에 남습니다. 유출돼도 다시 쓸 수 없게 했습니다." },
      { decision: "30초 일회용 code로 한 번 더 교환", risk: "세션 토큰을 URL에 싣지 않기 위해서입니다. 토큰은 POST 응답 본문으로만 나갑니다." },
      { decision: "SSO 계정은 전용 도메인 접미사", risk: "사번을 기존 도메인에 붙이면 sub=admin 티켓이 기존 관리자 계정으로 로그인될 수 있었습니다." },
      { decision: "데이터 id와 로그인 계정 id 분리", risk: "ROI는 병원 요구대로 모두 공유하고, 로그인 기록과 개인 설정은 사람별로 남깁니다. 하나로 쓰면 SSO 사용자가 공용 프로젝트 소유자 권한을 얻는 문제를 코드 리뷰에서 찾았습니다." },
      { decision: "Nginx에 SSO 진입 경로 하나만 공개", risk: "같은 서버의 무인증 내부 API가 함께 노출되지 않게 했습니다." },
    ],
    results: [
      "비밀번호와 로그인 페이지를 없애고, SSO 인증 위임으로 대응",
      "사번별 계정으로 로그인 기록 분리",
      "만료 · 위변조 · 재사용 · slideId 불일치는 로그인 화면 대신 '미들웨어에서 접속' 안내로 보냅니다",
    ],
    limits: ["ROI는 병원 요구대로 모두 공유하기 때문에, 공유 ROI 데이터에는 누가 그렸는지 남지 않습니다."],
    stack: ["JWT (HS256)", "Spring Boot", "FastAPI", "Nginx"],
  },
  {
    slug: "annotation-grid",
    index: "03",
    title: "Annotation 결과 JSON Grid-Split",
    summary: "172MB에서 1.9GB에 이르는 Annotation 결과 JSON을 10×10 좌표 그리드로 나눠, 화면에 필요한 영역만 읽게 바꿨습니다.",
    problem: [
      "외부 뷰어로 보내는 Annotation 결과(content JSON)가 172MB에서 1.9GB였습니다.",
      "첫 렌더 때마다 파일 전체를 읽고 파싱해야 했습니다.",
    ],
    decisions: [
      { decision: "업로드 시점에 MVT → Annotation 형식 사전 변환", risk: "뷰어가 hook을 부를 때 변환하면 그 시간이 그대로 첫 렌더 대기 시간이 됩니다." },
      { decision: "좌표를 10×10 coarse grid로 나눈 분할 파일", risk: "ROI는 슬라이드 일부인데 전체 파일을 읽고 있었습니다. 걸치는 칸만 읽으면, 예를 들어 172MB 중 12개 파일 20MB만 로드합니다." },
      { decision: "로드 후 shapely prepared로 ROI polygon 내부만 정밀 필터", risk: "칸 단위는 대략적이라 ROI 밖 cell이 섞입니다. polygon을 미리 준비해 반복 판정 비용을 줄였습니다." },
      { decision: "orjson 파싱", risk: "기본 json 모듈 파싱이 병목이었습니다." },
      { decision: "메모리 캐시 → 분할 파일 → 전체 JSON 순서로 로드", risk: "분할 파일이 없는 옛 슬라이드도 깨지지 않게 전체 JSON을 fallback으로 남겼습니다." },
    ],
    results: ["172MB · 243,717 cells 기준 첫 렌더 1,618ms → 607ms (약 2.7배)"],
    limits: [
      "세로로 긴 이미지는 Annotation 좌표의 Y가 1.0을 넘어, 그리드 인덱스를 clamping해야 합니다.",
      "메모리 캐시에 이미 있을 때는 차이가 없습니다.",
      "기존 슬라이드 878개는 분할 파일로 다시 변환해야 했습니다.",
    ],
    stack: ["Python", "FastAPI", "orjson", "shapely"],
  },
  {
    slug: "tile-serving",
    index: "04",
    title: "동적 타일 서빙",
    summary: "원본 WSI에서 요청 시점에 타일을 잘라 보내는 경로. 조치를 하나씩 넣을 때마다 뷰어로 다시 재서 개선 원인을 가려냈습니다.",
    problem: [
      "줌 · 이동 한 번에 타일 요청이 최대 1,000개 가까이 몰려도 순서와 취소 없이 모두 디코딩해, 실패 175건이 났습니다.",
      "1024 크기 타일이라 한 장의 디코딩 · 전송 비용이 컸습니다.",
      "Philips SDK를 JNI로 부르다 네이티브에서 죽으면 같은 프로세스인 IMS(JVM) 전체가 내려간 적이 있었습니다.",
    ],
    decisions: [
      { decision: "요청 스케줄링 · stale 취소", risk: "화면을 벗어난 요청까지 끝까지 디코딩하면 지금 화면 타일이 밀립니다. 같은 타일 요청은 하나로 합칩니다." },
      { decision: "256 PNG 타일, 프록시 없이 IMS에 직접 요청", risk: "타일 한 장의 디코딩 · 전송 비용을 줄였습니다." },
      { decision: "SDK 호출을 Rust 워커(별도 프로세스)로 격리", risk: "SDK가 죽어도 워커만 다시 띄웁니다. 10초 마감을 넘기면 워커만 종료하고 다음 요청에서 다시 띄웁니다." },
    ],
    results: [
      "단계별 p95 (뷰어 측정): 1008ms → 310ms (스케줄링 · stale 취소) → 99ms (256 PNG · 뷰어 캐시) → 97ms (Rust 워커 전환)",
      "실패 건수는 스케줄링 단계에서 175건 → 0건",
      "속도를 만든 건 스케줄링과 256 타일입니다. Rust 전환 자체는 99 → 97ms로 거의 차이가 없고, 목적은 속도가 아니라 장애 격리입니다.",
    ],
    limits: ["오래 이동 · 줌하면 p95 143ms, 최대 1.7초 spike가 남습니다. 구간별 시간 계측(Server-Timing)이 다음 과제입니다."],
    stack: ["Java (IMS)", "Rust", "Philips SDK", "WebGL 뷰어"],
  },
];

export function getCase(slug: string): CaseStudy | undefined {
  return cases.find((c) => c.slug === (slug as CaseSlug));
}
