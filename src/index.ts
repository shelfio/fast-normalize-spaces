// @ts-ignore
import {list} from 'white-space-x';
import {Buffer} from 'buffer';
import intoStream from 'into-stream';
import {execSync} from 'child_process';
import {Worker} from 'worker_threads';
import path from 'path';

const whiteSpaceSet = new Set<string>(list.map((item: {string: string}) => item.string));
const whiteSpaceCodeSet = new Set<number>(list.map((item: {code: number}) => item.code));
const whiteSpaceChars = list.map((item: {string: string}) => item.string).join('');

const whiteSpaceIndexedArray = Array.from({length: 0xffff}, (_, i) => whiteSpaceCodeSet.has(i));
const whiteSpaceIndexedUint8Array = new Uint8Array(65535).map((_, i) =>
  whiteSpaceCodeSet.has(i) ? 1 : 0
);
const whiteSpaceNumberIndexArray = Buffer.alloc(65535).map((_, i) =>
  whiteSpaceCodeSet.has(i) ? 1 : 0
);

const nonWhiteSpaceRe = new RegExp(`[^${whiteSpaceChars}]+`, 'g');
const whiteSpaceRe = new RegExp(`[${whiteSpaceChars}]+`, 'g');

const SPACE_CODE = 32;

const workerPath = path.resolve(__dirname, '../lib/worker.js');

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
    const isWhitespace = isWhiteSpaceCharCode(char);

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

  // If the original string has whitespaces at the start or at the end, the first and the
  // last processed chars should be single whitespaces, so we need to make offset from both
  // ends to trim they
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

export async function normalizeSpaces8(string: string): Promise<string> {
  const stringStream = intoStream(string);

  let chunk;
  let resultingString = '';

  stringStream.on('readable', () => {
    while (null !== (chunk = stringStream.read(string.length > 8192 ? 8192 : string.length))) {
      const chunkStr = chunk.toString();
      const normalizedStringChunk = normalizeSpaces7(chunkStr);
      resultingString += normalizedStringChunk;

      if (
        isWhiteSpaceCharCode(chunkStr.charCodeAt(chunkStr.length - 1)) &&
        !isWhiteSpaceCharCode(resultingString.charCodeAt(resultingString.length - 1))
      ) {
        resultingString += ' ';
      }
    }
  });

  await new Promise(resolve => stringStream.on('end', resolve));

  return resultingString.trim();
}

export function normalizeSpaces9(string: string): string {
  const chars = Buffer.from(string);
  const processedChars = Buffer.alloc(chars.length, SPACE_CODE);

  let lastProcessedIndex = -1;
  let isLastCharWhitespace = false;

  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    const isWhitespace = isWhiteSpaceCharCodeIndexedArray(char);

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

  // If the original string has whitespaces at the start or at the end, the first and the
  // last processed chars should be single whitespaces, so we need to make offset from both
  // ends to trim they
  const firstChar = processedChars[0];
  const lastChar = processedChars[lastProcessedIndex];

  const startIndex = firstChar === SPACE_CODE ? 1 : 0;
  const endIndex = lastChar === SPACE_CODE ? lastProcessedIndex : lastProcessedIndex + 1;

  return processedChars.toString('utf-8', startIndex, endIndex);
}

export function normalizeSpaces10(string: string): string {
  const chars = Buffer.from(string);
  const processedChars = Buffer.alloc(chars.length, SPACE_CODE);

  let lastProcessedIndex = -1;
  let isLastCharWhitespace = 0;

  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    const isWhitespace = isWhiteSpaceCharCodeNumber(char);

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

  // If the original string has whitespaces at the start or at the end, the first and the
  // last processed chars should be single whitespaces, so we need to make offset from both
  // ends to trim they
  const firstChar = processedChars[0];
  const lastChar = processedChars[lastProcessedIndex];

  const startIndex = firstChar === SPACE_CODE ? 1 : 0;
  const endIndex = lastChar === SPACE_CODE ? lastProcessedIndex : lastProcessedIndex + 1;

  return processedChars.toString('utf-8', startIndex, endIndex);
}

