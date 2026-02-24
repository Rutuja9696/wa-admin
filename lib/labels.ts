export const LABEL_COLORS = ["#7c3aed", "#17803E", "#dc2626", "#2563eb", "#ca8a04"];

function toLabelString(value: unknown): string {
  if (value == null) return "";
  if (typeof value === "string") return value.trim();
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    const obj = value as Record<string, unknown>;
    const text =
      (typeof obj.item === "string" && obj.item) ||
      (typeof obj.label === "string" && obj.label) ||
      (typeof obj.name === "string" && obj.name) ||
      (typeof obj.value === "string" && obj.value) ||
      (typeof obj.title === "string" && obj.title);
    return text ? text.trim() : "";
  }
  if (Array.isArray(value)) return value.map(toLabelString).filter(Boolean).join(", ");
  return "";
}

export function normalizeLabels(labels: unknown): string[] {
  if (labels == null) return [];
  if (Array.isArray(labels)) {
    return labels
      .map((item) => toLabelString(item))
      .filter((s) => s.length > 0);
  }
  if (typeof labels === "object" && labels !== null) {
    return [toLabelString(labels)].filter(Boolean);
  }
  const s = String(labels).trim();
  if (!s || s === "[object Object]" || s === "[object Array]") return [];
  const byComma = s.split(/[,;|]/).map((part) => part.trim()).filter(Boolean);
  if (byComma.length > 0) return byComma;
  return [s];
}
