/* eslint @typescript-eslint/no-explicit-any:off */

import { find, reduce, reduceRight } from "lodash";
import { Maybe } from "./maybe";

export type Pred<T> = (t: T) => boolean;
export type Fn<T, R> = (t: T) => R;

export const otherwise = <T>(_?: T) => (!!_ ? true : true);
export const defined = <T>(t: Maybe<T>): t is T => !!t;
export const not =
  <T>(p: Pred<T>): Pred<T> =>
  t =>
    !p(t);

export function until<R>(
  f5: Fn<void, Promise<Maybe<R>> | Maybe<R>>,
  f4: Fn<void, Promise<Maybe<R>> | Maybe<R>>,
  f3: Fn<void, Promise<Maybe<R>> | Maybe<R>>,
  f2: Fn<void, Promise<Maybe<R>> | Maybe<R>>,
  f1: Fn<void, Promise<R> | R>,
): Promise<R>;
export function until<R>(
  f4: Fn<void, Promise<Maybe<R>> | Maybe<R>>,
  f3: Fn<void, Promise<Maybe<R>> | Maybe<R>>,
  f2: Fn<void, Promise<Maybe<R>> | Maybe<R>>,
  f1: Fn<void, Promise<R> | R>,
): Promise<R>;
export function until<R>(
  f3: Fn<void, Promise<Maybe<R>> | Maybe<R>>,
  f2: Fn<void, Promise<Maybe<R>> | Maybe<R>>,
  f1: Fn<void, Promise<R> | R>,
): Promise<R>;
export function until<R>(
  f2: Fn<void, Promise<Maybe<R>> | Maybe<R>>,
  f1: Fn<void, Promise<R> | R>,
): Promise<R>;
export function until<R>(...fns: Fn<void, Promise<R>>[]) {
  return reduce(
    fns,
    async (
      v: Promise<Maybe<R>> | Maybe<R>,
      fn: Fn<void, Promise<Maybe<R>> | Maybe<R>>,
    ) => (await v) ?? fn(),
    undefined,
  );
}

export function fallback<R>(
  f8: Fn<void, Maybe<R>>,
  f7: Fn<void, Maybe<R>>,
  f6: Fn<void, Maybe<R>>,
  f5: Fn<void, Maybe<R>>,
  f4: Fn<void, Maybe<R>>,
  f3: Fn<void, Maybe<R>>,
  f2: Fn<void, Maybe<R>>,
  f1: Fn<void, R>,
): R;
export function fallback<R>(
  f7: Fn<void, Maybe<R>>,
  f6: Fn<void, Maybe<R>>,
  f5: Fn<void, Maybe<R>>,
  f4: Fn<void, Maybe<R>>,
  f3: Fn<void, Maybe<R>>,
  f2: Fn<void, Maybe<R>>,
  f1: Fn<void, R>,
): R;
export function fallback<R>(
  f6: Fn<void, Maybe<R>>,
  f5: Fn<void, Maybe<R>>,
  f4: Fn<void, Maybe<R>>,
  f3: Fn<void, Maybe<R>>,
  f2: Fn<void, Maybe<R>>,
  f1: Fn<void, R>,
): R;
export function fallback<R>(
  f5: Fn<void, Maybe<R>>,
  f4: Fn<void, Maybe<R>>,
  f3: Fn<void, Maybe<R>>,
  f2: Fn<void, Maybe<R>>,
  f1: Fn<void, R>,
): R;
export function fallback<R>(
  f4: Fn<void, Maybe<R>>,
  f3: Fn<void, Maybe<R>>,
  f2: Fn<void, Maybe<R>>,
  f1: Fn<void, R>,
): R;
export function fallback<R>(
  f3: Fn<void, Maybe<R>>,
  f2: Fn<void, Maybe<R>>,
  f1: Fn<void, R>,
): R;
export function fallback<R>(f2: Fn<void, Maybe<R>>, f1: Fn<void, R>): R;
export function fallback<R>(...fns: Fn<void, R>[]) {
  return reduce(
    fns,
    (v: Maybe<R>, fn: Fn<void, Maybe<R>>) => v ?? fn(),
    undefined,
  );
}

