"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addQueryParam = exports.toQueryString = exports.toQueryParams = exports.baseUrl = void 0;
const query_string_1 = require("query-string");
const lodash_1 = require("lodash");
const baseUrl = (url) => (0, lodash_1.first)(url.split(/[\#\?]/));
exports.baseUrl = baseUrl;
exports.toQueryParams = query_string_1.stringify;
const toQueryString = (params) => ((0, lodash_1.isEmpty)(params) ? "" : `?${(0, exports.toQueryParams)(params)}`);
exports.toQueryString = toQueryString;
const addQueryParam = (url, params) => {
    const [base, existing] = url.split("?");
    return existing
        ? `${base}?${existing}&${(0, exports.toQueryParams)(params)}`
        : `${url}${(0, exports.toQueryString)(params)}`;
};
exports.addQueryParam = addQueryParam;
//# sourceMappingURL=url.js.map