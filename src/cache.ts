import memoizee from "memoizee";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CachedFn<R, F extends (...args: any[]) => R> = F &
  memoizee.Memoized<F>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const cachedFunc = <R, F extends (...args: any[]) => R>(
  func: F,
  milliseconds: number,
  normalizer?: (args: Parameters<F>) => string,
): CachedFn<R, F> =>
  memoizee(func, {
    promise: true,
    maxAge: milliseconds,
    // Normalize the cache with JSON stringify to handle array params
    normalizer: normalizer ?? (args => JSON.stringify(args)),
  });
