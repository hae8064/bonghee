import React from "react";

const highlights = [
  { metric: "6.7x", label: "API 성능 개선", detail: "Motor 비동기 드라이버 도입" },
  { metric: "5분", label: "자동화 배포", detail: "수동 30분 → 자동 5분" },
  { metric: "0건", label: "타임아웃 장애", detail: "SQS 큐 기반 안정성 확보" },
  { metric: "2GB+", label: "대용량 처리", detail: "홀슬라이드 이미지 파이프라인" },
];

const Highlights = () => {
  return (
    <div>
      <h4 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">
        Key Achievements
      </h4>
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {highlights.map((item) => (
          <div
            key={item.label}
            className="bg-white/5 rounded-lg p-3 sm:p-4 border border-white/10 hover:border-white/20 transition-colors"
          >
            <p className="text-xl sm:text-2xl font-bold text-blue-400 mb-1">
              {item.metric}
            </p>
            <p className="text-white text-xs sm:text-sm font-medium">
              {item.label}
            </p>
            <p className="text-white/50 text-xs mt-1">{item.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Highlights;
