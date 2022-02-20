const {default: normalizeSpaceX} = require('normalize-space-x');
const normalizeSpacesFunctions = require('../../lib/index');

const allFunctions = {...normalizeSpacesFunctions, normalizeSpaceX};
const functionName = process.argv[2];
const normalizeSpaces = allFunctions[functionName];

if (!normalizeSpaces) {
  console.error(`Unknown function name "${functionName}"`);

  process.exit(1);
}

const TEXT_SIZE = +process.env.TEXT_SIZE;

(async () => {
  const data = Buffer.alloc(TEXT_SIZE, ' foo   bar  bazz   ').toString();

  const memoryBefore = process.memoryUsage.rss() / 1024 / 1024;

  await normalizeSpaces(data);

  const memoryAfter = process.memoryUsage.rss() / 1024 / 1024;

  process.stdout.write(`${memoryAfter - memoryBefore}`);
})();
