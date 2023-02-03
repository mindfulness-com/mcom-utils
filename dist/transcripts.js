"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseWebVTT = void 0;
const lodash_1 = require("lodash");
const fp_1 = require("lodash/fp");
const fn_1 = require("./fn");
const logic_1 = require("./logic");
const logic_2 = require("./logic");
const seperateParts = (raw) => raw.split(/\n\n/gi);
const partType = (raw) => (0, fn_1.using)([(0, lodash_1.first)(raw.split("\n"))], firstLine => (0, fn_1.fallback)((0, logic_1.ifDo_)(firstLine === null || firstLine === void 0 ? void 0 : firstLine.startsWith("WEBVTT"), () => "HEAD"), (0, logic_1.ifDo_)(firstLine === null || firstLine === void 0 ? void 0 : firstLine.startsWith("NOTE"), () => "NOTE"), () => "CUE"));
const parseCue = (raw) => {
    const [first, second, ...rest] = raw.split(/\n/);
    const hasID = first.includes("-->");
    const timing = hasID ? first : second;
    const id = !hasID ? first : undefined;
    const [timeStart, _arrow, timeEnd, ...settings] = timing.split(" ");
    return {
        id,
        timeStart,
        timeEnd,
        settings: (0, lodash_1.fromPairs)((0, lodash_1.map)(settings, (0, fp_1.split)(":"))),
        text: (0, lodash_1.map)(rest, l => l.replace(/^- /gi, "")).join("\\n"),
    };
};
const parseWebVTT = (raw) => (0, lodash_1.reduce)(seperateParts(raw), (r, p) => (0, logic_2.switchEnum)(partType(p), {
    CUE: () => [...r, parseCue(p)],
    // NOTE: () => r, // Not supported atm
    // HEAD: () => r, // Not supported atm
    else: () => r,
}), []);
exports.parseWebVTT = parseWebVTT;
//# sourceMappingURL=transcripts.js.map