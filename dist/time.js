"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.endOfDay = exports.inPast = exports.inFuture = exports.isGreaterThan = exports.isLessThan = exports.formatOffsetInUTC = exports.ensureUTC = exports.toMinutes = exports.toMilliSeconds = exports.toSeconds = void 0;
const lodash_1 = require("lodash");
const to_time_1 = __importDefault(require("to-time"));
const now_1 = require("./now");
// https://github.com/hafuta/to-time
const toSeconds = (timeOrMins) => {
    // Convert mins in number to seconds
    if ((0, lodash_1.isNumber)(timeOrMins)) {
        return timeOrMins * 60;
    }
    const result = (0, to_time_1.default)(timeOrMins).seconds();
    if (timeOrMins && !result) {
        throw new Error(`Invalid ISO860 duration: ${timeOrMins}`);
    }
    return result;
};
exports.toSeconds = toSeconds;
const toMilliSeconds = (time) => (0, exports.toSeconds)(time) * 1000;
exports.toMilliSeconds = toMilliSeconds;
const toMinutes = (seconds) => Math.round(seconds / 60);
exports.toMinutes = toMinutes;
__exportStar(require("./now"), exports);
const ensureUTC = () => {
    if (process.env.TZ !== "UTC") {
        throw new Error("Should be running in UTC.");
    }
};
exports.ensureUTC = ensureUTC;
const round = (num) => {
    const rounded = Math.floor(Math.abs(num));
    return `${rounded < 10 ? "0" : ""}${rounded}`;
};
const formatOffsetInUTC = (offset) => `${offset <= 0 ? "+" : "-"}${round(offset / 60)}${round(offset % 60)}`;
exports.formatOffsetInUTC = formatOffsetInUTC;
const isLessThan = (timeA, timeB) => timeA.getTime() < timeB.getTime();
exports.isLessThan = isLessThan;
const isGreaterThan = (timeA, timeB) => timeA.getTime() > timeB.getTime();
exports.isGreaterThan = isGreaterThan;
const inFuture = (timeA) => (0, exports.isGreaterThan)(timeA, (0, now_1.now)());
exports.inFuture = inFuture;
const inPast = (timeA) => (0, exports.isLessThan)(timeA, (0, now_1.now)());
exports.inPast = inPast;
/**
 * Takes a date and sets the time to the end of the day.
 * @param date - The date to set the time to the end of the day.
 * @returns {Date} - The provided date, but with the time set to the end of the day.
 */
const endOfDay = (date) => {
    const result = new Date(date);
    result.setHours(23, 59, 59, 999);
    return result;
};
exports.endOfDay = endOfDay;
//# sourceMappingURL=time.js.map