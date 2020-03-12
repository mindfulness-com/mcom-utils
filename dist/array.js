"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const maybe_1 = require("./maybe");
exports.ensureArray = (input) => lodash_1.isArray(input) ? input : [input];
exports.compareInt = (p) => (t1, t2) => p(t1) - p(t2);
exports.sortByInt = (arr, p) => arr.sort(exports.compareInt(p));
exports.contains = (arr, v) => !!arr && arr.indexOf(v) > -1;
exports.pluckUnique = (selector) => tags => lodash_1.chain(tags)
    .map(selector)
    .filter(maybe_1.isDefined)
    .uniq()
    .value();
exports.indexBy = (items, pick) => {
    const result = {};
    items.forEach(item => {
        const keyOrKeys = pick(item);
        if (maybe_1.isDefined(keyOrKeys)) {
            exports.ensureArray(keyOrKeys).forEach(key => {
                result[key] = item;
            });
        }
    });
    return result;
};
exports.lookup = (items, pick, fallback) => {
    const hash = exports.indexBy(items, pick);
    return (key) => {
        var _a;
        const r = hash[key] || ((_a = fallback) === null || _a === void 0 ? void 0 : _a(key));
        if (!r) {
            throw new Error("Item not found.");
        }
        return r;
    };
};
exports.maybeLookup = (items, pick) => {
    const hash = exports.indexBy(items, pick);
    return (key) => hash[key];
};
exports.maybeMap = (items, map) => lodash_1.reduce(items, (agg, i) => {
    const r = map(i);
    if (maybe_1.isDefined(r)) {
        return [...agg, r];
    }
    return agg;
}, []);
//# sourceMappingURL=array.js.map