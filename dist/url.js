"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_string_1 = require("query-string");
const lodash_1 = require("lodash");
const shorter_1 = require("shorter");
const fn_1 = require("./fn");
exports.toQueryParams = query_string_1.stringify;
exports.toQueryString = (params) => lodash_1.isEmpty(params) ? "" : `?${exports.toQueryParams(params)}`;
exports.hashParams = fn_1.composel(JSON.stringify, shorter_1.compress, b => b.toString("base64"));
exports.dehashParams = fn_1.composel((s) => Buffer.from(s, "base64"), shorter_1.decompress, JSON.parse);
//# sourceMappingURL=url.js.map