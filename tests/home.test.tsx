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
    for (const s of ["qanti", "sso", "sectra-grid", "tile-serving"])
      expect(container.querySelector(`a[href="/cases/${s}"]`)).not.toBeNull();
  });

  it("shows the three projects and final metric values", () => {
    render(<Page />);
    for (const p of ["워크유", "공감블라인드", "dev-reader"]) expect(screen.getAllByText(p).length).toBeGreaterThan(0);
    expect(screen.getByText("187")).toBeInTheDocument();
  });
});
