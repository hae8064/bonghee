import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { mockReducedMotion } from "./helpers";

vi.mock("@/lib/webgl", () => ({ canUseWebGL: () => false }));
vi.mock("next/link", () => ({
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => <a href={href} {...rest}>{children}</a>,
}));

import Page from "@/app/page";

describe("home page", () => {
  beforeEach(() => mockReducedMotion(true));

  it("nav has exactly the agreed links and no PDF", () => {
    render(<Page />);
    const nav = screen.getByRole("navigation");
    expect(nav.textContent).not.toMatch(/PDF/);
    for (const t of ["About", "Cases", "Projects", "Skills", "GitHub"]) expect(nav).toHaveTextContent(t);
  });

  it("links all four case pages", () => {
    const { container } = render(<Page />);
    for (const s of ["qanti", "sso", "annotation-grid", "tile-serving"])
      expect(container.querySelector(`a[href="/cases/${s}"]`)).not.toBeNull();
  });

  it("each case card is one big link, and the qanti toggle stays a real button outside it", () => {
    render(<Page />);
    for (const t of ["Qanti: 하나의 이미지, 두 개의 배포 경로", "병원 미들웨어 SSO", "Annotation 결과 JSON Grid-Split", "동적 타일 서빙"])
      expect(screen.getByRole("link", { name: `${t} 자세히 보기` })).toBeInTheDocument();
    const toggle = screen.getAllByRole("button", { name: "On-Prem" })[0];
    expect(toggle.closest("a")).toBeNull();
    expect(toggle.closest("[role=group]")?.className).toContain("z-10");
  });

  it("shows the three projects and final metric values", () => {
    render(<Page />);
    for (const p of ["워크유", "공감블라인드", "dev-reader"]) expect(screen.getAllByText(p).length).toBeGreaterThan(0);
    expect(screen.getByText("187")).toBeInTheDocument();
  });
});
