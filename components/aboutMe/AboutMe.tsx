import React from "react";
import Contact from "./Contact";
import TechStack from "./TechStack";
import Introduce from "./Introduce";
import ProfileSection from "./ProfileSection";
import { motion, Variants } from "framer-motion";

const AboutMe = () => {
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

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#232323] via-[#2a2a2a] to-[#1a1a1a] flex flex-col justify-center items-center p-4 sm:p-6 md:p-8">
      <motion.div
        className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-start lg:items-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      >
        {/* 왼쪽: 프로필 이미지 섹션 */}
        <motion.div className="order-1" variants={itemVariants}>
          <ProfileSection />
        </motion.div>

        {/* 오른쪽: 소개 내용 */}
        <motion.div
          className="space-y-6 sm:space-y-8 order-2"
          variants={itemVariants}
        >
          <Introduce />
          {/* 기술 스택 */}
          <TechStack />
          <Contact />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutMe;
