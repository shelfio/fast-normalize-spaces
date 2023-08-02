import {normalizeSpaces} from './index';

const ALL_WHITESPACE_CHARS_2018 =
  '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680' +
  '\u2000\u2001\u2002\u2003\u2004\u2005' +
  '\u2006\u2007\u2008\u2009\u200A\u202F' +
  '\u205F\u3000\u2028\u2029\uFEFF';

describe('#normalizeSpaces', () => {
  it('should normalize text with spaces correctly', () => {
    const result = normalizeSpaces(
      `${ALL_WHITESPACE_CHARS_2018}a${ALL_WHITESPACE_CHARS_2018}b${ALL_WHITESPACE_CHARS_2018}`
    );

    expect(result).toEqual('a b');
  });

  it('should normalize text without spaces at the start and at the end correctly', () => {
    const result = normalizeSpaces(`a${ALL_WHITESPACE_CHARS_2018}b`);

    expect(result).toEqual('a b');
  });

  it('should normalize text with character that consists of surrogate pairs correctly', () => {
    const result = normalizeSpaces('   hello     \n\n\n  interesting   \n \n \tworld  😀 ');

    expect(result).toEqual('hello interesting world 😀');
  });
});
