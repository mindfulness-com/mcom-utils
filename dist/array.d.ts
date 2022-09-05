import { Maybe } from "./maybe";
import { Fn } from "./fn";
/**
 * Take a value and check whether it is an array.
 * If it is and array return it unmodified, else return it as an array.
 * @param {<T>} input
 * @returns
 */
export declare const ensureArray: <T>(input: T | T[]) => T[];
export declare const compareInt: <T>(p: (t: T) => number) => (t1: T, t2: T) => number;
export declare const sortByInt: <T>(arr: T[], p: (t: T) => number) => T[];
export declare const contains: <T>(arr: Maybe<T[]>, v: T) => boolean;
export declare const containsAll: <T>(vals: T[], compare: T[]) => boolean;
export declare const containsAny: <T>(vals: T[], compare: T[]) => boolean;
export declare const pluckUnique: <T>(selector: (tag: T) => Maybe<string>) => (tags: T[]) => string[];
export declare const indexBy: <T>(items: T[], pick: (i: T) => Maybe<string | string[]>) => {
    [key: string]: T;
};
export declare const lookup: <T>(items: T[], pick: (i: T) => Maybe<string | string[]>, fallback?: ((k: string) => T) | undefined) => (key: string) => T;
export declare const maybeLookup: <T>(items: T[], pick: (i: T) => Maybe<string | string[]>) => Fn<string, Maybe<T>>;
export declare const maybeMap: <T, R>(items: T[], map: (i: T) => Maybe<R>) => R[];
export declare const omitEmpty: <T>(vals: (T | null | undefined)[]) => T[];
export declare const sampleOne: <T>(ts: T[]) => T;
