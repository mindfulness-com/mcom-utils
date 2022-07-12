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
const lodash_1 = require("lodash");
exports.identity = (thing) => thing;
exports.isString = (val) => typeof val === "string";
exports.isDefined = (x) => {
    return x !== undefined && x !== null;
};
exports.isAllDefined = (vals) => lodash_1.every(vals, exports.isDefined);
exports.isUndefined = (x) => {
    return x === undefined || x === null;
};
exports.default = (val) => val || undefined;
/**
 * When something is truthy, do something with it.
 * @param {T} thing - The `thing` to check for truthiness
 * @param {function} doWork - What to do if the `thing` is true
 * @returns {*} - returns undefined if "thing" is not defined or whatever is returned from `doWork`
 */
exports.when = (thing, doWork) => exports.isDefined(thing) ? doWork(thing) : undefined;
/**
 * When something is truthy, do something with it.
 * @async
 * @param {T} thing - The `thing` to check for truthiness
 * @param {function} doWork - What to do if the `thing` is true
 * @returns {Promise<unknown>} - returns undefined if "thing" is not defined or whatever is returned from `doWork`
 */
exports.whenAsync = (thing, doWork) => __awaiter(void 0, void 0, void 0, function* () { return exports.when(thing, doWork); });
//# sourceMappingURL=maybe.js.map