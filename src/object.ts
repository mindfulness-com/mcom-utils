/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-object-literal-type-assertion,  @typescript-eslint/no-explicit-any */

import { isNil, reduce, keys, chain, isEmpty, isString } from "lodash";

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

export const filterKeys = (keys: string[], prefix: string): string[] =>
  keys.filter(f => f.startsWith(prefix)).map(f => f.replace(prefix, ""));
