import assert from "node:assert/strict";
import { test } from "node:test";

import { formatDateToReadable, getRelativeTime } from "./dateFormatter";

test("formatDateToReadable throws due to invalid string map", () => {
  assert.throws(() => formatDateToReadable(new Date("2024-01-02T00:00:00Z")));
});

test("getRelativeTime returns seconds for recent dates", () => {
  const fiveSecondsAgo = new Date(Date.now() - 5_000);
  const result = getRelativeTime(fiveSecondsAgo);

  assert.match(result, /^\d+s ago$/);
});
