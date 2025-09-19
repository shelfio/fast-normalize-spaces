import {STRESS_SCENARIOS} from './__fixtures__/stress-scenarios';
import {normalizeSpaces} from './index';

const table = STRESS_SCENARIOS.map(scenario => [
  scenario.description,
  scenario.input,
  scenario.expected,
]) as ReadonlyArray<[string, string, string]>;

describe('#normalizeSpaces', () => {
  it.each(table)('handles %s', (_description, input, expected) => {
    expect(normalizeSpaces(input)).toEqual(expected);
  });

  it('is idempotent for normalized output', () => {
    for (const scenario of STRESS_SCENARIOS) {
      const normalized = normalizeSpaces(scenario.input);

      expect(normalizeSpaces(normalized)).toEqual(normalized);
    }
  });
});
