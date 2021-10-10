import { stringify } from "query-string";
import { isEmpty } from "lodash";
import { compress, decompress } from "shorter";

import { Maybe } from "./maybe";
import { Fn, composel } from "./fn";

type Primitive = string | number | boolean;

export const toQueryParams = stringify;

export const toQueryString = (params: Record<string, Maybe<Primitive>>) =>
  isEmpty(params) ? "" : `?${toQueryParams(params)}`;

export const hashParams: Fn<
  Record<string, Maybe<string | boolean | number>>,
  string
> = composel(JSON.stringify, compress, b => b.toString("base64"));

export const dehashParams: Fn<
  string,
  Record<string, Maybe<string | boolean | number>>
> = composel((s: string) => Buffer.from(s, "base64"), decompress, JSON.parse);
