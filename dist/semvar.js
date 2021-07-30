"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const versionDiff = require("compare-versions");
const isVersionNumber = (v) => typeof v === "string";
const pickVersionForPlatform = (version, platform) => version[platform.toLowerCase()];
exports.compareVersions = (comp) => (required, current) => {
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
exports.versionOrHigher = exports.compareVersions((current, required) => versionDiff(current, required) >= 0);
exports.versionOrLower = exports.compareVersions((current, required) => versionDiff(current, required) <= 0);
exports.beforeVersion = exports.compareVersions((current, required) => versionDiff(current, required) < 0);
//# sourceMappingURL=semvar.js.map