"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
exports.otherwise = (_) => true;
exports.defined = (t) => !!t;
exports.not = (p) => t => !p(t);
exports.wiith = (fn, afn) => fn(afn());
exports.using = (a, fn) => fn(a);
exports.guard = (guards) => ts => exports.wiith(guard => {
    if (!guard) {
        throw new Error("No matching guards found.");
    }
    return guard[1](ts);
}, () => lodash_1.find(guards, ([guard]) => guard(ts)));
// Example usage of guards
exports.max = exports.guard([
    [xs => xs.length === 0, () => 0],
    [exports.not(exports.defined), ([m]) => m],
    [exports.otherwise, ([x, ...xs]) => (x > exports.max(xs) ? x : exports.max(xs))],
]);
//# sourceMappingURL=fn.js.map