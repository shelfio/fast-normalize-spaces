import benny from 'benny';
// @ts-ignore
import fLI from 'fast-lorem-ipsum';
// @ts-ignore
import normalizeSpaceX from 'normalize-space-x';
import {
  normalizeSpaces1,
  normalizeSpaces10,
  normalizeSpaces11,
  normalizeSpaces12,
  normalizeSpaces13,
  normalizeSpaces14,
  normalizeSpaces2,
  normalizeSpaces3,
  normalizeSpaces4,
  normalizeSpaces5,
  normalizeSpaces6,
  normalizeSpaces7,
  normalizeSpaces8,
  normalizeSpaces9,
} from '../../lib';

const words5000 = fLI(5000, 'w');
const words50000 = fLI(50000, 'w');
const words500000 = fLI(500000, 'w');
const words5000000 = fLI(5000000, 'w');

const FUNCTIONS_TO_TEST_SYNC = [
  {name: 'normalize-space-x', fn: normalizeSpaceX},
  {name: 'normalizeSpaces1', fn: normalizeSpaces1},
  {name: 'normalizeSpaces2', fn: normalizeSpaces2},
  {name: 'normalizeSpaces3', fn: normalizeSpaces3},
  {name: 'normalizeSpaces4', fn: normalizeSpaces4},
  {name: 'normalizeSpaces5', fn: normalizeSpaces5},
  {name: 'normalizeSpaces6', fn: normalizeSpaces6},
  {name: 'normalizeSpaces7', fn: normalizeSpaces7},
  {name: 'normalizeSpaces9', fn: normalizeSpaces9},
  {name: 'normalizeSpaces10', fn: normalizeSpaces10},
  {name: 'normalizeSpaces11', fn: normalizeSpaces11},
  {name: 'normalizeSpaces12', fn: normalizeSpaces12},
  {name: 'normalizeSpaces13', fn: normalizeSpaces13},
  {name: 'normalizeSpaces14', fn: normalizeSpaces14},
];

const FUNCTIONS_TO_TEST_ASYNC = [{name: 'normalizeSpaces8', fn: normalizeSpaces8}];

function getTestCases(text: string) {
  return [
    ...FUNCTIONS_TO_TEST_SYNC.map(i =>
      benny.add(i.name, () => {
        i.fn(text);
      })
    ),
    ...FUNCTIONS_TO_TEST_ASYNC.map(i =>
      benny.add(i.name, async () => {
        await i.fn(text);
      })
    ),
  ];
}

benny.suite('~33 kb', ...getTestCases(words5000), benny.cycle(), benny.complete());

benny.suite('~330 kb', ...getTestCases(words50000), benny.cycle(), benny.complete());

benny.suite('~3.3 mb', ...getTestCases(words500000), benny.cycle(), benny.complete());

benny.suite('~33 mb', ...getTestCases(words5000000), benny.cycle(), benny.complete());
