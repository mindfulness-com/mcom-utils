import {
  isDate,
  keys,
  map,
  toPairs,
  without,
  get,
  isObject,
  isEmpty,
  isArray,
  reduce,
  first,
  isNumber,
  isString,
} from "lodash";
import pgEscape from "pg-escape";

import { Primitive, PrimitiveRecord } from "./types";
import { ensureArray } from "./array";
import { Maybe, when } from "./maybe";
import { ifDo, ifDo_ } from "./logic";
import { Fn, fallback } from "./fn";
import { isUUID } from "./id";
import { format } from "./date";
import { snakeCase } from "./string";

export const column = (name: string): string => {
  const col = snakeCase(name);
  // Special columns should be in quotes
  if (col === "order") {
    return `"${col}"`;
  }
  return col;
};
export const table = (name: string): string => snakeCase(name);

// For backwards compatibility
export { Primitive, PrimitiveRecord } from "./types";

export const literal = (value: Primitive | Primitive[]): string => {
  // Treat null as NULL
  if (value === null) {
    return "NULL";
  }

  // Treat undefined as empty
  if (value === undefined) {
    return "";
  }

  // Format dates in UTC
  if (isDate(value)) {
    return `'${format(value, "yyyy-MM-dd HH:mm:ss.SSSxxxx")}'`;
  }

  if (typeof value === "string") {
    return pgEscape.literal(value);
  }

  if (isArray(value)) {
    const sample = first(value);
    const type = fallback(
      () => ifDo(isNumber(sample), () => "INT"),
      () => ifDo(isString(sample) && isUUID(sample), () => "UUID"),
      () => "VARCHAR",
    );
    return `ARRAY[${value.map(literal).join(",")}]::${type}[]`;
  }

  // JSON blobs
  if (isObject(value)) {
    return pgEscape.literal(JSON.stringify(value));
  }

  // Literal string value
  return value.toString();
};

export const toArray = (items: Primitive[]) => `(${items.join(", ")})`;
export const toLiteralArray = (items: Primitive[]) =>
  toArray(items.map(literal));

export const toSet = (update: PrimitiveRecord) =>
  map(
    toPairs(update),
    ([key, value]) => `${column(key)} = ${literal(value)}`,
  ).join(", ");

const uniqColumns = <T = PrimitiveRecord>(items: T[]) =>
  keys(
    reduce(
      items,
      (acc, i) => ({
        ...acc,
        ...i,
      }),
      {} as T,
    ),
  );

export const toValues = <T = PrimitiveRecord>(
  items: T[],
  columns: string[] = uniqColumns(items),
) => {
  const extractValues = (i: T) =>
    columns.map((c: string) => {
      const v = get(i, c);
      return v === undefined ? "DEFAULT" : literal(v);
    });

  return items.map(i => `${toArray(extractValues(i))}`).join(", ");
};

export const toColumns = <T = PrimitiveRecord>(items: T[]) => {
  // Map all items into one object to get union of fields
  return `${toArray(uniqColumns(items).map(column))}`;
};

const formatReturning = (fields: Maybe<string | string[]>) =>
  fields && !isEmpty(fields)
    ? `RETURNING ${ensureArray(fields).join(", ")}`
    : "";

export const insert = <T = PrimitiveRecord>(
  table: string,
  items: T | T[],
  returnFields?: Maybe<string | string[]>,
) => {
  const all = ensureArray(items);
  if (isEmpty(items)) {
    throw new Error("Can't insert empty array.");
  }
  const columns = uniqColumns(all);

  return `
    INSERT INTO ${table} ${toArray(columns.map(column))}
    VALUES ${toValues(all, columns)}
    ${formatReturning(returnFields)}
  `;
};

export const update = <T = PrimitiveRecord>(
  table: string,
  update: Partial<T>,
  condition: Partial<T>,
) => `
  UPDATE ${table}
  SET ${toSet(update as PrimitiveRecord)}
  WHERE ${keys(condition)
    .map(
      key =>
        `${key} = ${literal((condition as Record<string, Primitive>)[key])}`,
    )
    .join(" AND ")}
`;

export const upsert = <T = PrimitiveRecord>(
  table: string,
  items: T | T[],
  onConflictKeys: string | string[],
  updateKeys: string | string[],
  returnFields?: Maybe<string | string[]>,
) => {
  const all = ensureArray(items);
  if (isEmpty(items)) {
    throw new Error("Can't upsert empty array.");
  }
  return `
    INSERT INTO ${table} ${toColumns(all)}
    VALUES ${toValues(all)}
    ON CONFLICT ${toArray(map(ensureArray(onConflictKeys), column))} DO
    ${fallback(
      // Update specified keys
      ifDo_(
        !isEmpty(updateKeys),
        () =>
          ` UPDATE SET ${without(
            map(ensureArray(updateKeys), column),
            "updated_at",
          )
            .map(k => `${k} = excluded.${k}`)
            .join(", ")}, updated_at = now()`,
      ),
      // In order for RETURNING * to work, there needs to be an update (DO NOTHING doesn't work)
      // therefore we set the updated_at to itself (no change)
      ifDo_(
        !!returnFields,
        () => ` UPDATE SET updated_at = ${table}.updated_at`,
      ),

      // Else do nothing
      () => " NOTHING",
    )}
    ${formatReturning(returnFields)}
  `;
};

/**
 * When something is defined, do something with it to return a SQL string.
 * @param {T} t - The `thing` to check
 * @param {function} fn - What to do if the `thing` is defined
 * @returns {*} - returns empty string if "thing" is not defined or whatever is returned from `doWork`
 */
export const whenSQL = <T>(t: Maybe<T>, fn: Fn<T, string>): string =>
  when(t, fn) || "";
