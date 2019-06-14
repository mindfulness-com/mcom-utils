import { chain } from "lodash";
import { isDefined } from "./maybe";

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
  pick: (i: T) => Maybe<string>,
): { [key: string]: T } => {
  const result: { [key: string]: T } = {};
  items.forEach(item => {
    const key = pick(item);
    if (isDefined(key)) {
      result[key] = item;
    }
  });
  return result;
};
