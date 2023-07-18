/// <reference types="lodash" />
import { Maybe } from "./maybe";
type DeepObject = Record<string, string | Record<string, any>>;
/**
 * Returns an object with all the key/value pairs that are null or undefined are removed.
 * @param obj The object to strip null and undefined from.
 * @returns The stripped object.
 * @example
 * omitEmpty({ a: "", b: "asdas", c: false, d: null, e: undefined, f: 0 });
 * // { b: "asdas", c: false, f: 0 }
 */
export declare const omitEmpty: <T, K extends keyof T>(obj: T) => Partial<T>;
export declare const keysDeep: (obj: DeepObject, parent?: string) => string[];
export declare const hasChanges: <T>(a: T, b: Maybe<T>) => boolean;
export declare const keysToSnakeCase: (obj: Record<string, any>) => import("lodash").Dictionary<any>;
export declare const set: <T>(obj: T, fields: Partial<T>) => T & Partial<T>;
export {};
