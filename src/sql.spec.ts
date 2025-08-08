import { isEmpty, last, reject } from "lodash";
import {
  toValues,
  toSet,
  toColumns,
  upsert,
  literal,
  insert,
  update,
  formatTable,
  formatColumn,
  setSystemLastUpdatedBy,
  withSystemLastUpdate,
} from "./sql";

const ignoreWhitesace = (s: string) => s.replace(/\s/gi, "").trim();
const lines = (s: string) =>
  reject(
    s.split("\n").map(s => s.trim()),
    isEmpty,
  );
const lastLine = (s: string) => last(lines(s));

describe("sql", () => {
  describe("update", () => {
    test("produces correct update sql", () => {
      expect(
        ignoreWhitesace(
          update<{ id: string; value: string; another: number }>(
            "table",
            { value: "A", another: 23 },
            { id: "an-id" },
          ),
        ),
      ).toBe(
        ignoreWhitesace(`
        UPDATE table
        SET value = 'A', another = 23, updated_at = now()
        WHERE id = 'an-id'
      `),
      );
    });

    test("escapes reserved tables", () => {
      expect(
        ignoreWhitesace(
          update(
            "user",
            { email: "foo@bar.com" },
            { email: "bar@foo.com" },
            "*",
          ),
        ),
      ).toEqual(
        ignoreWhitesace(
          `UPDATE "user" SET email = 'foo@bar.com', updated_at=now() WHERE email = 'bar@foo.com' RETURNING *`,
        ),
      );
    });

    test("produces correct update sql for special keywords", () => {
      expect(
        ignoreWhitesace(
          update<{ id: string; order: number }>(
            "table",
            { order: 2 },
            { id: "an-id" },
          ),
        ),
      ).toBe(
        ignoreWhitesace(`
        UPDATE table
        SET "order" = 2, updated_at = now()
        WHERE id = 'an-id'
      `),
      );
    });

    test("produces correct update sql for multiple conditions", () => {
      expect(
        ignoreWhitesace(
          update<{ id: string; value: string; another: number; name: string }>(
            "table",
            { value: "A", another: 23 },
            { id: "an-id", name: "james" },
          ),
        ),
      ).toBe(
        ignoreWhitesace(`
        UPDATE table
        SET value = 'A', another = 23, updated_at = now()
        WHERE id = 'an-id' AND name = 'james'
      `),
      );
    });

    test("produces correct update sql for array fields", () => {
      expect(
        ignoreWhitesace(
          update<{
            id: string;
            value: string;
            another: string[];
            name: string;
          }>(
            "table",
            { value: "A", another: ["a", "b", "c"] },
            { id: "an-id", name: "james" },
          ),
        ),
      ).toBe(
        ignoreWhitesace(`
        UPDATE table
        SET value = 'A', another = ARRAY['a','b','c']::VARCHAR[], updated_at = now()
        WHERE id = 'an-id' AND name = 'james'
      `),
      );

      expect(
        ignoreWhitesace(
          update<{
            id: string;
            value: string;
            another: number[];
            name: string;
          }>(
            "table",
            { value: "A", another: [1, 2, 4] },
            { id: "an-id", name: "james" },
          ),
        ),
      ).toBe(
        ignoreWhitesace(`
        UPDATE table
        SET value = 'A', another = ARRAY[1, 2, 4]::INT[], updated_at = now()
        WHERE id = 'an-id' AND name = 'james'
      `),
      );

      expect(
        ignoreWhitesace(
          update<{
            id: string;
            value: string;
            another: string[];
            name: string;
          }>(
            "table",
            { value: "A", another: ["740d04dd-59d5-4a52-bb76-00448362fcb5"] },
            { id: "an-id", name: "james" },
          ),
        ),
      ).toBe(
        ignoreWhitesace(`
        UPDATE table
        SET value = 'A', another = ARRAY['740d04dd-59d5-4a52-bb76-00448362fcb5']::UUID[], updated_at = now()
        WHERE id = 'an-id' AND name = 'james'
      `),
      );
    });
  });

  describe("upsert", () => {
    test("default cases", () => {
      expect(
        ignoreWhitesace(
          upsert(
            "table",
            [{ aKey: "value1", bKey: 2 }],
            ["aKey", "bKey"],
            ["aKey"],
          ),
        ),
      ).toEqual(
        ignoreWhitesace(`
        INSERT INTO table (a_key, b_key)
        VALUES ('value1', 2)
        ON CONFLICT (a_key, b_key) DO
        UPDATE SET a_key = excluded.a_key, updated_at = now()
    `),
      );
    });

    test("escapes reserved tables", () => {
      expect(
        ignoreWhitesace(
          upsert(
            "user",
            { email: "foo@bar.com", bar: "blah" },
            ["email"],
            ["bar"],
            "*",
          ),
        ),
      ).toEqual(
        ignoreWhitesace(
          `INSERT INTO "user" (email, bar) VALUES ('foo@bar.com', 'blah') ON CONFLICT (email) DO UPDATE SET bar = excluded.bar, updated_at = now() RETURNING *`,
        ),
      );
    });

    test("upsert updates all unique fields passed in", () => {
      expect(
        ignoreWhitesace(
          upsert(
            "table",
            [
              { key1: "value1", key2: 2 },
              { key1: "value1", key3: 3 },
            ],
            ["key1", "key2"],
            ["key1"],
          ),
        ),
      ).toEqual(
        ignoreWhitesace(`
      INSERT INTO table (key1, key2, key3)
      VALUES ('value1', 2, DEFAULT), ('value1', DEFAULT, 3)
      ON CONFLICT (key1, key2) DO
      UPDATE SET key1 = excluded.key1, updated_at = now()
  `),
      );
    });

    test("no updates", () => {
      expect(
        ignoreWhitesace(
          upsert("table", [{ aKey: "value1", bKey: 2 }], ["aKey"], []),
        ),
      ).toEqual(
        ignoreWhitesace(`
        INSERT INTO table (a_key, b_key)
        VALUES ('value1', 2)
        ON CONFLICT (a_key) DO NOTHING
    `),
      );
    });

    test("no updates, but returning", () => {
      // In order for RETURNING * to work, there needs to be an update (DO NOTHING doesn't work)
      // therefore we set the updated_at to itself (no change)
      expect(
        ignoreWhitesace(
          upsert("table", [{ aKey: "value1", bKey: 2 }], ["aKey"], [], "*"),
        ),
      ).toEqual(
        ignoreWhitesace(`
        INSERT INTO table (a_key, b_key)
        VALUES ('value1', 2)
        ON CONFLICT (a_key) DO UPDATE SET updated_at = table.updated_at
        RETURNING *
    `),
      );
    });

    test("returning fields are set on upsert", () => {
      expect(
        lastLine(
          upsert(
            "table",
            { id: "boom", updated_at: new Date() },
            ["id"],
            "updated_at",
            ["id", "name"],
          ),
        ),
      ).toEqual("RETURNING id, name");
    });

    test("should never have duplicate updated_at in upsert", async () => {
      const sql = upsert(
        "table",
        { id: "boom", updated_at: new Date() },
        ["id"],
        "updated_at",
      );
      expect(sql.indexOf("excluded.updated_at")).toBe(-1);
    });
  });

  describe("insert", () => {
    test("insert sql generator", () => {
      expect(
        ignoreWhitesace(
          insert("table", [{ aKey: "value1 with single's quote", bKey: 2 }]),
        ),
      ).toEqual(
        ignoreWhitesace(`
      INSERT INTO table (a_key, b_key)
      VALUES ('value1 with single''s quote', 2)
  `),
      );
    });

    test("escapes reserved tables", () => {
      expect(
        ignoreWhitesace(insert("user", [{ email: "foo@bar.com" }], "*")),
      ).toEqual(
        ignoreWhitesace(
          `INSERT INTO "user" (email) VALUES ('foo@bar.com') RETURNING *`,
        ),
      );
    });

    test("inserts json blobs correctly", () => {
      const blob = {
        some: "stuff",
        is: true,
        a: new Date("2019-10-10 00:00:00.000"),
      };
      expect(
        ignoreWhitesace(
          insert("table", {
            blob,
          }),
        ),
      ).toContain(
        ignoreWhitesace(`
      INSERT INTO table (blob)
      VALUES ('{"some": "stuff", "is": true, "a": "2019-10-10T00:00:00.000Z"}')
  `),
      );
    });

    test("escapes single quotes inside json blobs", () => {
      const blob = {
        some: "stuff's cool",
        is: true,
        a: new Date("2019-10-10 00:00:00.000"),
      };
      expect(
        ignoreWhitesace(
          insert("table", {
            blob,
          }),
        ),
      ).toContain(
        ignoreWhitesace(`
      INSERT INTO table (blob)
      VALUES ('{"some": "stuff''s cool", "is": true, "a": "2019-10-10T00:00:00.000Z"}')
  `),
      );
    });

    test("returning fields are set on insert", () => {
      // Defaults to returning all fields *
      expect(
        lastLine(insert("table", { id: "boom", updated_at: new Date() }, "*")),
      ).toEqual("RETURNING *");

      // Returns values when set
      expect(
        lastLine(
          insert("table", { id: "boom", updated_at: new Date() }, [
            "id",
            "name",
          ]),
        ),
      ).toEqual("RETURNING id, name");

      // Excludes return when not set
      expect(
        lastLine(insert("table", { id: "boom", updated_at: new Date() }, [])),
      ).not.toEqual("RETURNING id, name");
      expect(
        lastLine(
          insert("table", { id: "boom", updated_at: new Date() }, undefined),
        ),
      ).not.toEqual("RETURNING id, name");
    });
  });

  describe("toValues", () => {
    test("should format sql values", () => {
      expect(toValues([{ a: "a", b: "b", c: 5 }])).toEqual("('a', 'b', 5)");
    });

    test("it should format values from all objects", () => {
      expect(
        toValues([
          { a: "a", b: "b", c: 5 },
          { a: "a", b: "b", c: 5, d: false },
        ]),
      ).toEqual("('a', 'b', 5, DEFAULT), ('a', 'b', 5, false)");
    });
  });

  describe("toColumns", () => {
    test("should format sql columns", () => {
      expect(toColumns([{ a: "a", b: "b", c: 5 }])).toEqual("(a, b, c)");

      expect(toColumns([{ aColumn: "a", bColumn: "b", cColumn: 5 }])).toEqual(
        "(a_column, b_column, c_column)",
      );
    });
  });

  describe("toSet", () => {
    test("should format sql sets", () => {
      expect(
        toSet({
          a: "a",
          b: "b",
          c: 5,
          d: new Date("2019-08-08T00:00:00.000Z"),
        }),
      ).toEqual("a = 'a', b = 'b', c = 5, d = '2019-08-08 00:00:00.000+0000'");
    });
  });

  describe("literal", () => {
    test("should escape values", () => {
      expect(literal("hello")).toEqual("'hello'");
      expect(literal("single's quote")).toEqual("'single''s quote'");
      expect(literal(5)).toEqual("5");
      expect(literal(new Date("2019-08-08T00:00:00.000Z"))).toEqual(
        "'2019-08-08 00:00:00.000+0000'",
      );
      expect(literal(false)).toEqual("false");
      expect(literal(null)).toEqual("NULL");
      expect(literal(undefined)).toEqual("");
    });
  });

  describe("formatTable", () => {
    test("should snake_case table names", () => {
      expect(formatTable("tablename")).toEqual("tablename");
      expect(formatTable("table name")).toEqual("table_name");
      expect(formatTable("tableName")).toEqual("table_name");
      expect(formatTable("TableName")).toEqual("table_name");
    });

    test(`should quote "special" table names`, () => {
      expect(formatTable("user")).toEqual(`"user"`);
    });
  });

  describe("formatColumn", () => {
    test("should snake_case column names", () => {
      expect(formatColumn("columnname")).toEqual("columnname");
      expect(formatColumn("column name")).toEqual("column_name");
      expect(formatColumn("columnName")).toEqual("column_name");
      expect(formatColumn("ColumnName")).toEqual("column_name");
    });

    test(`should quote "special" column names`, () => {
      expect(formatColumn("order")).toEqual(`"order"`);
    });
  });

  describe("setSystemLastUpdatedBy", () => {
    test("should return the last_updated_by clause", () => {
      expect(setSystemLastUpdatedBy()).toEqual(
        "last_updated_by = '00000000-0000-0000-0000-000000000000'",
      );
    });
  });

  describe("withSystemLastUpdate", () => {
    test("should add the last_updated_by clause", () => {
      expect(withSystemLastUpdate({ foo: "bar" })).toEqual({
        foo: "bar",
        last_updated_by: "00000000-0000-0000-0000-000000000000",
      });
    });
  });
});
