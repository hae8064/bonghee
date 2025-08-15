import Image from "next/image";
import React from "react";

const ProfileSection = () => {
  return (
    <div className="flex flex-col items-center lg:items-start space-y-6">
      {/* 프로필 이미지 */}
      <div className="relative group">
        {/* 배경 그라데이션 원 */}
        <div className="absolute inset-0 w-72 h-72 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 blur-xl animate-pulse"></div>

        <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl transition-all duration-300 group-hover:border-white/40 group-hover:shadow-2xl group-hover:scale-105">
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
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500/30 rounded-full blur-sm animate-pulse"></div>
        <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-purple-500/30 rounded-full blur-sm animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 -left-4 w-4 h-4 bg-cyan-500/30 rounded-full blur-sm animate-pulse delay-500"></div>
      </div>

      {/* 이름과 직함 */}
      <div className="text-center lg:text-left">
        <h3 className="text-3xl font-bold text-white mb-2 hover:text-blue-400 transition-colors">
          이봉희
        </h3>
        <p className="text-blue-400 text-lg mb-2">3년차 풀스택 개발자</p>

        {/* 상태 표시 */}
        <div className="flex items-center gap-2 mt-3">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-green-400 text-xs">Available for work</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
