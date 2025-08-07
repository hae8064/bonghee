import React from "react";
import Contact from "./Contact";
import TechStack from "./TechStack";
import Introduce from "./Introduce";
import ProfileSection from "./ProfileSection";

const AboutMe = () => {
  return (
    <div className="w-full h-full bg-gradient-to-br from-[#232323] via-[#2a2a2a] to-[#1a1a1a] flex flex-col justify-center items-center p-8">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* 왼쪽: 프로필 이미지 섹션 */}
        <ProfileSection />

        {/* 오른쪽: 소개 내용 */}
        <div className="space-y-8">
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
