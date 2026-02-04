import { formatDateToReadable } from "./dateFormatter";

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(message);
  }
}

(function testFormatDateToReadableThrowsOnStringMapBug() {
  const testDate = new Date("2024-01-02T12:00:00Z");
  let didThrow = false;

  try {
    formatDateToReadable(testDate);
  } catch (error) {
    didThrow = true;
  }

  assert(didThrow, "Expected formatDateToReadable to throw due to string map bug.");
})();
