/**
 * Format a last-active value for display.
 * - If the value is a date that falls on yesterday → "Yesterday"
 * - If the value is a parseable date → "DD/MM/YYYY"
 * - Otherwise returns the value as-is (e.g. time "03:17" or already "Yesterday")
 */
/** Time-only pattern (e.g. "03:17") – show as-is */
const TIME_ONLY = /^\d{1,2}:\d{2}(?::\d{2})?$/;

export function formatLastActive(value: string | undefined | null): string {
  if (value == null || value.trim() === "") return "—";

  const trimmed = value.trim();
  if (TIME_ONLY.test(trimmed)) return trimmed;

  const date = new Date(trimmed);

  if (Number.isNaN(date.getTime())) {
    return trimmed;
  }

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  if (isSameDay(date, yesterday)) {
    return "Yesterday";
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
