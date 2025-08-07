import React from "react";

const frontendTech = [
  "React",
  "Next.js",
  "Vue.js",
  "JavaScript",
  "TypeScript",
  "Styled Components",
  "SCSS",
  "Vanilla Extract",
  "Tailwind CSS",
  "Monorepo",
  "Redux",
  "Recoil",
  "Zustand",
  "React Query",
  "Framer Motion",
  "Storybook",
];

const backendTech = [
  "Express",
  "Nest.js",
  "FastAPI",
  "Flask",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "Docker",
  "AWS",
  "Vercel",
  "Jest",
];

const TechStack = () => {
  return (
    <div className="space-y-6">
      <h4 className="text-xl font-semibold text-white mb-4">기술 스택</h4>

      {/* 프론트엔드 */}
      <div>
        <h5 className="text-lg font-medium text-white/90 mb-3">Frontend</h5>
        <div className="flex flex-wrap gap-2">
          {frontendTech.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-white/10 text-white/90 rounded-full text-sm border border-white/20 hover:bg-white/20 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* 백엔드 */}
      <div>
        <h5 className="text-lg font-medium text-white/90 mb-3">Backend</h5>
        <div className="flex flex-wrap gap-2">
          {backendTech.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-white/10 text-white/90 rounded-full text-sm border border-white/20 hover:bg-white/20 transition-colors"
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
