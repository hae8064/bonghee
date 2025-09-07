"use client";

import React from "react";
import Main from "./Main";
import AboutMe from "./aboutMe/AboutMe";
import Projects from "./projects/Projects";
import Experience from "./experience/Experience";
import PDFDownloadButton from "./PDFDownloadButton";
const Home = () => {
  return (
    <div className="flex flex-col w-full h-screen relative">
      {/* Main 컴포넌트 - 고정 배경으로 전체 화면 덮기 */}
      <div className="fixed top-0 w-full h-full">
        <Main />
      </div>

      {/* 스크롤 가능한 콘텐츠 영역 - Main 아래에서 시작 */}
      <div className="relative w-full" style={{ marginTop: "100vh" }}>
        {/* AboutMe 섹션 */}
        <div className="w-full">
          <AboutMe />
        </div>

        {/* Experience 섹션 */}
        <div className="w-full">
          <Experience />
        </div>

        {/* Projects 섹션 */}
        <div className="w-full">
          <Projects />
        </div>
      </div>

      {/* PDF 다운로드 버튼 */}
      <PDFDownloadButton />
    </div>
  );
};

export default Home;
