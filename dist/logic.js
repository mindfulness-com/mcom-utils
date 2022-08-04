"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ifDo_ = exports.ifDo = exports.not = void 0;
const lodash_1 = require("lodash");
const not = (func) => (arg) => !func(arg);
exports.not = not;
const ensureFn = (v) => ((0, lodash_1.isFunction)(v) ? v : () => v);
const ifDo = (cond, val) => {
    if (ensureFn(cond)()) {
        return ensureFn(val)();
    }
    return undefined;
};
exports.ifDo = ifDo;
const ifDo_ = (pred, work) => () => (0, exports.ifDo)(pred, work);
exports.ifDo_ = ifDo_;
//# sourceMappingURL=logic.js.map