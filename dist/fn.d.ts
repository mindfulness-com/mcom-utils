export declare type Pred<T> = (t: T) => boolean;
export declare type Fn<T, R> = (t: T) => R;
export declare const otherwise: <T>(_?: T | undefined) => boolean;
export declare const defined: <T>(t: Maybe<T>) => t is T;
export declare const not: <T>(p: Pred<T>) => Pred<T>;
export declare const wiith: <A, R>(fn: (a: A) => R, afn: () => A) => R;
export declare const using: <A, R>(a: A, fn: (a: A) => R) => R;
export declare const guard: <T, R>(guards: [Pred<T>, Fn<T, R>][]) => Fn<T, R>;
export declare const max: Fn<number[], number>;
