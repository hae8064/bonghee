"use client";
import React, { useState, useEffect } from "react";

const Main = () => {
  const [typingText, setTypingText] = useState("");
  const [showMainContent, setShowMainContent] = useState(false);
  const [showGreeting, setShowGreeting] = useState(true);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const greeting = "안녕하세요:)";

  useEffect(() => {
    // 타이핑 완료 전까지 스크롤 막기
    const preventScroll = (e: Event) => {
      e.preventDefault();
    };

    if (!isTypingComplete) {
      document.body.style.overflow = "hidden";
      window.addEventListener("scroll", preventScroll, { passive: false });
      window.addEventListener("wheel", preventScroll, { passive: false });
      window.addEventListener("touchmove", preventScroll, { passive: false });
    }

    // 타이핑 애니메이션
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < greeting.length) {
        setTypingText(greeting.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
        // 타이핑 완료 후 메인 콘텐츠 표시
        setTimeout(() => {
          setShowGreeting(false);
          setShowMainContent(true);
          setIsTypingComplete(true);

          // 스크롤 다시 활성화
          document.body.style.overflow = "auto";
          window.removeEventListener("scroll", preventScroll);
          window.removeEventListener("wheel", preventScroll);
          window.removeEventListener("touchmove", preventScroll);
        }, 1000);
      }
    }, 300);

    return () => {
      clearInterval(typingInterval);
      // 컴포넌트 언마운트 시 스크롤 복원
      document.body.style.overflow = "auto";
      window.removeEventListener("scroll", preventScroll);
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
    };
  }, []);

  return (
    <main className="relative w-full h-full flex flex-col justify-center items-center gap-4 overflow-hidden">
      {/* 배경 그라데이션 */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#232323] via-[#2a2a2a] to-[#1a1a1a]"></div>

      {/* 추가 배경 효과들 */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#333]/20 to-transparent"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)]"></div>
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(120,119,198,0.2),transparent_50%)]"></div>

      {/* 애니메이션 원들 */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-cyan-500/10 rounded-full blur-lg animate-pulse delay-500"></div>

      {/* 타이핑 애니메이션 */}
      <div
        className={`text-white text-5xl font-bold mb-8 transition-all duration-500 z-10 ${
          showGreeting ? "opacity-100" : "hidden"
        }`}
      >
        {typingText}
        <span className="animate-pulse">|</span>
      </div>

      {/* 메인 콘텐츠 - 아래에서 위로 슬라이드 */}
      <div
        className={`transition-all duration-1000 ease-out z-10 ${
          showMainContent
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="text-white text-5xl font-bold text-center drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
          풀스택 개발자
          <strong className="font-extrabold text-6xl drop-shadow-[0_6px_12px_rgba(0,0,0,0.9)]">
            {" "}
            이봉희
          </strong>
          입니다.
        </h2>
        <p className="text-white text-2xl text-center mt-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
          더 나은 사용자 경험을 만드는 개발자
        </p>
      </div>
    </main>
  );
};

export default Main;
