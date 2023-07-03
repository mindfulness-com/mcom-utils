import { Fn } from "./fn";
export declare type CachedFn<T> = T & {
    clear: Fn<void, void>;
};
export declare const cachedFunc: <R, F extends (...args: any) => R>(func: F, milliseconds: number, normalizer?: ((args: Parameters<F>) => string) | undefined) => CachedFn<F>;
