"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = void 0;
const microseconds = require("microseconds");
const profile = (doWork, ...rest) => {
    const n = microseconds.now();
    const r = doWork();
    console.log(microseconds.since(n), ...(rest || ["time"]));
    return r;
};
exports.profile = profile;
//# sourceMappingURL=profile.js.map