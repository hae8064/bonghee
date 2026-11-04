export type Metric = {
  label: string;
  before: string;
  after: string;
  /** count-up target shown large */
  to: number;
  decimals?: number;
  unit: string;
  note: string;
};

export type ExperienceGroup = { title: string; bullets: string[] };
export type Experience = { company: string; role: string; period: string; groups: ExperienceGroup[] };

export type CaseSlug = "qanti" | "sso" | "annotation-grid" | "tile-serving";
export type DecisionRow = { decision: string; risk: string };
export type CaseStudy = {
  slug: CaseSlug;
  index: string;
  title: string;
  summary: string;
  period?: string;
  scope?: string;
  problem: string[];
  decisions: DecisionRow[];
  results: string[];
  limits: string[];
  stack: string[];
};

export type Project = {
  name: string;
  period: string;
  role: string;
  summary: string;
  points: string[];
  stack: string[];
  links: { label: string; href: string }[];
};

export type SkillRow = { area: string; items: string; how: string };
export type EduRow = { kind: string; name: string; detail: string; period: string };
