"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inTimeZone = exports.setTimeZone = void 0;
const date_fns_tz_1 = require("date-fns-tz");
// Takes the exisint UTC date and set the disired timezone
// Used to take an absolute time (e.g. this launches on 02 Dec 00:00)
// and "cast" it into a timezone.
const setTimeZone = (time, timeZone) => (0, date_fns_tz_1.zonedTimeToUtc)(time, timeZone);
exports.setTimeZone = setTimeZone;
// What time is it in the timezone
const inTimeZone = (time, timeZone) => (0, date_fns_tz_1.utcToZonedTime)(time, timeZone);
exports.inTimeZone = inTimeZone;
//# sourceMappingURL=timezone.js.map