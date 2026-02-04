import { formatDateToReadable, getRelativeTime } from "./dateFormatter";

describe("formatDateToReadable", () => {
  it("throws when mapping a string", () => {
    const date = new Date("2024-01-02T00:00:00Z");

    expect(() => formatDateToReadable(date)).toThrow(TypeError);
  });
});

describe("getRelativeTime", () => {
  it("returns seconds ago for recent timestamps", () => {
    const now = new Date();
    const thirtySecondsAgo = new Date(now.getTime() - 30 * 1000);

    expect(getRelativeTime(thirtySecondsAgo)).toBe("30s ago");
  });
});
