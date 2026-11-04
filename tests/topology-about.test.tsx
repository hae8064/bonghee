import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { mockReducedMotion } from "./helpers";

vi.mock("next/image", () => ({
  default: ({ src, alt, ...rest }: { src: string; alt: string }) => <img src={typeof src === "string" ? src : ""} alt={alt} {...rest} />,
}));

import { QantiTopology } from "@/components/cases/QantiTopology";
import { About } from "@/components/sections/About";

describe("Qanti deployment topology", () => {
  beforeEach(() => mockReducedMotion(true));

  it("shows the containers and all nine flows", () => {
    const { container } = render(<QantiTopology />);
    for (const t of ["web · Next.js", "ims · Spring Boot", "analysis · FastAPI", "ai · FastAPI", "mongo · MongoDB", "Nginx", "UFW 방화벽"])
      expect(screen.getAllByText(t).length).toBeGreaterThan(0);
    expect(container.querySelectorAll("[data-flow]").length).toBe(9);
    expect(container.querySelectorAll("ol[data-legend] li").length).toBe(9);
  });

  it("does not identify the hospital or vendors", () => {
    const { container } = render(<QantiTopology />);
    const text = container.textContent ?? "";
    expect(text).not.toMatch(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/);
    for (const w of ["서울대", "snuh", "SNUH", "SPAC", "AhnLab", "V3", "pathoaid", "aivis", "patho-"]) expect(text).not.toContain(w);
  });
});

describe("About profile", () => {
  it("has photo, name and contacts", () => {
    render(<About />);
    expect(screen.getByAltText("이봉희 프로필 사진")).toBeInTheDocument();
    expect(screen.getAllByText("이봉희").length).toBeGreaterThan(0);
    expect(document.querySelector('a[href="mailto:hae8064@gmail.com"]')).not.toBeNull();
    expect(document.querySelector('a[href="https://github.com/hae8064"]')).not.toBeNull();
  });
});
