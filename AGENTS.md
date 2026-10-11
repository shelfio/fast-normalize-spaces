# fast-normalize-spaces

`@shelf/fast-normalize-spaces`: an npm package with one function, `normalizeSpaces`, that collapses all Unicode whitespace to single spaces and trims the result. It is a faster drop-in for `normalize-space-x` that uses less memory.

## Commands

- `pnpm install` installs the dependencies.
- `pnpm test` runs the Jest tests in `src`; `pnpm coverage` also reports coverage.
- `pnpm lint` formats with oxfmt and fixes lint; CI runs `pnpm lint:ci`.
- `pnpm type-check` type-checks the package; `pnpm build` compiles `src` to `lib`.
- `pnpm benchmark:speed` and `pnpm benchmark:memory` build the package and compare it with `normalize-space-x`. `TEXT_SIZE` sets the payload size in bytes for the memory benchmark only.
- `pnpm find-deadcode` lists unused files, exports, and dependencies.

## Rules

- Speed and memory are the product. For a change in `src/index.ts`, run both benchmarks before and after, and update the README tables when the numbers change.
- `src/__fixtures__/stress-scenarios.ts` holds the worst-case inputs that the tests and the benchmarks share; add a new edge case there.
- The public API is `normalizeSpaces` only. A change to its output is a breaking change for the package users.
- The README section "Publish" has the release steps.

## Shared Skills

- Use `shelf-git-conventions` for branches, commits, and pull requests. The default branch is `master`.
- Use `unit-tests-101` when you write or review unit tests.
