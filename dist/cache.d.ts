import * as memoizee from "memoizee";
export declare const cachedFunc: <F extends Function>(func: F, milliseconds: number) => F & memoizee.Memoized<F>;
