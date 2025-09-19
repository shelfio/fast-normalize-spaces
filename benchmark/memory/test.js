import {createRequire} from 'module';
import {STRESS_SCENARIOS, buildBenchmarkText} from '../../lib/__fixtures__/stress-scenarios.js';

const require = createRequire(import.meta.url);

const normalizeSpaceXModule = require('normalize-space-x');
const normalizeSpaceX =
  typeof normalizeSpaceXModule === 'function'
    ? normalizeSpaceXModule
    : (normalizeSpaceXModule.default ?? normalizeSpaceXModule);

const {normalizeSpaces} = await import('../../lib/index.js');

const textSize = Number(process.env.TEXT_SIZE ?? 33 * 1024 * 1024);
const data = buildBenchmarkText(textSize);
const actualBytes = Buffer.byteLength(data, 'utf8');

console.log(
  `Current testing text size: ${Math.round((actualBytes / 1024 / 1024) * 100) / 100} MB (target ${textSize} bytes) using ${STRESS_SCENARIOS.length} scenarios\n`
);

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
