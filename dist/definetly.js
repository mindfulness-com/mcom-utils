"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const maybe_1 = require("./maybe");
exports.getOrElse = (val, defaultValue) => maybe_1.isDefined(val) ? val : defaultValue;
exports.definetly = (val, errorMessage) => {
    if (!maybe_1.isDefined(val)) {
        throw new Error(errorMessage);
    }
    return val;
};
exports.string = (val) => exports.getOrElse(val, "");
exports.number = (val) => exports.getOrElse(val, 0);
exports.default = {
    string: exports.string,
    number: exports.number,
};
//# sourceMappingURL=definetly.js.map