import React from "react";

const frontendTech = [
  "React",
  "Next.js",
  "Vue.js",
  "TypeScript",
  "Styled Components",
  "SCSS",
  "Vanilla Extract",
  "Tailwind CSS",
  "Recoil",
  "Zustand",
  "Tanstack Query",
  "Framer Motion",
];

const backendTech = [
  "Spring",
  "Nest.js",
  "FastAPI",
  "PostgreSQL",
  "MongoDB",
  "Docker",
  "AWS",
];

const TechStack = () => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <h4 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">
        기술 스택
      </h4>

      {/* 프론트엔드 */}
      <div>
        <h5 className="text-base sm:text-lg font-medium text-white/90 mb-2 sm:mb-3">
          Frontend
        </h5>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {frontendTech.map((tech) => (
            <span
              key={tech}
              className="px-2 sm:px-3 py-1 bg-white/10 text-white/90 rounded-full text-xs sm:text-sm border border-white/20 hover:bg-white/20 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* 백엔드 */}
      <div>
        <h5 className="text-base sm:text-lg font-medium text-white/90 mb-2 sm:mb-3">
          Backend
        </h5>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {backendTech.map((tech) => (
            <span
              key={tech}
              className="px-2 sm:px-3 py-1 bg-white/10 text-white/90 rounded-full text-xs sm:text-sm border border-white/20 hover:bg-white/20 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
export default TechStack;
