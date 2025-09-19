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
| ~33 kb   | 2,772 ops/s, ±0.22%                                                | 15,880 ops/s, ±0.34%                                                             | ~5.7x   |
| ~330 kb  | 270 ops/s, ±0.50%                                                  | 1,539 ops/s, ±1.49%                                                              | ~5.7x   |
| ~3.3 mb  | 20 ops/s, ±1.62%                                                   | 152 ops/s, ±0.36%                                                                | 7.6x    |
| ~33 mb   | 2 ops/s, ±6.05%                                                    | 16 ops/s, ±0.76%                                                                 | 8.0x    |

You can run `yarn benchmark:speed` to test on your own.

### Memory usage

| Text size (UTF-8)         | [normalize-space-x](https://github.com/Xotic750/normalize-space-x) | [@shelf/fast-normalize-spaces](https://github.com/shelfio/fast-normalize-spaces) | Improvement |
| ------------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------- | ----------- |
| ~33 mb (34,603,010 bytes) | 74.69mb                                                            | 25.31mb                                                                          | 2.95x less  |

The larger the string, the bigger the gap. Memory usage stays close to the size of the input buffer.

## Recent optimizations — September 2025

September 2025 improvements were delivered autonomously by the gpt-5-codex model. We treated the normalization routine like any critical path service and tightened the slowest sections:

- **Smarter lookup table** – precomputes the Unicode whitespace bitmap by iterating only over the relevant code points, keeping startup cost small and lookups cache-friendly.
- **Single-pass whitespace collapse** – streams over the text once and writes normalized characters immediately, eliminating the prior buffer-wide fill and cutting per-call writes by roughly half.
- **Early return for clean inputs** – detects unchanged strings and returns them as-is, removing allocations when input already meets expectations.
- **Lean buffer management** – trims trailing whitespace in place, which dropped peak RSS from ~44 MB to ~25 MB on the 33 MB payloads.

The result is a jump from ~10k ops/s to 15.8k ops/s on 33 KB payloads and 5.7–8.0× gains over `normalize-space-x`, with memory use reduced nearly threefold.

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
