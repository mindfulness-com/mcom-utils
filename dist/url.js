"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureProtocol = exports.addQueryParam = exports.toQueryString = exports.toQueryParams = exports.baseUrl = void 0;
const query_string_1 = require("query-string");
const lodash_1 = require("lodash");
const maybe_1 = require("./maybe");
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
const ensureProtocol = (protocol, uri) => (0, maybe_1.when)(uri || undefined, d => {
    try {
        const url = new URL(d);
        url.protocol = protocol.endsWith(":") ? protocol : `${protocol}:`;
        return url.toString();
    }
    catch (_err) {
        throw new Error(`Invalid URI provided: ${uri}`);
    }
});
exports.ensureProtocol = ensureProtocol;
//# sourceMappingURL=url.js.map