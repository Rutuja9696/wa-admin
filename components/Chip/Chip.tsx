"use client";

import "./Chip.css";

export type ChipVariant = "blue" | "orange" | "grey";

export interface ChipProps {
  /** Text to show (e.g. "Demo", "Clients"). "#" is prepended automatically */
  label: string;
  variant?: ChipVariant;
}

function getVariantFromLabel(label: string): ChipVariant {
  const p = label.toLowerCase();
  if (p.includes("demo")) return "blue";
  if (p.includes("client")) return "orange";
  return "grey";
}

export default function Chip({ label, variant }: ChipProps) {
  const displayLabel = label.startsWith("#") ? label : `#${label}`;
  const v = variant ?? getVariantFromLabel(label);
  return (
    <span className={`Chip Chip--${v}`}>
      {displayLabel}
    </span>
  );
}
