import { Primitive, PrimitiveRecord } from "./types";
import { Maybe } from "./maybe";
import { Fn } from "./fn";
export declare const column: (name: string) => string;
export declare const table: (name: string) => string;
export { Primitive, PrimitiveRecord } from "./types";
export declare const literal: (value: Primitive | Primitive[]) => string;
export declare const toArray: (items: Primitive[]) => string;
export declare const toLiteralArray: (items: Primitive[]) => string;
export declare const toSet: (update: PrimitiveRecord) => string;
export declare const toValues: <T = PrimitiveRecord>(items: T[], columns?: string[]) => string;
export declare const toColumns: <T = PrimitiveRecord>(items: T[]) => string;
export declare const insert: <T = PrimitiveRecord>(table: string, items: T | T[], returnFields?: Maybe<string | string[]>) => string;
export declare const update: <T = PrimitiveRecord>(table: string, update: Partial<T>, condition: Partial<T>) => string;
export declare const upsert: <T = PrimitiveRecord>(table: string, items: T | T[], onConflictKeys: string | string[], updateKeys: string | string[], returnFields?: Maybe<string | string[]>) => string;
/**
 * When something is defined, do something with it to return a SQL string.
 * @param {T} thing - The `thing` to check
 * @param {function} doWork - What to do if the `thing` is defined
 * @returns {*} - returns empty string if "thing" is not defined or whatever is returned from `doWork`
 */
export declare const whenSQL: <T>(t: Maybe<T>, fn: Fn<T, string>) => string;
