/* eslint-disable @typescript-eslint/ban-ts-comment */

import { map, filter, every } from "lodash";
import { Fn, not } from "./fn";
import { all as ball } from "bluebird";
import { isDefined } from "./maybe";
import { assertError } from "./error";

type Resolvable<R> = R | PromiseLike<R> | void | PromiseLike<void>;

export function all<T1, T2, T3, T4, T5, T6, T7>(
  values: [
    Resolvable<T1>,
    Resolvable<T2>,
    Resolvable<T3>,
    Resolvable<T4>,
    Resolvable<T5>,
    Resolvable<T6>,
    Resolvable<T7>,
  ],
): Promise<[T1, T2, T3, T4, T5, T6, T7]>;
export function all<T1, T2, T3, T4, T5, T6>(
  values: [
    Resolvable<T1>,
    Resolvable<T2>,
    Resolvable<T3>,
    Resolvable<T4>,
    Resolvable<T5>,
    Resolvable<T6>,
  ],
): Promise<[T1, T2, T3, T4, T5, T6]>;
export function all<T1, T2, T3, T4, T5>(
  values: [
    Resolvable<T1>,
    Resolvable<T2>,
    Resolvable<T3>,
    Resolvable<T4>,
    Resolvable<T5>,
  ],
): Promise<[T1, T2, T3, T4, T5]>;
export function all<T1, T2, T3, T4>(
  values: [Resolvable<T1>, Resolvable<T2>, Resolvable<T3>, Resolvable<T4>],
): Promise<[T1, T2, T3, T4]>;
export function all<T1, T2, T3>(
  values: [Resolvable<T1>, Resolvable<T2>, Resolvable<T3>],
): Promise<[T1, T2, T3]>;
export function all<T1, T2>(
  values: [Resolvable<T1>, Resolvable<T2>],
): Promise<[T1, T2]>;
export function all<T1>(values: [Resolvable<T1>]): Promise<[T1]>;
export function all<T>(values: Resolvable<T>[]): Promise<T[]>;
export function all(values: any): Promise<any> {
  // @ts-ignore
  return ball(values);
}

export function some<T1, T2, T3, T4, T5, T6, T7>(
  values: [
    Resolvable<T1>,
    Resolvable<T2>,
    Resolvable<T3>,
    Resolvable<T4>,
    Resolvable<T5>,
    Resolvable<T6>,
    Resolvable<T7>,
  ],
  log?: Fn<Error, void>,
): Promise<[T1, T2, T3, T4, T5, T6, T7]>;
export function some<T1, T2, T3, T4, T5, T6>(
  values: [
    Resolvable<T1>,
    Resolvable<T2>,
    Resolvable<T3>,
    Resolvable<T4>,
    Resolvable<T5>,
    Resolvable<T6>,
  ],
  log?: Fn<Error, void>,
): Promise<[T1, T2, T3, T4, T5, T6]>;
export function some<T1, T2, T3, T4, T5>(
  values: [
    Resolvable<T1>,
    Resolvable<T2>,
    Resolvable<T3>,
    Resolvable<T4>,
    Resolvable<T5>,
  ],
  log?: Fn<Error, void>,
): Promise<[T1, T2, T3, T4, T5]>;
export function some<T1, T2, T3, T4>(
  values: [Resolvable<T1>, Resolvable<T2>, Resolvable<T3>, Resolvable<T4>],
  log?: Fn<Error, void>,
): Promise<[T1, T2, T3, T4]>;
export function some<T1, T2, T3>(
  values: [Resolvable<T1>, Resolvable<T2>, Resolvable<T3>],
  log?: Fn<Error, void>,
): Promise<[T1, T2, T3]>;
export function some<T1, T2>(
  values: [Resolvable<T1>, Resolvable<T2>],
  log?: Fn<Error, void>,
): Promise<[T1, T2]>;
export function some<T1>(
  values: [Resolvable<T1>],
  log?: Fn<Error, void>,
): Promise<[T1]>;
export function some<T>(
  values: Resolvable<T>[],
  log?: Fn<Error, void>,
): Promise<T[]>;
export async function some<T>(
  values: Resolvable<T>[],
  log?: Fn<Error, void>,
): Promise<Resolvable<T>[]> {
  const errors: Error[] = [];
  const res = await all(
    values.map(async p => {
      try {
        return await p;
      } catch (err) {
        log?.(assertError(err));
        return undefined;
      }
    }),
  );
  if (every(res, not(isDefined))) {
    throw errors;
  }
  return res;
}

export const mapAll = async <T, R>(
  things: T[],
  toPromise: (thing: T) => Promise<R>,
): Promise<R[]> => await all(map(things, toPromise));

export const most = async <T>(
  promises: Promise<T>[],
  onError?: Fn<Error, void>,
): Promise<T[]> => {
  const results = await all(
    promises.map(async p => {
      try {
        return await p;
      } catch (err) {
        if (onError) {
          onError(assertError(err));
        }
        return undefined;
      }
    }),
  );

  return filter(results, isDefined);
};

export const mapMost = async <T, R>(
  things: T[],
  toPromise: (thing: T) => Promise<R>,
  onError?: Fn<Error, void>,
): Promise<R[]> => await most(map(things, toPromise), onError);

export const waitFor = async <T, R>(
  p: Promise<T>,
  fn: (t: T) => R,
): Promise<R> => fn(await p);

export async function usingAll<T1, T2, T3, T4, T5, T6, R>(
  a: [
    Promise<T1>,
    Promise<T2>,
    Promise<T3>,
    Promise<T4>,
    Promise<T5>,
    Promise<T6>,
  ],
  fn: (...args: [T1, T2, T3, T4, T5, T6]) => R,
): Promise<R>;
export async function usingAll<T1, T2, T3, T4, T5, R>(
  a: [Promise<T1>, Promise<T2>, Promise<T3>, Promise<T4>, Promise<T5>],
  fn: (...args: [T1, T2, T3, T4, T5]) => R,
): Promise<R>;
export async function usingAll<T1, T2, T3, T4, R>(
  a: [Promise<T1>, Promise<T2>, Promise<T3>, Promise<T4>],
  fn: (...args: [T1, T2, T3, T4]) => R,
): Promise<R>;
export async function usingAll<T1, T2, T3, R>(
  a: [Promise<T1>, Promise<T2>, Promise<T3>],
  fn: (...args: [T1, T2, T3]) => R,
): Promise<R>;
export async function usingAll<T1, T2, R>(
  a: [Promise<T1>, Promise<T2>],
  fn: (...args: [T1, T2]) => R,
): Promise<R>;
export async function usingAll<T1, R>(
  a: [Promise<T1>],
  fn: (...args: [T1]) => R,
): Promise<R>;
export async function usingAll<A extends [], B extends [], R>(
  a: A,
  fn: (...args: B) => R,
) {
  // @ts-ignore – promise.all typing breaks here
  return fn(...(await Promise.all(a)));
}
