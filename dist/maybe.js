"use strict";
/* eslint @typescript-eslint/no-explicit-any:off */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unless = exports.whenAsync = exports.when = exports.isUndefined = exports.isAllDefined = exports.isDefined = exports.isString = exports.identity = void 0;
const lodash_1 = require("lodash");
const identity = (thing) => thing;
exports.identity = identity;
const isString = (val) => typeof val === "string";
exports.isString = isString;
const isDefined = (x) => {
    return x !== undefined && x !== null;
};
exports.isDefined = isDefined;
const isAllDefined = (vals) => (0, lodash_1.every)(vals, exports.isDefined);
exports.isAllDefined = isAllDefined;
const isUndefined = (x) => {
    return x === undefined || x === null;
};
exports.isUndefined = isUndefined;
exports.default = (val) => val || undefined;
/**
 * When something is truthy, do something with it.
 * @param {T} thing - The `thing` to check for truthiness
 * @param {function} doWork - What to do if the `thing` is true
 * @returns {*} - returns undefined if "thing" is not defined or whatever is returned from `doWork`
 */
const when = (thing, doWork) => (0, exports.isDefined)(thing) ? doWork(thing) : undefined;
exports.when = when;
/**
 * When something is truthy, do something with it.
 * @async
 * @param {T} thing - The `thing` to check for truthiness
 * @param {function} doWork - What to do if the `thing` is true
 * @returns {Promise<unknown>} - returns undefined if "thing" is not defined or whatever is returned from `doWork`
 */
const whenAsync = (thing, doWork) => __awaiter(void 0, void 0, void 0, function* () { return (0, exports.when)(thing, doWork); });
exports.whenAsync = whenAsync;
/**
 * Unless something is truthy, do something with it. - Opposite of when
 * @param {T} thing - The `thing` to check for truthiness
 * @param {function} doWork - What to do if the `thing` is true
 * @return {*} - returns undefined if "thing" is not defined or whatever is returned from `doWork`
 */
const unless = (thing, doWork) => (0, exports.isUndefined)(thing) ? doWork() : undefined;
exports.unless = unless;
//# sourceMappingURL=maybe.js.map