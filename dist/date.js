"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addWeeks = exports.addDays = exports.addHours = exports.addMinutes = exports.addSeconds = exports.endOfYear = exports.endOfMonth = exports.endOfWeek = exports.endOfDay = exports.endOfHour = exports.endOfMinute = exports.endOfSecond = exports.startOfYear = exports.startOfMonth = exports.startOfWeek = exports.startOfDay = exports.startOfHour = exports.startOfMinute = exports.startOfSecond = exports.differenceInYears = exports.differenceInMonths = exports.differenceInWeeks = exports.differenceInCalendarDays = exports.differenceInDays = exports.differenceInHours = exports.differenceInMinutes = exports.differenceInSeconds = exports.getYear = exports.getMonth = exports.getWeek = exports.getDay = exports.getHours = exports.getMinutes = exports.getSeconds = exports.setYear = exports.setMonth = exports.setWeek = exports.setDay = exports.setHours = exports.setMinutes = exports.setSeconds = exports.formatDistanceToNow = exports.format = exports.getDayOfYear = exports.isFuture = exports.isPast = exports.isBefore = exports.isAfter = exports.isValid = exports.isDate = void 0;
exports.getMindfulDate = exports.unixTimestamp = exports.unixDate = exports.getHourOfYear = exports.today = exports.isBetweenDates = exports.daysBetween = exports.daysUntil = exports.isEvening = exports.isAfternoon = exports.isMorning = exports.getUtcOffset = exports.fromUnix = exports.toUnix = exports.subYears = exports.subMonths = exports.subWeeks = exports.subDays = exports.subHours = exports.subMinutes = exports.subSeconds = exports.addYears = exports.addMonths = void 0;
const date_fns_1 = require("date-fns");
const timezone_support_1 = require("timezone-support");
const math_1 = require("./math");
const now_1 = require("./now");
const time_1 = require("./time");
// raw date-fns exports
var date_fns_2 = require("date-fns");
Object.defineProperty(exports, "isDate", { enumerable: true, get: function () { return date_fns_2.isDate; } });
Object.defineProperty(exports, "isValid", { enumerable: true, get: function () { return date_fns_2.isValid; } });
Object.defineProperty(exports, "isAfter", { enumerable: true, get: function () { return date_fns_2.isAfter; } });
Object.defineProperty(exports, "isBefore", { enumerable: true, get: function () { return date_fns_2.isBefore; } });
Object.defineProperty(exports, "isPast", { enumerable: true, get: function () { return date_fns_2.isPast; } });
Object.defineProperty(exports, "isFuture", { enumerable: true, get: function () { return date_fns_2.isFuture; } });
Object.defineProperty(exports, "getDayOfYear", { enumerable: true, get: function () { return date_fns_2.getDayOfYear; } });
Object.defineProperty(exports, "format", { enumerable: true, get: function () { return date_fns_2.format; } });
Object.defineProperty(exports, "formatDistanceToNow", { enumerable: true, get: function () { return date_fns_2.formatDistanceToNow; } });
Object.defineProperty(exports, "setSeconds", { enumerable: true, get: function () { return date_fns_2.setSeconds; } });
Object.defineProperty(exports, "setMinutes", { enumerable: true, get: function () { return date_fns_2.setMinutes; } });
Object.defineProperty(exports, "setHours", { enumerable: true, get: function () { return date_fns_2.setHours; } });
Object.defineProperty(exports, "setDay", { enumerable: true, get: function () { return date_fns_2.setDay; } });
Object.defineProperty(exports, "setWeek", { enumerable: true, get: function () { return date_fns_2.setWeek; } });
Object.defineProperty(exports, "setMonth", { enumerable: true, get: function () { return date_fns_2.setMonth; } });
Object.defineProperty(exports, "setYear", { enumerable: true, get: function () { return date_fns_2.setYear; } });
Object.defineProperty(exports, "getSeconds", { enumerable: true, get: function () { return date_fns_2.getSeconds; } });
Object.defineProperty(exports, "getMinutes", { enumerable: true, get: function () { return date_fns_2.getMinutes; } });
Object.defineProperty(exports, "getHours", { enumerable: true, get: function () { return date_fns_2.getHours; } });
Object.defineProperty(exports, "getDay", { enumerable: true, get: function () { return date_fns_2.getDay; } });
Object.defineProperty(exports, "getWeek", { enumerable: true, get: function () { return date_fns_2.getWeek; } });
Object.defineProperty(exports, "getMonth", { enumerable: true, get: function () { return date_fns_2.getMonth; } });
Object.defineProperty(exports, "getYear", { enumerable: true, get: function () { return date_fns_2.getYear; } });
Object.defineProperty(exports, "differenceInSeconds", { enumerable: true, get: function () { return date_fns_2.differenceInSeconds; } });
Object.defineProperty(exports, "differenceInMinutes", { enumerable: true, get: function () { return date_fns_2.differenceInMinutes; } });
Object.defineProperty(exports, "differenceInHours", { enumerable: true, get: function () { return date_fns_2.differenceInHours; } });
Object.defineProperty(exports, "differenceInDays", { enumerable: true, get: function () { return date_fns_2.differenceInDays; } });
Object.defineProperty(exports, "differenceInCalendarDays", { enumerable: true, get: function () { return date_fns_2.differenceInCalendarDays; } });
Object.defineProperty(exports, "differenceInWeeks", { enumerable: true, get: function () { return date_fns_2.differenceInWeeks; } });
Object.defineProperty(exports, "differenceInMonths", { enumerable: true, get: function () { return date_fns_2.differenceInMonths; } });
Object.defineProperty(exports, "differenceInYears", { enumerable: true, get: function () { return date_fns_2.differenceInYears; } });
Object.defineProperty(exports, "startOfSecond", { enumerable: true, get: function () { return date_fns_2.startOfSecond; } });
Object.defineProperty(exports, "startOfMinute", { enumerable: true, get: function () { return date_fns_2.startOfMinute; } });
Object.defineProperty(exports, "startOfHour", { enumerable: true, get: function () { return date_fns_2.startOfHour; } });
Object.defineProperty(exports, "startOfDay", { enumerable: true, get: function () { return date_fns_2.startOfDay; } });
Object.defineProperty(exports, "startOfWeek", { enumerable: true, get: function () { return date_fns_2.startOfWeek; } });
Object.defineProperty(exports, "startOfMonth", { enumerable: true, get: function () { return date_fns_2.startOfMonth; } });
Object.defineProperty(exports, "startOfYear", { enumerable: true, get: function () { return date_fns_2.startOfYear; } });
Object.defineProperty(exports, "endOfSecond", { enumerable: true, get: function () { return date_fns_2.endOfSecond; } });
Object.defineProperty(exports, "endOfMinute", { enumerable: true, get: function () { return date_fns_2.endOfMinute; } });
Object.defineProperty(exports, "endOfHour", { enumerable: true, get: function () { return date_fns_2.endOfHour; } });
Object.defineProperty(exports, "endOfDay", { enumerable: true, get: function () { return date_fns_2.endOfDay; } });
Object.defineProperty(exports, "endOfWeek", { enumerable: true, get: function () { return date_fns_2.endOfWeek; } });
Object.defineProperty(exports, "endOfMonth", { enumerable: true, get: function () { return date_fns_2.endOfMonth; } });
Object.defineProperty(exports, "endOfYear", { enumerable: true, get: function () { return date_fns_2.endOfYear; } });
Object.defineProperty(exports, "addSeconds", { enumerable: true, get: function () { return date_fns_2.addSeconds; } });
Object.defineProperty(exports, "addMinutes", { enumerable: true, get: function () { return date_fns_2.addMinutes; } });
Object.defineProperty(exports, "addHours", { enumerable: true, get: function () { return date_fns_2.addHours; } });
Object.defineProperty(exports, "addDays", { enumerable: true, get: function () { return date_fns_2.addDays; } });
Object.defineProperty(exports, "addWeeks", { enumerable: true, get: function () { return date_fns_2.addWeeks; } });
Object.defineProperty(exports, "addMonths", { enumerable: true, get: function () { return date_fns_2.addMonths; } });
Object.defineProperty(exports, "addYears", { enumerable: true, get: function () { return date_fns_2.addYears; } });
Object.defineProperty(exports, "subSeconds", { enumerable: true, get: function () { return date_fns_2.subSeconds; } });
Object.defineProperty(exports, "subMinutes", { enumerable: true, get: function () { return date_fns_2.subMinutes; } });
Object.defineProperty(exports, "subHours", { enumerable: true, get: function () { return date_fns_2.subHours; } });
Object.defineProperty(exports, "subDays", { enumerable: true, get: function () { return date_fns_2.subDays; } });
Object.defineProperty(exports, "subWeeks", { enumerable: true, get: function () { return date_fns_2.subWeeks; } });
Object.defineProperty(exports, "subMonths", { enumerable: true, get: function () { return date_fns_2.subMonths; } });
Object.defineProperty(exports, "subYears", { enumerable: true, get: function () { return date_fns_2.subYears; } });
const toUnix = (date) => Math.round(date.getTime() / 1000);
exports.toUnix = toUnix;
const fromUnix = (date) => new Date(date * 1000);
exports.fromUnix = fromUnix;
const getUtcOffset = (date, timezone) => (0, timezone_support_1.getUTCOffset)(date, (0, timezone_support_1.findTimeZone)(timezone)).offset;
exports.getUtcOffset = getUtcOffset;
const isMorning = (date) => (0, math_1.isBetween)((0, date_fns_1.getHours)(date), [4, 11]);
exports.isMorning = isMorning;
const isAfternoon = (date) => (0, math_1.isBetween)((0, date_fns_1.getHours)(date), [12, 17]);
exports.isAfternoon = isAfternoon;
const isEvening = (date) => (0, math_1.isBetween)((0, date_fns_1.getHours)(date), [18, 24]) || (0, math_1.isBetween)((0, date_fns_1.getHours)(date), [0, 3]);
exports.isEvening = isEvening;
/**
 * Calculate the total number of full whole days between now and a given dateTime
 * @param {Date} d - The dateTime value to calculate the daysUntil.
 * @returns {number} - The whole number of full days between now and the
 */
