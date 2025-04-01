import memoizee from "memoizee";
export type CachedFn<R, F extends (...args: any[]) => R> = F & memoizee.Memoized<F>;
export declare const cachedFunc: <R, F extends (...args: any[]) => R>(func: F, milliseconds: number, normalizer?: (args: Parameters<F>) => string) => CachedFn<R, F>;
