import {
  toValues,
  toSet,
  toColumns,
  upsert,
  literal,
  insert,
  update,
} from "./sql";

const ignoreWhitesace = (s: string) => s.replace(/\s/gi, "").trim();

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
        SET value = 'A', another = 23
        WHERE id = 'an-id'
      `),
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
        SET "order" = 2
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
        SET value = 'A', another = 23
        WHERE id = 'an-id' AND name = 'james'
      `),
    );
  });

  test("produces correct update sql for array fields", () => {
    expect(
      ignoreWhitesace(
        update<{ id: string; value: string; another: string[]; name: string }>(
          "table",
          { value: "A", another: ["a", "b", "c"] },
          { id: "an-id", name: "james" },
        ),
      ),
    ).toBe(
      ignoreWhitesace(`
        UPDATE table
        SET value = 'A', another = ARRAY['a','b','c']
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
});

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

test("it should format sql values", () => {
  expect(toValues([{ a: "a", b: "b", c: 5 }])).toEqual("('a', 'b', 5)");
});

test("it should format sql columns", () => {
  expect(toColumns([{ a: "a", b: "b", c: 5 }])).toEqual("(a, b, c)");

  expect(toColumns([{ aColumn: "a", bColumn: "b", cColumn: 5 }])).toEqual(
    "(a_column, b_column, c_column)",
  );
});

test("it should format sql sets", () => {
  expect(
    toSet({ a: "a", b: "b", c: 5, d: new Date("2019-08-08T00:00:00.000Z") }),
  ).toEqual("a = 'a', b = 'b', c = 5, d = '2019-08-08 00:00:00.000+0000'");
});

test("it should escape values", () => {
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
