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

  return (
    <div>
      <div className="w-full h-full bg-gradient-to-br from-[#232323] via-[#2a2a2a] to-[#1a1a1a] flex flex-col justify-center items-center p-8">
        <motion.div
          className="space-y-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.h4
            className="text-4xl text-center font-bold text-white mb-6 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Projects
          </motion.h4>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {projects.map((project: ProjectType, index: number) => (
              <motion.div
                key={project.id}
                className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10"
                variants={itemVariants}
                whileHover={{
                  y: -5,
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* 프로젝트 헤더 */}
                <div className="flex justify-between items-start mb-4">
                  <h5 className="text-lg font-medium text-white">
                    {project.title}
                  </h5>
                  <span className="text-xs text-white/60 bg-white/10 px-2 py-1 rounded">
                    {project.period}
                  </span>
                </div>

                {/* 프로젝트 설명 */}
                <p className="text-white/80 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* 기술 스택 */}
                <div className="flex flex-wrap gap-2 mb-4">
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
                <div className="flex gap-3">
                  <motion.button
                    onClick={() => handleProjectClick(project)}
                    className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 rounded text-sm hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300 border border-purple-500/30 hover:border-purple-500/50 font-medium hover:cursor-pointer"
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
                      className="px-4 py-2 bg-white/10 text-white/90 rounded text-sm hover:bg-white/20 transition-colors border border-white/20"
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
                      className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded text-sm hover:bg-blue-500/30 transition-colors border border-blue-500/30"
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
