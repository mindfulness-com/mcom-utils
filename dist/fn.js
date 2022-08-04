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
exports.composeAsync = exports.composelAsync = exports._ = exports.id = exports.__ = exports.partial = exports.curry = exports.composel = exports.guard = exports.using = exports.wiith = exports.fallback = exports.until = exports.not = exports.defined = exports.otherwise = void 0;
const lodash_1 = require("lodash");
const otherwise = (_) => true;
exports.otherwise = otherwise;
const defined = (t) => !!t;
exports.defined = defined;
const not = (p) => t => !p(t);
exports.not = not;
function until(...fns) {
    return (0, lodash_1.reduce)(fns, (v, fn) => __awaiter(this, void 0, void 0, function* () { return (yield v) || fn(); }), undefined);
}
exports.until = until;
function fallback(...fns) {
    return (0, lodash_1.reduce)(fns, (v, fn) => v !== null && v !== void 0 ? v : fn(), undefined);
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
const guard = (guards) => ts => {
    const guard = (0, lodash_1.find)(guards, ([guard]) => guard(ts));
    if (!guard) {
        throw new Error("No matching guards found.");
    }
    return guard[1](ts);
};
exports.guard = guard;
var fp_1 = require("lodash/fp");
Object.defineProperty(exports, "composel", { enumerable: true, get: function () { return fp_1.pipe; } });
Object.defineProperty(exports, "curry", { enumerable: true, get: function () { return fp_1.curry; } });
Object.defineProperty(exports, "partial", { enumerable: true, get: function () { return fp_1.partial; } });
Object.defineProperty(exports, "__", { enumerable: true, get: function () { return fp_1.__; } });
const id = (t) => () => t;
exports.id = id;
exports._ = exports.id;
function composelAsync(...fns) {
    return (a) => __awaiter(this, void 0, void 0, function* () { return (0, lodash_1.reduce)(fns, (v, fn) => __awaiter(this, void 0, void 0, function* () { return fn(yield v); }), a); });
}
exports.composelAsync = composelAsync;
function composeAsync(...fns) {
    return (a) => __awaiter(this, void 0, void 0, function* () { return (0, lodash_1.reduceRight)(fns, (v, fn) => __awaiter(this, void 0, void 0, function* () { return fn(yield v); }), a); });
}
exports.composeAsync = composeAsync;
//# sourceMappingURL=fn.js.map