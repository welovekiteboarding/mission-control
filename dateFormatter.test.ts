import assert from "node:assert/strict";
import test from "node:test";

import { formatDateToReadable } from "./dateFormatter";

test("formatDateToReadable throws due to string map bug", () => {
  const date = new Date("2024-01-02T00:00:00Z");

  assert.throws(() => formatDateToReadable(date), {
    name: "TypeError",
  });
});
