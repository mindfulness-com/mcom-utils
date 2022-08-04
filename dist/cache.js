"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cachedFunc = void 0;
const memoizee = require("memoizee");
const cachedFunc = (func, milliseconds, normalizer) => memoizee(func, {
    promise: true,
    maxAge: milliseconds,
    // Normalize the cache with JSON stringify to handle array params
    normalizer: normalizer !== null && normalizer !== void 0 ? normalizer : (args => JSON.stringify(args)),
});
exports.cachedFunc = cachedFunc;
//# sourceMappingURL=cache.js.map