import { stringify } from "query-string";
import { isEmpty } from "lodash";

import { Maybe } from "./maybe";

type Primitive = string | number | boolean;

export const toQueryParams = stringify;

export const toQueryString = (params: Record<string, Maybe<Primitive>>) =>
  isEmpty(params) ? "" : `?${toQueryParams(params)}`;
