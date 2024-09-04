export function startsWithVowel(word: string): boolean {
  var vowels = "aeiouAEIOU";
  return vowels.indexOf(word[0]) !== -1;
}

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

export function lerp(a: number, b: number, alpha: number) {
  return a + alpha * (b - a);
}

export function getContrastHex(hexcolor: string) {
  var r = parseInt(hexcolor.substring(1, 3), 16);
  var g = parseInt(hexcolor.substring(3, 5), 16);
  var b = parseInt(hexcolor.substring(5, 7), 16);
  var yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "black" : "white";
}

export function inRange(num: number, min: number, max: number): boolean {
  return num >= min && num <= max;
}

export function paginate(
  array: any[],
  currentPage: number,
  itemsPerPage: number
): Paginate {
  const length: number = array.length;
  return {
    total: Math.ceil(array.length / itemsPerPage),
    per_page: itemsPerPage,
    current_page: currentPage,
    last_page: Math.ceil(length / itemsPerPage),
    from: (currentPage - 1) * itemsPerPage,
    to: currentPage * itemsPerPage,
    items: array.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    ),
  };
}

export function sortAlphabetically(a: string, b: string) {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
}
export function sortByNumberSize(
  a: number,
  b: number,
  order: "bigger" | "lower"
) {
  return order == "bigger" ? (a <= b ? 1 : -1) : a >= b ? 1 : -1;
}
