"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.justOne = exports.sampleOne = exports.omitEmpty = exports.maybeMap = exports.maybeLookup = exports.lookup = exports.indexBy = exports.pluckUnique = exports.containsAny = exports.containsAll = exports.contains = exports.sortByInt = exports.compareInt = exports.ensureArray = void 0;
exports.insertAt = insertAt;
exports.insertAfter = insertAfter;
const lodash_1 = require("lodash");
const maybe_1 = require("./maybe");
const fn_1 = require("./fn");
const definetly_1 = require("./definetly");
const fp_1 = require("lodash/fp");
/**
 * Take a value and check whether it is an array.
 * If it is and array return it unmodified, else return it as an array.
 * @param {<T>} input
 * @returns
 */
const ensureArray = (input) => (0, lodash_1.isArray)(input) ? input : [input];
exports.ensureArray = ensureArray;
const compareInt = (p) => (t1, t2) => p(t1) - p(t2);
exports.compareInt = compareInt;
const sortByInt = (arr, p) => arr.sort((0, exports.compareInt)(p));
exports.sortByInt = sortByInt;
const contains = (arr, v) => !!arr && arr.indexOf(v) > -1;
exports.contains = contains;
const containsAll = (vals, compare) => (0, lodash_1.intersection)(vals, compare).length === compare.length;
exports.containsAll = containsAll;
const containsAny = (vals, compare) => (0, lodash_1.intersection)(vals, compare).length > 0;
exports.containsAny = containsAny;
const pluckUnique = (selector) => tags => (0, lodash_1.chain)(tags).map(selector).filter(maybe_1.isDefined).uniq().value();
exports.pluckUnique = pluckUnique;
const indexBy = (items, pick) => {
    const result = {};
    items.forEach(item => {
        const keyOrKeys = pick(item);
        if ((0, maybe_1.isDefined)(keyOrKeys)) {
            (0, exports.ensureArray)(keyOrKeys).forEach(key => {
                result[key] = item;
            });
        }
    });
    return result;
};
exports.indexBy = indexBy;
const lookup = (items, pick, fallback) => {
    const hash = (0, exports.indexBy)(items, pick);
    return (key) => {
        const r = hash[key] || (fallback === null || fallback === void 0 ? void 0 : fallback(key));
        if (!r) {
            throw new Error("Item not found.");
        }
        return r;
    };
};
exports.lookup = lookup;
const maybeLookup = (items, pick) => {
    const hash = (0, exports.indexBy)(items, pick);
    return key => hash[key];
};
exports.maybeLookup = maybeLookup;
const maybeMap = (items, map) => (0, lodash_1.reduce)(items, (agg, i) => {
    const r = map(i);
    if ((0, maybe_1.isDefined)(r)) {
        return [...agg, r];
    }
    return agg;
}, []);
exports.maybeMap = maybeMap;
const omitEmpty = (vals) => (0, lodash_1.filter)(vals, maybe_1.isDefined);
exports.omitEmpty = omitEmpty;
// Sample for non-empty arrays
const sampleOne = (ts) => (0, definetly_1.definetly)((0, lodash_1.sample)(ts), "Non-Empty array sample.");
exports.sampleOne = sampleOne;
/**
 * Inserts an array of items at a given index;
 * @param {Array<T>} arr - The array that you want to add items to
 * @param {Array<T>} items - The array of items that you want to add
 * @param {number} at - The index at which you want to add the items
 * @returns {Array<T>} - The array with the items added
 */
function insertAt(arr, items, at) {
    return [...arr.slice(0, at), ...items, ...arr.slice(at)];
}
/**
 * Concatenates an array into another array at a given index
 * @param {Array<T>} arr - The array that you want to add items to
 * @param {Array<T>} items - The array of items that you want to add
 * @param {T} item - The item that you want to add the array after
 * @returns {Array<T>} - The array with the items added
 */
function insertAfter(arr, items, item) {
    const at = arr.indexOf(item) + 1;
    return insertAt(arr, items, at);
}
/**
 * Get the first item from an array of items
 * @param {Array<T>} arr - The array of items
 * @returns {T} - The first item in the array
 */
exports.justOne = (0, fn_1.composel)(exports.ensureArray, fp_1.first);
//# sourceMappingURL=array.js.map