"use strict";
/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-object-literal-type-assertion,  @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const change_case_1 = require("change-case");
exports.omitEmpty = (obj) => lodash_1.reduce(lodash_1.keys(obj), (v, key) => {
    if (!lodash_1.isNil(obj[key])) {
        v[key] = obj[key];
    }
    return v;
}, {});
exports.keysDeep = (obj, parent) => {
    return lodash_1.chain(obj)
        .toPairs()
        .map(([key, value]) => {
        const fullKey = parent ? `${parent}.${key}` : key;
        return lodash_1.isEmpty(value) || lodash_1.isString(value)
            ? [fullKey]
            : [fullKey, ...exports.keysDeep(value, fullKey)];
    })
        .flatten()
        .value();
};
const isWeakEqual = (a, b) => (lodash_1.isNil(a) && lodash_1.isNil(b)) || lodash_1.isEqual(a, b);
exports.hasChanges = (a, b) => lodash_1.some(lodash_1.keys(a), key => !isWeakEqual(lodash_1.get(a, key), b ? lodash_1.get(b, key) : undefined));
exports.keysToSnakeCase = (obj) => lodash_1.mapKeys(obj, (_v, key) => change_case_1.snakeCase(key));
exports.set = (obj, fields) => lodash_1.assign(obj, fields);
//# sourceMappingURL=object.js.map