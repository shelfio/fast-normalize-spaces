export type StressScenario = {
  readonly description: string;
  readonly input: string;
  readonly expected: string;
};

const BASE_WORD_GROUPS: ReadonlyArray<ReadonlyArray<string>> = [
  ['Alpha', 'beta', 'Gamma', 'delta'],
  ['🚀', 'Launch', 'Sequence', 'Initiated', 'NOW'],
  ['Mixéd', 'café', 'UNICODE', 'Συνάρτηση'],
  ['Tabs', 'and', 'newlines', 'and', 'spaces'],
  ['Numbers', '12345', '67890', '42'],
  ['Emoji', 'pile', '😀', '🔥', 'text'],
  ['Left-to-right', 'עברית', 'العربية', 'text'],
  ['Surrogate', 'pair', '🤯', 'stress', 'test'],
  ['HTML-like', '<div>', 'content', '&nbsp;', '</div>'],
  ['Accented', 'français', 'på', 'Svenska'],
];

const ALL_WS_CHARS_2018 =
  '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680' +
  '\u2000\u2001\u2002\u2003\u2004\u2005' +
  '\u2006\u2007\u2008\u2009\u200A\u202F' +
  '\u205F\u3000\u2028\u2029\uFEFF';

const WHITESPACE_COMBINATIONS: ReadonlyArray<string> = [
  ' \t \t',
  '\u00A0\u2009',
  '\u2000\u2001\u2002',
  '\n\r\n',
  '\u2028\u2029',
  '\u1680\u205F',
  '\u3000\t',
  '\t\t\t',
  '\u205F\u00A0\u202F',
  '\f\v',
  '\r\n\t',
  '\u2003\u2009',
  '\u2007\u2008\u2009',
  '\u2004\u2005',
].map(value => unescapeEscapes(value));

const SURROUNDERS: ReadonlyArray<{readonly leading: string; readonly trailing: string}> = [
  {leading: '', trailing: ''},
  {leading: '\u3000\u3000\u00A0\t\n', trailing: ''},
  {leading: '', trailing: '\n\t\t\u00A0\u2009\u3000'},
  {leading: '\u00A0\u205F\n\n\t', trailing: '\t\r\n\u2000\u3000'},
].map(({leading, trailing}) => {
  return {
    leading: unescapeEscapes(leading),
    trailing: unescapeEscapes(trailing),
  };
});

const UNIQUE_INPUTS = new Set<string>();

const GENERATED_SCENARIOS: StressScenario[] = [];

let scenarioIndex = 0;

for (const words of BASE_WORD_GROUPS) {
  for (
    let combinationIndex = 0;
    combinationIndex < WHITESPACE_COMBINATIONS.length;
    combinationIndex++
  ) {
    const rawCombination = WHITESPACE_COMBINATIONS[combinationIndex];
    const separators = deriveSeparators(rawCombination, words.length - 1);

    for (let surroundIndex = 0; surroundIndex < SURROUNDERS.length; surroundIndex++) {
      const {leading, trailing} = SURROUNDERS[surroundIndex];

      const input = buildInput(leading, words, separators, trailing);

      if (UNIQUE_INPUTS.has(input)) {
        continue;
      }

      UNIQUE_INPUTS.add(input);

      GENERATED_SCENARIOS.push({
        description: `Group ${scenarioIndex + 1}: combination ${combinationIndex + 1}, surround ${surroundIndex + 1}`,
        input,
        expected: words.join(' '),
      });

      scenarioIndex++;

      if (scenarioIndex >= 40) {
        break;
      }
    }

    if (scenarioIndex >= 40) {
      break;
    }
  }

  if (scenarioIndex >= 40) {
    break;
  }
}

