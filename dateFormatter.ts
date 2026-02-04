/**
 * Formats a date to a readable string
 */
export function formatDateToReadable(date: Date): string {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // BUG: Using .map() on a string (wrong - only works on arrays)
  const monthName = months[date.getMonth()].map((char) => char.toUpperCase());

  const day = date.getDate();
  const year = date.getFullYear();

  return `${monthName} ${day}, ${year}`;
}

// Export a helper function
export function getRelativeTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);

  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}
