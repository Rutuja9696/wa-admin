"use client";

import "./Pill.css";

export interface PillProps {
  /** Label text (e.g. "High", "Priority", or "+2" for overflow) */
  label: string;
  /** Dot color (hex). Omit when overflow is true */
  color?: string;
  /** When true, render as overflow pill (e.g. "+2") with no dot */
  overflow?: boolean;
}

export default function Pill({ label, color, overflow = false }: PillProps) {
  return (
    <span className={`Pill ${overflow ? "Pill--overflow" : ""}`} title={overflow ? undefined : label}>
      {!overflow && color != null && (
        <span
          className="Pill__dot"
          style={{ backgroundColor: color }}
          aria-hidden
        />
      )}
      <span className="Pill__text">{label}</span>
    </span>
  );
}
