import { unless, when, testIsNumber, testIsString } from "./maybe";

describe("maybe", () => {
  describe("when", () => {
    test("when", () => {
      expect(when(undefined, () => "failed")).toBeUndefined();
      expect(when(null, () => "failed")).toBeUndefined();
      expect(when(true, () => "passed")).toBe("passed");
      expect(when(false, () => "passed")).toBe("passed");
      expect(when("passed", p => p)).toBe("passed");
    });
  });

  describe("unless", () => {
    test("unless", () => {
      expect(unless(undefined, () => "passed")).toBe("passed");
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
