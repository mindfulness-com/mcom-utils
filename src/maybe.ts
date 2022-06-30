/* eslint @typescript-eslint/no-explicit-any:off */

import { every } from "lodash";

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
 * When something is truthy, do something with it.
 * @param {T} thing - The `thing` to check for truthiness
 * @param {function} doWork - What to do if the `thing` is true
 * @returns {*} - returns undefined if "thing" is not defined or whatever is returned from `doWork`
 */
export const when = <T, R>(thing: Maybe<T>, doWork: (inp: T) => R): Maybe<R> =>
  isDefined(thing) ? doWork(thing) : undefined;

/**
 * When something is truthy, do something with it.
 * @async
 * @param {T} thing - The `thing` to check for truthiness
 * @param {function} doWork - What to do if the `thing` is true
 * @returns {Promise<unknown>} - returns undefined if "thing" is not defined or whatever is returned from `doWork`
 */
export const whenAsync = async <T, R>(
  thing: Maybe<T>,
  doWork: (inp: T) => Promise<R>,
): Promise<R | undefined> => when(thing, doWork);
