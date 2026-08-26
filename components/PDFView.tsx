"use client";
import React from "react";
import AboutMe from "./aboutMe/AboutMe";
import Projects from "./projects/Projects";
import Experience from "./experience/Experience";

const PDFView = () => {
  return (
    <div className="w-full bg-white print:bg-white">
      {/* PDF 전용 스타일 - 애니메이션 제거 및 인쇄 최적화 */}
      <style jsx global>{`
        @media print {
          * {
            animation: none !important;
            transition: none !important;
            transform: none !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          body {
            background: white !important;
          }

          /* 페이지 나누기 */
          .page-break {
            page-break-after: always;
          }

          /* 불필요한 요소 숨기기 */
          button[onclick],
          a[href^="http"]:not([href*="mailto"]) {
            display: none !important;
          }
        }

        /* PDF 모드에서는 항상 애니메이션 비활성화 */
        .pdf-mode * {
          animation: none !important;
          transition: none !important;
        }
      `}</style>

      <div className="flex flex-col w-full pdf-mode">
        {/* AboutMe 섹션 */}
        <div className="w-full">
          <AboutMe isPDF={true} />
        </div>

        {/* Experience 섹션 */}
        <div className="w-full">
          <Experience isPDF={true} />
        </div>

        {/* Projects 섹션 */}
        <div className="w-full">
          <Projects isPDF={true} />
        </div>
      </div>
    </div>
  );
};

export default PDFView;
