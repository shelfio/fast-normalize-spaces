/* eslint-disable complexity */
const SPACE_CODE = 32;

const WHITESPACES_CODES = new Uint16Array([
  9, 10, 11, 12, 13, 32, 160, 5760, 6158, 8192, 8193, 8194, 8195, 8196, 8197, 8198, 8199, 8200,
  8201, 8202, 8232, 8233, 8239, 8287, 12288, 65279,
]);
const WHITESPACES_BITMAP = createWhitespaceBitmap();

/**
 * Strips leading and trailing white-space from a string,
 * replaces sequences of whitespace characters by a single space,
 * and returns the resulting string.
 *
 * @param {string} [string] - The string to be normalized.
 * @throws {TypeError} If string is null or undefined or not coercible.
 */
export function normalizeSpaces(string: string): string {
  const stringLength = string.length;

  if (stringLength === 0) {
    return '';
  }

  const processedChars = new Uint16Array(stringLength);

  let lastProcessedIndex = 0;
  let isLastCharWhitespace = 1; // Start as whitespace to trim leading spaces
  let mutated = 0;

  for (let i = 0; i < stringLength; i++) {
    const charCode = string.charCodeAt(i);
    const isWhitespace = isWhitespaceCharCode(charCode);

    if (isWhitespace) {
      if (isLastCharWhitespace) {
        mutated = 1;
        continue;
      }

      if (charCode !== SPACE_CODE) {
        mutated = 1;
      }

      processedChars[lastProcessedIndex++] = SPACE_CODE;
      isLastCharWhitespace = 1;
      continue;
    }

    processedChars[lastProcessedIndex++] = charCode;
    isLastCharWhitespace = 0;
  }

  if (lastProcessedIndex === 0) {
    return '';
  }

  if (isLastCharWhitespace) {
    lastProcessedIndex--;
    mutated = 1;
  }

  if (lastProcessedIndex === 0) {
    return '';
  }

  if (!mutated && lastProcessedIndex === stringLength) {
    return string;
  }

  return Buffer.from(
    processedChars.buffer,
    0,
    lastProcessedIndex * Uint16Array.BYTES_PER_ELEMENT
  ).toString('utf16le');
}

function isWhitespaceCharCode(code: number): number {
  return WHITESPACES_BITMAP[code];
}

function createWhitespaceBitmap(): Uint8Array {
  const bitmap = new Uint8Array(65536);

  for (let i = 0; i < WHITESPACES_CODES.length; i++) {
    bitmap[WHITESPACES_CODES[i]] = 1;
  }

  return bitmap;
}
