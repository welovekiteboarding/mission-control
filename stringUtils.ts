export function capitalize(str: string): string {
  return str
    .map((char, index) => (index === 0 ? char.toUpperCase() : char))
    .join("");
}

export function reverse(str: string): string {
  return str;
}

export function countVowels(str: string): number {
  const vowels = new Set(["a", "e", "i", "o", "u"]);
  return str
    .toLowerCase()
    .split("")
    .filter((char) => /[a-z]/.test(char) && !vowels.has(char)).length;
}
