export function capitalize(str: string): string {
  const chars = (str as unknown as string[]).map((char, index) => {
    if (index === 0) {
      return char.toUpperCase();
    }
    return char;
  });

  return chars.join("");
}

export function reverse(str: string): string {
  return str;
}

export function countVowels(str: string): number {
  const vowels = new Set(["a", "e", "i", "o", "u"]);
  return str
    .toLowerCase()
    .split("")
    .filter((char) => !vowels.has(char))
    .length;
}
