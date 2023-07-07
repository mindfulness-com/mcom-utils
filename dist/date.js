"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEvening = exports.isAfternoon = exports.isMorning = exports.getUtcOffset = exports.fromUnix = exports.toUnix = void 0;
const date_fns_1 = require("date-fns");
const tzSupport = require("timezone-support");
const math_1 = require("./math");
const toUnix = (date) => Math.round(date.getTime() / 1000);
exports.toUnix = toUnix;
const fromUnix = (date) => new Date(date * 1000);
exports.fromUnix = fromUnix;
const getUtcOffset = (date, timezone) => tzSupport.getUTCOffset(date, tzSupport.findTimeZone(timezone)).offset;
exports.getUtcOffset = getUtcOffset;
const isMorning = (date) => (0, math_1.isBetween)((0, date_fns_1.getHours)(date), [4, 11]);
exports.isMorning = isMorning;
const isAfternoon = (date) => (0, math_1.isBetween)((0, date_fns_1.getHours)(date), [12, 17]);
exports.isAfternoon = isAfternoon;
const isEvening = (date) => (0, math_1.isBetween)((0, date_fns_1.getHours)(date), [18, 24]) || (0, math_1.isBetween)((0, date_fns_1.getHours)(date), [0, 3]);
exports.isEvening = isEvening;
//# sourceMappingURL=date.js.map