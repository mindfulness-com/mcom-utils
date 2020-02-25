import { find } from "lodash";

type Pred<T> = (t: T) => boolean;
type Fn<T, R> = (t: T) => R;

export const otherwise = <T>(_?: T) => true;
export const defined = <T>(t: Maybe<T>): t is T => !!t;
export const not = <T>(p: Pred<T>): Pred<T> => t => !p(t);

export const wiith = <A, R>(fn: (a: A) => R, afn: () => A) => fn(afn());
export const using = <A, R>(a: A, fn: (a: A) => R) => fn(a);

export const guard = <T, R>(guards: [Pred<T>, Fn<T, R>][]): Fn<T, R> => ts =>
  wiith(
    guard => {
      if (!guard) {
        throw new Error("No matching guards found.");
      }

      return guard[1](ts);
    },
    () => find(guards, ([guard]) => guard(ts)),
  );

// Example usage of guards
export const max: Fn<number[], number> = guard([
  [xs => xs.length === 0, () => 0],
  [not<number[]>(defined), ([m]) => m],
  [otherwise, ([x, ...xs]) => (x > max(xs) ? x : max(xs))],
]);
