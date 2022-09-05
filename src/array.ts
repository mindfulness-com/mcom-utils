import { chain, reduce, isArray, filter, intersection, sample } from "lodash";
import { isDefined, Maybe } from "./maybe";
import { Fn } from "./fn";
import { definetly } from "./definetly";

/**
 * Take a value and check whether it is an array.
 * If it is and array return it unmodified, else return it as an array.
 * @param {<T>} input
 * @returns
 */
export const ensureArray = <T>(input: T | T[]): T[] =>
  isArray(input) ? input : [input];

export const compareInt = <T>(p: (t: T) => number) => (t1: T, t2: T) =>
  p(t1) - p(t2);

export const sortByInt = <T>(arr: T[], p: (t: T) => number) =>
  arr.sort(compareInt(p));

export const contains = <T>(arr: Maybe<T[]>, v: T) =>
  !!arr && arr.indexOf(v) > -1;

export const containsAll = <T>(vals: T[], compare: T[]) =>
  intersection(vals, compare).length === compare.length;

export const containsAny = <T>(vals: T[], compare: T[]) =>
  intersection(vals, compare).length > 0;

export const pluckUnique = <T>(
  selector: (tag: T) => Maybe<string>,
): ((tags: T[]) => string[]) => tags =>
  chain(tags)
    .map(selector)
    .filter(isDefined)
    .uniq()
    .value();

export const indexBy = <T>(
  items: T[],
  pick: (i: T) => Maybe<string | string[]>,
): { [key: string]: T } => {
  const result: { [key: string]: T } = {};
  items.forEach(item => {
    const keyOrKeys = pick(item);
    if (isDefined(keyOrKeys)) {
      ensureArray(keyOrKeys).forEach(key => {
        result[key] = item;
      });
    }
  });
  return result;
};

export const lookup = <T>(
  items: T[],
  pick: (i: T) => Maybe<string | string[]>,
  fallback?: (k: string) => T,
) => {
  const hash = indexBy(items, pick);
  return (key: string) => {
    const r = hash[key] || fallback?.(key);
    if (!r) {
      throw new Error("Item not found.");
    }
    return r;
  };
};

export const maybeLookup = <T>(
  items: T[],
  pick: (i: T) => Maybe<string | string[]>,
): Fn<string, Maybe<T>> => {
  const hash = indexBy(items, pick);
  return key => hash[key];
};

export const maybeMap = <T, R>(items: T[], map: (i: T) => Maybe<R>): R[] =>
  reduce(
    items,
    (agg, i) => {
      const r = map(i);
      if (isDefined(r)) {
        return [...agg, r];
      }
      return agg;
    },
    [] as R[],
  );

export const omitEmpty = <T>(vals: Array<T | undefined | null>): T[] =>
  filter(vals, isDefined) as T[];

// Sample for non-empty arrays
export const sampleOne = <T>(ts: T[]): T =>
  definetly(sample(ts), "Non-Empty array sample.");
