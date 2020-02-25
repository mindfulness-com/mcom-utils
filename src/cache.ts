import * as memoizee from "memoizee";

export const cachedFunc = <F extends Function>(func: F, milliseconds: number) =>
  memoizee(func, {
    promise: true,
    maxAge: milliseconds,
    // Normalize the cache with JSON stringify to handle array params
    normalizer: args => JSON.stringify(args),
  });
