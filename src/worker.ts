import {Buffer} from 'buffer';
import {parentPort, workerData} from 'worker_threads';

const SPACE_CODE = 32;

parentPort?.postMessage(normalizeSpaces11(workerData.chars));

function normalizeSpaces11(chars: Buffer): Buffer {
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

  return processedChars.slice(startIndex, endIndex);
}

function isWhiteSpaceCharCodeIndexedUint8Array(charCode: number): number {
  return workerData.whiteSpaceIndexedUint8Array[charCode];
}
