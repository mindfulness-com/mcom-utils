"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const change_case_1 = require("change-case");
const lodash_1 = require("lodash");
const date_fns_1 = require("date-fns");
const pgEscape = require("pg-escape");
const array_1 = require("./array");
exports.column = (name) => change_case_1.snakeCase(name);
exports.table = (name) => change_case_1.snakeCase(name);
exports.literal = (value) => {
    if (value === null) {
        return "NULL";
    }
    if (value === undefined) {
        return "";
    }
    if (lodash_1.isDate(value)) {
        return `'${date_fns_1.format(value, "YYYY-MM-DD HH:mm:ss.SSSZZ")}'`; // Format in UTC
    }
    if (typeof value === "string") {
        return pgEscape.literal(value);
    }
    return value.toString();
};
exports.toSet = (update) => lodash_1.map(lodash_1.toPairs(update), ([key, value]) => `${exports.column(key)} = ${exports.literal(value)}`).join(", ");
exports.toArray = (items) => `(${items.join(", ")})`;
exports.toValues = (item) => exports.toArray(lodash_1.values(item).map(exports.literal));
exports.toColumns = (item) => exports.toArray(lodash_1.keys(item).map(exports.column));
exports.insert = (table, items) => {
    const allItems = array_1.ensureArray(items);
    return `
    INSERT INTO ${table} ${allItems.map(exports.toColumns)}
    VALUES ${allItems.map(exports.toValues)}
  `;
};
exports.upsert = (table, items, onConflictKeys, updateKeys) => `
  ${exports.insert(table, array_1.ensureArray(items))}
  ON CONFLICT ${exports.toArray(array_1.ensureArray(onConflictKeys).map(exports.column))} DO
  UPDATE SET ${lodash_1.without(array_1.ensureArray(updateKeys), "updated_at")
    .map(k => `${exports.column(k)} = excluded.${exports.column(k)}`)
    .join(", ")}, updated_at = now()
`;
//# sourceMappingURL=sql.js.map