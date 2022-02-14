import { Maybe } from "./maybe";
export declare type Pred<T> = (t: T) => boolean;
export declare type Fn<T, R> = (t: T) => R;
export declare const otherwise: <T>(_?: T | undefined) => boolean;
export declare const defined: <T>(t: Maybe<T>) => t is T;
export declare const not: <T>(p: Pred<T>) => Pred<T>;
export declare function until<R>(f5: Fn<void, Promise<Maybe<R>> | Maybe<R>>, f4: Fn<void, Promise<Maybe<R>> | Maybe<R>>, f3: Fn<void, Promise<Maybe<R>> | Maybe<R>>, f2: Fn<void, Promise<Maybe<R>> | Maybe<R>>, f1: Fn<void, Promise<R> | R>): Promise<R>;
export declare function until<T1, T2, T3, T4, R>(f4: Fn<void, Promise<Maybe<R>> | Maybe<R>>, f3: Fn<void, Promise<Maybe<R>> | Maybe<R>>, f2: Fn<void, Promise<Maybe<R>> | Maybe<R>>, f1: Fn<void, Promise<R> | R>): Promise<R>;
export declare function until<T1, T2, T3, R>(f3: Fn<void, Promise<Maybe<R>> | Maybe<R>>, f2: Fn<void, Promise<Maybe<R>> | Maybe<R>>, f1: Fn<void, Promise<R> | R>): Promise<R>;
export declare function until<T1, T2, R>(f2: Fn<void, Promise<Maybe<R>> | Maybe<R>>, f1: Fn<void, Promise<R> | R>): Promise<R>;
export declare function fallback<R>(f8: Fn<void, Maybe<R>>, f7: Fn<void, Maybe<R>>, f6: Fn<void, Maybe<R>>, f5: Fn<void, Maybe<R>>, f4: Fn<void, Maybe<R>>, f3: Fn<void, Maybe<R>>, f2: Fn<void, Maybe<R>>, f1: Fn<void, R>): R;
export declare function fallback<R>(f7: Fn<void, Maybe<R>>, f6: Fn<void, Maybe<R>>, f5: Fn<void, Maybe<R>>, f4: Fn<void, Maybe<R>>, f3: Fn<void, Maybe<R>>, f2: Fn<void, Maybe<R>>, f1: Fn<void, R>): R;
export declare function fallback<R>(f6: Fn<void, Maybe<R>>, f5: Fn<void, Maybe<R>>, f4: Fn<void, Maybe<R>>, f3: Fn<void, Maybe<R>>, f2: Fn<void, Maybe<R>>, f1: Fn<void, R>): R;
export declare function fallback<R>(f5: Fn<void, Maybe<R>>, f4: Fn<void, Maybe<R>>, f3: Fn<void, Maybe<R>>, f2: Fn<void, Maybe<R>>, f1: Fn<void, R>): R;
export declare function fallback<T1, T2, T3, T4, R>(f4: Fn<void, Maybe<R>>, f3: Fn<void, Maybe<R>>, f2: Fn<void, Maybe<R>>, f1: Fn<void, R>): R;
export declare function fallback<T1, T2, T3, R>(f3: Fn<void, Maybe<R>>, f2: Fn<void, Maybe<R>>, f1: Fn<void, R>): R;
export declare function fallback<T1, T2, R>(f2: Fn<void, Maybe<R>>, f1: Fn<void, R>): R;
export declare function wiith<T1, T2, T3, T4, T5, R>(fn: (...args: [T1, T2, T3, T4, T5]) => R, args: Fn<void, [T1, T2, T3, T4, T5]>): R;
export declare function wiith<T1, T2, T3, T4, R>(fn: (...args: [T1, T2, T3, T4]) => R, args: Fn<void, [T1, T2, T3, T4]>): R;
export declare function wiith<T1, T2, T3, R>(fn: (...args: [T1, T2, T3]) => R, args: Fn<void, [T1, T2, T3]>): R;
export declare function wiith<T1, T2, R>(fn: (...args: [T1, T2]) => R, args: Fn<void, [T1, T2]>): R;
export declare function wiith<T1, A extends [T1], R>(fn: (...args: A) => R, args: Fn<void, [T1]>): R;
export declare function using<T1, T2, T3, T4, T5, R>(a: [T1, T2, T3, T4, T5], fn: (...args: [T1, T2, T3, T4, T5]) => R): R;
export declare function using<T1, T2, T3, T4, R>(a: [T1, T2, T3, T4], fn: (...args: [T1, T2, T3, T4]) => R): R;
export declare function using<T1, T2, T3, R>(a: [T1, T2, T3], fn: (...args: [T1, T2, T3]) => R): R;
export declare function using<T1, T2, R>(a: [T1, T2], fn: (...args: [T1, T2]) => R): R;
export declare function using<T1, A extends [T1], R>(a: A, fn: (...args: A) => R): R;
export declare const guard: <T, R>(guards: [Pred<T>, Fn<T, R>][]) => Fn<T, R>;
export { pipe as composel, curry, partial, __ } from "lodash/fp";
export declare const id: <T>(t: T) => () => T;
export declare const _: <T>(t: T) => () => T;
export declare function composelAsync<T1, T2, T3, T4, T5, R>(f1: Fn<T1, Promise<T2> | T2>, f2: Fn<T2, Promise<T3> | T3>, f3: Fn<T3, Promise<T4> | T4>, f4: Fn<T4, Promise<T5> | T5>, f5: Fn<T5, Promise<R> | R>): (a?: T1) => Promise<R>;
export declare function composelAsync<T1, T2, T3, T4, R>(f1: Fn<T1, Promise<T2> | T2>, f2: Fn<T2, Promise<T3> | T3>, f3: Fn<T3, Promise<T4> | T4>, f4: Fn<T4, Promise<R> | R>): (a?: T1) => Promise<R>;
export declare function composelAsync<T1, T2, T3, R>(f1: Fn<T1, Promise<T2> | T2>, f2: Fn<T2, Promise<T3> | T3>, f3: Fn<T3, Promise<R> | R>): (a?: T1) => Promise<R>;
export declare function composelAsync<T1, T2, R>(f1: Fn<T1, Promise<T2> | T2>, f2: Fn<T2, Promise<R> | R>): (a?: T1) => Promise<R>;
export declare function composeAsync<T1, T2, T3, T4, T5, R>(f5: Fn<T5, Promise<R> | R>, f4: Fn<T4, Promise<T5> | T5>, f3: Fn<T3, Promise<T4> | T4>, f2: Fn<T2, Promise<T3> | T3>, f1: Fn<T1, Promise<T2> | T2>): (a?: T1) => Promise<R>;
export declare function composeAsync<T1, T2, T3, T4, R>(f4: Fn<T4, Promise<R> | R>, f3: Fn<T3, Promise<T4> | T4>, f2: Fn<T2, Promise<T3> | T3>, f1: Fn<T1, Promise<T2> | T2>): (a?: T1) => Promise<R>;
export declare function composeAsync<T1, T2, T3, R>(f3: Fn<T3, Promise<R> | R>, f2: Fn<T2, Promise<T3> | T3>, f1: Fn<T1, Promise<T2> | T2>): (a?: T1) => Promise<R>;
export declare function composeAsync<T1, T2, R>(f2: Fn<T2, Promise<R> | R>, f1: Fn<T1, Promise<T2> | T2>): (a?: T1) => Promise<R>;
