import { educations } from "@/common/educationList";
import { workExperiences } from "../../common/experienceList";
import { WorkExperienceType } from "../../types/workExperienceType";

const Experience = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#232323] via-[#2a2a2a] to-[#1a1a1a] flex flex-col justify-center items-center p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl w-full space-y-8 sm:space-y-10 lg:space-y-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-8 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] text-center">
          Career & Education
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
          {/* 경력 섹션 */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6">
              Career
            </h3>
            <div className="space-y-4 sm:space-y-6">
              {workExperiences.map((experience) => (
                <div
                  key={experience.id}
                  className="bg-white/5 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10"
                >
                  {/* 회사 정보 */}
                  <div className="flex justify-between items-start mb-3 sm:mb-4">
                    <div>
                      <h4 className="text-lg sm:text-xl font-semibold text-white">
                        {experience.company}
                      </h4>
                      <p className="text-blue-400 text-base sm:text-lg">
                        {experience.position}
                      </p>
                    </div>
                    <span className="text-xs sm:text-sm text-white/60 bg-white/10 px-2 sm:px-3 py-1 rounded">
                      {experience.period}
                    </span>
                  </div>

                  {/* 업무 설명 */}
                  <div className="mb-3 sm:mb-4">
                    <ul className="space-y-1.5 sm:space-y-2">
                      {experience.description.map((item, index) => (
                        <li
                          key={index}
                          className="text-white/80 text-xs sm:text-sm flex items-start"
                        >
                          <span className="text-blue-400 mr-2">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 사용 기술 */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {experience.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 sm:px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs border border-blue-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 교육 섹션 */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6">
              Education
            </h3>
            <div className="space-y-4 sm:space-y-6">
              {educations.map((education) => (
                <div
                  key={education.id}
                  className="bg-white/5 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10"
                >
                  {/* 학교 정보 */}
                  <div className="flex justify-between items-start mb-3 sm:mb-4">
                    <div>
                      <h4 className="text-lg sm:text-xl font-semibold text-white">
                        {education.school}
                      </h4>
                      <p className="text-blue-400 text-base sm:text-lg">
                        {education.degree} - {education.major}
                      </p>
                    </div>
                    <span className="text-xs sm:text-sm text-white/60 bg-white/10 px-2 sm:px-3 py-1 rounded">
                      {education.period}
                    </span>
                  </div>

                  {/* 설명 */}
                  {education.description && (
                    <p className="text-white/80 text-xs sm:text-sm">
                      {education.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
