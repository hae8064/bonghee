import type { Metric } from "./types";

export const metrics: Metric[] = [
  { label: "cell-group 조회 평균 응답", before: "1.78s", after: "0.26s", to: 0.26, decimals: 2, unit: "s", note: "PyMongo → Motor, Aggregation · Compound Index 재설계" },
  { label: "처리량 (autocannon, 동시 50)", before: "25", after: "187 req/s", to: 187, unit: " req/s", note: "비동기 드라이버 전환 후 타임아웃 0건" },
  { label: "Annotation 결과 JSON 첫 렌더 (172MB)", before: "1.6s", after: "0.6s", to: 0.6, decimals: 1, unit: "s", note: "10×10 좌표 그리드로 분할해 필요 영역만 로드" },
  { label: "뷰어 첫 렌더 (세포 19만 개)", before: "5s", after: "1s 이내", to: 1, unit: "s 이내", note: "WebGL 벡터 레이어와 Worker 안의 R-tree 공간 인덱스" },
  { label: "동적 타일 서빙 p95", before: "1008ms", after: "97ms", to: 97, unit: "ms", note: "요청 스케줄링 · stale 취소, 타일 1024에서 256으로" },
  { label: "타일 서빙 실패 건수", before: "175건", after: "0건", to: 0, unit: "건", note: "요청 스케줄링과 stale 요청 취소" },
];
