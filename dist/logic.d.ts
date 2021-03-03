import { Fn } from "./fn";
export declare const not: <T>(func: (arg: T) => boolean) => (arg: T) => boolean;
export declare const ifDo: <T>(cond: boolean | Fn<void, boolean | undefined> | undefined, val: T | Fn<void, T>) => T | undefined;
