"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.number = exports.string = exports.definitely = exports.getOrElse = void 0;
const maybe_1 = require("./maybe");
const getOrElse = (val, defaultValue) => (0, maybe_1.isDefined)(val) ? val : defaultValue;
exports.getOrElse = getOrElse;
const definitely = (val, errorMessage) => {
    if (!(0, maybe_1.isDefined)(val)) {
        throw new Error(errorMessage);
    }
    return val;
};
exports.definitely = definitely;
const string = (val) => (0, exports.getOrElse)(val, "");
exports.string = string;
const number = (val) => (0, exports.getOrElse)(val, 0);
exports.number = number;
exports.default = {
    string: exports.string,
    number: exports.number,
};
//# sourceMappingURL=definitely.js.map