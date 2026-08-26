import { educations } from "@/common/educationList";
import { workExperiences } from "../../common/experienceList";
import { motion, Variants } from "framer-motion";
import { awards } from "@/common/awardList";
import { useState } from "react";
import AwardDetail from "./AwardDetail";
import { certifications } from "@/common/certificationList";
import { CertificationType } from "@/types/certificationType";
import Image from "next/image";

interface ExperienceProps {
  isPDF?: boolean;
}

const Experience = ({ isPDF = false }: ExperienceProps) => {
  const [selectedAward, setSelectedAward] = useState<AwardType | null>(null);
  const [isAwardModalOpen, setIsAwardModalOpen] = useState(false);

  const openAwardModal = (award: AwardType) => {
    setSelectedAward(award);
    setIsAwardModalOpen(true);
  };

  const closeAwardModal = () => {
    setIsAwardModalOpen(false);
    setSelectedAward(null);
  };

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

  const Container = isPDF ? "div" : motion.div;
  const Item = isPDF ? "div" : motion.div;
  const Card = isPDF ? "div" : motion.div;
  const Title = isPDF ? "h2" : motion.h2;
  const Button = isPDF ? "div" : motion.button;

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#232323] via-[#2a2a2a] to-[#1a1a1a] flex flex-col justify-center items-center p-4 sm:p-6 md:p-8">
      <Container
        className="max-w-6xl w-full space-y-8 sm:space-y-10 lg:space-y-12"
        {...(!isPDF && {
          variants: containerVariants,
          initial: "hidden",
          whileInView: "visible",
          viewport: { once: true, amount: 0.3 },
        })}
      >
        <Title
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-8 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] text-center"
          {...(!isPDF && { variants: itemVariants })}
        >
          Experience
        </Title>

        <Container
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12"
          {...(!isPDF && { variants: containerVariants })}
        >
          {/* 경력 섹션 */}
          <Item
            className="space-y-4 sm:space-y-6"
            {...(!isPDF && { variants: itemVariants })}
          >
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6">
              Career
            </h3>
            <div className="space-y-4 sm:space-y-6">
              {workExperiences.map((experience) => (
                <Card
                  key={experience.id}
                  className="bg-white/5 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10"
                  {...(!isPDF && {
                    variants: cardVariants,
                    whileHover: {
                      y: -5,
                      scale: 1.02,
                      transition: { duration: 0.2 },
                    },
                    whileTap: { scale: 0.98 },
                  })}
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
                </Card>
              ))}
            </div>
          </Item>

          {/* 교육 섹션 */}
          <Item
            className="space-y-4 sm:space-y-6"
            {...(!isPDF && { variants: itemVariants })}
          >
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6">
              Education
            </h3>
            <div className="space-y-4 sm:space-y-6">
              {educations.map((education) => (
                <Card
                  key={education.id}
                  className="bg-white/5 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10"
                  {...(!isPDF && {
                    variants: cardVariants,
                    whileHover: {
                      y: -5,
                      scale: 1.02,
                      transition: { duration: 0.2 },
                    },
                    whileTap: { scale: 0.98 },
                    onClick: () => {
                      if (education.id === 0) {
                        openAwardModal(awards[0]);
                      }
                    },
                    className: "cursor-pointer",
                  })}
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

                  <div className="flex flex-col gap-2">
                    {/* 설명 */}
                    {education.description && (
                      <p className="text-white/80 text-xs sm:text-sm">
                        {education.description}
                      </p>
                    )}

                    {/* 수상이력 확인 버튼 (한국공학대학교인 경우에만) */}
                    {education.school === "한국공학대학교" &&
                      awards.length > 0 &&
                      !isPDF && (
                        <Button
                          onClick={() => openAwardModal(awards[0])}
                          className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded text-sm hover:bg-blue-500/30 transition-colors border border-blue-500/30 hover:scale-105 self-start"
                          {...(!isPDF && {
                            whileHover: { scale: 1.05, y: -2 },
                            whileTap: { scale: 0.95 },
                          })}
                        >
                          🏆 수상이력 확인하기
                        </Button>
                      )}
                  </div>
                </Card>
              ))}

              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6">
                Certification
              </h3>

              {certifications.map((certification: CertificationType) => (
                <Card
                  key={certification.id}
                  className="bg-white/5 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10"
                  {...(!isPDF && { variants: cardVariants })}
                >
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-white">
                      {certification.name}
                    </h4>
                  </div>

                  <p className="text-blue-400 text-sm sm:text-base mb-2">
                    {certification.issuer}
                  </p>
                  <span className="text-xs sm:text-sm text-white/60 bg-white/10 px-2 sm:px-3 py-1 rounded self-start">
                    {certification.period}
                  </span>
                </Card>
              ))}
            </div>
          </Item>
        </Container>
      </Container>

      {/* 수상이력 상세 모달 - 일반 모드에서만 */}
      {!isPDF && selectedAward && (
        <AwardDetail
          award={selectedAward}
          isOpen={isAwardModalOpen}
          onClose={closeAwardModal}
        />
      )}

      {/* PDF 모드: 수상이력 직접 표시 */}
      {isPDF && awards.length > 0 && (
        <Container className="max-w-6xl w-full mt-8 sm:mt-10 lg:mt-12">
          <Title className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-8 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] text-center">
            수상이력
          </Title>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-white/10">
            <div className="mb-4">
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">
                {awards[0].title}
              </h3>
              <p className="text-white/60 text-sm sm:text-base">
                {awards[0].organization} • {awards[0].period}
              </p>
            </div>
            <div className="mb-4">
              <h4 className="text-lg sm:text-xl font-semibold text-white mb-3">
                수상 내용
              </h4>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <p className="text-white/80 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                  {awards[0].description}
                </p>
              </div>
            </div>
            {awards[0].images && awards[0].images.length > 0 && (
              <div>
                <h4 className="text-lg sm:text-xl font-semibold text-white mb-3">
                  관련 이미지
                </h4>
                <div className="grid grid-cols-1 gap-4">
                  {awards[0].images.map((image, index) => (
                    <div
                      key={index}
                      className="relative h-48 sm:h-64 rounded-lg overflow-hidden"
                    >
                      <Image
                        src={image.url}
                        alt={image.alt}
                        fill
                        className="object-contain"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 400px"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Container>
      )}

      {/* Certification 섹션 추가 - 전체 너비로 배치 */}
      {/* <motion.div className="space-y-4 sm:space-y-6" variants={itemVariants}>
        <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6">
          Certification
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {certifications.map((certification: CertificationType) => (
            <motion.div
              key={certification.id}
              className="bg-white/5 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10"
              variants={cardVariants}
              whileHover={{
                y: -5,
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex flex-col justify-between h-full">
                <div>
                  <h4 className="text-lg sm:text-xl font-semibold text-white mb-2">
                    {certification.name}
                  </h4>
                  <p className="text-blue-400 text-sm sm:text-base mb-2">
                    {certification.issuer}
                  </p>
                </div>
                <span className="text-xs sm:text-sm text-white/60 bg-white/10 px-2 sm:px-3 py-1 rounded self-start">
                  {certification.period}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div> */}

      {/* 수상이력 상세 모달 */}
      {selectedAward && (
        <AwardDetail
          award={selectedAward}
          isOpen={isAwardModalOpen}
          onClose={closeAwardModal}
        />
      )}
    </div>
  );
};

export default Experience;
