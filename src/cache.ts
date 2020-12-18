import * as memoizee from "memoizee";

export const cachedFunc = <R, F extends (...args: any) => R>(
  func: F,
  milliseconds: number,
  normalizer?: (args: Parameters<F>) => string,
): F =>
  memoizee(func, {
    promise: true,
    maxAge: milliseconds,
    // Normalize the cache with JSON stringify to handle array params
    normalizer: normalizer ?? (args => JSON.stringify(args)),
  });
