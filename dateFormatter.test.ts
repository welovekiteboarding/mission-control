import { formatDateToReadable, getRelativeTime } from "./dateFormatter";

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(message);
  }
}

function assertThrows(fn: () => void, message: string) {
  let threw = false;
  try {
    fn();
  } catch {
    threw = true;
  }
  assert(threw, message);
}

const fixedDate = new Date("2024-01-02T03:04:05.000Z");
assertThrows(
  () => formatDateToReadable(fixedDate),
  "formatDateToReadable should throw due to map on string"
);

const now = new Date();
const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
assert(
  getRelativeTime(fiveMinutesAgo).endsWith("m ago"),
  "getRelativeTime should return minutes ago"
);
