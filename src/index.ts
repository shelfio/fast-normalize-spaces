// @ts-ignore
import {list} from 'white-space-x';

/**
 * This method strips leading and trailing white-space from a string,
 * replaces sequences of whitespace characters by a single space,
 * and returns the resulting string.
 *
 * @param {string} [string] - The string to be normalized.
 * @throws {TypeError} If string is null or undefined or not coercible.
 */
export function normalizeSpaces(string: string): string {
  return replaceAllWhitespaces(string.trim());
}

function replaceAllWhitespaces(string: string): string {
  let finalString = '';

  for (const item of list) {
    const firstIndex = string.indexOf(item.string);
    const lastIndex = string.lastIndexOf(item.string);

    if (firstIndex === lastIndex) {
      continue;
    }

    finalString = `${string.substring(0, firstIndex)} ${string.substring(lastIndex + 1)}`;
  }

  return finalString;
}
