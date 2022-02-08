"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_string_1 = require("query-string");
const lodash_1 = require("lodash");
exports.toQueryParams = query_string_1.stringify;
exports.toQueryString = (params) => lodash_1.isEmpty(params) ? "" : `?${exports.toQueryParams(params)}`;
//# sourceMappingURL=url.js.map