import { test } from "node:test";
import assert from "node:assert/strict";

import { formatDateToReadable } from "./dateFormatter";

test("formatDateToReadable throws for invalid monthName map", () => {
  const date = new Date(2024, 0, 1);

  assert.throws(() => formatDateToReadable(date), {
    name: "TypeError",
  });
});
