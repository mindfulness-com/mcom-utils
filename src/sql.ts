import { snakeCase } from "change-case";
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
} from "lodash";
import * as pgEscape from "pg-escape";
import { format } from "date-fns";

import { Primitive, PrimitiveRecord } from "./types";
import { ensureArray } from "./array";
import { Maybe } from "./maybe";
import { ifDo, ifDo_ } from "./logic";
import { fallback } from "./fn";

export const column = (name: string): string => snakeCase(name);
export const table = (name: string): string => snakeCase(name);

// For backwards compatibility
export { Primitive, PrimitiveRecord } from "./types";

export const literal = (value: Primitive | string[]): string => {
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
    return `'${format(value, "YYYY-MM-DD HH:mm:ss.SSSZZ")}'`;
  }

  if (typeof value === "string") {
    return pgEscape.literal(value);
  }

  if (isArray(value)) {
    return `[${value.map(literal).join(",")}]`;
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

export const toSet = (update: Record<string, Primitive>) =>
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
      {},
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
      () => " NOTHING",
    )}
    ${formatReturning(returnFields)}
  `;
};
