# fast-normalize-spaces [![CircleCI](https://circleci.com/gh/shelfio/fast-normalize-spaces/tree/master.svg?style=svg)](https://circleci.com/gh/shelfio/fast-normalize-spaces/tree/master)![](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)

> fast-normalize-spaces

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

Benchmarks reuse the same pool of 45 worst-case scenarios that cover multilingual text, surrogate pairs, HTML-like tokens, and the full 2018 Unicode whitespace set.

### Speed

| Scenario | [normalize-space-x](https://github.com/Xotic750/normalize-space-x) | [@shelf/fast-normalize-spaces](https://github.com/shelfio/fast-normalize-spaces) | Speedup |
| -------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------- | ------- |
| ~33 kb   | 2,891 ops/s, ±0.35%                                                | 10,162 ops/s, ±0.26%                                                             | ~3.5x   |
| ~330 kb  | 280 ops/s, ±0.88%                                                  | 964 ops/s, ±1.68%                                                                | ~3.4x   |
| ~3.3 mb  | 19 ops/s, ±5.86%                                                   | 95 ops/s, ±1.14%                                                                 | 5.0x    |
| ~33 mb   | 2 ops/s, ±5.24%                                                    | 10 ops/s, ±1.30%                                                                 | 5.0x    |

You can run `yarn benchmark:speed` to test on your own.

### Memory usage

| Text size (UTF-8)         | [normalize-space-x](https://github.com/Xotic750/normalize-space-x) | [@shelf/fast-normalize-spaces](https://github.com/shelfio/fast-normalize-spaces) | Improvement |
| ------------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------- | ----------- |
| ~33 mb (33,603,010 bytes) | 73.95mb                                                            | 44.47mb                                                                          | 1.66x less  |

The larger the string, the bigger the gap. Memory usage stays close to the size of the input buffer.

Set a custom payload by exporting `TEXT_SIZE` (in bytes) when running the benchmark:

```shell
TEXT_SIZE=$((10 * 1024 * 1024)) yarn benchmark:memory
```

## See Also

- [fast-natural-order-by](https://github.com/shelfio/fast-natural-order-by)
- [fast-uslug](https://github.com/shelfio/fast-uslug)
- [fast-chunk-string](https://github.com/shelfio/fast-chunk-string)

## Publish

```sh
$ git checkout master
$ yarn version
$ yarn publish
$ git push origin master --tags
```

## License

MIT © [Shelf](https://shelf.io)
