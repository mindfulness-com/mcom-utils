import { map, filter } from "lodash";
import { Fn } from "./fn";
import { all } from "bluebird";
import { isDefined } from "./maybe";

export { all } from "bluebird";

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
          onError(err);
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
