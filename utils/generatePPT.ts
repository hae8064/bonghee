import PptxGenJS from "pptxgenjs";
import { projects } from "@/common/projectList";
import { workExperiences } from "@/common/experienceList";
import { educations } from "@/common/educationList";
import { certifications } from "@/common/certificationList";
import { awards } from "@/common/awardList";

export const generatePPT = async () => {
  const pptx = new PptxGenJS();

  // 슬라이드 크기 설정
  pptx.layout = "LAYOUT_WIDE";
  pptx.defineLayout({ name: "CUSTOM", width: 10, height: 7.5 });
  pptx.layout = "CUSTOM";

  // 색상 테마 설정
  const colors = {
    primary: "363636",
    secondary: "2A2A2A",
    accent: "7877C6",
    text: "FFFFFF",
    textSecondary: "CCCCCC",
  };

  // 슬라이드 1: 타이틀 슬라이드
  const titleSlide = pptx.addSlide();
  titleSlide.background = { color: colors.primary };
  titleSlide.addText("이봉희", {
    x: 1,
    y: 2,
    w: 8,
    h: 1.5,
    fontSize: 64,
    bold: true,
    color: colors.text,
    align: "center",
  });
  titleSlide.addText("풀스택 개발자", {
    x: 1,
    y: 3.5,
    w: 8,
    h: 0.8,
    fontSize: 32,
    color: colors.textSecondary,
    align: "center",
  });
  titleSlide.addText("프론트엔드부터 백엔드까지, 사용자 중심의 솔루션을 만드는 개발자", {
    x: 1,
    y: 4.5,
    w: 8,
    h: 0.8,
    fontSize: 18,
    color: colors.textSecondary,
    align: "center",
  });

  // 슬라이드 2: About Me
  const aboutSlide = pptx.addSlide();
  aboutSlide.background = { color: colors.primary };
  aboutSlide.addText("About Me", {
    x: 0.5,
    y: 0.5,
    w: 9,
    h: 0.8,
    fontSize: 44,
    bold: true,
    color: colors.text,
  });

  const aboutText = [
    "안녕하세요! 프론트엔드부터 백엔드, DevOps까지 아우르는 풀스택 개발자 이봉희입니다.",
    "모노레포 환경 도입 및 디자인 시스템, Storybook 도입을 통한 디자인팀과 협업 개선 및 개발 생산성 향상 경험이 있습니다.",
    "약 2GB 정도의 대용량 이미지를 다루는 프로젝트에서 비동기 큐 및 비동기 스레드 방식 도입 및 웹소켓을 통해 타임아웃 데이터 0건, 데이터 안정성 확보 하였습니다.",
    "Git Action, AWS ECS, ECR 파이프라인 구축을 통한 자동화 배포 환경을 구축한 경험이 있습니다.",
    "클라우드 환경에서 배포 이외에도 병원과 같은 On-Premise 환경에서 서비스를 구축 한 경험이 있습니다.",
  ];

  let yPos = 1.5;
  aboutText.forEach((text, index) => {
    aboutSlide.addText(`• ${text}`, {
      x: 0.5,
      y: yPos,
      w: 9,
      h: 0.6,
      fontSize: 14,
      color: colors.textSecondary,
      bullet: { type: "number", code: "1." },
    });
    yPos += 0.7;
  });

  // 슬라이드 3: Career
  const careerSlide = pptx.addSlide();
  careerSlide.background = { color: colors.primary };
  careerSlide.addText("Career", {
    x: 0.5,
    y: 0.5,
    w: 9,
    h: 0.8,
    fontSize: 44,
    bold: true,
    color: colors.text,
  });

  workExperiences.forEach((exp, index) => {
    if (index > 0) {
      const slide = pptx.addSlide();
      slide.background = { color: colors.primary };
      slide.addText("Career", {
        x: 0.5,
        y: 0.5,
        w: 9,
        h: 0.8,
        fontSize: 44,
        bold: true,
        color: colors.text,
      });
      addCareerContent(slide, exp, colors);
    } else {
      addCareerContent(careerSlide, exp, colors);
    }
  });

  // 슬라이드: Education
  educations.forEach((edu) => {
    const eduSlide = pptx.addSlide();
    eduSlide.background = { color: colors.primary };
    eduSlide.addText("Education", {
      x: 0.5,
      y: 0.5,
      w: 9,
      h: 0.8,
      fontSize: 44,
      bold: true,
      color: colors.text,
    });

    eduSlide.addText(edu.school, {
      x: 0.5,
      y: 1.5,
      w: 9,
      h: 0.8,
      fontSize: 32,
      bold: true,
      color: colors.text,
    });

    eduSlide.addText(`${edu.degree} - ${edu.major}`, {
      x: 0.5,
      y: 2.3,
      w: 9,
      h: 0.6,
      fontSize: 20,
      color: colors.accent,
    });

    eduSlide.addText(edu.period, {
      x: 0.5,
      y: 3,
      w: 9,
      h: 0.5,
      fontSize: 16,
      color: colors.textSecondary,
    });

    if (edu.description) {
      eduSlide.addText(edu.description, {
        x: 0.5,
        y: 3.8,
        w: 9,
        h: 2,
        fontSize: 14,
        color: colors.textSecondary,
      });
    }
  });

  // 슬라이드: Certification
  if (certifications.length > 0) {
    const certSlide = pptx.addSlide();
    certSlide.background = { color: colors.primary };
    certSlide.addText("Certification", {
      x: 0.5,
      y: 0.5,
      w: 9,
      h: 0.8,
      fontSize: 44,
      bold: true,
      color: colors.text,
    });

    certifications.forEach((cert, index) => {
      const yPos = 1.5 + index * 1.5;
      certSlide.addText(cert.name, {
        x: 0.5,
        y: yPos,
        w: 9,
        h: 0.6,
        fontSize: 28,
        bold: true,
        color: colors.text,
      });

      certSlide.addText(cert.issuer, {
        x: 0.5,
        y: yPos + 0.6,
        w: 9,
        h: 0.5,
        fontSize: 18,
        color: colors.accent,
      });

      certSlide.addText(cert.period, {
        x: 0.5,
        y: yPos + 1.1,
        w: 9,
        h: 0.4,
        fontSize: 14,
        color: colors.textSecondary,
      });
    });
  }

  // 슬라이드: 수상이력
  if (awards.length > 0) {
    awards.forEach((award) => {
      const awardSlide = pptx.addSlide();
      awardSlide.background = { color: colors.primary };
      awardSlide.addText("수상이력", {
        x: 0.5,
        y: 0.5,
        w: 9,
        h: 0.8,
        fontSize: 44,
        bold: true,
        color: colors.text,
      });

      awardSlide.addText(award.title, {
        x: 0.5,
        y: 1.5,
        w: 9,
        h: 0.8,
        fontSize: 32,
        bold: true,
        color: colors.text,
      });

      awardSlide.addText(`${award.organization} • ${award.period}`, {
        x: 0.5,
        y: 2.3,
        w: 9,
        h: 0.5,
        fontSize: 18,
        color: colors.textSecondary,
      });

      awardSlide.addText(award.description, {
        x: 0.5,
        y: 3,
        w: 9,
        h: 3,
        fontSize: 14,
        color: colors.textSecondary,
        valign: "top",
      });
    });
  }

  // 슬라이드: Projects
  projects.forEach((project) => {
    const projectSlide = pptx.addSlide();
    projectSlide.background = { color: colors.primary };
    projectSlide.addText("Projects", {
      x: 0.5,
      y: 0.5,
      w: 9,
      h: 0.8,
      fontSize: 44,
      bold: true,
      color: colors.text,
    });

    projectSlide.addText(project.title, {
      x: 0.5,
      y: 1.3,
      w: 9,
      h: 0.6,
      fontSize: 28,
      bold: true,
      color: colors.text,
    });

    projectSlide.addText(project.period, {
      x: 0.5,
      y: 1.9,
      w: 9,
      h: 0.4,
      fontSize: 14,
      color: colors.textSecondary,
    });

    projectSlide.addText(project.description, {
      x: 0.5,
      y: 2.5,
      w: 9,
      h: 0.8,
      fontSize: 16,
      color: colors.textSecondary,
    });

    // 기술 스택
    if (project.technologies.length > 0) {
      const techText = project.technologies.join(" • ");
      projectSlide.addText(`기술: ${techText}`, {
        x: 0.5,
        y: 3.5,
        w: 9,
        h: 0.6,
        fontSize: 14,
        color: colors.accent,
      });
    }

    // 프로젝트 상세 정보
    if (project.detail) {
      let detailY = 4.3;

      if (project.detail.overview) {
        projectSlide.addText("프로젝트 설명", {
          x: 0.5,
          y: detailY,
          w: 9,
          h: 0.5,
          fontSize: 18,
          bold: true,
          color: colors.text,
        });
        detailY += 0.6;

        projectSlide.addText(project.detail.overview, {
          x: 0.5,
          y: detailY,
          w: 9,
          h: 1.5,
          fontSize: 12,
          color: colors.textSecondary,
          valign: "top",
        });
        detailY += 1.8;
      }

      if (project.detail.role) {
        projectSlide.addText(`역할: ${project.detail.role}`, {
          x: 0.5,
          y: detailY,
          w: 9,
          h: 0.4,
          fontSize: 14,
          color: colors.textSecondary,
        });
        detailY += 0.5;
      }

      if (project.detail.features && project.detail.features.length > 0) {
        projectSlide.addText("핵심 기술 및 구현", {
          x: 0.5,
          y: detailY,
          w: 9,
          h: 0.5,
          fontSize: 18,
          bold: true,
          color: colors.text,
        });
        detailY += 0.6;

        project.detail.features.forEach((feature) => {
          projectSlide.addText(`• ${feature}`, {
            x: 0.5,
            y: detailY,
            w: 9,
            h: 0.4,
            fontSize: 12,
            color: colors.textSecondary,
            bullet: true,
          });
          detailY += 0.5;
        });
      }

      if (project.detail.learnings && project.detail.learnings.length > 0) {
        projectSlide.addText("학습한 내용", {
          x: 0.5,
          y: detailY,
          w: 9,
          h: 0.5,
          fontSize: 18,
          bold: true,
          color: colors.text,
        });
        detailY += 0.6;

        project.detail.learnings.forEach((learning) => {
          projectSlide.addText(`• ${learning}`, {
            x: 0.5,
            y: detailY,
            w: 9,
            h: 0.4,
            fontSize: 12,
            color: colors.textSecondary,
            bullet: true,
          });
          detailY += 0.5;
        });
      }
    }
  });

  // 파일 저장
  await pptx.writeFile({ fileName: "이봉희_포트폴리오.pptx" });
};

function addCareerContent(slide: any, exp: any, colors: any) {
  slide.addText(exp.company, {
    x: 0.5,
    y: 1.5,
    w: 9,
    h: 0.8,
    fontSize: 32,
    bold: true,
    color: colors.text,
  });

  slide.addText(exp.position, {
    x: 0.5,
    y: 2.3,
    w: 9,
    h: 0.6,
    fontSize: 20,
    color: colors.accent,
  });

  slide.addText(exp.period, {
    x: 0.5,
    y: 3,
    w: 9,
    h: 0.5,
    fontSize: 16,
    color: colors.textSecondary,
  });

  let yPos = 3.8;
  exp.description.forEach((desc: string) => {
    slide.addText(`• ${desc}`, {
      x: 0.5,
      y: yPos,
      w: 9,
      h: 0.5,
      fontSize: 14,
      color: colors.textSecondary,
      bullet: true,
    });
    yPos += 0.6;
  });

  if (exp.technologies && exp.technologies.length > 0) {
    const techText = exp.technologies.join(" • ");
    slide.addText(`기술: ${techText}`, {
      x: 0.5,
      y: yPos + 0.2,
      w: 9,
      h: 0.5,
      fontSize: 14,
      color: colors.accent,
    });
  }
}

