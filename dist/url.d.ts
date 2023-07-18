import { stringify } from "query-string";
import { Maybe } from "./maybe";
type Primitive = string | number | boolean;
export declare const toQueryParams: typeof stringify;
export declare const toQueryString: (params: Record<string, Maybe<Primitive>>) => string;
export {};
