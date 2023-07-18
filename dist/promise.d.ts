import { Fn } from "./fn";
type Resolvable<R> = R | PromiseLike<R> | void | PromiseLike<void>;
export declare function all<T1, T2, T3, T4, T5, T6, T7>(values: [
    Resolvable<T1>,
    Resolvable<T2>,
    Resolvable<T3>,
    Resolvable<T4>,
    Resolvable<T5>,
    Resolvable<T6>,
    Resolvable<T7>
]): Promise<[T1, T2, T3, T4, T5, T6, T7]>;
export declare function all<T1, T2, T3, T4, T5, T6>(values: [
    Resolvable<T1>,
    Resolvable<T2>,
    Resolvable<T3>,
    Resolvable<T4>,
    Resolvable<T5>,
    Resolvable<T6>
]): Promise<[T1, T2, T3, T4, T5, T6]>;
export declare function all<T1, T2, T3, T4, T5>(values: [
    Resolvable<T1>,
    Resolvable<T2>,
    Resolvable<T3>,
    Resolvable<T4>,
    Resolvable<T5>
]): Promise<[T1, T2, T3, T4, T5]>;
export declare function all<T1, T2, T3, T4>(values: [Resolvable<T1>, Resolvable<T2>, Resolvable<T3>, Resolvable<T4>]): Promise<[T1, T2, T3, T4]>;
export declare function all<T1, T2, T3>(values: [Resolvable<T1>, Resolvable<T2>, Resolvable<T3>]): Promise<[T1, T2, T3]>;
export declare function all<T1, T2>(values: [Resolvable<T1>, Resolvable<T2>]): Promise<[T1, T2]>;
export declare function all<T1>(values: [Resolvable<T1>]): Promise<[T1]>;
export declare function all<T>(values: Resolvable<T>[]): Promise<T[]>;
export declare function some<T1, T2, T3, T4, T5, T6, T7>(values: [
    Resolvable<T1>,
    Resolvable<T2>,
    Resolvable<T3>,
    Resolvable<T4>,
    Resolvable<T5>,
    Resolvable<T6>,
    Resolvable<T7>
], log?: Fn<Error, void>): Promise<[T1, T2, T3, T4, T5, T6, T7]>;
export declare function some<T1, T2, T3, T4, T5, T6>(values: [
    Resolvable<T1>,
    Resolvable<T2>,
    Resolvable<T3>,
    Resolvable<T4>,
    Resolvable<T5>,
    Resolvable<T6>
], log?: Fn<Error, void>): Promise<[T1, T2, T3, T4, T5, T6]>;
export declare function some<T1, T2, T3, T4, T5>(values: [
    Resolvable<T1>,
    Resolvable<T2>,
    Resolvable<T3>,
    Resolvable<T4>,
    Resolvable<T5>
], log?: Fn<Error, void>): Promise<[T1, T2, T3, T4, T5]>;
export declare function some<T1, T2, T3, T4>(values: [Resolvable<T1>, Resolvable<T2>, Resolvable<T3>, Resolvable<T4>], log?: Fn<Error, void>): Promise<[T1, T2, T3, T4]>;
export declare function some<T1, T2, T3>(values: [Resolvable<T1>, Resolvable<T2>, Resolvable<T3>], log?: Fn<Error, void>): Promise<[T1, T2, T3]>;
export declare function some<T1, T2>(values: [Resolvable<T1>, Resolvable<T2>], log?: Fn<Error, void>): Promise<[T1, T2]>;
export declare function some<T1>(values: [Resolvable<T1>], log?: Fn<Error, void>): Promise<[T1]>;
export declare function some<T>(values: Resolvable<T>[], log?: Fn<Error, void>): Promise<T[]>;
export declare const mapAll: <T, R>(things: T[], toPromise: (thing: T) => Promise<R>) => Promise<R[]>;
export declare const most: <T>(promises: Promise<T>[], onError?: Fn<Error, void>) => Promise<T[]>;
export declare const mapMost: <T, R>(things: T[], toPromise: (thing: T) => Promise<R>, onError?: Fn<Error, void>) => Promise<R[]>;
export declare const waitFor: <T, R>(p: Promise<T>, fn: (t: T) => R) => Promise<R>;
export declare function usingAll<T1, T2, T3, T4, T5, T6, R>(a: [
    Promise<T1>,
    Promise<T2>,
    Promise<T3>,
    Promise<T4>,
    Promise<T5>,
    Promise<T6>
], fn: (...args: [T1, T2, T3, T4, T5, T6]) => R): Promise<R>;
export declare function usingAll<T1, T2, T3, T4, T5, R>(a: [Promise<T1>, Promise<T2>, Promise<T3>, Promise<T4>, Promise<T5>], fn: (...args: [T1, T2, T3, T4, T5]) => R): Promise<R>;
export declare function usingAll<T1, T2, T3, T4, R>(a: [Promise<T1>, Promise<T2>, Promise<T3>, Promise<T4>], fn: (...args: [T1, T2, T3, T4]) => R): Promise<R>;
export declare function usingAll<T1, T2, T3, R>(a: [Promise<T1>, Promise<T2>, Promise<T3>], fn: (...args: [T1, T2, T3]) => R): Promise<R>;
export declare function usingAll<T1, T2, R>(a: [Promise<T1>, Promise<T2>], fn: (...args: [T1, T2]) => R): Promise<R>;
export declare function usingAll<T1, R>(a: [Promise<T1>], fn: (...args: [T1]) => R): Promise<R>;
export {};
