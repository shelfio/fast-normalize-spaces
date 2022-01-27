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
} from './lib';

// const words5000 = fLI(5000, 'w');
const words50000 = fLI(50000, 'w');
// const words500000 = fLI(500000, 'w');
// const words5000000 = fLI(5000000, 'w');

benny.suite(
  '~330 kb',
  benny.cycle(),
  benny.add('normalize-space-x', () => {
    normalizeSpaceX(words50000);
  }),
  benny.cycle(),
  benny.add('fast-impl-1', () => {
    normalizeSpaces1(words50000);
  }),
  benny.cycle(),
  benny.add('fast-impl-2', () => {
    normalizeSpaces2(words50000);
  }),
  benny.cycle(),
  benny.add('fast-impl-3', () => {
    normalizeSpaces3(words50000);
  }),
  benny.cycle(),
  benny.add('fast-impl-4', () => {
    normalizeSpaces4(words50000);
  }),
  benny.cycle(),
  benny.add('fast-impl-5', () => {
    normalizeSpaces5(words50000);
  }),
  benny.cycle(),
  benny.add('fast-impl-6', () => {
    normalizeSpaces6(words50000);
  }),
  benny.cycle(),
  benny.add('normalize-space-x', () => {
    normalizeSpaceX(words50000);
  }),
  benny.cycle(),
  benny.complete()
);

// benny.suite(
//   '@shelf/fast-normalize-spaces',
//   benny.add('~33 kb', () => {
//     normalizeSpaces(words5000);
//   }),
//   benny.add('~330 kb', () => {
//     normalizeSpaces(words50000);
//   }),
//   benny.add('~3.3 mb', () => {
//     normalizeSpaces(words500000);
//   }),
//   benny.add('~33 mb', () => {
//     normalizeSpaces(words5000000);
//   }),
//   benny.cycle(),
//   benny.complete()
// );
//
// benny.suite(
//   'normalize-space-x',
//   benny.add('~33 kb', () => {
//     normalizeSpaceX(words5000);
//   }),
//   benny.add('~330 kb', () => {
//     normalizeSpaceX(words50000);
//   }),
//   benny.add('~3.3 mb', () => {
//     normalizeSpaceX(words500000);
//   }),
//   benny.add('~33 mb', () => {
//     normalizeSpaceX(words5000000);
//   }),
//   benny.cycle(),
//   benny.complete()
// );
