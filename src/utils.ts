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

export function toPascalCase(str: string) {
  return (str.match(/[a-zA-Z0-9]+/g) || [])
    .map((w) => `${w.charAt(0).toUpperCase()}${w.slice(1)}`)
    .join("");
}

export function paginateArray(arr: any[], count: number, page: number): any[] {
  const newArr: any[] = arr.slice((page - 1) * count, page * count);
  return newArr;
}

/**
 * Returns a number whose value is limited to the given range.
 *
 * Example: limit the output of this computation to between 0 and 255
 * (x * 255).clamp(0, 255)
 *
 * @param {Number} value The current value you want to bound
 * @param {Number} min The lower boundary of the output range
 * @param {Number} max The upper boundary of the output range
 * @returns A number in the range [min, max]
 * @type Number
 */
export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
