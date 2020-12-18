"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const memoizee = require("memoizee");
exports.cachedFunc = (func, milliseconds, normalizer) => memoizee(func, {
    promise: true,
    maxAge: milliseconds,
    // Normalize the cache with JSON stringify to handle array params
    normalizer: normalizer !== null && normalizer !== void 0 ? normalizer : (args => JSON.stringify(args)),
});
//# sourceMappingURL=cache.js.map