const ADDITIONAL_SCENARIOS: ReadonlyArray<StressScenario> = [
  {
    description: 'Whitespace only',
    input: unescapeEscapes(
      '\u3000\u00A0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u202F\u205F\u3000\t\n\r\f\v'
    ),
    expected: '',
  },
  {
    description: 'All whitespace variants around tokens',
    input: `${unescapeEscapes(ALL_WS_CHARS_2018)}a${unescapeEscapes(ALL_WS_CHARS_2018)}b${unescapeEscapes(ALL_WS_CHARS_2018)}`,
    expected: 'a b',
  },
  {
    description: 'All whitespace variants inline',
    input: `a${unescapeEscapes(ALL_WS_CHARS_2018)}b`,
    expected: 'a b',
  },
  {
    description: 'Already normalized sentence',
    input: 'This sentence is already normalized.',
    expected: 'This sentence is already normalized.',
  },
  {
    description: 'Dense multilingual paragraph',
    input: unescapeEscapes(
      '\u00A0\u2009Le\ttexte\r\nnon!\u3000\u56FD\u2028\u2029Esto\u2003es\u2009una\fnueva\u205Fprueba\u3000😀'
    ),
    expected: 'Le texte non! 国 Esto es una nueva prueba 😀',
  },
];

export const STRESS_SCENARIOS: ReadonlyArray<StressScenario> = [
  ...GENERATED_SCENARIOS,
  ...ADDITIONAL_SCENARIOS,
];

if (STRESS_SCENARIOS.length === 0) {
  throw new Error('Stress scenarios dataset is empty');
}

export const STRESS_INPUTS: ReadonlyArray<string> = STRESS_SCENARIOS.map(
  scenario => scenario.input
);

export function buildBenchmarkText(targetBytes: number): string {
  if (targetBytes <= 0) {
    return '';
  }

  const chunks: string[] = [];
  let currentBytes = 0;
  let index = 0;

  while (currentBytes < targetBytes) {
    const scenario = STRESS_SCENARIOS[index % STRESS_SCENARIOS.length];
    const chunk = `${scenario.input} `;
    chunks.push(chunk);
    currentBytes += byteLength(chunk);
    index++;
  }

  const text = chunks.join('');

  if (currentBytes === targetBytes) {
    return text;
  }

  return trimToTargetBytes(text, targetBytes);
}

export function buildBenchmarkCorpus(targets: ReadonlyArray<number>): ReadonlyArray<{
  readonly label: string;
  readonly text: string;
}> {
  return targets.map(target => {
    return {
      label: humanizeBytes(target),
      text: buildBenchmarkText(target),
    };
  });
}

function unescapeEscapes(value: string): string {
  return value
    .replace(/\\u([0-9A-Fa-f]{4})/g, (_, hex) => String.fromCharCode(Number.parseInt(hex, 16)))
    .replace(/\\t/g, '\t')
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '\r')
    .replace(/\\f/g, '\f')
    .replace(/\\v/g, '\v');
}

function deriveSeparators(base: string, needed: number): ReadonlyArray<string> {
  const separators: string[] = [];

  if (base.length === 0) {
    return new Array(needed).fill(' ');
  }

  for (let i = 0; i < needed; i++) {
    const offset = i % base.length;
    const char = base[offset];
    const next = base[(offset + i + 1) % base.length];
    separators.push(char + next + base);
  }

  return separators.map((separator, index) =>
    index % 2 === 0 ? separator : reverseString(separator)
  );
}

function buildInput(
  leading: string,
  words: ReadonlyArray<string>,
  separators: ReadonlyArray<string>,
  trailing: string
): string {
  let value = leading;

  for (let i = 0; i < words.length; i++) {
    value += words[i];

    if (i < separators.length) {
      value += separators[i];
    }
  }

  value += trailing;

  return value;
}

function reverseString(value: string): string {
  return value.split('').reverse().join('');
}

function byteLength(value: string): number {
  return Buffer.byteLength(value, 'utf8');
}

function trimToTargetBytes(value: string, targetBytes: number): string {
  const buffer = Buffer.from(value, 'utf8');

  if (buffer.length <= targetBytes) {
    return value;
  }

  return buffer.subarray(0, targetBytes).toString('utf8');
}

function humanizeBytes(bytes: number): string {
  if (bytes >= 1024 * 1024) {
    const mb = bytes / 1024 / 1024;

    return `~${mb.toFixed(mb >= 10 ? 0 : 1)}mb`;
  }

  if (bytes >= 1024) {
    const kb = bytes / 1024;

    return `~${kb.toFixed(kb >= 10 ? 0 : 1)}kb`;
  }

  return `${bytes}b`;
}
