import React from "react";
import Contact from "./Contact";
import TechStack from "./TechStack";
import Introduce from "./Introduce";
import ProfileSection from "./ProfileSection";

const AboutMe = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#232323] via-[#2a2a2a] to-[#1a1a1a] flex flex-col justify-center items-center p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-start lg:items-center">
        {/* 왼쪽: 프로필 이미지 섹션 */}
        <div className="order-1">
          <ProfileSection />
        </div>

        {/* 오른쪽: 소개 내용 */}
        <div className="space-y-6 sm:space-y-8 order-1 lg:order-2">
          <Introduce />
          {/* 기술 스택 */}
          <TechStack />
          <Contact />
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
