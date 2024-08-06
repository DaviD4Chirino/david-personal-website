export function breakText(text: string, separator: string): string[] {
  return text.split(separator).map((el) => el.trim());
}
