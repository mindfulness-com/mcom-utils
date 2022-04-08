import { Fn } from "./fn";
import { Maybe } from "./maybe";
export declare const not: <T>(func: (arg: T) => boolean) => (arg: T) => boolean;
export declare const ifDo: <T>(cond: boolean | Fn<void, Maybe<boolean>> | undefined, val: T | Fn<void, T>) => T | undefined;
export declare const ifDo_: <T>(pred: boolean | Fn<void, Maybe<boolean>> | undefined, work: Fn<void, T>) => () => T | undefined;
