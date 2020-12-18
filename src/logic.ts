import { isFunction } from "lodash";
import { Fn, Pred } from "./fn";

export const not = <T>(func: (arg: T) => boolean) => (arg: T) => !func(arg);

const ensureFn = <V>(v: V | Fn<void, V>) => (isFunction(v) ? v : () => v);

export const ifDo = <T>(cond: boolean | Pred<void>, val: T | Fn<void, T>) => {
  if (ensureFn(cond)()) {
    return ensureFn(val)();
  }
  return undefined;
};
