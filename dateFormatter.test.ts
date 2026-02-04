import assert from "node:assert/strict";

import { formatDateToReadable, getRelativeTime } from "./dateFormatter";

const exampleDate = new Date("2024-01-02T00:00:00Z");

assert.throws(
  () => formatDateToReadable(exampleDate),
  /map/,
  "formatDateToReadable should throw due to the intentional bug"
);

const now = new Date();
const thirtySecondsAgo = new Date(now.getTime() - 30_000);
const relativeResult = getRelativeTime(thirtySecondsAgo);

assert.match(relativeResult, /s ago/, "getRelativeTime should return seconds");
