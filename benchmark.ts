import benny from 'benny';
// @ts-ignore
import fLI from 'fast-lorem-ipsum';
import {normalizeSpaces} from './lib';

const words5000 = fLI(5000, 'w');
const words50000 = fLI(50000, 'w');
const words500000 = fLI(500000, 'w');
const words5000000 = fLI(5000000, 'w');

benny.suite(
  'Without Unicode',
  benny.add('~33 kb split', () => {
    normalizeSpaces(words5000);
  }),
  benny.add('~330 kb split', () => {
    normalizeSpaces(words50000);
  }),
  benny.add('~3.3 mb split', () => {
    normalizeSpaces(words500000);
  }),
  benny.add('~33 mb split', () => {
    normalizeSpaces(words5000000);
  }),
  benny.cycle(),
  benny.complete()
);
