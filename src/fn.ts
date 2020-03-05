import { find } from "lodash";
import { Maybe } from "./maybe";

export type Pred<T> = (t: T) => boolean;
export type Fn<T, R> = (t: T) => R;

export const otherwise = <T>(_?: T) => true;
export const defined = <T>(t: Maybe<T>): t is T => !!t;
export const not = <T>(p: Pred<T>): Pred<T> => t => !p(t);

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

export const guard = <T, R>(guards: [Pred<T>, Fn<T, R>][]): Fn<T, R> => ts => {
  const guard = find(guards, ([guard]) => guard(ts));
  if (!guard) {
    throw new Error("No matching guards found.");
  }
  return guard[1](ts);
};

// Example usage of guards
export const max: Fn<number[], number> = guard([
  [xs => xs.length === 0, () => 0],
  [not<number[]>(defined), ([m]) => m],
  [otherwise, ([x, ...xs]) => (x > max(xs) ? x : max(xs))],
]);
