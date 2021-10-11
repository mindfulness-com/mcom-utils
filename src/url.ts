import { stringify } from "query-string";
import { isEmpty } from "lodash";
import { hashSync, compareSync } from "bcrypt";

import { Maybe } from "./maybe";
import { Fn, composel } from "./fn";
import { envOption } from "./env";
import { split } from "lodash/fp";

type Primitive = string | number | boolean;

const HASH_SECRET = envOption({
  // TODO: Move to env var
  prod: "a3db148d-c1d6-4976-9f62-c183c2771d86",
  dev: "a3db148d-c1d6-4976-9f62-c183c2771d86",
});

const from64 = (s: string) => Buffer.from(s, "base64").toString();

export const toQueryParams = stringify;

export const toQueryString = (params: Record<string, Maybe<Primitive>>) =>
  isEmpty(params) ? "" : `?${toQueryParams(params)}`;

/*
 ** Hash params with a secret to prevent public modification
 */
export const hashParams: Fn<
  Record<string, Maybe<string | boolean | number>>,
  string
> = composel(
  JSON.stringify,
  b => Buffer.from(b).toString("base64"),
  (s: string) => [s, hashSync(s + HASH_SECRET, 6)],
  ([s, hash]) => `${s}-${Buffer.from(hash).toString("base64")}`,
);

/*
 ** Dehash params and ensure the bcrypt value matches
 */
export const dehashParams = (
  s: string,
): Record<string, Maybe<string | boolean | number>> =>
  composel(
    split("-"),
    ([b, hash]) => {
      if (!compareSync(b + HASH_SECRET, from64(hash))) {
        throw new Error("Hash does not match data.");
      }
      return b;
    },
    from64,
    JSON.parse,
  )(s);
