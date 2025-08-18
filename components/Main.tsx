"use client";
import { AnimatePresence, motion } from "framer-motion";
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

    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Main 컴포넌트 영역에 있을 때만 스크롤 차단
      const isInMainArea = scrollY === 0;

      if (!isTypingComplete && isInMainArea) {
        document.body.style.overflow = "hidden";
        window.addEventListener("scroll", preventScroll, { passive: false });
        window.addEventListener("wheel", preventScroll, { passive: false });
        window.addEventListener("touchmove", preventScroll, { passive: false });
      } else {
        document.body.style.overflow = "auto";
        window.removeEventListener("scroll", preventScroll);
        window.removeEventListener("wheel", preventScroll);
        window.removeEventListener("touchmove", preventScroll);
      }
    };

    if (!isTypingComplete) {
      handleScroll(); // 초기 상태 설정
      window.addEventListener("scroll", handleScroll);
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

          // 타이핑 완료 시 스크롤 제한 해제
          document.body.style.overflow = "auto";
          window.removeEventListener("scroll", preventScroll);
          window.removeEventListener("wheel", preventScroll);
          window.removeEventListener("touchmove", preventScroll);
          window.removeEventListener("scroll", handleScroll);
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
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isTypingComplete]);

  return (
    <main className="relative w-full h-full flex flex-col justify-center items-center gap-4 overflow-hidden">
      {/* 배경 그라데이션 */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#232323] via-[#2a2a2a] to-[#1a1a1a]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      ></motion.div>

      {/* 추가 배경 효과들 */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-[#333]/20 to-transparent"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      ></motion.div>

      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)]"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.5, delay: 1 }}
      ></motion.div>

      <motion.div
        className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(120,119,198,0.2),transparent_50%)]"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.5, delay: 1.5 }}
      ></motion.div>

      {/* 애니메이션 원들 */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"
        initial={{ opacity: 0, scale: 0, rotate: -180 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{
          duration: 2,
          delay: 0.8,
          type: "spring",
          stiffness: 100,
          damping: 10,
        }}
      ></motion.div>

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-purple-500/10 rounded-full blur-xl"
        initial={{ opacity: 0, scale: 0, rotate: 180 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{
          duration: 2,
          delay: 1.2,
          type: "spring",
          stiffness: 100,
          damping: 10,
        }}
      ></motion.div>

      <motion.div
        className="absolute top-1/2 right-1/3 w-16 h-16 bg-cyan-500/10 rounded-full blur-lg"
        initial={{ opacity: 0, scale: 0, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 1.8,
          delay: 1.6,
          type: "spring",
          stiffness: 150,
          damping: 8,
        }}
      ></motion.div>

      {/* 타이핑 애니메이션 */}
      <AnimatePresence>
        {showGreeting && (
          <motion.div
            className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 z-10 px-4 text-center"
            initial={{ opacity: 0, y: -50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -100, scale: 0.6 }}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
          >
            {typingText}
            <motion.span
              className="inline-block ml-1"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              |
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 메인 콘텐츠 - 아래에서 위로 슬라이드 */}
      <AnimatePresence>
        {showMainContent && (
          <motion.div
            className="z-10 text-center px-4"
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 1.2,
              type: "spring",
              stiffness: 100,
              damping: 15,
            }}
          >
            <motion.h2
              className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              풀스택 개발자
              <motion.strong
                className="font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl drop-shadow-[0_6px_12px_rgba(0,0,0,0.9)] inline-block ml-2 sm:ml-3 md:ml-4 break-words"
                initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{
                  delay: 0.6,
                  duration: 1,
                  type: "spring",
                  stiffness: 150,
                  damping: 10,
                }}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  transition: { duration: 0.3 },
                }}
              >
                이봉희
              </motion.strong>
              입니다.
            </motion.h2>

            <motion.p
              className="text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mt-4 sm:mt-5 md:mt-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] px-2 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              프론트엔드부터 백엔드까지, 사용자 중심의 솔루션을 만드는 개발자
            </motion.p>

            {/* 추가 장식 요소 */}
            <motion.div
              className="flex justify-center mt-6 sm:mt-7 md:mt-8 space-x-3 sm:space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <motion.div
                className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-blue-400 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              ></motion.div>
              <motion.div
                className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-purple-400 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              ></motion.div>
              <motion.div
                className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-cyan-400 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              ></motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 스크롤 화살표 */}
      <AnimatePresence>
        {showMainContent && (
          <motion.div
            className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <motion.div
              className="flex flex-col items-center space-y-1 sm:space-y-2 cursor-pointer group"
              onClick={() => {
                // 스크롤 다운 기능 (선택사항)
                window.scrollTo({
                  top: window.innerHeight,
                  behavior: "smooth",
                });
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* 화살표 아이콘 */}
              <motion.svg
                className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white/60 group-hover:text-white transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{
                  y: [0, 8, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </motion.svg>

              {/* "스크롤" 텍스트 */}
              <motion.p
                className="text-white/40 text-xs sm:text-sm md:text-base font-medium group-hover:text-white/60 transition-colors"
                animate={{
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Scroll Down
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Main;
