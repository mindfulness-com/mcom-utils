"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const change_case_1 = require("change-case");
const lodash_1 = require("lodash");
const pgEscape = require("pg-escape");
const date_fns_1 = require("date-fns");
const array_1 = require("./array");
exports.column = (name) => change_case_1.snakeCase(name);
exports.table = (name) => change_case_1.snakeCase(name);
exports.literal = (value) => {
    // Treat null as NULL
    if (value === null) {
        return "NULL";
    }
    // Treat undefined as empty
    if (value === undefined) {
        return "";
    }
    // Format dates in UTC
    if (lodash_1.isDate(value)) {
        return `'${date_fns_1.format(value, "YYYY-MM-DD HH:mm:ss.SSSZZ")}'`;
    }
    if (typeof value === "string") {
        return pgEscape.literal(value);
    }
    if (lodash_1.isArray(value)) {
        return `[${value.map(exports.literal).join(",")}]`;
    }
    // JSON blobs
    if (lodash_1.isObject(value)) {
        return pgEscape.literal(JSON.stringify(value));
    }
    // Literal string value
    return value.toString();
};
exports.toSet = (update) => lodash_1.map(lodash_1.toPairs(update), ([key, value]) => `${exports.column(key)} = ${exports.literal(value)}`).join(", ");
exports.toValues = (items, columns = uniqColumns(items)) => {
    const extractValues = (i) => columns.map((c) => {
        const v = lodash_1.get(i, c);
        return v === undefined ? "DEFAULT" : exports.literal(v);
    });
    return items.map(i => `${exports.toArray(extractValues(i))}`).join(", ");
};
const uniqColumns = (items) => lodash_1.keys(lodash_1.reduce(items, (acc, i) => (Object.assign(Object.assign({}, acc), i)), {}));
exports.toColumns = (items) => {
    // Map all items into one object to get union of fields
    return `${exports.toArray(uniqColumns(items).map(exports.column))}`;
};
exports.toArray = (items) => `(${items.join(", ")})`;
exports.toLiteralArray = (items) => exports.toArray(items.map(exports.literal));
const formatReturning = (fields) => fields && !lodash_1.isEmpty(fields)
    ? `RETURNING ${array_1.ensureArray(fields).join(", ")}`
    : "";
exports.insert = (table, items, returnFields) => {
    const all = array_1.ensureArray(items);
    if (lodash_1.isEmpty(items)) {
        throw new Error("Can't insert empty array.");
    }
    const columns = uniqColumns(all);
    return `
    INSERT INTO ${table} ${exports.toArray(columns.map(exports.column))}
    VALUES ${exports.toValues(all, columns)}
    ${formatReturning(returnFields)}
  `;
};
exports.upsert = (table, items, onConflictKeys, updateKeys, returnFields) => {
    const all = array_1.ensureArray(items);
    if (lodash_1.isEmpty(items)) {
        throw new Error("Can't upsert empty array.");
    }
    return `
    INSERT INTO ${table} ${exports.toColumns(all)}
    VALUES ${exports.toValues(all)}
    ON CONFLICT ${exports.toArray(lodash_1.map(array_1.ensureArray(onConflictKeys), exports.column))} DO
    UPDATE SET ${lodash_1.without(lodash_1.map(array_1.ensureArray(updateKeys), exports.column), "updated_at")
        .map(k => `${k} = excluded.${k}`)
        .join(", ")}, updated_at = now()
    ${formatReturning(returnFields)}
  `;
};
//# sourceMappingURL=sql.js.map