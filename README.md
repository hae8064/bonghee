# bonghee

백엔드 / 클라우드 엔지니어 이봉희의 포트폴리오 사이트 · **https://bonghee.vercel.app**

- three.js로 그린 서비스 아키텍처 첫 화면
- 설계 사례 4개를 anime.js 요청 흐름도로 설명: Qanti 배포 구조, 병원 미들웨어 SSO, Annotation 결과 Grid-Split, 동적 타일 서빙

**Stack** Next.js 15 · React 19 · TypeScript · Tailwind CSS 4 · three.js · anime.js · Vitest · Playwright

## 실행

```bash
pnpm install
pnpm dev     # http://localhost:3000
pnpm test
```

문구와 수치는 `content/`에만 있습니다. develop에 머지하면 프리뷰, main에 머지하면 bonghee.vercel.app에 배포됩니다.
