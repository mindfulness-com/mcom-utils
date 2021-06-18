import { Fn } from "./fn";
export { all } from "bluebird";
export declare const mapAll: <T, R>(things: T[], toPromise: (thing: T) => Promise<R>) => Promise<R[]>;
export declare const most: <T>(promises: Promise<T>[], onError?: Fn<Error, void> | undefined) => Promise<T[]>;
export declare const mapMost: <T, R>(things: T[], toPromise: (thing: T) => Promise<R>, onError?: Fn<Error, void> | undefined) => Promise<R[]>;
