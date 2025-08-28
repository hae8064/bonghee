import React from "react";

const Introduce = () => {
  return (
    <div>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
        About Me
      </h2>
      <div className="space-y-3 sm:space-y-4 text-white/90 text-sm sm:text-base md:text-lg leading-relaxed break-keep">
        <p>
          안녕하세요! 프론트엔드부터 백엔드, DevOps까지 아우르는 풀스택 개발자
          이봉희입니다.
        </p>
        <p>
          대용량 의료 데이터를 다루는 프로젝트에서{" "}
          <strong className="text-blue-400 font-bold">
            API 성능을 6.7배 개선
          </strong>
          하고,{" "}
          <strong className="text-blue-400 font-bold">
            무중단 자동 배포 환경
          </strong>
          을 구축한 경험이 있습니다.
        </p>
        <p>
          단순히 기능 구현에 그치지 않고,{" "}
          <strong className="text-blue-400 font-bold">
            성능 최적화와 협업 효율화
          </strong>
          를 통해 팀 전체 생산성을 높이는 것을 목표로 합니다.
        </p>
        <p>
          새로운 기술을 빠르게 학습하고 프로젝트에 적용하여, 사용자에게 더 나은
          경험을 제공하는 개발자가 되겠습니다.
        </p>
      </div>
    </div>
  );
};

export default Introduce;
