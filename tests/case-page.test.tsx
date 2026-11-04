import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { mockReducedMotion } from "./helpers";

const notFound = vi.fn(() => { throw new Error("NEXT_NOT_FOUND"); });
vi.mock("next/navigation", () => ({ notFound: () => notFound() }));
vi.mock("next/link", () => ({
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => <a href={href} {...rest}>{children}</a>,
}));

import CasePage, { generateStaticParams, dynamicParams } from "@/app/cases/[slug]/page";

async function renderSlug(slug: string) {
  const ui = await CasePage({ params: Promise.resolve({ slug }) });
  return render(ui);
}

describe("case detail page", () => {
  beforeEach(() => mockReducedMotion(true));

  it("pre-renders exactly the four cases", async () => {
    expect((await generateStaticParams()).map((p) => p.slug)).toEqual(["qanti", "sso", "annotation-grid", "tile-serving"]);
    expect(dynamicParams).toBe(false);
  });

  it("sso page shows the decision table", async () => {
    await renderSlug("sso");
    expect(screen.getByText("티켓 60초 + jti 1회")).toBeInTheDocument();
  });

  it("prev/next links follow case order", async () => {
    const { container, unmount } = await renderSlug("qanti");
    expect(container.querySelector("[data-prev]")).toBeNull();
    expect(container.querySelector("[data-next]")?.getAttribute("href")).toBe("/cases/sso");
    unmount();
    const r = await renderSlug("tile-serving");
    expect(r.container.querySelector("[data-next]")).toBeNull();
    expect(r.container.querySelector("[data-prev]")?.getAttribute("href")).toBe("/cases/annotation-grid");
  });

  it("unknown slug calls notFound", async () => {
    await expect(renderSlug("foo")).rejects.toThrow("NEXT_NOT_FOUND");
    expect(notFound).toHaveBeenCalled();
  });
});
