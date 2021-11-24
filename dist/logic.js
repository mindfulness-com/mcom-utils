"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
exports.not = (func) => (arg) => !func(arg);
const ensureFn = (v) => (lodash_1.isFunction(v) ? v : () => v);
exports.ifDo = (cond, val) => {
    if (ensureFn(cond)()) {
        return ensureFn(val)();
    }
    return undefined;
};
exports.ifDo_ = (pred, work) => () => exports.ifDo(pred, work);
//# sourceMappingURL=logic.js.map