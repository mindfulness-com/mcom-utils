/// <reference types="lodash" />
export declare const omitEmpty: <T, K extends keyof T>(obj: T) => Partial<T>;
export declare const keysDeep: (obj: Record<string, string | Record<string, any>>, parent?: Maybe<string>) => string[];
export declare const hasChanges: <T>(a: T, b: Maybe<T>) => boolean;
export declare const keysToSnakeCase: (obj: Record<string, any>) => import("lodash").Dictionary<any>;
export declare const set: <T>(obj: T, fields: Partial<T>) => T & Partial<T>;
