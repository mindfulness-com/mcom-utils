import {
  getOrElse,
  definitely,
  definitelyOne,
  string,
  number,
} from "./definitely";

describe("definitely", () => {
  describe("getOrElse", () => {
    test("should return default when val is undefined", () => {
      expect(getOrElse(undefined, "default")).toEqual("default");
    });

    test("should return default when val is null", () => {
      expect(getOrElse(null, "default")).toEqual("default");
    });

    test("should return value for everything else", () => {
      expect(getOrElse(NaN, 0)).toEqual(NaN);
      expect(getOrElse(1, 0)).toEqual(1);
      expect(getOrElse(true, false)).toEqual(true);
      expect(getOrElse(false, true)).toEqual(false);
      expect(getOrElse({ foo: "bar" }, { bar: "foo" })).toEqual({ foo: "bar" });
      expect(getOrElse(/^\?/, /^\!/)).toEqual(/^\?/);
    });
  });

  describe("definitely", () => {
    test("should throw for an undefined value", async () => {
      await expect(() =>
        definitely(undefined, "undefined value"),
      ).toThrowErrorMatchingInlineSnapshot('"undefined value"');
    });

    test("should throw for a null value", async () => {
      await expect(() =>
        definitely(null, "null value"),
      ).toThrowErrorMatchingInlineSnapshot('"null value"');
    });

    test("should not throw for everything else", async () => {
      await expect(() => definitely(NaN, "no throw")).not.toThrow();
      await expect(() => definitely(0, "no throw")).not.toThrow();
      await expect(() => definitely(1, "no throw")).not.toThrow();
      await expect(() => definitely(true, "no throw")).not.toThrow();
      await expect(() => definitely(false, "no throw")).not.toThrow();
      await expect(() => definitely({ foo: "bar" }, "no throw")).not.toThrow();
      await expect(() => definitely(/^\?/, "no throw")).not.toThrow();
    });
  });

  describe("definitelyOne", () => {
    test("should throw for an empty array", async () => {
      await expect(() =>
        definitelyOne([], "empty array"),
      ).toThrowErrorMatchingInlineSnapshot('"empty array"');
    });

    test("should throw for an array containing undefined first", async () => {
      await expect(() =>
        definitelyOne([undefined, "foo"], "undefined first"),
      ).toThrowErrorMatchingInlineSnapshot('"undefined first"');
    });

    test("should throw for an array containing null first", async () => {
      await expect(() =>
        definitelyOne([null, "foo"], "null first"),
      ).toThrowErrorMatchingInlineSnapshot('"null first"');
    });

    test("should not throw for an array containing an element", async () => {
      await expect(() =>
        definitelyOne(["foo", "bar"], "no throw"),
      ).not.toThrow();
      expect(definitelyOne(["foo", "bar"], "no throw")).toEqual("foo");
    });
  });

  describe("string", () => {
    test("should return an empty string when val is undefined", () => {
      expect(string(undefined)).toEqual("");
    });

    test("should return an empty string when val is null", () => {
      expect(string(null as any)).toEqual("");
    });

    test("should return val when val is a string", () => {
      expect(string("a string")).toEqual("a string");
    });
  });

  describe("number", () => {
    test("should return zero when val is undefined", () => {
      expect(number(undefined)).toEqual(0);
    });

    test("should return zero when val is null", () => {
      expect(number(null as any)).toEqual(0);
    });

    test("should return val when val is a number", () => {
      expect(number(123)).toEqual(123);
    });

    test("should return val when val is NaN", () => {
      expect(number(NaN)).toEqual(NaN);
    });
  });
});
