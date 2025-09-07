"use client";

import React, { useState, useEffect } from "react";
import { projects } from "../common/projectList";
import { educations } from "../common/educationList";
import { workExperiences } from "../common/experienceList";
import { awards } from "../common/awardList";
import { ProjectType } from "@/types/projectType";
import { AwardType } from "@/types/awardType";
import Image from "next/image";

const PDFPortfolio = () => {
  // PDF에서는 모든 프로젝트와 수상이력의 상세 정보를 표시
  const [expandedProjects, setExpandedProjects] = useState<Set<number>>(
    new Set()
  );
  const [expandedAwards, setExpandedAwards] = useState<Set<number>>(new Set());

  return (
    <div className="w-full bg-white text-black max-w-4xl mx-auto">
      {/* 인쇄 안내 */}
      <div className="no-print bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 mx-4 rounded-r-lg">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg
              className="h-6 w-6 text-blue-500 mt-0.5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-base font-semibold text-blue-900 mb-2">
              📄 PDF로 저장하는 방법
            </h3>
            <div className="text-sm text-blue-800 space-y-1">
              <p>
                1️⃣ Ctrl+P (Windows) 또는 Cmd+P (Mac)를 눌러 인쇄 대화상자를
                엽니다
              </p>
              <p>2️⃣ "대상"에서 "PDF로 저장"을 선택합니다</p>
              <p>3️⃣ "저장"을 클릭하여 PDF 파일로 저장합니다</p>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 헤더 */}
      <div className="header gradient-bg text-white p-10 text-center mb-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold tracking-tight">풀스택 개발자</h1>
          <h2 className="text-6xl font-extrabold text-blue-300 tracking-wide">
            이봉희
          </h2>
          <div className="w-24 h-1 bg-blue-400 mx-auto rounded-full"></div>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            프론트엔드부터 백엔드까지, 사용자 중심의 솔루션을 만드는 개발자
          </p>
        </div>
      </div>

      {/* About Me 섹션 */}
      <div className="p-10 bg-gradient-to-br from-gray-50 to-blue-50 mb-8">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-800 mb-3">About Me</h2>
          <div className="w-16 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 프로필 이미지 */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              <div className="w-80 h-80 relative rounded-2xl overflow-hidden border-4 border-blue-500 shadow-2xl">
                <Image
                  src="/images/bonghee.jpg"
                  alt="이봉희 프로필"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl">💻</span>
              </div>
            </div>
          </div>

          {/* 소개 내용 */}
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
                <span className="mr-3">👋</span> 자기소개
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                안녕하세요! 풀스택 개발자 이봉희입니다. 사용자 경험을 최우선으로
                생각하며, 프론트엔드부터 백엔드까지 전 영역에 걸쳐 고품질의 웹
                애플리케이션을 개발하고 있습니다.
              </p>
            </div>

            {/* 기술 스택 */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
                <span className="mr-3">🛠️</span> 기술 스택
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  "React",
                  "Next.js",
                  "TypeScript",
                  "JavaScript",
                  "Node.js",
                  "Express",
                  "MongoDB",
                  "PostgreSQL",
                  "Tailwind CSS",
                  "Framer Motion",
                  "Git",
                  "AWS",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="tech-tag px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 rounded-lg text-sm font-medium text-center shadow-sm hover:shadow-md transition-shadow"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* 연락처 */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
                <span className="mr-3">📞</span> 연락처
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📧</span>
                  <span className="font-medium">bonghee@example.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📱</span>
                  <span className="font-medium">010-1234-5678</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🌐</span>
                  <span className="font-medium">github.com/bonghee</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">💼</span>
                  <span className="font-medium">linkedin.com/in/bonghee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Career & Education 섹션 */}
      <div className="p-10 bg-white mb-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-3">
            Career & Education
          </h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* 경력 */}
          <div>
            <h3 className="text-3xl font-bold mb-8 text-gray-800 flex items-center">
              <span className="mr-3">💼</span> Career
            </h3>
            <div className="space-y-8">
              {workExperiences.map((experience, index) => (
                <div
                  key={experience.id}
                  className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-r-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h4 className="text-xl font-bold text-gray-800 mb-1">
                        {experience.company}
                      </h4>
                      <p className="text-blue-600 text-lg font-semibold">
                        {experience.position}
                      </p>
                    </div>
                    <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                      {experience.period}
                    </span>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {experience.description.map((item, index) => (
                      <li
                        key={index}
                        className="text-gray-700 flex items-start text-base leading-relaxed"
                      >
                        <span className="text-blue-500 mr-3 mt-1 font-bold">
                          ▶
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="tech-tag px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 교육 */}
          <div>
            <h3 className="text-3xl font-bold mb-8 text-gray-800 flex items-center">
              <span className="mr-3">🎓</span> Education
            </h3>
            <div className="space-y-8">
              {educations.map((education) => (
                <div
                  key={education.id}
                  className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 rounded-r-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h4 className="text-xl font-bold text-gray-800 mb-1">
                        {education.school}
                      </h4>
                      <p className="text-green-600 text-lg font-semibold">
                        {education.degree} - {education.major}
                      </p>
                    </div>
                    <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                      {education.period}
                    </span>
                  </div>

                  {education.description && (
                    <p className="text-gray-700 mb-6 text-base leading-relaxed">
                      {education.description}
                    </p>
                  )}

                  {/* 수상이력 */}
                  {education.school === "한국공학대학교" &&
                    awards.length > 0 && (
                      <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-300 rounded-xl p-6">
                        <h5 className="text-lg font-bold text-yellow-800 mb-4 flex items-center">
                          <span className="mr-2">🏆</span> 수상이력
                        </h5>
                        <div className="space-y-4">
                          {awards.map((award, index) => (
                            <div
                              key={index}
                              className="bg-white p-4 rounded-lg shadow-sm"
                            >
                              <p className="font-bold text-yellow-800 text-base mb-2">
                                {award.title}
                              </p>
                              <p className="text-yellow-700 text-sm mb-2">
                                {award.organization} • {award.period}
                              </p>
                              <p className="text-yellow-600 text-sm leading-relaxed">
                                {award.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Projects 섹션 */}
      <div className="p-10 bg-gradient-to-br from-gray-50 to-blue-50 mb-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-3">Projects</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              {/* 프로젝트 헤더 */}
              <div className="flex justify-between items-start mb-6">
                <h4 className="text-2xl font-bold text-gray-800">
                  {project.title}
                </h4>
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  {project.period}
                </span>
              </div>

              {/* 프로젝트 이미지 */}
              {project.imageUrl && (
                <div className="relative h-56 mb-6 rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              {/* 프로젝트 설명 */}
              <p className="text-gray-700 mb-6 text-base leading-relaxed">
                {project.description}
              </p>

              {/* 기술 스택 */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="tech-tag px-3 py-1 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* 상세 정보 (모달 내용을 여기에 포함) */}
              {project.detail && (
                <div className="border-t-2 border-gray-200 pt-6 mt-6 space-y-6">
                  <div className="bg-blue-50 p-4 rounded-xl">
                    <h5 className="text-lg font-bold mb-3 text-blue-800 flex items-center">
                      <span className="mr-2">📋</span> 프로젝트 개요
                    </h5>
                    <p className="text-gray-700 text-base leading-relaxed">
                      {project.detail.overview}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-green-50 p-4 rounded-xl">
                      <h5 className="text-lg font-bold mb-2 text-green-800 flex items-center">
                        <span className="mr-2">👥</span> 팀 구성
                      </h5>
                      <p className="text-gray-700 text-base">
                        {project.detail.teamSize
                          ? `${project.detail.teamSize}명`
                          : "정보 없음"}
                      </p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-xl">
                      <h5 className="text-lg font-bold mb-2 text-purple-800 flex items-center">
                        <span className="mr-2">🎯</span> 내 역할
                      </h5>
                      <p className="text-gray-700 text-base">
                        {project.detail.role}
                      </p>
                    </div>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-xl">
                    <h5 className="text-lg font-bold mb-3 text-orange-800 flex items-center">
                      <span className="mr-2">⚡</span> 핵심 기능
                    </h5>
                    <ul className="space-y-2">
                      {project.detail.features.map((feature, index) => (
                        <li
                          key={index}
                          className="text-gray-700 flex items-start text-base"
                        >
                          <span className="text-orange-500 mr-3 mt-1 font-bold">
                            ▶
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {project.detail.challenges.length > 0 && (
                    <div className="bg-red-50 p-4 rounded-xl">
                      <h5 className="text-lg font-bold mb-3 text-red-800 flex items-center">
                        <span className="mr-2">🚧</span> 주요 이슈 및 해결
                      </h5>
                      <div className="space-y-4">
                        {project.detail.challenges.map((challenge, index) => (
                          <div
                            key={index}
                            className="bg-white p-4 rounded-lg shadow-sm"
                          >
                            <div className="mb-3">
                              <p className="text-red-700 font-semibold mb-1">
                                ⚠️ 이슈:
                              </p>
                              <p className="text-gray-700 text-base leading-relaxed">
                                {challenge}
                              </p>
                            </div>
                            {project.detail?.solutions[index] && (
                              <div>
                                <p className="text-green-700 font-semibold mb-1">
                                  ✅ 해결:
                                </p>
                                <p className="text-gray-700 text-base leading-relaxed">
                                  {project.detail.solutions[index]}
                                </p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {project.detail.learnings.length > 0 && (
                    <div className="bg-yellow-50 p-4 rounded-xl">
                      <h5 className="text-lg font-bold mb-3 text-yellow-800 flex items-center">
                        <span className="mr-2">📚</span> 학습 내용
                      </h5>
                      <ul className="space-y-2">
                        {project.detail.learnings.map((learning, index) => (
                          <li
                            key={index}
                            className="text-gray-700 flex items-start text-base"
                          >
                            <span className="text-yellow-500 mr-3 mt-1 font-bold">
                              💡
                            </span>
                            {learning}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* 프로젝트 이미지들 */}
                  {project.detail.images &&
                    project.detail.images.length > 0 && (
                      <div className="bg-indigo-50 p-4 rounded-xl">
                        <h5 className="text-lg font-bold mb-3 text-indigo-800 flex items-center">
                          <span className="mr-2">🖼️</span> 프로젝트 이미지
                        </h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {project.detail.images.map(
                            (image, index) =>
                              !image.isNull && (
                                <div
                                  key={index}
                                  className="relative h-56 rounded-xl overflow-hidden shadow-lg"
                                >
                                  <Image
                                    src={image.url!}
                                    alt={image.alt!}
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-300"
                                  />
                                </div>
                              )
                          )}
                        </div>
                      </div>
                    )}

                  {/* 프로젝트 영상 */}
                  {project.detail.videos &&
                    project.detail.videos.length > 0 && (
                      <div className="bg-teal-50 p-4 rounded-xl">
                        <h5 className="text-lg font-bold mb-3 text-teal-800 flex items-center">
                          <span className="mr-2">🎬</span> 프로젝트 영상
                        </h5>
                        <div className="space-y-3">
                          {project.detail.videos.map((video, index) => (
                            <div
                              key={index}
                              className="bg-white p-4 rounded-lg shadow-sm border border-teal-200"
                            >
                              <p className="font-bold text-gray-800 text-base mb-2">
                                {video.title}
                              </p>
                              {video.description && (
                                <p className="text-gray-600 text-sm mb-2 leading-relaxed">
                                  {video.description}
                                </p>
                              )}
                              <p className="text-teal-600 text-sm font-medium">
                                🔗 영상 URL: {video.url}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PDFPortfolio;
