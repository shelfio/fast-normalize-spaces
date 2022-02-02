import benny from 'benny';
// @ts-ignore
import fLI from 'fast-lorem-ipsum';
// @ts-ignore
import normalizeSpaceX from 'normalize-space-x';
import {
  normalizeSpaces1,
  normalizeSpaces2,
  normalizeSpaces3,
  normalizeSpaces4,
  normalizeSpaces5,
  normalizeSpaces6,
  normalizeSpaces7,
  normalizeSpaces8,
} from './lib';

const words5000 = fLI(5000, 'w');
const words50000 = fLI(50000, 'w');
const words500000 = fLI(500000, 'w');
const words5000000 = fLI(5000000, 'w');

benny.suite(
  'normilizeSpaces1',
  benny.add('~33 kb', () => {
    normalizeSpaces1(words5000);
  }),
  benny.add('~330 kb', () => {
    normalizeSpaces1(words50000);
  }),
  benny.add('~3.3 mb', () => {
    normalizeSpaces1(words500000);
  }),
  benny.add('~33 mb', () => {
    normalizeSpaces1(words5000000);
  }),
  benny.cycle(),
  benny.complete()
);

benny.suite(
  'normilizeSpaces2',
  benny.add('~33 kb', () => {
    normalizeSpaces2(words5000);
  }),
  benny.add('~330 kb', () => {
    normalizeSpaces2(words50000);
  }),
  benny.add('~3.3 mb', () => {
    normalizeSpaces2(words500000);
  }),
  benny.add('~33 mb', () => {
    normalizeSpaces2(words5000000);
  }),
  benny.cycle(),
  benny.complete()
);

benny.suite(
  'normilizeSpaces3',
  benny.add('~33 kb', () => {
    normalizeSpaces3(words5000);
  }),
  benny.add('~330 kb', () => {
    normalizeSpaces3(words50000);
  }),
  benny.add('~3.3 mb', () => {
    normalizeSpaces3(words500000);
  }),
  benny.add('~33 mb', () => {
    normalizeSpaces3(words5000000);
  }),
  benny.cycle(),
  benny.complete()
);

benny.suite(
  'normilizeSpaces4',
  benny.add('~33 kb', () => {
    normalizeSpaces4(words5000);
  }),
  benny.add('~330 kb', () => {
    normalizeSpaces4(words50000);
  }),
  benny.add('~3.3 mb', () => {
    normalizeSpaces4(words500000);
  }),
  benny.add('~33 mb', () => {
    normalizeSpaces4(words5000000);
  }),
  benny.cycle(),
  benny.complete()
);

benny.suite(
  'normilizeSpaces5',
  benny.add('~33 kb', () => {
    normalizeSpaces5(words5000);
  }),
  benny.add('~330 kb', () => {
    normalizeSpaces5(words50000);
  }),
  benny.add('~3.3 mb', () => {
    normalizeSpaces5(words500000);
  }),
  benny.add('~33 mb', () => {
    normalizeSpaces5(words5000000);
  }),
  benny.cycle(),
  benny.complete()
);

benny.suite(
  'normilizeSpaces6',
  benny.add('~33 kb', () => {
    normalizeSpaces6(words5000);
  }),
  benny.add('~330 kb', () => {
    normalizeSpaces6(words50000);
  }),
  benny.add('~3.3 mb', () => {
    normalizeSpaces6(words500000);
  }),
  benny.add('~33 mb', () => {
    normalizeSpaces6(words5000000);
  }),
  benny.cycle(),
  benny.complete()
);

benny.suite(
  'normilizeSpaces7',
  benny.add('~33 kb', () => {
    normalizeSpaces7(words5000);
  }),
  benny.add('~330 kb', () => {
    normalizeSpaces7(words50000);
  }),
  benny.add('~3.3 mb', () => {
    normalizeSpaces7(words500000);
  }),
  benny.add('~33 mb', () => {
    normalizeSpaces7(words5000000);
  }),
  benny.cycle(),
  benny.complete()
);

benny.suite(
  'normalizeSpaces8',
  benny.add('~33 kb', async () => {
    await normalizeSpaces8(words5000);
  }),
  benny.add('~330 kb', async () => {
    await normalizeSpaces8(words50000);
  }),
  benny.add('~3.3 mb', async () => {
    await normalizeSpaces8(words500000);
  }),
  benny.add('~33 mb', async () => {
    await normalizeSpaces8(words5000000);
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
