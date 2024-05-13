import { Nullable } from "./maybe";
export declare const getOrElse: <T>(val: Nullable<T>, defaultValue: T) => T;
export declare const definitely: <T>(val: Nullable<T>, errorMessage: string) => T;
export declare const string: (val: Nullable<string>) => string;
export declare const number: (val: Nullable<number>) => number;
declare const _default: {
    string: (val: Nullable<string>) => string;
    number: (val: Nullable<number>) => number;
};
export default _default;
