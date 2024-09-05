export type Nothing = undefined;
export type Maybe<T> = T | Nothing;
export type Nullable<T> = T | Nothing | null;
export declare const identity: <T>(thing: T) => T;
export declare const isString: (val: string | any) => val is string;
export declare const isDefined: <T>(x: Nullable<T>) => x is T;
export declare const isAllDefined: <T>(vals: Nullable<T>[]) => vals is T[];
export declare const isUndefined: <T>(x: Nullable<T>) => x is undefined;
declare const _default: <T>(val: T | Nothing | null) => Maybe<T>;
export default _default;
/**
 * When something is defined, do something with it.
 * @param {T} thing - The `thing` to check
 * @param {function} doWork - What to do if the `thing` is defined
 * @returns {*} - returns undefined if "thing" is not defined or whatever is returned from `doWork`
 */
export declare const when: <T, R>(thing: Nullable<T>, doWork: (inp: T) => R) => Maybe<R>;
/**
 * When something is defined, do something with it.
 * @async
 * @param {T} thing - The `thing` to check
 * @param {function} doWork - What to do if the `thing` is defined
 * @returns {Promise<unknown>} - returns undefined if "thing" is not defined or whatever is returned from `doWork`
 */
export declare const whenAsync: <T, R>(thing: Nullable<T>, doWork: (inp: T) => Promise<R>) => Promise<Maybe<R>>;
/**
 * When something is undefined (or null), do something. - Opposite of when
 * @param {T} thing - The `thing` to check
 * @param {function} doWork - What to do if the `thing` is undefined
 * @returns {*} - returns undefined if "thing" is defined or whatever is returned from `doWork`
 */
export declare const unless: <T, R>(thing: Nullable<T>, doWork: () => R) => Maybe<R>;
/**
 * If the unknown value is a string then return it as a string, otherwise return undefined
 * @param {unknown} value - The value to check
 * @returns {Maybe<string>} - returns the unknown value if it is a string, otherwise returns undefined
 */
export declare const testIsString: (value: unknown) => Maybe<string>;
/**
 * If the unknown value is a number, or a numeric string, then return it as a number, otherwise return undefined
 * @param {unknown} value - The value to check
 * @returns {Maybe<number>} - returns the unknown value if it is a number, otherwise returns undefined
 */
export declare const testIsNumber: (value: unknown) => Maybe<number>;
