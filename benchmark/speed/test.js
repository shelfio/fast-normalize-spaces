import {createRequire} from 'module';
import benny from 'benny';
import {normalizeSpaces} from '../../lib/index.js';
import {STRESS_SCENARIOS, buildBenchmarkCorpus} from '../../lib/__fixtures__/stress-scenarios.js';

const require = createRequire(import.meta.url);

const normalizeSpaceXModule = require('normalize-space-x');
const normalizeSpaceX =
  typeof normalizeSpaceXModule === 'function'
    ? normalizeSpaceXModule
    : (normalizeSpaceXModule.default ?? normalizeSpaceXModule);

const TARGET_BYTES = [
  Math.round(33 * 1024),
  Math.round(330 * 1024),
  Math.round(3.3 * 1024 * 1024),
  33 * 1024 * 1024,
];

const corpora = buildBenchmarkCorpus(TARGET_BYTES);

console.log(`Preparing benchmark corpora with ${STRESS_SCENARIOS.length} stress scenarios\n`);

for (const [index, {label, text}] of corpora.entries()) {
  const targetBytes = TARGET_BYTES[index];
  const bytes = Buffer.byteLength(text, 'utf8');

  console.log(
    `${label}: target ${formatBytes(targetBytes)}, actual ${formatBytes(bytes)} (${bytes} bytes)`
  );

  await benny.suite(
    label,
    benny.add('@shelf/fast-normalize-spaces', () => {
      normalizeSpaces(text);
    }),
    benny.add('normalize-space-x', () => {
      normalizeSpaceX(text);
    }),
    benny.cycle(),
    benny.complete()
  );
}

function formatBytes(bytes) {
  if (bytes >= 1024 * 1024) {
    return `${(bytes / 1024 / 1024).toFixed(2)}mb`;
  }

  if (bytes >= 1024) {
    return `${(bytes / 1024).toFixed(2)}kb`;
  }

  return `${bytes}b`;
}
