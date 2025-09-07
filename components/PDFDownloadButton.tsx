"use client";

import React, { useState } from "react";

const PDFDownloadButton = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPDF = () => {
    setIsGenerating(true);

    try {
      // PDF 전용 페이지로 이동
      const pdfUrl = `${window.location.origin}/pdf`;
      window.open(pdfUrl, "_blank");
    } catch (error) {
      console.error("PDF 다운로드 오류:", error);
      alert("PDF 다운로드에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setTimeout(() => {
        setIsGenerating(false);
      }, 2000);
    }
  };

  return (
    <button
      onClick={handleDownloadPDF}
      disabled={isGenerating}
      className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300 z-50 flex items-center gap-2"
    >
      {isGenerating ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          PDF 생성 중...
        </>
      ) : (
        <>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          PDF 다운로드
        </>
      )}
    </button>
  );
};

export default PDFDownloadButton;
