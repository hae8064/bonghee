"use client";
import React, { useState, useEffect } from "react";

const Main = () => {
  const [typingText, setTypingText] = useState("");
  const [showMainContent, setShowMainContent] = useState(false);
  const [showGreeting, setShowGreeting] = useState(true);
  const greeting = "안녕하세요!";

  useEffect(() => {
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
        }, 1000);
      }
    }, 300);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <main className="bg-[rgb(35,35,35)] w-full h-full flex flex-col justify-center items-center gap-4">
      {/* 타이핑 애니메이션 */}
      <div
        className={`text-white text-4xl font-bold mb-8 transition-all duration-500 ${
          showGreeting ? "opacity-100" : "hidden"
        }`}
      >
        {typingText}
        <span className="animate-pulse">|</span>
      </div>

      {/* 메인 콘텐츠 - 아래에서 위로 슬라이드 */}
      <div
        className={`transition-all duration-1000 ease-out ${
          showMainContent
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="text-white text-5xl font-bold text-center">
          풀스택 개발자
          <strong className="font-extrabold text-6xl"> 이봉희</strong>입니다.
        </h2>
        <p className="text-white text-2xl text-center mt-4">
          더 나은 사용자 경험을 만드는 개발자
        </p>
      </div>
    </main>
  );
};

export default Main;