export function normalizeSpaces11(string: string): string {
  const chars = Buffer.from(string);
  const processedChars = Buffer.alloc(chars.length, SPACE_CODE);

  let lastProcessedIndex = -1;
  let isLastCharWhitespace = 0;

  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    const isWhitespace = isWhiteSpaceCharCodeIndexedUint8Array(char);

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

  // If the original string has whitespaces at the start or at the end, the first and the
  // last processed chars should be single whitespaces, so we need to make offset from both
  // ends to trim they
  const firstChar = processedChars[0];
  const lastChar = processedChars[lastProcessedIndex];

  const startIndex = firstChar === SPACE_CODE ? 1 : 0;
  const endIndex = lastChar === SPACE_CODE ? lastProcessedIndex : lastProcessedIndex + 1;

  return processedChars.toString('utf-8', startIndex, endIndex);
}

export function normalizeSpaces12(text: string): string {
  const res = execSync(`tr -s "[:space:]" | tr "[:space:][:space:]" " " | tr -s "[:space:]"`, {
    maxBuffer: 999999999999,
    input: text,
  });

  return res.toString('utf-8').trim();
}

export async function normalizeSpaces13(string: string): Promise<string> {
  if (string.length < 3145728) {
    return normalizeSpaces11(string);
  }

  const chars = Buffer.from(string);
  const charsPart1 = chars.slice(0, chars.length / 2);
  const charsPart2 = chars.slice(charsPart1.length);

  const isPart1EndsWithSpace = isWhiteSpaceCharCodeIndexedUint8Array(
    charsPart1[charsPart1.length - 1]
  );
  const isPart2StartsWithSpace = isWhiteSpaceCharCodeIndexedUint8Array(charsPart2[0]);
  const shouldEmbedSpaceBetweenParts = isPart1EndsWithSpace || isPart2StartsWithSpace;

  const [normalizedStringPart1, normalizedStringPart2] = await Promise.all([
    processChunkOfTextWithWorker(charsPart1),
    processChunkOfTextWithWorker(charsPart2),
  ]);

  return Buffer.concat([
    normalizedStringPart1,
    shouldEmbedSpaceBetweenParts ? Buffer.from(' ') : Buffer.from(''),
    normalizedStringPart2,
  ]).toString('utf8');
}

async function processChunkOfTextWithWorker(chars: Buffer): Promise<Buffer> {
  const worker = new Worker(workerPath, {
    workerData: {
      chars,
      whiteSpaceIndexedUint8Array,
    },
  });

  return new Promise((resolve, reject) => {
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', code => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`));
      }
    });
  });
}

export function normalizeSpaces14(string: string): string {
  const processedChars = new Uint16Array(string.length).fill(SPACE_CODE);

  let lastProcessedIndex = -1;
  let isLastCharWhitespace = 0;

  for (let i = 0; i < string.length; i++) {
    const charCode = string[i].charCodeAt(0);
    const isWhitespace = isWhiteSpaceCharCodeIndexedUint8Array(charCode);

    if (!isWhitespace) {
      lastProcessedIndex++;

      processedChars[lastProcessedIndex] = charCode;
    } else {
      if (isLastCharWhitespace) {
        continue;
      }

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

function isWhiteSpaceCharCode(charCode: number): boolean {
  if (charCode >= 9 && charCode <= 13) {
    return true;
  }

  if (charCode === 32 || charCode === 160) {
    return true;
  }

  if (charCode === 5760 || charCode === 6158) {
    return true;
  }

  if (charCode >= 8192 && charCode <= 8202) {
    return true;
  }

  if (charCode === 8232 || charCode === 8233) {
    return true;
  }

  if (charCode < 8239 || charCode > 65279) {
    return false;
  }

  if (charCode === 8239 || charCode === 8287) {
    return true;
  }

  return charCode === 12288 || charCode === 65279;
}

function isWhiteSpaceCharCodeIndexedArray(charCode: number): boolean {
  return whiteSpaceIndexedArray[charCode];
}

function isWhiteSpaceCharCodeNumber(charCode: number): number {
  return whiteSpaceNumberIndexArray[charCode];
}

function isWhiteSpaceCharCodeIndexedUint8Array(charCode: number): number {
  return whiteSpaceIndexedUint8Array[charCode];
}
