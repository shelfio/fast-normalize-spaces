// @ts-ignore
import {list} from 'white-space-x';

const whiteSpaceSet = new Set<string>(list.map((item: {string: string}) => item.string));

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
  const nonWhiteSpaceStrings = [];

  let currentIsWhiteSpace = true;
  let firstNonWhiteSpaceIndex = -1;
  let lastNonWhiteSpaceIndex = -1;
  for (let i = 0; i < string.length; i++) {
    const char = string[i];
    const isWhitespace = whiteSpaceSet.has(char);

    if (isWhitespace) {
      if (currentIsWhiteSpace) {
        continue;
      } else {
        const sub = string.substring(firstNonWhiteSpaceIndex, lastNonWhiteSpaceIndex + 1);
        nonWhiteSpaceStrings.push(sub);
        currentIsWhiteSpace = true;
      }
    } else {
      if (currentIsWhiteSpace) {
        currentIsWhiteSpace = false;
        firstNonWhiteSpaceIndex = i;
        lastNonWhiteSpaceIndex = i;
      } else {
        lastNonWhiteSpaceIndex = i;
      }
    }
  }
  if (!currentIsWhiteSpace) {
    const sub = string.substring(firstNonWhiteSpaceIndex, lastNonWhiteSpaceIndex + 1);
    nonWhiteSpaceStrings.push(sub);
  }

  return nonWhiteSpaceStrings.join(' ');
}
