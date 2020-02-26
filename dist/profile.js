"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const microseconds = require("microseconds");
exports.profile = (doWork, ...rest) => {
    const n = microseconds.now();
    const r = doWork();
    console.log(microseconds.since(n), ...(rest || ["time"]));
    return r;
};
//# sourceMappingURL=profile.js.map