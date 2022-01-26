// @ts-ignore
import fLI from 'fast-lorem-ipsum';
// @ts-ignore
import normalizeSpaceX from 'normalize-space-x';
import {normalizeSpaces} from './index';

const words5000000 = fLI(5000000, 'w');

it('should normalize spaces', () => {
  expect(normalizeSpaces('   hello     \n\n\n   \n \n \t world   ')).toEqual('hello world');
});

it('should use much less RAM', () => {
  const memoryStartFastVersion = process.memoryUsage();
  normalizeSpaces(words5000000);
  const memoryEndFastVersion = process.memoryUsage();
  const memoryUsedFastVersion =
    (memoryEndFastVersion.rss - memoryStartFastVersion.rss) / 1024 / 1024;
  console.log(`Memory used slow version: ${memoryUsedFastVersion}`);

  const memoryStartSlowVersion = process.memoryUsage();
  normalizeSpaceX(words5000000);
  const memoryEndSlowVersion = process.memoryUsage();
  const memoryUsedSlowVersion =
    (memoryEndSlowVersion.rss - memoryStartSlowVersion.rss) / 1024 / 1024;
  console.log(`Memory used fast version: ${memoryUsedSlowVersion}`);

  expect(memoryUsedSlowVersion / memoryUsedFastVersion).toBeGreaterThan(5);
});
