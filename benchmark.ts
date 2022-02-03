import benny from 'benny';
// @ts-ignore
import fLI from 'fast-lorem-ipsum';
// @ts-ignore
import normalizeSpaceX from 'normalize-space-x';
import {
  normalizeSpaces1,
  normalizeSpaces10,
  normalizeSpaces11,
  normalizeSpaces2,
  normalizeSpaces3,
  normalizeSpaces4,
  normalizeSpaces5,
  normalizeSpaces6,
  normalizeSpaces7,
  normalizeSpaces8,
  normalizeSpaces9,
} from './lib';

const words5000 = fLI(5000, 'w');
const words50000 = fLI(50000, 'w');
const words500000 = fLI(500000, 'w');
const words5000000 = fLI(5000000, 'w');

benny.suite(
  '~33 kb',
  benny.add('normalize-space-x', () => {
    normalizeSpaceX(words5000);
  }),
  benny.add('normalizeSpaces1', () => {
    normalizeSpaces1(words5000);
  }),
  benny.add('normalizeSpaces2', () => {
    normalizeSpaces2(words5000);
  }),
  benny.add('normalizeSpaces3', () => {
    normalizeSpaces3(words5000);
  }),
  benny.add('normalizeSpaces4', () => {
    normalizeSpaces4(words5000);
  }),
  benny.add('normalizeSpaces5', () => {
    normalizeSpaces5(words5000);
  }),
  benny.add('normalizeSpaces6', () => {
    normalizeSpaces6(words5000);
  }),
  benny.add('normalizeSpaces7', () => {
    normalizeSpaces7(words5000);
  }),
  benny.add('normalizeSpaces8', async () => {
    await normalizeSpaces8(words5000);
  }),
  benny.add('normalizeSpaces9', () => {
    normalizeSpaces9(words5000);
  }),
  benny.add('normalizeSpaces10', () => {
    normalizeSpaces10(words5000);
  }),
  benny.add('normalizeSpaces11', () => {
    normalizeSpaces11(words5000);
  }),
  benny.cycle(),
  benny.complete()
);

benny.suite(
  '~330 kb',
  benny.add('normalize-space-x', () => {
    normalizeSpaceX(words50000);
  }),
  benny.add('normalizeSpaces1', () => {
    normalizeSpaces1(words50000);
  }),
  benny.add('normalizeSpaces2', () => {
    normalizeSpaces2(words50000);
  }),
  benny.add('normalizeSpaces3', () => {
    normalizeSpaces3(words50000);
  }),
  benny.add('normalizeSpaces4', () => {
    normalizeSpaces4(words50000);
  }),
  benny.add('normalizeSpaces5', () => {
    normalizeSpaces5(words50000);
  }),
  benny.add('normalizeSpaces6', () => {
    normalizeSpaces6(words50000);
  }),
  benny.add('normalizeSpaces7', () => {
    normalizeSpaces7(words50000);
  }),
  benny.add('normalizeSpaces8', async () => {
    await normalizeSpaces8(words50000);
  }),
  benny.add('normalizeSpaces9', () => {
    normalizeSpaces9(words50000);
  }),
  benny.add('normalizeSpaces10', () => {
    normalizeSpaces10(words50000);
  }),
  benny.add('normalizeSpaces11', () => {
    normalizeSpaces11(words50000);
  }),
  benny.cycle(),
  benny.complete()
);

benny.suite(
  '~3.3 mb',
  benny.add('normalize-space-x', () => {
    normalizeSpaceX(words500000);
  }),
  benny.add('normalizeSpaces1', () => {
    normalizeSpaces1(words500000);
  }),
  benny.add('normalizeSpaces2', () => {
    normalizeSpaces2(words500000);
  }),
  benny.add('normalizeSpaces3', () => {
    normalizeSpaces3(words500000);
  }),
  benny.add('normalizeSpaces4', () => {
    normalizeSpaces4(words500000);
  }),
  benny.add('normalizeSpaces5', () => {
    normalizeSpaces5(words500000);
  }),
  benny.add('normalizeSpaces6', () => {
    normalizeSpaces6(words500000);
  }),
  benny.add('normalizeSpaces7', () => {
    normalizeSpaces7(words500000);
  }),
  benny.add('normalizeSpaces8', async () => {
    await normalizeSpaces8(words500000);
  }),
  benny.add('normalizeSpaces9', () => {
    normalizeSpaces9(words500000);
  }),
  benny.add('normalizeSpaces10', () => {
    normalizeSpaces10(words500000);
  }),
  benny.add('normalizeSpaces11', () => {
    normalizeSpaces11(words500000);
  }),
  benny.cycle(),
  benny.complete()
);

benny.suite(
  '~33 mb',
  benny.add('normalize-space-x', () => {
    normalizeSpaceX(words5000000);
  }),
  benny.add('normalizeSpaces1', () => {
    normalizeSpaces1(words5000000);
  }),
  benny.add('normalizeSpaces2', () => {
    normalizeSpaces2(words5000000);
  }),
  benny.add('normalizeSpaces3', () => {
    normalizeSpaces3(words5000000);
  }),
  benny.add('normalizeSpaces4', () => {
    normalizeSpaces4(words5000000);
  }),
  benny.add('normalizeSpaces5', () => {
    normalizeSpaces5(words5000000);
  }),
  benny.add('normalizeSpaces6', () => {
    normalizeSpaces6(words5000000);
  }),
  benny.add('normalizeSpaces7', () => {
    normalizeSpaces7(words5000000);
  }),
  benny.add('normalizeSpaces8', async () => {
    await normalizeSpaces8(words5000000);
  }),
  benny.add('normalizeSpaces9', () => {
    normalizeSpaces9(words5000000);
  }),
  benny.add('normalizeSpaces10', () => {
    normalizeSpaces10(words5000000);
  }),
  benny.add('normalizeSpaces11', () => {
    normalizeSpaces11(words5000000);
  }),
  benny.cycle(),
  benny.complete()
);
