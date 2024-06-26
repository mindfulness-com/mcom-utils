import { Maybe } from "./maybe";
import {
  sortByInt,
  pluckUnique,
  indexBy,
  maybeMap,
  ensureArray,
  lookup,
  maybeLookup,
  omitEmpty,
  insertAfter,
  insertAt,
  justOne,
} from "./array";

describe("array", () => {
  describe("ensureArray", () => {
    test("should always return arrays", () => {
      expect(ensureArray("a")).toEqual(["a"]);
      expect(ensureArray(["a"])).toEqual(["a"]);
      expect(ensureArray([])).toEqual([]);

      expect(ensureArray(1)).toEqual([1]);
      expect(ensureArray([1])).toEqual([1]);

      const date = new Date();
      expect(ensureArray(date)).toEqual([date]);
      expect(ensureArray([date])).toEqual([date]);
    });
  });

  describe("indexBy", () => {
    test("should create an index", () => {
      const tests = [{ id: "a" }, { id: "b" }, { id: "c" }, { id: undefined }];
      expect(indexBy(tests, t => t.id)).toEqual({
        a: tests[0],
        b: tests[1],
        c: tests[2],
      });
    });

    test("should have later values override earlier values in an index", () => {
      const tests = [{ id: "a" }, { id: "b" }, { id: "a" }];
      expect(indexBy(tests, t => t.id)).toEqual({
        a: tests[2],
        b: tests[1],
      });
    });

    test("should flatten when indexing by array values", () => {
      const tests = [
        { ids: ["a", "a2"] },
        { ids: ["b", "b2"] },
        { ids: ["c", "c2"] },
        { ids: [] },
      ];
      expect(indexBy(tests, t => t.ids)).toEqual({
        a: tests[0],
        b: tests[1],
        c: tests[2],
        a2: tests[0],
        b2: tests[1],
        c2: tests[2],
      });
    });
  });

  describe("sortByInt", () => {
    test("should sort ascending ints", () => {
      const things = [{ a: 3 }, { a: 1 }, { a: 2 }];
      expect(sortByInt(things, t => t.a)).toEqual([
        { a: 1 },
        { a: 2 },
        { a: 3 },
      ]);
    });
  });

  describe("pluckUnique", () => {
    test("should pluck unique values provided from the predicate", () => {
      interface Thing {
        a: Maybe<string>;
      }
      const values: Thing[] = [
        { a: "one" },
        { a: "two" },
        { a: "" },
        { a: undefined },
        { a: "one" },
      ];
      const plucker = pluckUnique<Thing>(thing => thing.a);
      expect(plucker(values)).toEqual(["one", "two", ""]);
    });
  });

  describe("maybeMap", () => {
    test("should only return defined values", () => {
      expect(
        maybeMap([1, 2, 3, 4, 5, 6], a => (a % 2 === 0 ? `${a}` : undefined)),
      ).toEqual(["2", "4", "6"]);

      expect(
        maybeMap([1, 2, 3, 4, 5, 6], a => (a % 2 === 0 ? `${a}` : null)),
      ).toEqual(["2", "4", "6"]);

      expect(
        maybeMap([1, 2, 3, 4, 5, 6], a => (a % 2 === 0 ? true : false)),
      ).toEqual([false, true, false, true, false, true]);
    });
  });

  describe("lookup", () => {
    test("throws an error when not found in lookup", () => {
      expect(() =>
        lookup([{ id: 1 }, { id: 2 }], t => String(t.id))("3"),
      ).toThrow();
    });

    test("uses fallback when lookup not found", () => {
      expect(
        lookup(
          [{ id: 1 }, { id: 2 }],
          t => String(t.id),
          () => ({ id: -1 }),
        )("3"),
      ).toEqual({ id: -1 });
    });

    test("maybeLookup returns undefined when not found", () => {
      expect(
        maybeLookup([{ id: 1 }, { id: 2 }], t => String(t.id))("3"),
      ).toBeUndefined();
    });

    test("returns the value searching for", () => {
      expect(
        maybeLookup([{ id: 1 }, { id: 2 }], t => String(t.id))("2"),
      ).toEqual({ id: 2 });

      expect(lookup([{ id: 1 }, { id: 2 }], t => String(t.id))("2")).toEqual({
        id: 2,
      });
    });
  });

  describe("omitEmpty", () => {
    test("filters out null and undefined", () => {
      expect(omitEmpty(["1", undefined, null, "2"])).toEqual(["1", "2"]);
    });

    test("does not filter out falsey", () => {
      expect(omitEmpty(["", undefined, null, "2"])).toEqual(["", "2"]);
      expect(omitEmpty([false, undefined, null, true])).toEqual([false, true]);
    });
  });

  describe("insertAfter", () => {
    test("should insert after", () => {
      const arr = ["foo", "kek"];
      const items = ["bar"];
      const result = ["foo", "bar", "kek"];
      expect(insertAfter(arr, items, "foo")).toMatchObject(result);

      expect(
        insertAfter(arr, ["multiple", "items", "inserted"], "kek"),
      ).toMatchObject(["foo", "kek", "multiple", "items", "inserted"]);
    });
  });

  describe("insertAt", () => {
    test("should insert at", () => {
      const arr = ["foo", "kek"];
      const items = ["bar"];
      const result = ["foo", "bar", "kek"];
      expect(insertAt(arr, items, 1)).toMatchObject(result);
    });
  });

  describe("justOne", () => {
    it("should return 3", () => {
      expect(justOne([3, 3, 3])).toBe(3);
    });

    it("should return 1", () => {
      expect(justOne([1, 2, 3])).toBe(1);
    });

    it("should return 1", () => {
      expect(justOne(1)).toBe(1);
    });

    it("array should return undefined", () => {
      expect(justOne([undefined])).toBe(undefined);
    });

    it("should return undefined", () => {
      expect(justOne(undefined)).toBe(undefined);
    });
  });
});
