import { isFunction } from "lodash";
import { Fn } from "./fn";
import { Maybe } from "./maybe";

export const not =
  <T>(func: (arg: T) => boolean) =>
  (arg: T) =>
    !func(arg);

const ensureFn = <V>(v: V | Fn<void, V>) => (isFunction(v) ? v : () => v);

export const ifDo = <T>(
  cond: Maybe<boolean> | Fn<void, Maybe<boolean>>,
  val: T | Fn<void, T>,
) => {
  if (ensureFn(cond)()) {
    return ensureFn(val)();
  }
  return undefined;
};

export const ifDo_ =
  <T>(pred: Maybe<boolean> | Fn<void, Maybe<boolean>>, work: Fn<void, T>) =>
  () =>
    ifDo(pred, work);

export function switchEnum<E extends string | number | symbol, R>(
  e: E,
  handlers: { [P in E]?: R | Fn<P, R> } & { else: R | Fn<E, R> },
): R;
export function switchEnum<R>(
  e: string,
  handlers: Record<string, Maybe<Fn<string, R>>> & { else: Fn<string, R> },
): R {
  const specific = handlers[e];
  if (specific) {
    return isFunction(specific) ? specific(e) : specific;
  }
  return isFunction(handlers.else) ? handlers.else(e) : handlers.else;
}
