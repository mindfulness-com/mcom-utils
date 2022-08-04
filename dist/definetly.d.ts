import { Maybe } from "./maybe";
export declare const getOrElse: <T>(val: Maybe<T>, defaultValue: T) => T;
export declare const definetly: <T>(val: Maybe<T>, errorMessage: string) => T;
export declare const string: (val: Maybe<string>) => string;
export declare const number: (val: Maybe<number>) => number;
declare const _default: {
    string: (val: Maybe<string>) => string;
    number: (val: Maybe<number>) => number;
};
export default _default;
