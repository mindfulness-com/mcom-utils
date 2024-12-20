"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.whenSQL = exports.upsert = exports.update = exports.insert = exports.toColumns = exports.toValues = exports.toSet = exports.toLiteralArray = exports.toArray = exports.literal = exports.table = exports.column = void 0;
const lodash_1 = require("lodash");
const pg_escape_1 = __importDefault(require("pg-escape"));
const array_1 = require("./array");
const maybe_1 = require("./maybe");
const logic_1 = require("./logic");
const fn_1 = require("./fn");
const id_1 = require("./id");
const date_1 = require("./date");
const string_1 = require("./string");
const column = (name) => {
    const col = (0, string_1.snakeCase)(name);
    // Special columns should be in quotes
    if (col === "order") {
        return `"${col}"`;
    }
    return col;
};
exports.column = column;
const table = (name) => (0, string_1.snakeCase)(name);
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
        return `'${(0, date_1.format)(value, "yyyy-MM-dd HH:mm:ss.SSSxxxx")}'`;
    }
    if (typeof value === "string") {
        return pg_escape_1.default.literal(value);
    }
    if ((0, lodash_1.isArray)(value)) {
        const sample = (0, lodash_1.first)(value);
        const type = (0, fn_1.fallback)(() => (0, logic_1.ifDo)((0, lodash_1.isNumber)(sample), () => "INT"), () => (0, logic_1.ifDo)((0, lodash_1.isString)(sample) && (0, id_1.isUUID)(sample), () => "UUID"), () => "VARCHAR");
        return `ARRAY[${value.map(exports.literal).join(",")}]::${type}[]`;
    }
    // JSON blobs
    if ((0, lodash_1.isObject)(value)) {
        return pg_escape_1.default.literal(JSON.stringify(value));
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
/**
 * When something is defined, do something with it to return a SQL string.
 * @param {T} t - The `thing` to check
 * @param {function} fn - What to do if the `thing` is defined
 * @returns {*} - returns empty string if "thing" is not defined or whatever is returned from `doWork`
 */
const whenSQL = (t, fn) => (0, maybe_1.when)(t, fn) || "";
exports.whenSQL = whenSQL;
//# sourceMappingURL=sql.js.map