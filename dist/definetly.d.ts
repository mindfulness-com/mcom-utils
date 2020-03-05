import { Maybe } from "./maybe";
export declare const getOrElse: <T>(val: Maybe<T>, defaultValue: T) => T;
export declare const definetly: <T>(val: Maybe<T>, errorMessage: string) => T;
export declare const string: (val: string | undefined) => string;
export declare const number: (val: number | undefined) => number;
declare const _default: {
    string: (val: string | undefined) => string;
    number: (val: number | undefined) => number;
};
export default _default;
