/// <reference types="lodash" />
import { Maybe } from "./maybe";
declare type DeepObject = Record<string, string | Record<string, any>>;
export declare const omitEmpty: <T, K extends keyof T>(obj: T) => Partial<T>;
export declare const keysDeep: (obj: DeepObject, parent?: string) => string[];
export declare const hasChanges: <T>(a: T, b: Maybe<T>) => boolean;
export declare const keysToSnakeCase: (obj: Record<string, any>) => import("lodash").Dictionary<any>;
export declare const set: <T>(obj: T, fields: Partial<T>) => T & Partial<T>;
export {};
