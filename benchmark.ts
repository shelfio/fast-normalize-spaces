import benny from 'benny';
// @ts-ignore
import fLI from 'fast-lorem-ipsum';
// @ts-ignore
import normalizeSpaceX from 'normalize-space-x';
import {normalizeSpaces} from './lib';

const words5000 = fLI(5000, 'w');
const words50000 = fLI(50000, 'w');
const words500000 = fLI(500000, 'w');
const words5000000 = fLI(5000000, 'w');

benny.suite(
  '@shelf/fast-normalize-spaces',
  benny.add('~33 kb', () => {
    normalizeSpaces(words5000);
  }),
  benny.add('~330 kb', () => {
    normalizeSpaces(words50000);
  }),
  benny.add('~3.3 mb', () => {
    normalizeSpaces(words500000);
  }),
  benny.add('~33 mb', () => {
    normalizeSpaces(words5000000);
  }),
  benny.cycle(),
  benny.complete()
);

benny.suite(
  'normalize-space-x',
  benny.add('~33 kb', () => {
    normalizeSpaceX(words5000);
  }),
  benny.add('~330 kb', () => {
    normalizeSpaceX(words50000);
  }),
  benny.add('~3.3 mb', () => {
    normalizeSpaceX(words500000);
  }),
  benny.add('~33 mb', () => {
    normalizeSpaceX(words5000000);
  }),
  benny.cycle(),
  benny.complete()
);
