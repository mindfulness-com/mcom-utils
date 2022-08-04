"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.beforeVersion = exports.versionOrLower = exports.versionOrHigher = exports.compareVersions = void 0;
const versionDiff = require("compare-versions");
const isVersionNumber = (v) => typeof v === "string";
const pickVersionForPlatform = (version, platform) => version[platform.toLowerCase()];
const compareVersions = (comp) => (required, current) => {
    if (!current.platform) {
        return false;
    }
    const expected = isVersionNumber(required)
        ? required
        : pickVersionForPlatform(required, current.platform);
    if (expected === "*") {
        return true;
    }
    if (!expected || !current.version) {
        return false;
    }
    return comp(current.version, expected);
};
exports.compareVersions = compareVersions;
exports.versionOrHigher = (0, exports.compareVersions)((current, required) => versionDiff(current, required) >= 0);
exports.versionOrLower = (0, exports.compareVersions)((current, required) => versionDiff(current, required) <= 0);
exports.beforeVersion = (0, exports.compareVersions)((current, required) => versionDiff(current, required) < 0);
//# sourceMappingURL=semvar.js.map