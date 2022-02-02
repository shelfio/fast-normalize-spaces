// @ts-ignore
import {list} from 'white-space-x';
import {Buffer} from 'buffer';

const whiteSpaceSet = new Set<string>(list.map((item: {string: string}) => item.string));
const whiteSpaceCodeSet = new Set<number>(list.map((item: {code: number}) => item.code));
const whiteSpaceChars = list.map((item: {string: string}) => item.string).join('');

const nonWhiteSpaceRe = new RegExp(`[^${whiteSpaceChars}]+`, 'g');
const whiteSpaceRe = new RegExp(`[${whiteSpaceChars}]+`, 'g');

const SPACE_CODE = 32;

/**
 * This method strips leading and trailing white-space from a string,
 * replaces sequences of whitespace characters by a single space,
 * and returns the resulting string.
 *
 * @param {string} [string] - The string to be normalized.
 * @throws {TypeError} If string is null or undefined or not coercible.
 */
export function normalizeSpaces(string: string): string {
  return replaceAllWhitespacesImpl6(string.trim());
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

export function normalizeSpaces5(string: string): string {
  return replaceAllWhitespacesImpl5(string.trim());
}

export function normalizeSpaces6(string: string): string {
  return replaceAllWhitespacesImpl6(string.trim());
}

export function normalizeSpaces7(string: string): string {
  const chars = Buffer.from(string);
  const processedChars = Buffer.alloc(chars.length, SPACE_CODE);

  let lastProcessedIndex = -1;
  let isLastCharWhitespace = false;

  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    const isWhitespace =
      char === 32 ||
      char === 10 ||
      char === 11 ||
      char === 12 ||
      char === 13 ||
      char === 9 ||
      char === 160 ||
      char === 5760 ||
      char === 6158 ||
      char === 8192 ||
      char === 8193 ||
      char === 8194 ||
      char === 8195 ||
      char === 8196 ||
      char === 8197 ||
      char === 8198 ||
      char === 8199 ||
      char === 8200 ||
      char === 8201 ||
      char === 8202 ||
      char === 8232 ||
      char === 8233 ||
      char === 8239 ||
      char === 8287 ||
      char === 12288 ||
      char === 65279;

    if (!isWhitespace) {
      lastProcessedIndex++;

      processedChars[lastProcessedIndex] = char;
    } else {
      if (isLastCharWhitespace) {
        continue;
      }

      lastProcessedIndex++;
    }

    isLastCharWhitespace = isWhitespace;
  }

  // Removes whitespaces from both ends of a string
  const firstChar = processedChars[0];
  const lastChar = processedChars[lastProcessedIndex];

  const startIndex = firstChar === SPACE_CODE ? 1 : 0;
  const endIndex = lastChar === SPACE_CODE ? lastProcessedIndex : lastProcessedIndex + 1;

  return processedChars.toString('utf-8', startIndex, endIndex);
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

function replaceAllWhitespacesImpl5(string: string): string {
  return string.split(whiteSpaceRe).join(' ');
}

function replaceAllWhitespacesImpl6(string: string): string {
  // this actually has 2x smaller memory footprint, but is slower :)
  const bufferFrom = Buffer.from(string, 'utf-8');
  const bufferTo = Buffer.alloc(bufferFrom.length + 1, ' ', 'utf-8');

  let lastIsWhiteSpace = false;
  let index = 0;
  for (const charCode of bufferFrom) {
    const isWhitespace = whiteSpaceCodeSet.has(charCode);

    if (!isWhitespace) {
      if (lastIsWhiteSpace) {
        bufferTo.writeUInt16LE(0x0020, index++);
      }
      bufferTo.writeUInt16LE(charCode, index++);
    }

    lastIsWhiteSpace = isWhitespace;
  }

  return bufferTo.toString('utf-8', 0, index);
}
