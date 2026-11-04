import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { mockReducedMotion } from "./helpers";
import { TraceDiagram } from "@/components/diagram/TraceDiagram";
import type { Lane, TraceStep } from "@/components/diagram/types";

const lanes: Lane[] = [
  { id: "mw", label: "병원 미들웨어" },
  { id: "br", label: "브라우저" },
  { id: "an", label: "분석 서버" },
  { id: "ims", label: "IMS" },
];
const steps: TraceStep[] = [
  { from: "mw", to: "br", label: "s1" },
  { from: "br", to: "an", label: "s2" },
  { from: "an", to: "ims", label: "s3" },
  { from: "ims", to: "an", label: "s4" },
  { from: "an", to: "br", label: "s5" },
  { from: "br", to: "ims", label: "s6" },
  { from: "ims", to: "br", label: "s7" },
  { from: "br", to: "mw", label: "s8 fail", tone: "fail" },
];

describe("TraceDiagram", () => {
  beforeEach(() => mockReducedMotion(false));

  it("renders every lane and step label as text", () => {
    render(<TraceDiagram lanes={lanes} steps={steps} mode="once" ariaLabel="테스트 흐름" />);
    for (const l of lanes) expect(screen.getAllByText(l.label).length).toBeGreaterThan(0);
    for (const s of steps) expect(screen.getByText(s.label)).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "테스트 흐름" })).toBeInTheDocument();
  });

  it("shows the finished diagram when reduced motion is on", () => {
    mockReducedMotion(true);
    const { container } = render(<TraceDiagram lanes={lanes} steps={steps} mode="loop" ariaLabel="x" />);
    const g = container.querySelectorAll("[data-step]");
    expect(g.length).toBe(8);
    g.forEach((el) => expect(el.getAttribute("opacity")).toBe("1"));
  });

  it("draws fail steps in the fail color", () => {
    const { container } = render(<TraceDiagram lanes={lanes} steps={steps} mode="once" ariaLabel="x" />);
    const last = container.querySelectorAll("[data-step]")[7];
    expect(last.querySelector("[data-line]")?.getAttribute("stroke")).toBe("var(--fail)");
  });
});
