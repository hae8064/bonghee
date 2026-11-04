import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => cleanup());

// jsdom lacks these browser APIs; components feature-detect them at runtime.
class IO {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() { return []; }
}
const g = globalThis as unknown as { IntersectionObserver?: unknown };
g.IntersectionObserver ??= IO;

import { mockReducedMotion } from "./tests/helpers";
mockReducedMotion(false);
