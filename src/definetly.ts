import { isDefined } from "./maybe";

export const getOrElse = <T>(val: Maybe<T>, defaultValue: T): T =>
  isDefined(val) ? val : defaultValue;

export const string = (val: Maybe<string>): string => getOrElse(val, "");

export const number = (val: Maybe<number>): number => getOrElse(val, 0);

export default {
  string,
  number,
};
