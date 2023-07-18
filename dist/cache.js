"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cachedFunc = void 0;
const memoizee_1 = __importDefault(require("memoizee"));
const cachedFunc = (func, milliseconds, normalizer) => (0, memoizee_1.default)(func, {
    promise: true,
    maxAge: milliseconds,
    // Normalize the cache with JSON stringify to handle array params
    normalizer: normalizer !== null && normalizer !== void 0 ? normalizer : (args => JSON.stringify(args)),
});
exports.cachedFunc = cachedFunc;
//# sourceMappingURL=cache.js.map