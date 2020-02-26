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

export const when = <T, R>(thing: Maybe<T>, doWork: (inp: T) => R): Maybe<R> =>
  isDefined(thing) ? doWork(thing) : undefined;

export const whenAsync = async <T, R>(
  thing: Maybe<T>,
  doWork: (inp: T) => Promise<R>,
): Promise<R | undefined> => when(thing, doWork);
