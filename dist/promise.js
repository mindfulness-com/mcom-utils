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
const bluebird_1 = require("bluebird");
const maybe_1 = require("./maybe");
var bluebird_2 = require("bluebird");
exports.all = bluebird_2.all;
exports.mapAll = (things, toPromise) => __awaiter(void 0, void 0, void 0, function* () { return yield bluebird_1.all(lodash_1.map(things, toPromise)); });
exports.most = (promises, onError) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield bluebird_1.all(promises.map((p) => __awaiter(void 0, void 0, void 0, function* () {
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
//# sourceMappingURL=promise.js.map