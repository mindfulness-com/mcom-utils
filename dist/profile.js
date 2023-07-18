"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = void 0;
const microseconds_1 = __importDefault(require("microseconds"));
const profile = (doWork, ...rest) => {
    const n = microseconds_1.default.now();
    const r = doWork();
    console.log(microseconds_1.default.since(n), ...(rest || ["time"]));
    return r;
};
exports.profile = profile;
//# sourceMappingURL=profile.js.map