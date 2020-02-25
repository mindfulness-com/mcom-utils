/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-object-literal-type-assertion,  @typescript-eslint/no-explicit-any */

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
import { snakeCase } from "change-case";

type DeepObject = Record<string, string | Record<string, any>>;

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

const isWeakEqual = <T>(a: T, b: Maybe<T>) =>
  (isNil(a) && isNil(b)) || isEqual(a, b);

export const hasChanges = <T>(a: T, b: Maybe<T>) =>
  some(keys(a), key => !isWeakEqual(get(a, key), b ? get(b, key) : undefined));

export const keysToSnakeCase = (obj: Record<string, any>) =>
  mapKeys(obj, (_v, key) => snakeCase(key));

export const set = <T>(obj: T, fields: Partial<T>) => _assign(obj, fields);
