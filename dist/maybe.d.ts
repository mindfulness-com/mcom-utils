export type Nothing = undefined;
export type Maybe<T> = T | Nothing;
export declare const identity: <T>(thing: T) => T;
export declare const isString: (val: string | any) => val is string;
export declare const isDefined: <T>(x: Maybe<T>) => x is T;
export declare const isAllDefined: <T>(vals: Maybe<T>[]) => vals is T[];
export declare const isUndefined: <T>(x: Maybe<T>) => x is undefined;
declare const _default: <T>(val: T | null | undefined) => Maybe<T>;
export default _default;
/**
 * When something is defined, do something with it.
 * @param {T} thing - The `thing` to check for truthiness
 * @param {function} doWork - What to do if the `thing` is true
 * @returns {*} - returns undefined if "thing" is not defined or whatever is returned from `doWork`
 */
export declare const when: <T, R>(thing: Maybe<T>, doWork: (inp: T) => R) => Maybe<R>;
/**
 * When something is defined, do something with it.
 * @async
 * @param {T} thing - The `thing` to check for truthiness
 * @param {function} doWork - What to do if the `thing` is true
 * @returns {Promise<unknown>} - returns undefined if "thing" is not defined or whatever is returned from `doWork`
 */
export declare const whenAsync: <T, R>(thing: Maybe<T>, doWork: (inp: T) => Promise<R>) => Promise<R | undefined>;
/**
 * When something is undefined, do something. - Opposite of when
 * @param {T} thing - The `thing` to check for truthiness
 * @param {function} doWork - What to do if the `thing` is true
 * @return {*} - returns undefined if "thing" is not defined or whatever is returned from `doWork`
 */
export declare const unless: <T, R>(thing: Maybe<T>, doWork: () => R) => Maybe<R>;
