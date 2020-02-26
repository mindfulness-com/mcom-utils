"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dateTZ = require("date-fns-timezone");
// Takes the exisint UTC date and set the disired timezone
// Used to take an absolute time (e.g. this launches on 02 Dec 00:00)
// and "cast" it into a timezone.
exports.setTimeZone = (time, timeZone) => dateTZ.convertToLocalTime(time, { timeZone });
// What time is it in the timezone
exports.inTimeZone = (time, timeZone) => dateTZ.convertToTimeZone(time, { timeZone });
// What time is it in the timezone
exports.formatInTimeZone = (date, format, timeZone) => dateTZ.formatToTimeZone(date, format, { timeZone });
//# sourceMappingURL=timezone.js.map