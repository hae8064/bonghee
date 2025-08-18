import Image from "next/image";
import React from "react";

const ProfileSection = () => {
  return (
    <div className="flex flex-col items-center lg:items-start space-y-4 sm:space-y-6 order-last lg:order-first">
      {/* 프로필 이미지 */}
      <div className="relative group">
        {/* 배경 그라데이션 원 */}
        <div className="absolute inset-0 w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 blur-xl animate-pulse"></div>

        <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl transition-all duration-300 group-hover:border-white/40 group-hover:shadow-2xl group-hover:scale-105">
          <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
            <Image
              src="/images/bonghee.jpg"
              alt="profile"
              width={256}
              height={256}
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        </div>

        {/* 장식용 원들 */}
        <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-blue-500/30 rounded-full blur-sm animate-pulse"></div>
        <div className="absolute -bottom-1 sm:-bottom-2 -left-1 sm:-left-2 w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 bg-purple-500/30 rounded-full blur-sm animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 -left-2 sm:-left-3 md:-left-4 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-cyan-500/30 rounded-full blur-sm animate-pulse delay-500"></div>
      </div>

      {/* 이름과 직함 */}
      <div className="text-center lg:text-left">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 hover:text-blue-400 transition-colors">
          이봉희
        </h3>
        <p className="text-blue-400 text-sm sm:text-base md:text-lg mb-2">
          3년차 풀스택 개발자
        </p>

        {/* 상태 표시 */}
        <div className="flex items-center justify-center lg:justify-start gap-2 mt-3">
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-green-400 text-xs sm:text-sm">
            Available for work
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
