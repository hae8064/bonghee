export type Lane = { id: string; label: string; sub?: string };
export type TraceTone = "ok" | "fail" | "muted";
/** from === to draws a self-step (internal processing) on that lane. */
export type TraceStep = { from: string; to: string; label: string; tone?: TraceTone };
export type TraceMode = "loop" | "scroll" | "once";
export type TraceProps = {
  lanes: Lane[];
  steps: TraceStep[];
  mode: TraceMode;
  ariaLabel: string;
  /** below this container width (px) the diagram becomes a vertical step list */
  compactBelow?: number;
  colWidth?: number;
};
