import { describe, it, expect } from "vitest";
import { profile } from "@/content/profile";
import { metrics } from "@/content/metrics";
import { experience } from "@/content/experience";
import { cases, getCase } from "@/content/cases";
import { projects } from "@/content/projects";
import { skills } from "@/content/skills";
import { education } from "@/content/education";

const all = JSON.stringify({ profile, metrics, experience, cases, projects, skills, education });

describe("content rules", () => {
  it("no hospital real names", () => {
    for (const w of ["서울대", "세브란스", "울산대", "강남", "원주", "분당", "snubh", "SNUH", "아산", "삼성서울"])
      expect(all).not.toContain(w);
  });
  it("no phone number", () => expect(all).not.toMatch(/01\d[.\- ]?\d{3,4}[.\- ]?\d{4}/));
  it("no team-lead title", () => expect(all).not.toContain("팀장"));
  it("no sole-authorship claim", () => {
    expect(all).not.toContain("단독 구현");
    expect(all).not.toContain("혼자");
  });
  it("uses On-Prem naming and shows the server-room installs", () => {
    expect(all).not.toContain("폐쇄망");
    expect(profile.heroLine).toContain("On-Prem");
    const q = JSON.stringify(getCase("qanti"));
    expect(q).toContain("서버실");
    expect(q).toContain("직접 설치");
    expect(profile.pillars.map((p) => p.title)).toContain("클라우드 · On-Prem 운영");
  });
  it("cases in order", () =>
    expect(cases.map((c) => c.slug)).toEqual(["qanti", "sso", "annotation-grid", "tile-serving"]));
  it("tile case states Rust is isolation not speed", () => {
    const t = JSON.stringify(getCase("tile-serving"));
    expect(t).toContain("99");
    expect(t).toContain("97");
    expect(t).toContain("격리");
  });
  it("case 03 is framed as annotation results, not a vendor", () => {
    const a = JSON.stringify(getCase("annotation-grid"));
    expect(a).toContain("Annotation");
    expect(a).not.toContain("Sectra");
    expect(JSON.stringify(metrics)).not.toContain("Sectra");
    expect(experience.groups[1].bullets.join(" ")).not.toContain("Sectra");
  });
  it("sectra has measured numbers only", () => {
    const s = JSON.stringify(getCase("annotation-grid"));
    expect(s).toContain("1,618");
    expect(s).toContain("607");
    expect(s).not.toMatch(/1\.9GB[^"]*(초|ms)/);
  });
  it("metrics exact", () =>
    expect(metrics.map((m) => [m.before, m.after])).toEqual([
      ["1.78s", "0.26s"],
      ["25", "187 req/s"],
      ["1.6s", "0.6s"],
      ["5s", "1s 이내"],
      ["1008ms", "97ms"],
      ["175건", "0건"],
    ]));
  it("getCase unknown → undefined", () => expect(getCase("foo")).toBeUndefined());
  it("experience role is backend/infra only", () => expect(experience.role).toBe("백엔드, 인프라"));
});
