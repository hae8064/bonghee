"use client";

import { generatePPT } from "@/utils/generatePPT";
import { useState } from "react";

export default function PPTPage() {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGeneratePPT = async () => {
    setIsGenerating(true);
    try {
      await generatePPT();
      alert("PowerPoint 파일이 생성되었습니다!");
    } catch (error) {
      console.error("PPT 생성 오류:", error);
      alert("PPT 생성 중 오류가 발생했습니다.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#232323] via-[#2a2a2a] to-[#1a1a1a] flex flex-col justify-center items-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <h1 className="text-4xl font-bold text-white mb-4">
          PowerPoint 생성
        </h1>
        <p className="text-white/80 text-lg mb-8">
          포트폴리오를 PowerPoint 파일로 변환합니다.
        </p>
        <button
          onClick={handleGeneratePPT}
          disabled={isGenerating}
          className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? "생성 중..." : "PowerPoint 파일 생성"}
        </button>
        <p className="text-white/60 text-sm mt-4">
          생성된 파일은 다운로드 폴더에 저장됩니다.
        </p>
      </div>
    </div>
  );
}

