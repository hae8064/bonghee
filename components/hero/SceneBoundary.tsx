"use client";

import { Component, type ReactNode } from "react";

/** WebGL can pass the probe and still fail at context creation (GPU blocklist, context limit). Fall back instead of crashing the page. */
export class SceneBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
