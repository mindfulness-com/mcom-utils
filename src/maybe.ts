/* eslint @typescript-eslint/no-explicit-any:off */

import { every, isNumber } from "lodash";

export type Nothing = undefined;
export type Maybe<T> = T | Nothing;

export const identity = <T>(thing: T): T => thing;

export const isString = (val: string | any): val is string =>
  typeof val === "string";

export const isDefined = <T>(x: Maybe<T>): x is T => {
  return x !== undefined && x !== null;
};

export const isAllDefined = <T>(vals: Maybe<T>[]): vals is T[] =>
  every(vals, isDefined);

export const isUndefined = <T>(x: Maybe<T>): x is undefined => {
  return x === undefined || x === null;
};

export default <T>(val: T | undefined | null): Maybe<T> => val || undefined;

/**
 * When something is defined, do something with it.
 * @param {T} thing - The `thing` to check
 * @param {function} doWork - What to do if the `thing` is defined
 * @returns {*} - returns undefined if "thing" is not defined or whatever is returned from `doWork`
 */
export const when = <T, R>(thing: Maybe<T>, doWork: (inp: T) => R): Maybe<R> =>
  isDefined(thing) ? doWork(thing) : undefined;

/**
 * When something is defined, do something with it.
 * @async
 * @param {T} thing - The `thing` to check
 * @param {function} doWork - What to do if the `thing` is defined
 * @returns {Promise<unknown>} - returns undefined if "thing" is not defined or whatever is returned from `doWork`
 */
export const whenAsync = async <T, R>(
  thing: Maybe<T>,
  doWork: (inp: T) => Promise<R>,
): Promise<Maybe<R>> => when(thing, doWork);

/**
 * When something is undefined, do something. - Opposite of when
 * @param {T} thing - The `thing` to check
 * @param {function} doWork - What to do if the `thing` is undefined
 * @return {*} - returns undefined if "thing" is defined or whatever is returned from `doWork`
 */
export const unless = <T, R>(thing: Maybe<T>, doWork: () => R): Maybe<R> =>
  isUndefined(thing) ? doWork() : undefined;

/**
 * If the unknown value is a string then return it as a string, otherwise return undefined
 * @param {unknown} value - The value to check
 * @return {Maybe<string>} - returns the unknown value if it is a string, otherwise returns undefined
 */
export const testIsString = (value: unknown): Maybe<string> =>
  isString(value) ? value : undefined;

const testIsNumericString = (value: unknown): Maybe<string> =>
  when(testIsString(value), s => (s.match(/^\d*\.?\d+$/) ? s : undefined)) ||
  undefined;

/**
 * If the unknown value is a number, or a numeric string, then return it as a number, otherwise return undefined
 * @param {unknown} value - The value to check
 * @return {Maybe<number>} - returns the unknown value if it is a number, otherwise returns undefined
 */
export const testIsNumber = (value: unknown): Maybe<number> =>
  isNumber(value)
    ? value
    : when(testIsNumericString(value), s => Number(s)) || undefined;
