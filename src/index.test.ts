// @ts-ignore
import fLI from 'fast-lorem-ipsum';
// @ts-ignore
import normalizeSpaceX from 'normalize-space-x';
import {
  normalizeSpaces,
  normalizeSpaces1,
  normalizeSpaces10,
  normalizeSpaces11,
  normalizeSpaces12,
  normalizeSpaces13,
  normalizeSpaces14,
  normalizeSpaces2,
  normalizeSpaces3,
  normalizeSpaces4,
  normalizeSpaces5,
  normalizeSpaces6,
  normalizeSpaces7,
  normalizeSpaces8,
  normalizeSpaces9,
} from './index';

const words5000000 = fLI(5000000, 'w');
const allWhitespaceChars2018 =
  '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680' +
  '\u2000\u2001\u2002\u2003\u2004\u2005' +
  '\u2006\u2007\u2008\u2009\u200A\u202F' +
  '\u205F\u3000\u2028\u2029\uFEFF';

describe.each`
  normalizeSpaces
  ${normalizeSpaces1}
  ${normalizeSpaces2}
  ${normalizeSpaces3}
  ${normalizeSpaces4}
  ${normalizeSpaces5}
  ${normalizeSpaces6}
  ${normalizeSpaces7}
  ${normalizeSpaces8}
  ${normalizeSpaces9}
  ${normalizeSpaces10}
  ${normalizeSpaces11}
  ${normalizeSpaces12}
  ${normalizeSpaces13}
  ${normalizeSpaces14}
`('spaces normalization', ({normalizeSpaces}) => {
  describe(`${normalizeSpaces.name}`, () => {
    it('should normalize text with spaces correctly', () => {
      const result = normalizeSpaces(
        `${allWhitespaceChars2018}a${allWhitespaceChars2018}b${allWhitespaceChars2018}`
      );

      expect(result).toEqual('a b');
    });

    it('should normalize text with character that consists of surrogate pairs', () => {
      const result = normalizeSpaces('   hello     \n\n\n  interesting   \n \n \tworld  😀 ');

      expect(result).toEqual('hello interesting world 😀');
    });
  });
});

it('should use much less RAM', () => {
  const memoryStartFastVersion = process.memoryUsage();
  normalizeSpaces(words5000000);
  const memoryEndFastVersion = process.memoryUsage();
  const memoryUsedFastVersion =
    (memoryEndFastVersion.rss - memoryStartFastVersion.rss) / 1024 / 1024;
  console.log(`Memory used fast version: ${memoryUsedFastVersion}`);

  const memoryStartSlowVersion = process.memoryUsage();
  normalizeSpaceX(words5000000);
  const memoryEndSlowVersion = process.memoryUsage();
  const memoryUsedSlowVersion =
    (memoryEndSlowVersion.rss - memoryStartSlowVersion.rss) / 1024 / 1024;
  console.log(`Memory used slow version: ${memoryUsedSlowVersion}`);

  expect(memoryUsedSlowVersion / memoryUsedFastVersion).toBeGreaterThan(2);
});
