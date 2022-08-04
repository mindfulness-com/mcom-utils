"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatInTimeZone = exports.inTimeZone = exports.setTimeZone = void 0;
const dateTZ = require("date-fns-timezone");
// Takes the exisint UTC date and set the disired timezone
// Used to take an absolute time (e.g. this launches on 02 Dec 00:00)
// and "cast" it into a timezone.
const setTimeZone = (time, timeZone) => dateTZ.convertToLocalTime(time, { timeZone });
exports.setTimeZone = setTimeZone;
// What time is it in the timezone
const inTimeZone = (time, timeZone) => dateTZ.convertToTimeZone(time, { timeZone });
exports.inTimeZone = inTimeZone;
// What time is it in the timezone
const formatInTimeZone = (date, format, timeZone) => dateTZ.formatToTimeZone(date, format, { timeZone });
exports.formatInTimeZone = formatInTimeZone;
//# sourceMappingURL=timezone.js.map