"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsert = exports.update = exports.insert = exports.toColumns = exports.toValues = exports.toSet = exports.toLiteralArray = exports.toArray = exports.literal = exports.table = exports.column = void 0;
const change_case_1 = require("change-case");
const lodash_1 = require("lodash");
const pgEscape = require("pg-escape");
const date_fns_1 = require("date-fns");
const array_1 = require("./array");
const logic_1 = require("./logic");
const fn_1 = require("./fn");
const column = (name) => (0, change_case_1.snakeCase)(name);
exports.column = column;
const table = (name) => (0, change_case_1.snakeCase)(name);
exports.table = table;
const literal = (value) => {
    // Treat null as NULL
    if (value === null) {
        return "NULL";
    }
    // Treat undefined as empty
    if (value === undefined) {
        return "";
    }
    // Format dates in UTC
    if ((0, lodash_1.isDate)(value)) {
        return `'${(0, date_fns_1.format)(value, "YYYY-MM-DD HH:mm:ss.SSSZZ")}'`;
    }
    if (typeof value === "string") {
        return pgEscape.literal(value);
    }
    if ((0, lodash_1.isArray)(value)) {
        return `ARRAY[${value.map(exports.literal).join(",")}]`;
    }
    // JSON blobs
    if ((0, lodash_1.isObject)(value)) {
        return pgEscape.literal(JSON.stringify(value));
    }
    // Literal string value
    return value.toString();
};
exports.literal = literal;
const toArray = (items) => `(${items.join(", ")})`;
exports.toArray = toArray;
const toLiteralArray = (items) => (0, exports.toArray)(items.map(exports.literal));
exports.toLiteralArray = toLiteralArray;
const toSet = (update) => (0, lodash_1.map)((0, lodash_1.toPairs)(update), ([key, value]) => `${(0, exports.column)(key)} = ${(0, exports.literal)(value)}`).join(", ");
exports.toSet = toSet;
const uniqColumns = (items) => (0, lodash_1.keys)((0, lodash_1.reduce)(items, (acc, i) => (Object.assign(Object.assign({}, acc), i)), {}));
const toValues = (items, columns = uniqColumns(items)) => {
    const extractValues = (i) => columns.map((c) => {
        const v = (0, lodash_1.get)(i, c);
        return v === undefined ? "DEFAULT" : (0, exports.literal)(v);
    });
    return items.map(i => `${(0, exports.toArray)(extractValues(i))}`).join(", ");
};
exports.toValues = toValues;
const toColumns = (items) => {
    // Map all items into one object to get union of fields
    return `${(0, exports.toArray)(uniqColumns(items).map(exports.column))}`;
};
exports.toColumns = toColumns;
const formatReturning = (fields) => fields && !(0, lodash_1.isEmpty)(fields)
    ? `RETURNING ${(0, array_1.ensureArray)(fields).join(", ")}`
    : "";
const insert = (table, items, returnFields) => {
    const all = (0, array_1.ensureArray)(items);
    if ((0, lodash_1.isEmpty)(items)) {
        throw new Error("Can't insert empty array.");
    }
    const columns = uniqColumns(all);
    return `
    INSERT INTO ${table} ${(0, exports.toArray)(columns.map(exports.column))}
    VALUES ${(0, exports.toValues)(all, columns)}
    ${formatReturning(returnFields)}
  `;
};
exports.insert = insert;
const update = (table, update, condition) => `
  UPDATE ${table}
  SET ${(0, exports.toSet)(update)}
  WHERE ${(0, lodash_1.keys)(condition)
    .map(key => `${key} = ${(0, exports.literal)(condition[key])}`)
    .join(" AND ")}
`;
exports.update = update;
const upsert = (table, items, onConflictKeys, updateKeys, returnFields) => {
    const all = (0, array_1.ensureArray)(items);
    if ((0, lodash_1.isEmpty)(items)) {
        throw new Error("Can't upsert empty array.");
    }
    return `
    INSERT INTO ${table} ${(0, exports.toColumns)(all)}
    VALUES ${(0, exports.toValues)(all)}
    ON CONFLICT ${(0, exports.toArray)((0, lodash_1.map)((0, array_1.ensureArray)(onConflictKeys), exports.column))} DO
    ${(0, fn_1.fallback)(
    // Update specified keys
    (0, logic_1.ifDo_)(!(0, lodash_1.isEmpty)(updateKeys), () => ` UPDATE SET ${(0, lodash_1.without)((0, lodash_1.map)((0, array_1.ensureArray)(updateKeys), exports.column), "updated_at")
        .map(k => `${k} = excluded.${k}`)
        .join(", ")}, updated_at = now()`), 
    // In order for RETURNING * to work, there needs to be an update (DO NOTHING doesn't work)
    // therefore we set the updated_at to itself (no change)
    (0, logic_1.ifDo_)(!!returnFields, () => ` UPDATE SET updated_at = ${table}.updated_at`), 
    // Else do nothing
    () => " NOTHING")}
    ${formatReturning(returnFields)}
  `;
};
exports.upsert = upsert;
//# sourceMappingURL=sql.js.map