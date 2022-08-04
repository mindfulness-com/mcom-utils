"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toQueryString = exports.toQueryParams = void 0;
const query_string_1 = require("query-string");
const lodash_1 = require("lodash");
exports.toQueryParams = query_string_1.stringify;
const toQueryString = (params) => (0, lodash_1.isEmpty)(params) ? "" : `?${(0, exports.toQueryParams)(params)}`;
exports.toQueryString = toQueryString;
//# sourceMappingURL=url.js.map