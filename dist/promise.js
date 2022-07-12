"use strict";
/* eslint-disable @typescript-eslint/ban-ts-ignore */
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
const fn_1 = require("./fn");
const bluebird_1 = require("bluebird");
const maybe_1 = require("./maybe");
function all(values) {
    // @ts-ignore
    return bluebird_1.all(values);
}
exports.all = all;
function some(values, log) {
    return __awaiter(this, void 0, void 0, function* () {
        const errors = [];
        const res = yield all(values.map((p) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield p;
            }
            catch (err) {
                log === null || log === void 0 ? void 0 : log(err);
                return undefined;
            }
        })));
        if (lodash_1.every(res, fn_1.not(maybe_1.isDefined))) {
            throw errors;
        }
        return res;
    });
}
exports.some = some;
exports.mapAll = (things, toPromise) => __awaiter(void 0, void 0, void 0, function* () { return yield all(lodash_1.map(things, toPromise)); });
exports.most = (promises, onError) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield all(promises.map((p) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield p;
        }
        catch (err) {
            if (onError) {
                onError(err);
            }
            return undefined;
        }
    })));
    return lodash_1.filter(results, maybe_1.isDefined);
});
exports.mapMost = (things, toPromise, onError) => __awaiter(void 0, void 0, void 0, function* () { return yield exports.most(lodash_1.map(things, toPromise), onError); });
exports.waitFor = (p, fn) => __awaiter(void 0, void 0, void 0, function* () { return fn(yield p); });
function usingAll(a, fn) {
    return __awaiter(this, void 0, void 0, function* () {
        // @ts-ignore – promise.all typing breaks here
        return fn(...(yield Promise.all(a)));
    });
}
exports.usingAll = usingAll;
//# sourceMappingURL=promise.js.map