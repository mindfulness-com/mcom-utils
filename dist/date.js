"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tzSupport = require("timezone-support");
exports.toUnix = (date) => Math.round(date.getTime() / 1000);
exports.fromUnix = (date) => new Date(date * 1000);
exports.getUtcOffset = (date, timezone) => tzSupport.getUTCOffset(date, tzSupport.findTimeZone(timezone)).offset;
//# sourceMappingURL=date.js.map