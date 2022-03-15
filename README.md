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

All tests was launched on MacBook Pro 2020:
  - **CPU**: 2 GHz Quad-Core Intel Core i5 10th gen
  - **RAM**: 16 GB 3733 MHz LPDDR4X

### Speed

| [normalize-space-x](https://github.com/Xotic750/normalize-space-x) | [@shelf/fast-normalize-spaces](https://github.com/shelfio/fast-normalize-spaces) | Improvement |
| ------------------------------------------------------------------ | -------------------------------------------------------------------------------- | ----------- |
| ~33 kb: 2 994 ops/s, ±2.34%                                        | ~33 kb: 3 599 ops/s, ±2.37%                                                      | 16.81%      |
| ~330 kb: 267 ops/s, ±1.66%                                         | ~330 kb: 395 ops/s, ±1.89%                                                       | 32.41%      |
| ~3.3 mb: 9 ops/s, ±1.15%                                           | ~3.3 mb: 31 ops/s, ±3.76%                                                        | 70.97%      |
| ~33 mb: 1 ops/s, ±12.91%                                           | ~33 mb: 3 ops/s, ±2.70%                                                          | 66.67%      |

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
