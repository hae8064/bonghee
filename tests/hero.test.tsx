import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@/lib/webgl", () => ({ canUseWebGL: () => false }));

import { Hero } from "@/components/hero/Hero";
import { sceneNodes, sceneEdges } from "@/components/hero/scene-graph";

describe("Hero", () => {
  it("shows name and role with static fallback when WebGL is unavailable", () => {
    const { container } = render(<Hero />);
    expect(screen.getByText("이봉희")).toBeInTheDocument();
    expect(screen.getByText(/BACKEND · CLOUD ENGINEER/)).toBeInTheDocument();
    expect(container.querySelector("canvas")).toBeNull();
    expect(container.querySelector("[data-hero-fallback]")).not.toBeNull();
  });

  it("scene edges only reference existing nodes", () => {
    const ids = new Set(sceneNodes.map((n) => n.id));
    for (const [a, b] of sceneEdges) {
      expect(ids.has(a)).toBe(true);
      expect(ids.has(b)).toBe(true);
    }
  });
});
