# bonghee — 이봉희 포트폴리오

백엔드 / 클라우드 엔지니어 이봉희의 포트폴리오 사이트입니다. 배포: https://bonghee.vercel.app

- 첫 화면: three.js(@react-three/fiber)로 그린 서비스 아키텍처, 요청이 노드 사이를 흐름
- 설계 사례 4개(`/cases/*`): Qanti 배포 구조(Cloud/폐쇄망 토글), 병원 미들웨어 SSO, Sectra Grid-Split, 동적 타일 서빙. 흐름도는 anime.js + SVG
- `prefers-reduced-motion`이면 애니메이션 없이 완성된 그림을 보여 줍니다

## 구조

```
content/            # 모든 문구와 수치 (여기만 고치면 화면이 바뀜)
components/hero     # 3D 히어로
components/diagram  # 공용 흐름도 엔진 TraceDiagram
components/cases    # 사례별 다이어그램, 상세 페이지
components/sections # 메인 섹션
app/cases/[slug]    # 사례 상세 (정적 생성)
```

## 실행

```bash
pnpm install
pnpm dev            # http://localhost:3000
pnpm test           # vitest: 내용 규칙(병원 실명·전화번호 금지 등) + 컴포넌트
pnpm build && pnpm start
node scripts/verify-ui.mjs   # Playwright: 폭 320~1280 가로 스크롤·콘솔 에러·404 점검, 스크린샷 저장
```

## 배포

`develop`으로 PR이 머지되면 GitHub Actions가 테스트·빌드 후 Vercel 프로덕션에 배포합니다.

## 스택

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · three.js · anime.js · Vitest · Playwright
