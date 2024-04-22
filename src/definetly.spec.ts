import { getOrElse, definetly, string, number } from "./definetly";

describe("definetly", () => {
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

  describe("definetly", () => {
    test("should throw for an undefined value", async () => {
      await expect(() =>
        definetly(undefined, "undefined value"),
      ).toThrowErrorMatchingInlineSnapshot('"undefined value"');
    });

    test("should throw for a null value", async () => {
      await expect(() =>
        definetly(null, "null value"),
      ).toThrowErrorMatchingInlineSnapshot('"null value"');
    });

    test("should not throw for everything else", async () => {
      await expect(() => definetly(NaN, "no throw")).not.toThrow();
      await expect(() => definetly(1, "no throw")).not.toThrow();
      await expect(() => definetly(true, "no throw")).not.toThrow();
      await expect(() => definetly(false, "no throw")).not.toThrow();
      await expect(() => definetly({ foo: "bar" }, "no throw")).not.toThrow();
      await expect(() => definetly(/^\?/, "no throw")).not.toThrow();
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
