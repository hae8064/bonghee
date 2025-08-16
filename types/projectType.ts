interface ProjectDetail {
  overview: string;
  features: string[];
  challenges: string[];
  solutions: string[];
  learnings: string[];
  role: string;
  teamSize?: number;
  images?: ProjectImage[];
  videos?: ProjectVideo[];
  documents?: ProjectDocument[];
}

interface ProjectImage {
  id?: string;
  url?: string;
  alt?: string;
  caption?: string;
  type?: "screenshot" | "diagram" | "mockup" | "wireframe" | "other";
  isNull?: boolean;
}

interface ProjectVideo {
  id: string;
  url: string;
  title: string;
  description?: string;
  type: "demo" | "walkthrough" | "presentation";
}

interface ProjectDocument {
  id: string;
  url: string;
  title: string;
  type: "pdf" | "doc" | "presentation";
  description?: string;
}

interface ProjectType {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  period: string;
  // 상세 정보 (확장 가능)
  detail?: ProjectDetail;
  // 메타데이터 (확장 가능)
  metadata?: {
    category?: "web" | "mobile" | "desktop" | "ai" | "other";
    status?: "completed" | "in-progress" | "planned";
    priority?: "high" | "medium" | "low";
    tags?: string[];
  };
}

export type {
  ProjectType,
  ProjectDetail,
  ProjectImage,
  ProjectVideo,
  ProjectDocument,
};
