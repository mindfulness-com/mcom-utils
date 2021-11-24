import { Fn } from "./fn";
export declare const not: <T>(func: (arg: T) => boolean) => (arg: T) => boolean;
export declare const ifDo: <T>(cond: boolean | Fn<void, boolean | undefined> | undefined, val: T | Fn<void, T>) => T | undefined;
export declare const ifDo_: <T>(pred: boolean | Fn<void, boolean | undefined> | undefined, work: Fn<void, T>) => () => T | undefined;
