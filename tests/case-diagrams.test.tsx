import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { mockReducedMotion } from "./helpers";
import { QantiPipeline } from "@/components/cases/QantiPipeline";
import { SsoSequence } from "@/components/cases/SsoSequence";
import { TileServing } from "@/components/cases/TileServing";
import { GridSplit } from "@/components/cases/GridSplit";
import { caseDiagram } from "@/components/cases/diagrams";

describe("case diagrams", () => {
  beforeEach(() => mockReducedMotion(true));

  it("Qanti toggle swaps cloud parts for closed-network parts", () => {
    render(<QantiPipeline variant="full" />);
    expect(screen.getByText("AWS SQS")).toBeInTheDocument();
    const closed = screen.getByRole("button", { name: "폐쇄망" });
    expect(closed.tagName).toBe("BUTTON");
    expect(closed).toHaveAttribute("aria-pressed", "false");
    fireEvent.click(closed);
    expect(screen.getByText("RabbitMQ")).toBeInTheDocument();
    expect(screen.queryByText("AWS SQS")).toBeNull();
    expect(closed).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText(/10곳/)).toBeInTheDocument();
  });

  it("SSO full shows all eight steps", () => {
    render(<SsoSequence variant="full" />);
    for (const n of ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧"])
      expect(screen.getByText(new RegExp(n))).toBeInTheDocument();
    expect(screen.getByText(/① 티켓 발급/)).toBeInTheDocument();
    expect(screen.getByText(/⑧ 세션 토큰/)).toBeInTheDocument();
  });

  it("Tile serving shows the four p95 stages", () => {
    render(<TileServing variant="full" />);
    for (const v of ["1008", "310", "99", "97"]) expect(screen.getAllByText(new RegExp(`^${v}ms$`)).length).toBeGreaterThan(0);
  });

  it("Grid split draws a 10x10 grid", () => {
    const { container } = render(<GridSplit variant="full" />);
    expect(container.querySelectorAll("[data-cell]").length).toBe(100);
    expect(screen.getByText(/1,618ms → 607ms/)).toBeInTheDocument();
  });

  it("caseDiagram maps every slug", () => {
    for (const s of ["qanti", "sso", "annotation-grid", "tile-serving"] as const) {
      const { unmount } = render(caseDiagram(s, "preview"));
      unmount();
    }
  });
});
