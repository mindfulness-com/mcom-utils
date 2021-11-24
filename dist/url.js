"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_string_1 = require("query-string");
const lodash_1 = require("lodash");
const bcrypt_1 = require("bcrypt");
const fn_1 = require("./fn");
const env_1 = require("./env");
const fp_1 = require("lodash/fp");
const HASH_SECRET = env_1.envOption({
    // TODO: Move to env var
    prod: "a3db148d-c1d6-4976-9f62-c183c2771d86",
    dev: "a3db148d-c1d6-4976-9f62-c183c2771d86",
});
const from64 = (s) => Buffer.from(s, "base64").toString();
exports.toQueryParams = query_string_1.stringify;
exports.toQueryString = (params) => lodash_1.isEmpty(params) ? "" : `?${exports.toQueryParams(params)}`;
/*
 ** Hash params with a secret to prevent public modification
 */
exports.hashParams = fn_1.composel(JSON.stringify, b => Buffer.from(b).toString("base64"), (s) => [s, bcrypt_1.hashSync(s + HASH_SECRET, 6)], ([s, hash]) => `${s}-${Buffer.from(hash).toString("base64")}`);
/*
 ** Dehash params and ensure the bcrypt value matches
 */
exports.dehashParams = (s) => fn_1.composel(fp_1.split("-"), ([b, hash]) => {
    if (!bcrypt_1.compareSync(b + HASH_SECRET, from64(hash))) {
        throw new Error("Hash does not match data.");
    }
    return b;
}, from64, JSON.parse)(s);
//# sourceMappingURL=url.js.map