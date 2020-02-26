export declare const identity: <T>(thing: T) => T;
export declare const isString: (val: any) => val is string;
export declare const isDefined: <T>(x: Maybe<T>) => x is T;
export declare const isAllDefined: <T>(vals: Maybe<T>[]) => vals is T[];
export declare const isUndefined: <T>(x: Maybe<T>) => x is undefined;
declare const _default: <T>(val: T | null | undefined) => Maybe<T>;
export default _default;
export declare const when: <T, R>(thing: Maybe<T>, doWork: (inp: T) => R) => Maybe<R>;
export declare const whenAsync: <T, R>(thing: Maybe<T>, doWork: (inp: T) => Promise<R>) => Promise<R | undefined>;
