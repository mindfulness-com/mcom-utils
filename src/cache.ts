import memoizee from "memoizee";
import { Fn } from "./fn";

export type CachedFn<T> = T & {
  clear: Fn<void, void>;
  delete: T;
};

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export const cachedFunc = <R, F extends (...args: any) => R>(
  func: F,
  milliseconds: number,
  normalizer?: (args: Parameters<F>) => string,
): CachedFn<F> =>
  memoizee(func, {
    promise: true,
    maxAge: milliseconds,
    // Normalize the cache with JSON stringify to handle array params
    normalizer: normalizer ?? (args => JSON.stringify(args)),
  });
