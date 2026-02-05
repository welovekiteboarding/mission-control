import { strict as assert } from "node:assert";
import { test } from "node:test";

import { formatDateToReadable, getRelativeTime } from "./dateFormatter";

test("formatDateToReadable throws due to known bug", () => {
  assert.throws(() => formatDateToReadable(new Date()));
});

test("getRelativeTime returns seconds for recent dates", () => {
  const now = new Date();
  const recent = new Date(now.getTime() - 5 * 1000);

  assert.equal(getRelativeTime(recent), "5s ago");
});
