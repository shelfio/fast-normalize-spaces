/* eslint-disable complexity */
const SPACE_CODE = 32;

const WHITESPACES_CODES = new Set<number>([
  9, 10, 11, 12, 13, 32, 160, 5760, 6158, 8192, 8193, 8194, 8195, 8196, 8197, 8198, 8199, 8200,
  8201, 8202, 8232, 8233, 8239, 8287, 12288, 65279,
]);
const WHITESPACES_BITMAP = new Uint8Array(65535).map((_, i) => (WHITESPACES_CODES.has(i) ? 1 : 0));

/**
 * This method strips leading and trailing white-space from a string,
 * replaces sequences of whitespace characters by a single space,
 * and returns the resulting string.
 *
 * @param {string} [string] - The string to be normalized.
 * @throws {TypeError} If string is null or undefined or not coercible.
 */
export function normalizeSpaces(string: string): string {
  const processedChars = new Uint16Array(string.length).fill(SPACE_CODE);

  let lastProcessedIndex = -1;
  let isLastCharWhitespace = 0;

  for (let i = 0; i < string.length; i++) {
    const charCode = string[i].charCodeAt(0);
    const isWhitespace = isWhitespaceCharCode(charCode);

    if (!isWhitespace) {
      lastProcessedIndex++;

      processedChars[lastProcessedIndex] = charCode;
    } else if (!isLastCharWhitespace) {
      lastProcessedIndex++;
    }

    isLastCharWhitespace = isWhitespace;
  }

  // If the original string has whitespaces at the start or at the end, the first and the
  // last processed chars should be single whitespaces, so we need to make offset from both
  // ends to trim they
  const firstChar = processedChars[0];
  const lastChar = processedChars[lastProcessedIndex];

  const startIndex = firstChar === SPACE_CODE ? 1 : 0;
  const endIndex = lastChar === SPACE_CODE ? lastProcessedIndex : lastProcessedIndex + 1;
  const length = (endIndex - startIndex) * Uint16Array.BYTES_PER_ELEMENT;

  return Buffer.from(
    processedChars.buffer,
    startIndex * Uint16Array.BYTES_PER_ELEMENT,
    length
  ).toString('utf16le');
}

function isWhitespaceCharCode(code: number): number {
  return WHITESPACES_BITMAP[code];
}
