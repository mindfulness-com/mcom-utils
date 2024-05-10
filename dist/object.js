"use strict";
/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
exports.set = exports.keysToSnakeCase = exports.hasChanges = exports.keysDeep = exports.omitEmpty = void 0;
const lodash_1 = require("lodash");
const string_1 = require("./string");
/**
 * Returns an object with all the key/value pairs that are null or undefined are removed.
 * @param obj The object to strip null and undefined from.
 * @returns The stripped object.
 * @example
 * omitEmpty({ a: "", b: "asdas", c: false, d: null, e: undefined, f: 0 });
 * // { a: "", b: "asdas", c: false, f: 0 }
 */
const omitEmpty = (obj) => (0, lodash_1.reduce)((0, lodash_1.keys)(obj), (v, key) => {
    if (!(0, lodash_1.isNil)(obj[key])) {
        v[key] = obj[key];
    }
    return v;
}, {});
exports.omitEmpty = omitEmpty;
const keysDeep = (obj, parent) => {
    return (0, lodash_1.chain)(obj)
        .toPairs()
        .map(([key, value]) => {
        const fullKey = parent ? `${parent}.${key}` : key;
        return (0, lodash_1.isEmpty)(value) || (0, lodash_1.isString)(value)
            ? [fullKey]
            : [fullKey, ...(0, exports.keysDeep)(value, fullKey)];
    })
        .flatten()
        .value();
};
exports.keysDeep = keysDeep;
/**
 * Performs a deep comparison between two values to determine if they are equivalent.
 * Will also return true if both values are either null or undefined.
 * @category — Lang
 * @param value — The value to compare.
 * @param other — The other value to compare.
 * @returns — Returns true if the values are equivalent, else false.
 */
const isWeakEqual = (a, b) => ((0, lodash_1.isNil)(a) && (0, lodash_1.isNil)(b)) || (0, lodash_1.isEqual)(a, b);
const hasChanges = (a, b) => (0, lodash_1.some)((0, lodash_1.keys)(a), key => !isWeakEqual((0, lodash_1.get)(a, key), b ? (0, lodash_1.get)(b, key) : undefined));
exports.hasChanges = hasChanges;
const keysToSnakeCase = (obj) => (0, lodash_1.mapKeys)(obj, (_v, key) => (0, string_1.snakeCase)(key));
exports.keysToSnakeCase = keysToSnakeCase;
const set = (obj, fields) => (0, lodash_1.assign)(obj, fields);
exports.set = set;
//# sourceMappingURL=object.js.map