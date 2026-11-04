import type { ReactNode } from "react";

export function TerminalFrame({ title, children, className = "" }: { title: string; children: ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-xl border border-line bg-term ${className}`}>
      <div className="flex items-center gap-2 border-b border-line/70 px-4 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 truncate font-mono text-[11px] text-mute">{title}</span>
      </div>
      <div className="p-4 sm:p-6">{children}</div>
    </div>
  );
}
