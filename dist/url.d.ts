import { stringify } from "query-string";
import { Maybe } from "./maybe";
type Primitive = string | number | boolean;
export declare const baseUrl: (url: string) => string | undefined;
export declare const toQueryParams: typeof stringify;
export declare const toQueryString: (params: Record<string, Maybe<Primitive | Primitive[]>>) => string;
export declare const addQueryParam: (url: string, params: Record<string, Maybe<Primitive | Primitive[]>>) => string;
export {};
