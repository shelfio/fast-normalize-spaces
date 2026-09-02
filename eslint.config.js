import shelfTypescript from '@shelf/eslint-config/typescript-no-prettier.js';

export default [
  {
    ignores: ['coverage/**', 'lib/**', 'renovate.json', 'tsconfig.json'],
  },
  ...shelfTypescript,
  {
    rules: {
      'multiline-ternary': 'off',
    },
  },
];
