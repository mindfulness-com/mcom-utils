import {
  toSeconds,
  toMilliSeconds,
  isGreaterThan,
  isLessThan,
  inPast,
  inFuture,
  endOfDay,
} from "./time";
import { addDays, subDays } from "./date";

describe("time", () => {
  describe("toSeconds", () => {
    test("should convert basic things", () => {
      expect(toSeconds("1 year")).toBe(1 * 365 * 24 * 60 * 60);
      expect(toSeconds("1 years")).toBe(1 * 365 * 24 * 60 * 60);
      expect(toSeconds("1 y")).toBe(1 * 365 * 24 * 60 * 60);

      expect(toSeconds("1 day")).toBe(24 * 60 * 60);
      expect(toSeconds("1 days")).toBe(24 * 60 * 60);
      expect(toSeconds("1 d")).toBe(24 * 60 * 60);

      expect(toSeconds("1 minutes")).toBe(60);
      expect(toSeconds("1 m")).toBe(60);

      // Doesn't support months
      expect(() => toSeconds("1 month")).toThrow();
      expect(() => toSeconds("1 months")).toThrow();
    });
  });

  describe("toMilliSeconds", () => {
    test("should convert basic things", () => {
      expect(toMilliSeconds("1 year")).toBe(1 * 365 * 24 * 60 * 60 * 1000);
      expect(toMilliSeconds("1 years")).toBe(1 * 365 * 24 * 60 * 60 * 1000);
      expect(toMilliSeconds("1 y")).toBe(1 * 365 * 24 * 60 * 60 * 1000);

      expect(toMilliSeconds("1 day")).toBe(24 * 60 * 60 * 1000);
      expect(toMilliSeconds("1 days")).toBe(24 * 60 * 60 * 1000);
      expect(toMilliSeconds("1 d")).toBe(24 * 60 * 60 * 1000);

      expect(toMilliSeconds("1 minutes")).toBe(60 * 1000);
      expect(toMilliSeconds("1 m")).toBe(60 * 1000);

      // Doesn't support months
      expect(() => toMilliSeconds("1 month")).toThrow();
      expect(() => toMilliSeconds("1 months")).toThrow();
    });
  });

  describe("isGreaterThan", () => {
    test("should make basic comparisons", () => {
      expect(isGreaterThan(new Date(), addDays(new Date(), 1))).toBe(false);
      expect(isGreaterThan(addDays(new Date(), 1), new Date())).toBe(true);
    });
  });

  describe("isLessThan", () => {
    test("should make basic comparisons", () => {
      expect(isLessThan(new Date(), addDays(new Date(), 1))).toBe(true);
      expect(isLessThan(addDays(new Date(), 1), new Date())).toBe(false);
    });
  });

  describe("inPast", () => {
    test("should return expected results", () => {
      expect(inPast(new Date())).toBe(false);
      expect(inPast(subDays(new Date(), 1))).toBe(true);
      expect(inPast(addDays(new Date(), 1))).toBe(false);
    });
  });

  describe("inFuture", () => {
    test("should return expected results", () => {
      expect(inFuture(new Date())).toBe(false);
      expect(inFuture(subDays(new Date(), 1))).toBe(false);
      expect(inFuture(addDays(new Date(), 1))).toBe(true);
    });
  });

  describe("endOfDay", () => {
    test("should return expected results", () => {
      expect(endOfDay(new Date("2020-01-01T00:00:00.000Z"))).toEqual(
        new Date("2020-01-01T23:59:59.999Z"),
      );
      expect(endOfDay(new Date("2020-01-01T21:00:00.000Z"))).toEqual(
        new Date("2020-01-01T23:59:59.999Z"),
      );
    });
  });
});
