# bonghee 포트폴리오 사이트 개편 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 기존 풀스택 포트폴리오 사이트를 "백엔드 / 클라우드 엔지니어" 사이트로 다시 만든다 — three.js 3D 히어로 + anime.js 요청 흐름 다이어그램 + 설계 사례 4개.

**Architecture:** 내용은 전부 `content/` 타입 데이터 파일에 두고, 화면은 섹션 컴포넌트가 읽어 그린다. 다이어그램은 데이터(레인·단계)를 받아 SVG를 그리는 공용 `TraceDiagram` 위에 사례별 컴포넌트를 얹는다. 효과는 클라이언트 컴포넌트에서만, `prefers-reduced-motion`이면 완성된 정지 화면.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Tailwind 4, three + @react-three/fiber, animejs 3.2.2, vitest + @testing-library/react (jsdom), Playwright(검증 스크립트), pnpm.

**Spec:** `docs/superpowers/specs/2026-11-05-portfolio-redesign-design.md` — 내용·문구는 전부 여기와 `~/leo/포폴_2026/이봉희 포트폴리오.pptx`에서 가져온다. 지어내지 않는다.

## Global Constraints

- 브랜치 `feat/redesign-2026` (develop에서 분기). develop 머지 = 즉시 prod 배포이므로 머지는 사용자 승인 후에만.
- 병원 실명 금지 (서울대, 세브란스, 울산대, 강남, 원주, 분당, snubh 등). "병원 미들웨어", "상급종합병원"만.
- 전화번호 금지. 연락처는 `hae8064@gmail.com`, `github.com/hae8064`.
- 직함 "백엔드, 인프라"만. "팀장" 문자열 금지.
- PDF 받기 버튼 없음. 상단 바: About · Cases · Projects · Skills · GitHub.
- 동적 타일: 역할 표기 없음, "단독/혼자" 금지, "Rust로 빨라졌다" 류 금지. 반드시 "속도를 만든 건 스케줄링과 256 타일, Rust 전환은 99→97ms로 거의 차이 없음 — 목적은 장애 격리" 의미 문장 포함.
- Sectra 1.9GB 관련 속도 수치 금지(파일 크기 범위로만).
- 숫자 띠 값(정확히): 1.78s → 0.26s / 25 → 187 req/s / 172MB JSON 1.6s → 0.6s / 세포 19만 개 첫 렌더 5s → 1s 이내 / 타일 p95 1008ms → 97ms, 실패 175 → 0건.
- 색: 배경 짙은 네이비(#0B1222 계열), 강조 블루(#3B82F6 / #7FB0FF), 다이어그램 초록(#34D399 / #A7F3D0), 실패 빨강(#F87171). 서체 Noto Sans KR + JetBrains Mono (`next/font/google`).
- 모바일 320px까지 가로 스크롤 없음. three.js는 `next/dynamic` ssr:false, 화면 밖이면 렌더 루프 정지.

## Review Focus

1. 브라우저에 WebGL이 없거나 컨텍스트 생성 실패 → 히어로가 빈 화면이 아니라 정적 그라디언트 + 텍스트로 보여야 함 (Task 3 테스트).
2. `prefers-reduced-motion: reduce` → 다이어그램이 모든 단계가 그려진 완성 상태, 숫자는 최종값 (Task 4·6 테스트).
3. 없는 사례 주소 `/cases/foo` → 404 (Task 7 테스트).
4. 320/360px 폭에서 다이어그램·표·숫자 띠가 가로 스크롤을 만들지 않음 (Task 8 스윕).
5. Cloud/폐쇄망 토글을 키보드(Tab+Enter/Space)로 조작 가능하고 `aria-pressed`가 바뀜 (Task 5 테스트).

---

### Task 1: 브랜치·의존성·테스트 도구·테마 바탕

**Files:**
- Modify: `package.json`, `.github/workflows/deploy.yml`, `app/layout.tsx`, `app/globals.css`, `.gitignore`(`.superpowers/` 이미 추가됨)
- Create: `vitest.config.ts`, `vitest.setup.ts`, `tests/smoke.test.ts`

**Interfaces:**
- Produces: `pnpm test` (vitest run), CSS 변수 `--bg --bg-2 --ink --mute --line --accent --accent-2 --trace --trace-2 --fail`, Tailwind 폰트 `font-sans`(Noto Sans KR) `font-mono`(JetBrains Mono).

- [ ] **Step 1:** `git checkout develop && git pull && git checkout -b feat/redesign-2026`
- [ ] **Step 2:** `pnpm add three @react-three/fiber animejs@3.2.2 && pnpm add -D @types/three @types/animejs vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @playwright/test` ; `pnpm remove framer-motion pptxgenjs` 는 Task 6에서 옛 코드 삭제와 함께.
- [ ] **Step 3:** `tests/smoke.test.ts` — `expect(1).toBe(1)`; `package.json` scripts에 `"test": "vitest run"`. Run `pnpm test` → PASS.
- [ ] **Step 4:** `layout.tsx`: Geist 대신 Noto_Sans_KR(400/500/700/900) + JetBrains_Mono(400/600), `<html lang="ko">`, metadata title `"이봉희 | 백엔드 / 클라우드 엔지니어"`, description은 pptx 1쪽 소개문. `globals.css`: 위 CSS 변수(라이트/다크 분기 없음, 단일 다크), body 배경 `--bg`.
- [ ] **Step 5:** CI: node-version `"20"`, pnpm `version: 10`, 빌드 전 `pnpm test`.
- [ ] **Step 6:** `pnpm build` 성공 확인 후 commit `chore: set up redesign tooling and dark theme base`

### Task 2: 내용 데이터 (content/)

**Files:**
- Create: `content/types.ts`, `content/profile.ts`, `content/metrics.ts`, `content/experience.ts`, `content/cases.ts`, `content/projects.ts`, `content/skills.ts`, `content/education.ts`, `tests/content.test.ts`
- Delete(Task 6에서): `common/*`, `types/*`

**Interfaces (content/types.ts):**
```ts
export type Metric = { label: string; before: string; after: string; to: number; decimals?: number; unit: string; note: string };
export type ExperienceGroup = { title: string; bullets: string[] };
export type Experience = { company: string; role: string; period: string; groups: ExperienceGroup[] };
export type CaseSlug = "qanti" | "sso" | "sectra-grid" | "tile-serving";
export type DecisionRow = { decision: string; risk: string };
export type CaseStudy = { slug: CaseSlug; index: string; title: string; summary: string; period?: string; scope?: string;
  problem: string[]; decisions: DecisionRow[]; results: string[]; limits: string[]; stack: string[] };
export type Project = { name: string; period: string; role: string; summary: string; points: string[]; stack: string[]; links: { label: string; href: string }[] };
export type SkillRow = { area: string; items: string; how: string };
export type EduRow = { kind: string; name: string; detail: string; period: string };
```
- Produces: `profile`, `metrics: Metric[]`(6개, Global Constraints 값), `experience: Experience`, `cases: CaseStudy[]`(순서 qanti, sso, sectra-grid, tile-serving), `getCase(slug: string): CaseStudy | undefined`, `projects: Project[]`(워크유, 공감블라인드, dev-reader), `skills: SkillRow[]`(4행), `education: EduRow[]`(4행).
- 문구 출처: spec 4절 각 사례 + pptx 2·3·4·12·13·14·15쪽. 경력 role = `"백엔드, 인프라"`. Qanti scope = `"백엔드 설계, 병원 연동 API, 인증 설계, 인프라 (3인 팀)"`.

- [ ] **Step 1: 실패하는 테스트** `tests/content.test.ts`:
```ts
const all = JSON.stringify({ profile, metrics, experience, cases, projects, skills, education });
it("no hospital real names", () => { for (const w of ["서울대","세브란스","울산대","강남","원주","분당","snubh","SNUH"]) expect(all).not.toContain(w); });
it("no phone number", () => expect(all).not.toMatch(/01\d[.\- ]?\d{3,4}[.\- ]?\d{4}/));
it("no team-lead title", () => expect(all).not.toContain("팀장"));
it("no sole-authorship claim", () => { expect(all).not.toContain("단독 구현"); expect(all).not.toContain("혼자"); });
it("cases in order", () => expect(cases.map(c => c.slug)).toEqual(["qanti","sso","sectra-grid","tile-serving"]));
it("tile case states Rust is isolation not speed", () => { const t = JSON.stringify(getCase("tile-serving")); expect(t).toContain("99"); expect(t).toContain("97"); expect(t).toContain("격리"); });
it("sectra has measured numbers only", () => { const s = JSON.stringify(getCase("sectra-grid")); expect(s).toContain("1,618"); expect(s).toContain("607"); expect(s).not.toMatch(/1\.9GB[^"]*(초|ms)/); });
it("metrics exact", () => expect(metrics.map(m => [m.before, m.after])).toEqual([["1.78s","0.26s"],["25","187 req/s"],["1.6s","0.6s"],["5s","1s 이내"],["1008ms","97ms"],["175건","0건"]]));
it("getCase unknown → undefined", () => expect(getCase("foo")).toBeUndefined());
```
(워크유 역할 "외주 단독"은 pptx 원문이라 허용 — 위 금지어는 "단독 구현"/"혼자"로 한정.)
- [ ] **Step 2:** `pnpm test` → FAIL (모듈 없음)
- [ ] **Step 3:** 데이터 파일 작성
- [ ] **Step 4:** `pnpm test` → PASS
- [ ] **Step 5:** commit `feat: add typed portfolio content from 2026 deck`

### Task 3: 3D 히어로

**Files:**
- Create: `components/hero/Hero.tsx`(server-safe 래퍼, 텍스트), `components/hero/ArchitectureScene.tsx`('use client', r3f), `components/hero/scene-graph.ts`, `lib/useReducedMotion.ts`, `lib/webgl.ts`, `tests/hero.test.tsx`

**Interfaces:**
- Produces: `useReducedMotion(): boolean`, `canUseWebGL(): boolean`, `<Hero />`, `sceneNodes: {id:string; label:string; pos:[number,number,number]}[]`, `sceneEdges: [string,string][]`.
- 노드: Browser, Nginx, Analysis, IMS, MongoDB, AI Worker, S3, Queue (시안 hero-directions.html A 참고, 그 코드 이식 가능).
- 동작: 간선 따라 빛 입자, 마우스 패럴랙스, `IntersectionObserver`로 화면 밖이면 `frameloop="never"`, 폭 <768px이면 입자 수 절반·노드 라벨 숨김, reduced-motion이면 회전·입자 없이 정지 1프레임.

- [ ] **Step 1: 실패하는 테스트**: `canUseWebGL`을 false로 mock → `render(<Hero/>)` 시 `screen.getByText("이봉희")`, `getByText(/BACKEND · CLOUD ENGINEER/)` 존재, `container.querySelector("canvas")` 없음, `data-hero-fallback` 요소 존재. 그리고 `sceneEdges`의 모든 id가 `sceneNodes`에 있음.
- [ ] **Step 2:** `pnpm test tests/hero.test.tsx` → FAIL
- [ ] **Step 3:** 구현 (Scene은 `next/dynamic(..., { ssr:false })`)
- [ ] **Step 4:** PASS 확인, commit `feat: add three.js architecture hero with static fallback`

### Task 4: 공용 다이어그램 엔진 TraceDiagram

**Files:**
- Create: `components/diagram/TraceDiagram.tsx`, `components/diagram/types.ts`, `lib/useInView.ts`, `tests/trace-diagram.test.tsx`

**Interfaces:**
```ts
export type Lane = { id: string; label: string };
export type TraceStep = { from: string; to: string; label: string; tone?: "ok" | "fail" | "muted" };
export type TraceProps = { lanes: Lane[]; steps: TraceStep[]; mode: "loop" | "scroll" | "once"; ariaLabel: string; compactBelow?: number };
export function TraceDiagram(p: TraceProps): JSX.Element;
export function useInView<T extends Element>(opts?: IntersectionObserverInit): [React.RefObject<T>, boolean];
```
- 시안 hero-directions.html C의 SVG·anime.js 로직을 이식. 단계마다 선 그리기 → 패킷 이동. `loop`는 끝나면 1.8s 쉬고 반복, `scroll`은 섹션 스크롤 진행률로 timeline `seek`, `once`는 화면 진입 시 1회. 폭이 `compactBelow`(기본 640) 미만이면 레인을 세로로 배치. reduced-motion이면 전 단계 opacity 1, 패킷 숨김. 모든 라벨은 SVG `<text>`로 DOM에 존재, `<svg role="img" aria-label>`.

- [ ] **Step 1: 실패하는 테스트**: lanes 4개·steps 8개 렌더 → 각 step label 텍스트가 DOM에 있음; reduced-motion mock(matchMedia true) 시 모든 `[data-step]`의 `opacity`가 `"1"`; `tone:"fail"` 단계의 선 stroke가 `var(--fail)`.
- [ ] **Step 2:** FAIL 확인 → **Step 3:** 구현 → **Step 4:** PASS → **Step 5:** commit `feat: add animated trace diagram engine`

### Task 5: 사례별 다이어그램 4개

**Files:**
- Create: `components/cases/SsoSequence.tsx`, `components/cases/QantiPipeline.tsx`, `components/cases/GridSplit.tsx`, `components/cases/TileServing.tsx`, `components/cases/diagrams.ts`(slug → 컴포넌트 매핑), `tests/case-diagrams.test.tsx`

**Interfaces:**
- Consumes: `TraceDiagram`, `useInView`, `useReducedMotion`, `getCase`.
- Produces: `caseDiagram(slug: CaseSlug, variant: "preview" | "full"): JSX.Element`.
- SSO: 레인 병원 미들웨어/브라우저/분석 서버/IMS(인증), spec의 ①~⑧ 그대로 + full에서 실패 분기(만료·위변조·재사용·slideId 불일치 → 안내 페이지) `tone:"fail"`.
- Qanti: 스캐너→수집→API→큐→추론→저장→뷰어 7노드 파이프라인(TraceDiagram 아님, 자체 SVG + anime.js 패킷). `[ Cloud | 폐쇄망 ]` 버튼 2개(`aria-pressed`), 전환 시 노드 부제 모핑: 큐 `AWS SQS`↔`RabbitMQ`, 이미지 전달 `ECR pull`↔`tar 암호화 반입`, 실행 `ECS / EKS`↔`GPU 서버 (RTX A5000, 4080S)`, 관측 `CloudWatch`↔`Prometheus · Grafana · Loki`. 폐쇄망 선택 시 하단 한 줄: "상급종합병원 중심 10곳 이상 서버실 직접 구축·운영".
- GridSplit: 왼쪽 "172MB~1.9GB 한 덩어리" 블록, 오른쪽 10×10 격자 + ROI 사각형, 걸치는 칸만 점등 후 패킷. 아래 캡션 "172MB · 243,717 cells: 1,618ms → 607ms".
- TileServing: 이전/이후 구조 나란히(이전: 요청 다수 중 일부 `fail`, 이후: 화면 밖 요청 회색 취소·같은 타일 합류) + p95 막대 4개(1008, 310, 99, 97ms)가 진입 시 줄어듦.

- [ ] **Step 1: 실패하는 테스트**: QantiPipeline 렌더 → "AWS SQS" 보임, "폐쇄망" 버튼 `fireEvent.click` → "RabbitMQ" 보이고 "AWS SQS" 없음, 해당 버튼 `aria-pressed="true"`, "10곳" 문구 보임; 버튼이 `<button>`(키보드 조작 기본). SsoSequence full → "① 티켓 발급"…"⑧ 세션 토큰" 8개 텍스트. TileServing → "1008", "310", "99", "97" 텍스트. GridSplit → 셀 100개(`[data-cell]`).
- [ ] **Step 2:** FAIL → **Step 3:** 구현 → **Step 4:** PASS → **Step 5:** commit `feat: add case diagrams for qanti, sso, sectra grid, tile serving`

### Task 6: 메인 페이지 섹션 + 옛 코드 제거

**Files:**
- Create: `components/layout/Nav.tsx`, `components/layout/Footer.tsx`, `components/sections/About.tsx`, `components/sections/MetricsStrip.tsx`, `components/sections/Experience.tsx`, `components/sections/Cases.tsx`, `components/sections/Projects.tsx`, `components/sections/Skills.tsx`, `components/sections/Education.tsx`, `tests/home.test.tsx`
- Modify: `app/page.tsx`
- Delete: `components/Home.tsx`, `Main.tsx`, `Nav.tsx`, `Footer.tsx`, `PDFView.tsx`, `components/aboutMe/*`, `components/experience/*`, `components/projects/*`, `common/*`, `types/*`, `utils/generatePPT.ts`, `app/pdf/`, `app/ppt/`; `pnpm remove framer-motion pptxgenjs`
- 이미지: 쓰지 않는 `public/images/*` 중 `bongheePortPolio.png`, `projectDetails/usedCar.png`, `projectDetails/nest-news-api.png`, `pymongo-to-motor.png`, `git-branch.png`, `award.jpg` 삭제 전 grep으로 참조 0 확인.

**Interfaces:**
- Consumes: content 전부, `Hero`, `caseDiagram(slug,"preview")`, `useInView`, `useReducedMotion`.
- 섹션 id: `about`, `cases`, `projects`, `skills` (Nav 앵커). Nav 링크 정확히 About · Cases · Projects · Skills · GitHub(`https://github.com/hae8064`).
- MetricsStrip: 진입 시 anime.js 카운트업(1.6s, easeOutCubic), reduced-motion이면 최종값.
- Experience: 세로 타임라인 선이 스크롤 따라 그려짐(stroke-dashoffset).
- Cases: 카드 4개, 01 Qanti는 2열 폭으로 크게, 카드 전체가 `/cases/[slug]` 링크.
- Projects: 카드 마우스 3D 기울기(최대 8deg, pointer 없는 기기에선 없음), 링크는 `project.links` 외부 링크(`target="_blank" rel="noopener noreferrer"`), dev-reader는 링크 없음.

- [ ] **Step 1: 실패하는 테스트** `tests/home.test.tsx`: Page 렌더(Hero는 fallback mock) → Nav에 "PDF" 텍스트 없음; 링크 텍스트 About/Cases/Projects/Skills/GitHub; `/cases/qanti`,`/cases/sso`,`/cases/sectra-grid`,`/cases/tile-serving` href 4개; "워크유"·"공감블라인드"·"dev-reader" 보임; reduced-motion에서 "187" 보임.
- [ ] **Step 2:** FAIL → **Step 3:** 구현·삭제 → **Step 4:** `pnpm test && pnpm build` PASS
- [ ] **Step 5:** commit `feat: rebuild home sections and remove legacy portfolio code`

### Task 7: 사례 상세 페이지

**Files:**
- Create: `app/cases/[slug]/page.tsx`, `components/cases/CaseDetail.tsx`, `tests/case-page.test.tsx`

**Interfaces:**
- Consumes: `cases`, `getCase`, `caseDiagram(slug,"full")`.
- `generateStaticParams()` → 4개 slug, `dynamicParams = false`, 없는 slug는 `notFound()`. `generateMetadata` title `"<사례 제목> | 이봉희"`.
- 본문 순서: 제목·요약 → 다이어그램(full, mode scroll) → 문제 → 결정과 막으려던 위험(표) → 결과 → 한계 → 이전/다음 사례 링크 + 홈으로.

- [ ] **Step 1: 실패하는 테스트**: `generateStaticParams()` 결과 4개 slug; `getCase` 기반 렌더에서 sso 페이지에 "티켓 60초 + jti 1회" 행; 이전/다음: qanti의 이전 없음·다음 sso, tile-serving의 다음 없음; 없는 slug에서 `notFound` 호출(next/navigation mock).
- [ ] **Step 2:** FAIL → **Step 3:** 구현 → **Step 4:** PASS → **Step 5:** commit `feat: add case study detail pages`

### Task 8: 브라우저 검증·README·PR

**Files:**
- Create: `scripts/verify-ui.mjs` (Playwright), `README.md` 갱신

- [ ] **Step 1:** `scripts/verify-ui.mjs`: `pnpm build && pnpm start` 상태에서 `/`, `/cases/qanti`, `/cases/sso`, `/cases/sectra-grid`, `/cases/tile-serving`를 폭 320·360·390·768·1280으로 열어 `document.documentElement.scrollWidth <= innerWidth` 확인, 콘솔 error 0건, `/cases/foo` 응답 404, `reducedMotion:"reduce"` 컨텍스트에서 다이어그램 텍스트 보임. 전체 페이지 스크린샷을 `~/leo/스크린샷/bonghee/`에 저장.
- [ ] **Step 2:** `node scripts/verify-ui.mjs` → 전부 PASS. 스크린샷을 직접 열어 눈으로 확인(겹침·잘림·빈 히어로).
- [ ] **Step 3:** README를 새 구조·스택·실행법으로 갱신. commit `docs: update README for redesigned site`
- [ ] **Step 4:** 사용자에게 로컬 화면/스크린샷 보여 주고 승인받은 뒤에만 `git push -u origin feat/redesign-2026` + develop 대상 PR (push 전 `gh auth status`로 hae8064 계정인지 확인 — 키체인에 회사 토큰이 섞여 있음).
