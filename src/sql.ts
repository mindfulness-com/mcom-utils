import { snakeCase } from "change-case";
import { isDate, keys, values, map, toPairs, without } from "lodash";
import { format } from "date-fns";
import * as pgEscape from "pg-escape";
import { ensureArray } from "./array";

export const column = (name: string): string => snakeCase(name);
export const table = (name: string): string => snakeCase(name);

export type Primitive = string | number | Date | boolean | undefined | null;
export type PrimitiveRecord = Record<string, Primitive>;

export const literal = (value: Primitive) => {
  if (value === null) {
    return "NULL";
  }
  if (value === undefined) {
    return "";
  }
  if (isDate(value)) {
    return `'${format(value, "YYYY-MM-DD HH:mm:ss.SSSZZ")}'`; // Format in UTC
  }

  if (typeof value === "string") {
    return pgEscape.literal(value);
  }

  return value.toString();
};

export const toSet = (update: Record<string, Primitive>) =>
  map(
    toPairs(update),
    ([key, value]) => `${column(key)} = ${literal(value)}`,
  ).join(", ");

export const toArray = (items: Primitive[]) => `(${items.join(", ")})`;

export const toValues = (item: Record<string, Primitive>) =>
  toArray(values(item).map(literal));

export const toColumns = (item: Record<string, Primitive>) =>
  toArray(keys(item).map(column));

export const insert = (
  table: string,
  items: PrimitiveRecord | PrimitiveRecord[],
) => {
  const allItems = ensureArray<PrimitiveRecord>(items);
  return `
    INSERT INTO ${table} ${allItems.map(toColumns)}
    VALUES ${allItems.map(toValues)}
  `;
};

export const upsert = (
  table: string,
  items: PrimitiveRecord | PrimitiveRecord[],
  onConflictKeys: string | string[],
  updateKeys: string | string[],
) => `
  ${insert(table, ensureArray<PrimitiveRecord>(items))}
  ON CONFLICT ${toArray(ensureArray(onConflictKeys).map(column))} DO
  UPDATE SET ${without(ensureArray(updateKeys), "updated_at")
    .map(k => `${column(k)} = excluded.${column(k)}`)
    .join(", ")}, updated_at = now()
`;
