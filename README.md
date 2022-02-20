# fast-normalize-spaces [![CircleCI](https://circleci.com/gh/shelfio/fast-normalize-spaces/tree/master.svg?style=svg)](https://circleci.com/gh/shelfio/fast-normalize-spaces/tree/master)![](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)

> fast-normalize-spaces description

## Install

```
$ yarn add @shelf/fast-normalize-spaces
```

## Usage

```js
const {normalizeSpaces} = require('@shelf/fast-normalize-spaces');

normalizeSpaces('   hello     \n\n\n   \n \n \t world   ');
// 'hello world'
```

## Benchmark

### Speed

| [normalize-space-x](https://github.com/Xotic750/normalize-space-x) | [@shelf/fast-normalize-spaces](https://github.com/shelfio/fast-normalize-spaces) | Improvement |
| ------------------------------------------------------------------ | -------------------------------------------------------------------------------- | ----------- |
| ~33 kb: 4 317 ops/s, ±0.29%                                        | ~33 kb: 14 812 ops/s, ±0.12%                                                     | 3.4x        |
| ~330 kb: 354 ops/s, ±0.33%                                         | ~330 kb: 1 478 ops/s, ±0.27%                                                     | 4x          |
| ~3.3 mb: 14 ops/s, ±4.04%                                          | ~3.3 mb: 147 ops/s, ±0.11%                                                       | 10.5x       |
| ~33 mb: 1 ops/s, ±11.94%                                           | ~33 mb: 15 ops/s, ±0.15%                                                         | **15x**     |

You can run `yarn benchmark:speed` to test on your own.

### Memory usage

The larger the string the faster it gets. Also, it uses **5-10x less memory** (RAM).

Run the following command to test memory usage:

```shell
yarn benchmark:memory
```

## Publish

```sh
$ git checkout master
$ yarn version
$ yarn publish
$ git push origin master --tags
```

## License

MIT © [Shelf](https://shelf.io)
