import {createRequire} from 'module';
import benny from 'benny';
import {normalizeSpaces} from '../../lib/index.js';

const require = createRequire(import.meta.url);

const normalizeSpaceXModule = require('normalize-space-x');
const normalizeSpaceX =
  typeof normalizeSpaceXModule === 'function'
    ? normalizeSpaceXModule
    : (normalizeSpaceXModule.default ?? normalizeSpaceXModule);

const fastLoremIpsumModule = require('fast-lorem-ipsum');
const fastLoremIpsum =
  typeof fastLoremIpsumModule === 'function'
    ? fastLoremIpsumModule
    : (fastLoremIpsumModule.default ?? fastLoremIpsumModule);

const words5000 = fastLoremIpsum(5000, 'w');
const words50000 = fastLoremIpsum(50000, 'w');
const words500000 = fastLoremIpsum(500000, 'w');
const words5000000 = fastLoremIpsum(5000000, 'w');

await benny.suite(
  '~33kb',
  benny.add('@shelf/fast-normalize-spaces', () => {
    normalizeSpaces(words5000);
  }),
  benny.add('normalize-space-x', () => {
    normalizeSpaceX(words5000);
  }),
  benny.cycle(),
  benny.complete()
);

await benny.suite(
  '~330kb',
  benny.add('@shelf/fast-normalize-spaces', () => {
    normalizeSpaces(words50000);
  }),
  benny.add('normalize-space-x', () => {
    normalizeSpaceX(words50000);
  }),
  benny.cycle(),
  benny.complete()
);

await benny.suite(
  '~3.3mb',
  benny.add('@shelf/fast-normalize-spaces', () => {
    normalizeSpaces(words500000);
  }),
  benny.add('normalize-space-x', () => {
    normalizeSpaceX(words500000);
  }),
  benny.cycle(),
  benny.complete()
);

await benny.suite(
  '~33mb',
  benny.add('@shelf/fast-normalize-spaces', () => {
    normalizeSpaces(words5000000);
  }),
  benny.add('normalize-space-x', () => {
    normalizeSpaceX(words5000000);
  }),
  benny.cycle(),
  benny.complete()
);
