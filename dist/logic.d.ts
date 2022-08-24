import { Fn } from "./fn";
import { Maybe } from "./maybe";
export declare const not: <T>(func: (arg: T) => boolean) => (arg: T) => boolean;
export declare const ifDo: <T>(cond: Maybe<boolean> | Fn<void, Maybe<boolean>>, val: T | Fn<void, T>) => T | undefined;
export declare const ifDo_: <T>(pred: Maybe<boolean> | Fn<void, Maybe<boolean>>, work: Fn<void, T>) => () => T | undefined;
export declare function switchEnum<E extends string | number | symbol, R>(e: E, handlers: {
    [P in E]?: R | Fn<P, R>;
} & {
    else: R | Fn<E, R>;
}): R;
