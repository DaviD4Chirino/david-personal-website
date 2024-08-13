/**
 * Erases all special characters in a text and replaces them with spaces
 * @param text
 * @returns
 */
export function cleanString(text: string): string {
  return text.replaceAll(/[\W_]/gm, " ");
}

export function breakText(text: string, separator: string): string[] {
  return text.split(separator).map((el) => el.trim());
}
export function toSnakeCase(text: string): string {
  return text.toLowerCase().replaceAll(" ", "_");
}

export function toKebabCase(text: string): string {
  return text.toLowerCase().replaceAll(" ", "-");
}
export function capitalize(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getRandomInArray(arr: any[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function paginateArray(arr: any[], count: number, page: number): any[] {
  const newArr: any[] = arr.slice((page - 1) * count, page * count);
  return newArr;
}
