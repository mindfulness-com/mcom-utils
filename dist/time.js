"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toTime = require("to-time");
// https://github.com/hafuta/to-time
exports.toSeconds = (time) => {
    const result = toTime(time).seconds();
    if (time && !result) {
        throw new Error(`Invalid ISO860 duration: ${time}`);
    }
    return result;
};
exports.toMilliSeconds = (time) => exports.toSeconds(time) * 100;
exports.toMinutes = (seconds) => Math.round(seconds / 60);
exports.now = () => new Date();
//# sourceMappingURL=time.js.map