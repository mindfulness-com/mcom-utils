"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.number = exports.string = exports.definitelyOne = exports.definitely = exports.getOrElse = void 0;
const lodash_1 = require("lodash");
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
const definitelyOne = (val, errorMessage) => (0, exports.definitely)((0, lodash_1.first)(val), errorMessage);
exports.definitelyOne = definitelyOne;
const string = (val) => (0, exports.getOrElse)(val, "");
exports.string = string;
const number = (val) => (0, exports.getOrElse)(val, 0);
exports.number = number;
exports.default = {
    string: exports.string,
    number: exports.number,
};
//# sourceMappingURL=definitely.js.map