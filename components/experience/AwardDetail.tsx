import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { AwardType } from "@/types/awardType";

interface AwardDetailProps {
  award: AwardType;
  isOpen: boolean;
  onClose: () => void;
}

const AwardDetail = ({ award, isOpen, onClose }: AwardDetailProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // 이미지 확대 모달 닫기
  const closeImageModal = () => {
    setSelectedImage(null);
  };

  // ESC 키로 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);

      // 모달이 열릴 때 body 스크롤 방지
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      return () => {
        document.removeEventListener("keydown", handleEscape);

        // 모달이 닫힐 때 body 스크롤 복원
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen, onClose]);

  // 바깥 클릭 시 닫기
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
          onClick={handleBackdropClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <motion.div
            ref={modalRef}
            className="bg-gradient-to-br from-[#232323] via-[#2a2a2a] to-[#1a1a1a] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/10"
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 50,
              rotateX: -15,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              rotateX: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: 50,
              rotateX: -15,
            }}
            transition={{
              duration: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94],
              type: "spring",
              stiffness: 100,
              damping: 15,
            }}
          >
            {/* 헤더 */}
            <motion.div
              className="sticky top-0 bg-gradient-to-r from-[#232323] to-[#2a2a2a] p-4 sm:p-6 border-b border-white/10 z-10"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <motion.h2
                    className="text-xl sm:text-2xl font-bold text-white mb-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                  >
                    {award.title}
                  </motion.h2>
                  <motion.p
                    className="text-white/60 text-xs sm:text-sm"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                  >
                    {award.organization} • {award.period}
                  </motion.p>
                </div>
                <motion.button
                  onClick={onClose}
                  className="text-white/60 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </motion.button>
              </div>
            </motion.div>

            {/* 컨텐츠 */}
            <motion.div
              className="p-4 sm:p-6 space-y-6 sm:space-y-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              {/* 수상 내용 설명 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">
                  수상 내용
                </h3>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <p className="text-white/80 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                    {award.description}
                  </p>
                </div>
              </motion.div>

              {/* 수상 이미지들 */}
              {award.images && award.images.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                >
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">
                    관련 이미지
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                    {award.images.map((image, index) => (
                      <motion.div
                        key={index}
                        className="relative h-48 sm:h-64 rounded-lg overflow-hidden cursor-pointer"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          delay: 0.5 + index * 0.1,
                          duration: 0.4,
                        }}
                        onClick={() => setSelectedImage(image.url)}
                        whileHover={{ scale: 1.02 }}
                      >
                        <Image
                          src={image.url}
                          alt={image.alt}
                          fill
                          className="object-contain hover:scale-105 transition-transform duration-200"
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 400px"
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      {/* 이미지 확대 모달 */}
      {selectedImage && (
        <motion.div
          key={selectedImage}
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[60] flex items-center justify-center p-2 sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeImageModal}
        >
          <motion.div
            className="relative max-w-[90vw] max-h-[90vh]"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt="확대된 이미지"
              width={800}
              height={600}
              className="object-contain max-w-full max-h-full rounded-lg"
            />

            {/* 닫기 버튼 */}
            <button
              onClick={closeImageModal}
              className="absolute top-2 sm:top-4 right-2 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors text-sm sm:text-base"
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AwardDetail;
