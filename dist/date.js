"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUtcOffset = exports.fromUnix = exports.toUnix = void 0;
const tzSupport = require("timezone-support");
const toUnix = (date) => Math.round(date.getTime() / 1000);
exports.toUnix = toUnix;
const fromUnix = (date) => new Date(date * 1000);
exports.fromUnix = fromUnix;
const getUtcOffset = (date, timezone) => tzSupport.getUTCOffset(date, tzSupport.findTimeZone(timezone)).offset;
exports.getUtcOffset = getUtcOffset;
//# sourceMappingURL=date.js.map