export function wiith<T1, T2, T3, T4, T5, R>(
  fn: (...args: [T1, T2, T3, T4, T5]) => R,
  args: Fn<void, [T1, T2, T3, T4, T5]>,
): R;
export function wiith<T1, T2, T3, T4, R>(
  fn: (...args: [T1, T2, T3, T4]) => R,
  args: Fn<void, [T1, T2, T3, T4]>,
): R;
export function wiith<T1, T2, T3, R>(
  fn: (...args: [T1, T2, T3]) => R,
  args: Fn<void, [T1, T2, T3]>,
): R;
export function wiith<T1, T2, R>(
  fn: (...args: [T1, T2]) => R,
  args: Fn<void, [T1, T2]>,
): R;
export function wiith<T1, A extends [T1], R>(
  fn: (...args: A) => R,
  args: Fn<void, [T1]>,
): R;
export function wiith<A extends [], R>(
  fn: (...args: A) => R,
  args: Fn<void, A>,
) {
  return fn(...args());
}

export function using<T1, T2, T3, T4, T5, R>(
  a: [T1, T2, T3, T4, T5],
  fn: (...args: [T1, T2, T3, T4, T5]) => R,
): R;
export function using<T1, T2, T3, T4, R>(
  a: [T1, T2, T3, T4],
  fn: (...args: [T1, T2, T3, T4]) => R,
): R;
export function using<T1, T2, T3, R>(
  a: [T1, T2, T3],
  fn: (...args: [T1, T2, T3]) => R,
): R;
export function using<T1, T2, R>(a: [T1, T2], fn: (...args: [T1, T2]) => R): R;
export function using<T1, A extends [T1], R>(a: A, fn: (...args: A) => R): R;
export function using<A extends [], R>(a: A, fn: (...args: A) => R) {
  return fn(...a);
}

export const guard =
  <T, R>(guards: [Pred<T>, Fn<T, R>][]): Fn<T, R> =>
  ts => {
    const guard = find(guards, ([guard]) => guard(ts));
    if (!guard) {
      throw new Error("No matching guards found.");
    }
    return guard[1](ts);
  };

export { pipe as composel, curry, partial, __ } from "lodash/fp";

export const id =
  <T>(t: T) =>
  () =>
    t;
export const _ = id;

export function composelAsync<T1, T2, T3, T4, T5, R>(
  f1: Fn<T1, Promise<T2> | T2>,
  f2: Fn<T2, Promise<T3> | T3>,
  f3: Fn<T3, Promise<T4> | T4>,
  f4: Fn<T4, Promise<T5> | T5>,
  f5: Fn<T5, Promise<R> | R>,
): (a?: T1) => Promise<R>;
export function composelAsync<T1, T2, T3, T4, R>(
  f1: Fn<T1, Promise<T2> | T2>,
  f2: Fn<T2, Promise<T3> | T3>,
  f3: Fn<T3, Promise<T4> | T4>,
  f4: Fn<T4, Promise<R> | R>,
): (a?: T1) => Promise<R>;
export function composelAsync<T1, T2, T3, R>(
  f1: Fn<T1, Promise<T2> | T2>,
  f2: Fn<T2, Promise<T3> | T3>,
  f3: Fn<T3, Promise<R> | R>,
): (a?: T1) => Promise<R>;
export function composelAsync<T1, T2, R>(
  f1: Fn<T1, Promise<T2> | T2>,
  f2: Fn<T2, Promise<R> | R>,
): (a?: T1) => Promise<R>;
export function composelAsync<T1, R>(...fns: Fn<any, Promise<any>>[]) {
  return async (a?: T1): Promise<R> =>
    reduce(fns, async (v, fn) => fn(await v), a as any);
}

export function composeAsync<T1, T2, T3, T4, T5, R>(
  f5: Fn<T5, Promise<R> | R>,
  f4: Fn<T4, Promise<T5> | T5>,
  f3: Fn<T3, Promise<T4> | T4>,
  f2: Fn<T2, Promise<T3> | T3>,
  f1: Fn<T1, Promise<T2> | T2>,
): (a?: T1) => Promise<R>;
export function composeAsync<T1, T2, T3, T4, R>(
  f4: Fn<T4, Promise<R> | R>,
  f3: Fn<T3, Promise<T4> | T4>,
  f2: Fn<T2, Promise<T3> | T3>,
  f1: Fn<T1, Promise<T2> | T2>,
): (a?: T1) => Promise<R>;
export function composeAsync<T1, T2, T3, R>(
  f3: Fn<T3, Promise<R> | R>,
  f2: Fn<T2, Promise<T3> | T3>,
  f1: Fn<T1, Promise<T2> | T2>,
): (a?: T1) => Promise<R>;
export function composeAsync<T1, T2, R>(
  f2: Fn<T2, Promise<R> | R>,
  f1: Fn<T1, Promise<T2> | T2>,
): (a?: T1) => Promise<R>;
export function composeAsync<T1, R>(...fns: Fn<any, Promise<any>>[]) {
  return async (a?: T1): Promise<R> =>
    reduceRight(fns, async (v, fn) => fn(await v), a as any);
}
