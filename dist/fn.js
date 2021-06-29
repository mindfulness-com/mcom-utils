"use strict";
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
exports.otherwise = (_) => true;
exports.defined = (t) => !!t;
exports.not = (p) => t => !p(t);
function until(...fns) {
    return lodash_1.reduce(fns, (v, fn) => __awaiter(this, void 0, void 0, function* () { return (yield v) || fn(); }), undefined);
}
exports.until = until;
function fallback(...fns) {
    return lodash_1.reduce(fns, (v, fn) => v !== null && v !== void 0 ? v : fn(), undefined);
}
exports.fallback = fallback;
function wiith(fn, args) {
    return fn(...args());
}
exports.wiith = wiith;
function using(a, fn) {
    return fn(...a);
}
exports.using = using;
exports.guard = (guards) => ts => {
    const guard = lodash_1.find(guards, ([guard]) => guard(ts));
    if (!guard) {
        throw new Error("No matching guards found.");
    }
    return guard[1](ts);
};
var fp_1 = require("lodash/fp");
exports.composel = fp_1.pipe;
exports.curry = fp_1.curry;
exports.partial = fp_1.partial;
exports.__ = fp_1.__;
exports.id = (t) => () => t;
exports._ = exports.id;
function composelAsync(...fns) {
    return (a) => __awaiter(this, void 0, void 0, function* () { return lodash_1.reduce(fns, (v, fn) => __awaiter(this, void 0, void 0, function* () { return fn(yield v); }), a); });
}
exports.composelAsync = composelAsync;
function composeAsync(...fns) {
    return (a) => __awaiter(this, void 0, void 0, function* () { return lodash_1.reduceRight(fns, (v, fn) => __awaiter(this, void 0, void 0, function* () { return fn(yield v); }), a); });
}
exports.composeAsync = composeAsync;
//# sourceMappingURL=fn.js.map