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
          이봉희입니다. 현재{" "}
          <strong className="text-blue-400 font-bold">
            AIVIS 솔루션 서비스팀 팀장
          </strong>
          으로서 팀을 이끌며 의료 AI 솔루션을 개발하고 있습니다.
        </p>
        <p>
          모노레포 환경 도입 및 디자인 시스템, Storybook 도입을 통한 디자인팀과
          협업 개선 및 개발 생산성 향상 경험이 있습니다.
        </p>
        <p>
          약 2GB 정도의 대용량 이미지를 다루는 프로젝트에서 비동기 큐 및 비동기
          드라이버 도입으로{" "}
          <strong className="text-blue-400 font-bold">
            API 응답 시간 2초 → 0.25초 (6.7배 개선), 타임아웃 0건 달성
          </strong>
          하였습니다.
        </p>
        <p>
          <strong className="text-blue-400 font-bold">
            Git Action + AWS ECS 자동화 배포 파이프라인 구축
          </strong>
          으로 수동 배포 20~30분을 5분 이내로 단축한 경험이 있습니다.
        </p>
        <p>
          클라우드 환경에서의 배포 이외에도 병원과 같은{" "}
          <strong className="text-blue-400 font-bold">
            On-Premise 서버실 구축부터 LIS·EMR 시스템 연동
          </strong>
          까지, 인터페이스 문서 작성 및 개발을 직접 수행한 경험이 있습니다.
        </p>
      </div>
    </div>
  );
};

export default Introduce;
