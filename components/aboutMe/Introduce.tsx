import React from "react";

const Introduce = () => {
  return (
    <div>
      <h2 className="text-4xl font-bold text-white mb-6 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
        About Me
      </h2>
      <div className="space-y-4 text-white/90 text-lg leading-relaxed">
        <p>안녕하세요! 풀스택 개발자 이봉희입니다.</p>
        <p>
          사용자 중심의 웹 애플리케이션을 개발하며, 새로운 기술을 배우는 것을
          즐기는 개발자입니다.
        </p>
        <p>
          깔끔하고 효율적인 코드 작성을 지향하며, 더 나은 사용자 경험을 만드는
          것을 목표로 합니다.
        </p>
      </div>
    </div>
  );
};

export default Introduce;
