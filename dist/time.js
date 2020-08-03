"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
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
const now_1 = require("./now");
__export(require("./now"));
exports.ensureUTC = () => {
    if (process.env.TZ !== "UTC") {
        throw new Error("Should be running in UTC.");
    }
};
const round = (num) => {
    const rounded = Math.floor(Math.abs(num));
    return `${rounded < 10 ? "0" : ""}${rounded}`;
};
exports.formatOffsetInUTC = (offset) => `${offset <= 0 ? "+" : "-"}${round(offset / 60)}${round(offset % 60)}`;
exports.isLessThan = (timeA, timeB) => timeA.getTime() < timeB.getTime();
exports.isGreaterThan = (timeA, timeB) => timeA.getTime() > timeB.getTime();
exports.inFuture = (timeA) => exports.isGreaterThan(timeA, now_1.now());
exports.inPast = (timeA) => exports.isLessThan(timeA, now_1.now());
//# sourceMappingURL=time.js.map