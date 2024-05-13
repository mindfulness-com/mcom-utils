import { first } from "lodash";
import { isDefined, Nullable } from "./maybe";

export const getOrElse = <T>(val: Nullable<T>, defaultValue: T): T =>
  isDefined(val) ? val : defaultValue;

export const definitely = <T>(val: Nullable<T>, errorMessage: string): T => {
  if (!isDefined(val)) {
    throw new Error(errorMessage);
  }
  return val;
};

export const definitelyOne = <T>(val: T[], errorMessage: string): T =>
  definitely(first(val), errorMessage);

export const string = (val: Nullable<string>): string => getOrElse(val, "");

export const number = (val: Nullable<number>): number => getOrElse(val, 0);

export default {
  string,
  number,
};
