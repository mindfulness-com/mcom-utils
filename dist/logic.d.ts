import { Fn, Pred } from "./fn";
export declare const not: <T>(func: (arg: T) => boolean) => (arg: T) => boolean;
export declare const ifDo: <T>(cond: boolean | Pred<void>, val: T | Fn<void, T>) => T | undefined;
