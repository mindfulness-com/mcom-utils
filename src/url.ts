import { stringify } from "query-string";
import { isEmpty, first } from "lodash";

import { Maybe } from "./maybe";

type Primitive = string | number | boolean;

export const baseUrl = (url: string) => first(url.split(/[\#\?]/));

export const toQueryParams = stringify;

export const toQueryString = (
  params: Record<string, Maybe<Primitive | Primitive[]>>,
) => (isEmpty(params) ? "" : `?${toQueryParams(params)}`);

export const addQueryParam = (
  url: string,
  params: Record<string, Maybe<Primitive | Primitive[]>>,
) => {
  const [base, existing] = url.split("?");
  return existing
    ? `${base}?${existing}&${toQueryParams(params)}`
    : `${url}${toQueryString(params)}`;
};