const daysUntil = (d) => Math.abs((0, date_fns_1.differenceInDays)((0, now_1.now)(), d));
exports.daysUntil = daysUntil;
const daysBetween = (d, d2) => Math.abs((0, date_fns_1.differenceInCalendarDays)(d, d2));
exports.daysBetween = daysBetween;
const isBetweenDates = (d, [start, end]) => (0, time_1.isGreaterThan)(d, start) && (0, time_1.isLessThan)(d, end);
exports.isBetweenDates = isBetweenDates;
const today = () => (0, date_fns_1.startOfDay)((0, now_1.now)());
exports.today = today;
const getHourOfYear = (n) => (0, date_fns_1.getDayOfYear)(n) * 24 + (0, date_fns_1.getHours)(n);
exports.getHourOfYear = getHourOfYear;
const unixDate = (d) => new Date(d * 1000);
exports.unixDate = unixDate;
const unixTimestamp = (d) => Math.floor(d.getTime() / 1000);
exports.unixTimestamp = unixTimestamp;
/**
 * Calculate the "mindful date" for a given dateTime.
 * The "mindful date" runs from 3am to 3am on the following day.
 * @param {Date} d - The dateTime value for which to calculate the "mindful date".
 * @param {string} timezone - The timezone in which to calculate the "mindful date".
 * @returns {number} - The "mindful date" represented by the date and timezone
 */
const getMindfulDate = (d, timezone) => (0, date_fns_1.subMinutes)(d, (0, exports.getUtcOffset)(d, timezone) + 3 * 60)
    .toISOString()
    .split("T")[0];
exports.getMindfulDate = getMindfulDate;
//# sourceMappingURL=date.js.map