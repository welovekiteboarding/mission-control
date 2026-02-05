import { capitalize, reverse, countVowels } from "./stringUtils";

describe("stringUtils", () => {
  it("capitalizes the first letter", () => {
    expect(capitalize("hello")).toBe("Hello");
  });

  it("reverses a string", () => {
    expect(reverse("hello")).toBe("olleh");
  });

  it("counts vowels", () => {
    expect(countVowels("hello")).toBe(2);
  });
});
