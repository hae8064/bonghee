import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { mockReducedMotion } from "./helpers";

vi.mock("@/lib/webgl", () => ({ canUseWebGL: () => true }));
vi.mock("@/components/hero/ArchitectureScene", () => ({
  default: () => {
    throw new Error("Error creating WebGL context.");
  },
}));

import { Hero } from "@/components/hero/Hero";
import { QantiPipeline } from "@/components/cases/QantiPipeline";
import { gridViewBox } from "@/components/cases/GridSplit";

describe("review fixes", () => {
  it("hero falls back instead of crashing when the WebGL context cannot be created", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const { container } = render(<Hero />);
    expect(await screen.findByText("이봉희")).toBeInTheDocument();
    await vi.waitFor(() => expect(container.querySelector("[data-hero-fallback]")).not.toBeNull());
  });

  it("qanti env parts are not hidden by the toggle morph on first mount", () => {
    mockReducedMotion(false);
    const { container } = render(<QantiPipeline variant="full" />);
    container.querySelectorAll<HTMLElement>("[data-env-part]").forEach((el) => expect(el.style.opacity).not.toBe("0"));
  });

  it("grid split crops to the grid on narrow screens", () => {
    expect(gridViewBox(1000)).toBe("0 0 600 270");
    expect(gridViewBox(320)).toBe("318 18 244 262");
  });
});
