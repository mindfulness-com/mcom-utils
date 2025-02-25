import { stringify } from "query-string";
import { isEmpty, first } from "lodash";

import { Maybe, when } from "./maybe";

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

export const ensureProtocol = (protocol: string, uri?: string): Maybe<string> =>
  when(uri || undefined, d => {
    try {
      const url = new URL(d);
      url.protocol = protocol.endsWith(":") ? protocol : `${protocol}:`;
      return url.toString();
    } catch (_err) {
      throw new Error(`Invalid URI provided: ${uri}`);
    }
  });
