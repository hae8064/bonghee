import { ProjectType } from "@/types/projectType";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

interface ProjectDetailProps {
  project: ProjectType;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectDetail = ({ project, isOpen, onClose }: ProjectDetailProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // ESC 키로 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);

      // 모달이 열릴 때 body 스크롤 방지 (더 안전한 방법)
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      return () => {
        document.removeEventListener("keydown", handleEscape);

        // 모달이 닫힐 때 body 스크롤 복원
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";

        // 원래 스크롤 위치로 복원
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen, onClose]);

  // 바깥 클릭 시 닫기
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  // 모달 내부 스크롤 방지 (바깥 클릭 시)
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleBackdropClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <motion.div
            ref={modalRef}
            className="bg-gradient-to-br from-[#232323] via-[#2a2a2a] to-[#1a1a1a] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/10"
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 50,
              rotateX: -15,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              rotateX: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: 50,
              rotateX: -15,
            }}
            transition={{
              duration: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94],
              type: "spring",
              stiffness: 100,
              damping: 15,
            }}
          >
            {/* 헤더 */}
            <motion.div
              className="sticky top-0 bg-gradient-to-r from-[#232323] to-[#2a2a2a] p-6 border-b border-white/10"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <motion.h2
                    className="text-2xl font-bold text-white mb-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                  >
                    {project.title}
                  </motion.h2>
                  <motion.p
                    className="text-white/60 text-sm"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                  >
                    {project.period}
                  </motion.p>
                </div>
                <motion.button
                  onClick={onClose}
                  className="text-white/60 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </motion.button>
              </div>
            </motion.div>

            {/* 컨텐츠 */}
            <motion.div
              className="p-6 space-y-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              {/* 프로젝트 이미지 */}
              {project.imageUrl && (
                <motion.div
                  className="relative h-64 rounded-lg overflow-hidden"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              )}

              {/* 프로젝트 영상 (우선순위: 영상 > 이미지) */}
              {project.detail?.videos && project.detail.videos.length > 0 ? (
                <motion.div
                  className="relative h-64 rounded-lg overflow-hidden"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <video
                    className="w-full h-full object-cover rounded-lg"
                    controls
                    muted
                    loop
                    poster={project.imageUrl} // 이미지가 있으면 포스터로 사용
                  >
                    <source
                      src={project.detail.videos[0].url}
                      type="video/quicktime"
                    />
                    <source
                      src={project.detail.videos[0].url}
                      type="video/mp4"
                    />
                    <source
                      src={project.detail.videos[0].url}
                      type="video/webm"
                    />
                    <source
                      src={project.detail.videos[0].url}
                      type="video/ogg"
                    />
                    브라우저가 비디오를 지원하지 않습니다.
                  </video>

                  {/* 영상 제목 오버레이 */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h4 className="text-white font-medium text-sm">
                      {project.detail.videos[0].title}
                    </h4>
                    {project.detail.videos[0].description && (
                      <p className="text-white/80 text-xs mt-1">
                        {project.detail.videos[0].description}
                      </p>
                    )}
                  </div>
                </motion.div>
              ) : project.imageUrl ? (
                <motion.div
                  className="relative h-64 rounded-lg overflow-hidden"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              ) : null}

              {/* 프로젝트 설명 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                <h3 className="text-xl font-semibold text-white mb-4">
                  프로젝트 설명
                </h3>
                <p className="text-white/80 leading-relaxed">
                  {project.detail?.overview}
                </p>
              </motion.div>

              {/* 기술 스택 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                <h3 className="text-xl font-semibold text-white mb-4">
                  사용 기술
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <motion.span
                      key={tech}
                      className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-500/30"
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{
                        delay: 0.6 + index * 0.1,
                        duration: 0.3,
                        type: "spring",
                        stiffness: 200,
                      }}
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* 프로젝트 정보 */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.3 }}
              >
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.3 }}
                >
                  <h3 className="text-xl font-semibold text-white mb-4">
                    개발 기간
                  </h3>
                  <p className="text-white/80">{project.period}</p>
                </motion.div>
              </motion.div>

              {/* 팀 정보 및 역할 */}
              {project.detail && (
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.3 }}
                >
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8, duration: 0.3 }}
                  >
                    <h3 className="text-xl font-semibold text-white mb-4">
                      팀 구성
                    </h3>
                    <p className="text-white/80">
                      {project.detail.teamSize
                        ? `${project.detail.teamSize}명`
                        : "정보 없음"}
                    </p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9, duration: 0.3 }}
                  >
                    <h3 className="text-xl font-semibold text-white mb-4">
                      내 역할
                    </h3>
                    <p className="text-white/80">{project.detail.role}</p>
                  </motion.div>
                </motion.div>
              )}

              {/* 핵심 기술 및 구현 내용 */}
              {project.detail && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.3 }}
                >
                  <h3 className="text-xl font-semibold text-white mb-4">
                    핵심 기술 및 구현
                  </h3>
                  <div className="space-y-4">
                    {project.detail.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.9 + index * 0.1,
                          duration: 0.3,
                        }}
                      >
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-white/80 leading-relaxed">
                          {feature}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* 주요 이슈 및 해결 방법 */}
              {project.detail && project.detail.challenges.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.3 }}
                >
                  <h3 className="text-xl font-semibold text-white mb-4">
                    주요 이슈 및 해결 방법
                  </h3>
                  <div className="space-y-6">
                    {project.detail.challenges.map((challenge, index) => (
                      <motion.div
                        key={index}
                        className="bg-white/5 rounded-lg p-4 border border-white/10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 1.0 + index * 0.1,
                          duration: 0.3,
                        }}
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                          <h4 className="text-white font-medium">이슈</h4>
                        </div>
                        <p className="text-white/80 mb-3 leading-relaxed">
                          {challenge}
                        </p>

                        {project.detail?.solutions[index] && (
                          <>
                            <div className="flex items-start gap-3 mb-2">
                              <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                              <h4 className="text-white font-medium">
                                해결 방법
                              </h4>
                            </div>
                            <p className="text-white/80 leading-relaxed">
                              {project.detail?.solutions[index]}
                            </p>
                          </>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* 프로젝트 개요 */}
              {project.detail && project.detail.overview && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0, duration: 0.3 }}
                >
                  <h3 className="text-xl font-semibold text-white mb-4">
                    프로젝트 개요
                  </h3>
                  <p className="text-white/80 leading-relaxed">
                    {project.detail.overview}
                  </p>
                </motion.div>
              )}

              {/* 학습한 내용 */}
              {project.detail && project.detail.learnings.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.3 }}
                >
                  <h3 className="text-xl font-semibold text-white mb-4">
                    프로젝트를 통해 학습한 내용
                  </h3>
                  <div className="space-y-3">
                    {project.detail.learnings.map((learning, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 1.2 + index * 0.1,
                          duration: 0.3,
                        }}
                      >
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-white/80 leading-relaxed">
                          {learning}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* 링크 */}
              <motion.div
                className="flex gap-3 pt-4 border-t border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.3 }}
              >
                {project.githubUrl && project.githubUrl !== "비공개" && (
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 bg-white/10 text-white/90 rounded hover:bg-white/20 transition-colors border border-white/20"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    GitHub
                  </motion.a>
                )}
                {project.liveUrl && project.liveUrl !== "비공개" && (
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 bg-blue-500/20 text-blue-300 rounded hover:bg-blue-500/30 transition-colors border border-blue-500/30"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    웹사이트 보기
                  </motion.a>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetail;
