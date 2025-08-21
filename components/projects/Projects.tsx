import React, { useState } from "react";
import { projects } from "../../common/projectList";
import { ProjectType } from "@/types/projectType";
import ProjectDetail from "./ProjectDetail";
import { motion, Variants } from "framer-motion";

const Projects = () => {
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

  return (
    <div>
      <div className="w-full min-h-screen bg-gradient-to-br from-[#232323] via-[#2a2a2a] to-[#1a1a1a] flex flex-col justify-center items-center p-4 sm:p-6 md:p-8">
        <motion.div
          className="max-w-6xl w-full space-y-8 sm:space-y-10 lg:space-y-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3, margin: "-100px 0px 0px 0px" }}
        >
          <motion.h4
            className="text-2xl sm:text-3xl md:text-4xl text-center font-bold text-white mb-4 sm:mb-6 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
            variants={titleVariants}
          >
            Projects
          </motion.h4>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
            variants={containerVariants}
          >
            {projects.map((project: ProjectType, index: number) => (
              <motion.div
                key={project.id}
                className="bg-white/5 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10"
                variants={itemVariants}
                whileHover={{
                  y: -5,
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* 프로젝트 헤더 */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 sm:mb-4 space-y-2 sm:space-y-0">
                  <h5 className="text-base sm:text-lg font-medium text-white">
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

                {/* 링크 버튼들 */}
                <div className="flex gap-2 sm:gap-3">
                  <motion.button
                    onClick={() => handleProjectClick(project)}
                    className="px-3 sm:px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 rounded text-xs sm:text-sm hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300 border border-purple-500/30 hover:border-purple-500/50 font-medium hover:cursor-pointer"
                    whileHover={{
                      scale: 1.05,
                      y: -2,
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Detail
                  </motion.button>
                  {project.githubUrl !== "비공개" && (
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 sm:px-4 py-2 bg-white/10 text-white/90 rounded text-xs sm:text-sm hover:bg-white/20 transition-colors border border-white/20"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      GitHub
                    </motion.a>
                  )}
                  {project.liveUrl !== "비공개" && (
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 sm:px-4 py-2 bg-blue-500/20 text-blue-300 rounded text-xs sm:text-sm hover:bg-blue-500/30 transition-colors border border-blue-500/30"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      웹사이트 보기
                    </motion.a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* 프로젝트 상세 모달 */}
      {selectedProject && (
        <ProjectDetail
          project={selectedProject}
          isOpen={isDetailOpen}
          onClose={handleCloseDetail}
        />
      )}
    </div>
  );
};

export default Projects;
