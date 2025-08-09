import React from "react";
import { projects } from "../../common/projectList";

const Projects = () => {
  return (
    <div className="w-full h-full bg-gradient-to-br from-[#232323] via-[#2a2a2a] to-[#1a1a1a] flex flex-col justify-center items-center p-8">
      <div className="space-y-12">
        <h4 className="text-4xl text-center font-bold text-white mb-6 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
          Projects
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project: ProjectType) => (
            <div
              key={project.id}
              className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10"
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
                {project.githubUrl !== "비공개" && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white/10 text-white/90 rounded text-sm hover:bg-white/20 transition-colors border border-white/20"
                  >
                    GitHub
                  </a>
                )}
                {project.liveUrl !== "비공개" && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded text-sm hover:bg-blue-500/30 transition-colors border border-blue-500/30"
                  >
                    웹사이트 보기
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
