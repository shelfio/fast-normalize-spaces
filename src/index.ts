// @ts-ignore
import {list} from 'white-space-x';

const whiteSpaceSet = new Set<string>(list.map((item: {string: string}) => item.string));
const whiteSpaceChars = list.map((item: {string: string}) => item.string).join('');

const nonWhiteSpaceRe = new RegExp(`[^${whiteSpaceChars}]+`, 'g');
const whiteSpaceRe = new RegExp(`[${whiteSpaceChars}]+`, 'g');

/**
 * This method strips leading and trailing white-space from a string,
 * replaces sequences of whitespace characters by a single space,
 * and returns the resulting string.
 *
 * @param {string} [string] - The string to be normalized.
 * @throws {TypeError} If string is null or undefined or not coercible.
 */
export function normalizeSpaces(string: string): string {
  return replaceAllWhitespacesImpl4(string.trim());
}

export function normalizeSpaces1(string: string): string {
  return replaceAllWhitespacesImpl1(string.trim());
}

export function normalizeSpaces2(string: string): string {
  return replaceAllWhitespacesImpl2(string.trim());
}

export function normalizeSpaces3(string: string): string {
  return replaceAllWhitespacesImpl3(string.trim());
}

export function normalizeSpaces4(string: string): string {
  return replaceAllWhitespacesImpl4(string.trim());
}

function replaceAllWhitespacesImpl1(string: string): string {
  const chars: string[] = [];

  let lastIsWhiteSpace = false;
  for (const char of string) {
    const isWhitespace = whiteSpaceSet.has(char);

    if (!isWhitespace) {
      if (lastIsWhiteSpace) {
        chars.push(' ');
      }
      chars.push(char);
    }

    lastIsWhiteSpace = isWhitespace;
  }

  return chars.join('');
}

function replaceAllWhitespacesImpl2(string: string): string {
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

function replaceAllWhitespacesImpl3(string: string): string {
  const matches = string.matchAll(nonWhiteSpaceRe);

  return [...matches].join(' ');
}

function replaceAllWhitespacesImpl4(string: string): string {
  // that's library's impl, but for some reason it's 15-20 % faster
  return string.replace(whiteSpaceRe, ' ');
}
