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
          약 2GB 정도의 대용량 이미지를 다루는 프로젝트에서 비동기 큐 및 비동기
          스레드 방식 도입 및 웹소켓을 통해{" "}
          <strong className="text-blue-400 font-bold">
            타임아웃 데이터 0건, 데이터 안정성 확보
          </strong>
          하였습니다.
        </p>
        <p>
          <strong className="text-blue-400 font-bold">
            Git Action, AWS ECS, ECR 파이프라인 구축을 통한 자동화 배포 환경
          </strong>
          을 구축한 경험이 있습니다.
        </p>
        <p>
          클라우드 환경에서 배포 이외에도 병원과 같은{" "}
          <strong className="text-blue-400 font-bold">
            On-Premise 환경에서 서비스를 구축 한 경험이 있습니다.
          </strong>
        </p>
      </div>
    </div>
  );
};

export default Introduce;
