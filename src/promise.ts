import { map } from "lodash";

export const mapAll = async <T, R>(
  things: T[],
  toPromise: (thing: T) => Promise<R>,
): Promise<R[]> => await Promise.all(map(things, toPromise));
