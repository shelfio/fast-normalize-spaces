import {createRequire} from 'module';

const require = createRequire(import.meta.url);

const normalizeSpaceXModule = require('normalize-space-x');
const normalizeSpaceX =
  typeof normalizeSpaceXModule === 'function'
    ? normalizeSpaceXModule
    : normalizeSpaceXModule.default ?? normalizeSpaceXModule;

const {normalizeSpaces} = await import('../../lib/index.js');

const textSize = Number(process.env.TEXT_SIZE ?? 33 * 1024 * 1024);
const data = Buffer.alloc(textSize, ' foo   bar  bazz   ').toString();

console.log(`Current testing text size: ${Math.round((textSize / 1024 / 1024) * 100) / 100} MB\n`);

const measurements = [
  ['normalizeSpaceX', normalizeSpaceX],
  ['normalizeSpaces', normalizeSpaces],
];

for (const [label, fn] of measurements) {
  const delta = measureMemory(fn);

  console.log(`${label}: ${delta} MB`);
}

function measureMemory(fn) {
  const memoryBefore = process.memoryUsage().rss / 1024 / 1024;
  fn(data);
  const memoryAfter = process.memoryUsage().rss / 1024 / 1024;

  return memoryAfter - memoryBefore;
}
