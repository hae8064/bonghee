import React, { useState } from "react";
import { projects } from "../../common/projectList";
import { ProjectType } from "@/types/projectType";
import ProjectDetail from "./ProjectDetail";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

interface ProjectsProps {
  isPDF?: boolean;
}

const Projects = ({ isPDF = false }: ProjectsProps) => {
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(
    null
  );
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleProjectClick = (project: ProjectType) => {
    setSelectedProject(project);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    setSelectedProject(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const titleVariants: Variants = {
    hidden: { opacity: 0, y: -20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const Container = isPDF ? "div" : motion.div;
  const Card = isPDF ? "div" : motion.div;
  const Title = isPDF ? "h4" : motion.h4;
  const Link = isPDF ? "div" : motion.a;

  return (
    <div>
      <div className="w-full min-h-screen bg-gradient-to-br from-[#232323] via-[#2a2a2a] to-[#1a1a1a] flex flex-col justify-center items-center p-4 sm:p-6 md:p-8">
        <Container
          className="max-w-6xl w-full space-y-8 sm:space-y-10 lg:space-y-12"
          {...(!isPDF && {
            initial: "hidden",
            whileInView: "visible",
            viewport: { once: true, amount: 0.3, margin: "-100px 0px 0px 0px" },
          })}
        >
          <Title
            className="text-2xl sm:text-3xl md:text-4xl text-center font-bold text-white mb-4 sm:mb-6 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
            {...(!isPDF && { variants: titleVariants })}
          >
            Projects
          </Title>

          <Container
            className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
            {...(!isPDF && { variants: containerVariants })}
          >
            {projects.map((project: ProjectType) => (
              <Card
                key={project.id}
                className={`relative bg-white/5 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-white/10 transition-all duration-300 group ${
                  !isPDF
                    ? "cursor-pointer hover:border-blue-500/40 hover:bg-white/10"
                    : "hover:border-white/20 hover:bg-white/10"
                }`}
                {...(!isPDF && {
                  variants: itemVariants,
                  whileHover: {
                    y: -5,
                    scale: 1.02,
                    transition: { duration: 0.2 },
                  },
                  whileTap: { scale: 0.98 },
                  onClick: () => handleProjectClick(project),
                })}
              >
                {/* 클릭 힌트 - hover 시 나타남 */}
                {!isPDF && (
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 text-white/0 group-hover:text-blue-400 transition-colors duration-300">
                    <span className="text-xs font-medium">자세히 보기</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                )}

                {/* 프로젝트 헤더 */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 sm:mb-4 space-y-2 sm:space-y-0 pr-20 sm:pr-24">
                  <h5 className="text-base sm:text-lg font-medium text-white group-hover:text-blue-300 transition-colors">
                    {project.title}
                  </h5>
                  <span className="text-xs text-white/60 bg-white/10 px-2 py-1 rounded self-start sm:self-auto">
                    {project.period}
                  </span>
                </div>

                {/* 프로젝트 설명 */}
                <p className="text-white/80 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* 기술 스택 */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs border border-blue-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* 외부 링크 버튼 */}
                {!isPDF && (
                  <div className="flex gap-2 sm:gap-3">
                    {project.githubUrl !== "비공개" && (
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e: React.MouseEvent) => e.stopPropagation()}
                        className="px-3 sm:px-4 py-2 bg-white/10 text-white/90 rounded text-xs sm:text-sm hover:bg-white/20 transition-colors border border-white/20"
                        {...(!isPDF && {
                          whileHover: { scale: 1.05, y: -2 },
                          whileTap: { scale: 0.95 },
                        })}
                      >
                        GitHub
                      </Link>
                    )}
                    {project.liveUrl !== "비공개" &&
                      project.liveUrl !== undefined && (
                        <Link
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e: React.MouseEvent) => e.stopPropagation()}
                          className="px-3 sm:px-4 py-2 bg-blue-500/20 text-blue-300 rounded text-xs sm:text-sm hover:bg-blue-500/30 transition-colors border border-blue-500/30"
                          {...(!isPDF && {
                            whileHover: { scale: 1.05, y: -2 },
                            whileTap: { scale: 0.95 },
                          })}
                        >
                          웹사이트 보기
                        </Link>
                      )}
                  </div>
                )}
              </Card>
            ))}
          </Container>
        </Container>
      </div>

      {/* 프로젝트 상세 모달 - 일반 모드에서만 */}
      {!isPDF && selectedProject && (
        <ProjectDetail
          project={selectedProject}
          isOpen={isDetailOpen}
          onClose={handleCloseDetail}
        />
      )}

      {/* PDF 모드: 프로젝트 상세 내용 직접 표시 */}
      {isPDF && (
        <Container className="max-w-6xl w-full mt-8 sm:mt-10 lg:mt-12 space-y-8 sm:space-y-10 lg:space-y-12">
          {projects.map((project: ProjectType) => (
            <div
              key={project.id}
              className="bg-white/5 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-white/10 mb-8"
            >
              {/* 프로젝트 헤더 */}
              <div className="mb-4 pb-4 border-b border-white/10">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-white/60 text-sm sm:text-base">
                  {project.period}
                </p>
              </div>

              {/* 프로젝트 이미지/영상 */}
              {project.detail?.videos && project.detail.videos.length > 0 ? (
                <div className="mb-4">
                  <div className="relative h-48 sm:h-64 rounded-lg overflow-hidden bg-black/20">
                    <p className="text-white/60 text-sm p-4">
                      영상: {project.detail.videos[0].title}
                    </p>
                  </div>
                </div>
              ) : project.imageUrl ? (
                <div className="mb-4 relative h-48 sm:h-64 rounded-lg overflow-hidden">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, 1200px"
                  />
                </div>
              ) : null}

              {/* 프로젝트 설명 */}
              {project.detail?.overview && (
                <div className="mb-4">
                  <h4 className="text-lg sm:text-xl font-semibold text-white mb-3">
                    프로젝트 설명
                  </h4>
                  <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                    {project.detail.overview}
                  </p>
                </div>
              )}

              {/* 기술 스택 */}
              <div className="mb-4">
                <h4 className="text-lg sm:text-xl font-semibold text-white mb-3">
                  사용 기술
                </h4>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 sm:px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs sm:text-sm border border-blue-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* 팀 정보 및 역할 */}
              {project.detail && (
                <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.detail.teamSize && (
                    <div>
                      <h4 className="text-lg sm:text-xl font-semibold text-white mb-2">
                        팀 구성
                      </h4>
                      <p className="text-white/80 text-sm sm:text-base">
                        {project.detail.teamSize}명
                      </p>
                    </div>
                  )}
                  {project.detail.role && (
                    <div>
                      <h4 className="text-lg sm:text-xl font-semibold text-white mb-2">
                        내 역할
                      </h4>
                      <p className="text-white/80 text-sm sm:text-base">
                        {project.detail.role}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* 핵심 기술 및 구현 내용 */}
              {project.detail && project.detail.features.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-lg sm:text-xl font-semibold text-white mb-3">
                    핵심 기술 및 구현
                  </h4>
                  <div className="space-y-2">
                    {project.detail.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                          {feature}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 주요 이슈 및 해결 방법 */}
              {project.detail &&
                project.detail.challenges.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-lg sm:text-xl font-semibold text-white mb-3">
                      주요 이슈 및 해결 방법
                    </h4>
                    <div className="space-y-4">
                      {project.detail.challenges.map((challenge, index) => (
                        <div
                          key={index}
                          className="bg-white/5 rounded-lg p-3 sm:p-4 border border-white/10"
                        >
                          <div className="flex items-start gap-2 mb-2">
                            <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                            <h5 className="text-white font-medium text-sm sm:text-base">
                              이슈
                            </h5>
                          </div>
                          <p className="text-white/80 mb-3 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                            {challenge}
                          </p>
                          {project.detail?.solutions[index] && (
                            <>
                              <div className="flex items-start gap-2 mb-2">
                                <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                                <h5 className="text-white font-medium text-sm sm:text-base">
                                  해결 방법
                                </h5>
                              </div>
                              <p className="text-white/80 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                                {project.detail?.solutions[index]}
                              </p>
                              {project.detail.images &&
                                project.detail.images[index] &&
                                !project.detail.images[index].isNull && (
                                  <div className="relative mt-3 h-48 sm:h-64 rounded-lg overflow-hidden">
                                    <Image
                                      src={project.detail.images[index].url!}
                                      alt={project.detail.images[index].alt!}
                                      fill
                                      className="object-contain"
                                    />
                                  </div>
                                )}
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* 학습한 내용 */}
              {project.detail && project.detail.learnings.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-lg sm:text-xl font-semibold text-white mb-3">
                    프로젝트를 통해 학습한 내용
                  </h4>
                  <div className="space-y-2">
                    {project.detail.learnings.map((learning, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                          {learning}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </Container>
      )}
    </div>
  );
};

export default Projects;
