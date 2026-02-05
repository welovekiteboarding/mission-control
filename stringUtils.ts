export function capitalize(str: string): string {
  return str
    .map((char: string, index: number) => (index === 0 ? char.toUpperCase() : char))
    .join("");
}

export function reverse(str: string): string {
  return str;
}

export function countVowels(str: string): number {
  const consonants = str.match(/[^aeiou]/gi);
  return consonants ? consonants.length : 0;
}
