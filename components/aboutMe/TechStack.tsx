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
  "Redis",
];

const devopsTech = [
  "Docker",
  "AWS ECS/EKS",
  "AWS Lambda",
  "AWS SQS",
  "Git Action",
  "Storybook",
];

const TechStack = () => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <h4 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">
        Tech Stack
      </h4>

      <div>
        <h5 className="text-base sm:text-lg font-medium text-blue-400 mb-2 sm:mb-3">
          Frontend
        </h5>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {frontendTech.map((tech) => (
            <span
              key={tech}
              className="px-2 sm:px-3 py-1 bg-blue-500/10 text-blue-300 rounded-full text-xs sm:text-sm border border-blue-500/20 hover:bg-blue-500/20 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h5 className="text-base sm:text-lg font-medium text-emerald-400 mb-2 sm:mb-3">
          Backend
        </h5>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {backendTech.map((tech) => (
            <span
              key={tech}
              className="px-2 sm:px-3 py-1 bg-emerald-500/10 text-emerald-300 rounded-full text-xs sm:text-sm border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h5 className="text-base sm:text-lg font-medium text-amber-400 mb-2 sm:mb-3">
          DevOps & Infra
        </h5>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {devopsTech.map((tech) => (
            <span
              key={tech}
              className="px-2 sm:px-3 py-1 bg-amber-500/10 text-amber-300 rounded-full text-xs sm:text-sm border border-amber-500/20 hover:bg-amber-500/20 transition-colors"
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
