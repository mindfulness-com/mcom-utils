import {
  unless,
  when,
  testIsNumber,
  testIsString,
  identity,
  isString,
  isDefined,
  isUndefined,
  isAllDefined,
  whenAsync,
} from "./maybe";

describe("maybe", () => {
  describe("identity", () => {
    test("should return the passed in arg", () => {
      const foo = { bar: "test" };
      expect(identity(foo)).toEqual(foo);
    });
  });

  describe("isString", () => {
    test("should be true for a string", () => {
      expect(isString("string")).toEqual(true);
    });

    test("should be false for everything else", () => {
      expect(isString(null)).toEqual(false);
      expect(isString(undefined)).toEqual(false);
      expect(isString(NaN)).toEqual(false);
      expect(isString(1)).toEqual(false);
      expect(isString(true)).toEqual(false);
      expect(isString(false)).toEqual(false);
      expect(isString({})).toEqual(false);
      expect(isString(new Date())).toEqual(false);
      expect(isString(/^\?/)).toEqual(false);
    });
  });

  describe("isDefined", () => {
    test("should be false for undefined", () => {
      expect(isDefined(undefined)).toEqual(false);
    });

    test("should be false for null", () => {
      expect(isDefined(null)).toEqual(false);
    });

    test("should be true for everything else", () => {
      expect(isDefined("string")).toEqual(true);
      expect(isDefined(NaN)).toEqual(true);
      expect(isDefined(1)).toEqual(true);
      expect(isDefined(true)).toEqual(true);
      expect(isDefined(false)).toEqual(true);
      expect(isDefined({})).toEqual(true);
      expect(isDefined(new Date())).toEqual(true);
      expect(isDefined(/^\?/)).toEqual(true);
    });
  });

  describe("isAllDefined", () => {
    test("should be true if everything is defined", () => {
      expect(
        isAllDefined(["string", NaN, 1, true, false, {}, new Date(), /^\?/]),
      ).toEqual(true);
    });

    test("should be false if contains undefined", () => {
      expect(
        isAllDefined([
          "string",
          NaN,
          1,
          true,
          false,
          {},
          new Date(),
          /^\?/,
          undefined,
        ]),
      ).toEqual(false);
    });

    test("should be false if contains null", () => {
      expect(
        isAllDefined([
          "string",
          NaN,
          1,
          true,
          false,
          {},
          new Date(),
          /^\?/,
          null,
        ]),
      ).toEqual(false);
    });
  });

  describe("isUndefined", () => {
    test("should be true for undefined", () => {
      expect(isUndefined(undefined)).toEqual(true);
    });

    test("should, somewhat surprisingly, be true for null!", () => {
      expect(isUndefined(null)).toEqual(true);
    });

    test("should be false for everything else", () => {
      expect(isUndefined("string")).toEqual(false);
      expect(isUndefined(NaN)).toEqual(false);
      expect(isUndefined(1)).toEqual(false);
      expect(isUndefined(true)).toEqual(false);
      expect(isUndefined(false)).toEqual(false);
      expect(isUndefined({})).toEqual(false);
      expect(isUndefined(new Date())).toEqual(false);
      expect(isUndefined(/^\?/)).toEqual(false);
    });
  });

  describe("when", () => {
    test("when", () => {
      expect(when(undefined, () => "failed")).toBeUndefined();
      expect(when(null, () => "failed")).toBeUndefined();
      expect(when(true, () => "passed")).toBe("passed");
      expect(when(false, () => "passed")).toBe("passed");
      expect(when("passed", p => p)).toBe("passed");
    });

    test("when (asynchronously called)", async () => {
      expect(await when(undefined, async () => "failed")).toBeUndefined();
      expect(await when(null, async () => "failed")).toBeUndefined();
      expect(await when(true, async () => "passed")).toBe("passed");
      expect(await when(false, async () => "passed")).toBe("passed");
      expect(await when("passed", async p => p)).toBe("passed");
    });
  });

  describe("whenAsync", () => {
    test("whenAsync", async () => {
      expect(await whenAsync(undefined, async () => "failed")).toBeUndefined();
      expect(await whenAsync(null, async () => "failed")).toBeUndefined();
      expect(await whenAsync(true, async () => "passed")).toBe("passed");
      expect(await whenAsync(false, async () => "passed")).toBe("passed");
      expect(await whenAsync("passed", async p => p)).toBe("passed");
    });
  });

  describe("unless", () => {
    test("unless", () => {
      expect(unless(undefined, () => "passed")).toBe("passed");
      expect(unless(null, () => "passed")).toBe("passed");
      expect(unless(true, () => "passed")).toBeUndefined();
      expect(unless(false, () => "passed")).toBeUndefined();
    });
  });

  describe("testIsString", () => {
    test("should be true for a string", () => {
      expect(testIsString("string")).toEqual("string");
    });

    test("should be false for a number", () => {
      expect(testIsString(123)).toBeUndefined();
    });

    test("should be false for a boolean", () => {
      expect(testIsString(true)).toBeUndefined();
    });

    test("should be false for an object", () => {
      expect(testIsString({ foo: "bar" })).toBeUndefined();
    });

    test("should be false for an array", () => {
      expect(testIsString(["a", 123])).toBeUndefined();
    });
  });

  describe("testIsNumber", () => {
    test("should be false for a string", () => {
      expect(testIsNumber("string")).toBeUndefined();
    });

    test("should be true for a number", () => {
      expect(testIsNumber(123)).toEqual(123);
    });

    test("should be true for an integer string", () => {
      expect(testIsNumber("123")).toEqual(123);
      expect(testIsNumber("0000123")).toEqual(123);
    });

    test("should be true for a decimal string", () => {
      expect(testIsNumber("123.456")).toEqual(123.456);
      expect(testIsNumber("123.4")).toEqual(123.4);
      expect(testIsNumber("3.4")).toEqual(3.4);
      expect(testIsNumber(".4")).toEqual(0.4);
      expect(testIsNumber("3.")).toBeUndefined();
    });

    test("should be false for a boolean", () => {
      expect(testIsNumber(true)).toBeUndefined();
    });

    test("should be false for an object", () => {
      expect(testIsNumber({ foo: "bar" })).toBeUndefined();
    });

    test("should be false for an array", () => {
      expect(testIsNumber(["a", 123])).toBeUndefined();
    });
  });
});
