import { stringify } from "query-string";
import { Maybe } from "./maybe";
import { Fn } from "./fn";
declare type Primitive = string | number | boolean;
export declare const toQueryParams: typeof stringify;
export declare const toQueryString: (params: Record<string, Maybe<Primitive>>) => string;
export declare const hashParams: Fn<Record<string, Maybe<string | boolean | number>>, string>;
export declare const dehashParams: (s: string) => Record<string, Maybe<Primitive>>;
export {};
