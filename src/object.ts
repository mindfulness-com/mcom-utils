/* eslint-disable @typescript-eslint/no-explicit-any */

import { Maybe } from "./maybe";
import {
  isNil,
  reduce,
  keys,
  chain,
  isEmpty,
  isString,
  some,
  get,
  isEqual,
  mapKeys,
  assign as _assign,
} from "lodash";
import { snakeCase } from "./string";

type DeepObject = Record<string, string | Record<string, any>>;

/**
 * Returns an object with all the key/value pairs that are null or undefined are removed.
 * @param obj The object to strip null and undefined from.
 * @returns The stripped object.
 * @example
 * omitEmpty({ a: "", b: "asdas", c: false, d: null, e: undefined, f: 0 });
 * // { a: "", b: "asdas", c: false, f: 0 }
 */
export const omitEmpty = <T, K extends keyof T>(obj: T): Partial<T> =>
  reduce(
    keys(obj) as K[],
    (v: Partial<T>, key: K) => {
      if (!isNil(obj[key])) {
        v[key] = obj[key];
      }
      return v;
    },
    {} as Partial<T>,
  );

export const keysDeep = (obj: DeepObject, parent?: string): string[] => {
  return chain(obj)
    .toPairs()
    .map(([key, value]) => {
      const fullKey = parent ? `${parent}.${key}` : key;
      return isEmpty(value) || isString(value)
        ? [fullKey]
        : [fullKey, ...keysDeep(value as DeepObject, fullKey)];
    })
    .flatten()
    .value();
};
/**
 * Performs a deep comparison between two values to determine if they are equivalent.
 * Will also return true if both values are either null or undefined.
 * @category — Lang
 * @param value — The value to compare.
 * @param other — The other value to compare.
 * @returns — Returns true if the values are equivalent, else false.
 */
const isWeakEqual = <T>(a: T, b: Maybe<T>) =>
  (isNil(a) && isNil(b)) || isEqual(a, b);

export const hasChanges = <T>(a: T, b: Maybe<T>) =>
  some(keys(a), key => !isWeakEqual(get(a, key), b ? get(b, key) : undefined));

export const keysToSnakeCase = (obj: Record<string, any>) =>
  mapKeys(obj, (_v, key) => snakeCase(key));

export const set = <T>(obj: T, fields: Partial<T>) => _assign(obj, fields);
