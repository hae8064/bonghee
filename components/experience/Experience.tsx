import { educations } from "@/common/educationList";
import { workExperiences } from "../../common/experienceList";
import { motion, Variants } from "framer-motion";

const Experience = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
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

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#232323] via-[#2a2a2a] to-[#1a1a1a] flex flex-col justify-center items-center p-4 sm:p-6 md:p-8">
      <motion.div
        className="max-w-6xl w-full space-y-8 sm:space-y-10 lg:space-y-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-8 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] text-center"
          variants={itemVariants}
        >
          Career & Education
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12"
          variants={containerVariants}
        >
          {/* 경력 섹션 */}
          <motion.div
            className="space-y-4 sm:space-y-6"
            variants={itemVariants}
          >
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6">
              Career
            </h3>
            <div className="space-y-4 sm:space-y-6">
              {workExperiences.map((experience) => (
                <motion.div
                  key={experience.id}
                  className="bg-white/5 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10"
                  variants={cardVariants}
                  whileHover={{
                    y: -5,
                    scale: 1.02,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.98 }}
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
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 교육 섹션 */}
          <motion.div
            className="space-y-4 sm:space-y-6"
            variants={itemVariants}
          >
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6">
              Education
            </h3>
            <div className="space-y-4 sm:space-y-6">
              {educations.map((education) => (
                <motion.div
                  key={education.id}
                  className="bg-white/5 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10"
                  variants={cardVariants}
                  whileHover={{
                    y: -5,
                    scale: 1.02,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* 학교 정보 */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 sm:mb-4 space-y-2 sm:space-y-0">
                    <div>
                      <h4 className="text-lg sm:text-xl font-semibold text-white">
                        {education.school}
                      </h4>
                      <p className="text-blue-400 text-base sm:text-lg">
                        {education.degree} - {education.major}
                      </p>
                    </div>
                    <span className="text-xs sm:text-sm text-white/60 bg-white/10 px-2 sm:px-3 py-1 rounded self-start sm:self-auto">
                      {education.period}
                    </span>
                  </div>

                  {/* 설명 */}
                  {education.description && (
                    <p className="text-white/80 text-xs sm:text-sm">
                      {education.description}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Experience;
