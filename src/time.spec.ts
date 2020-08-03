import { toSeconds, isGreaterThan, isLessThan, inPast, inFuture } from "./time";
import { addDays, subDays } from "date-fns";

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

test("date comparison", () => {
  expect(isGreaterThan(new Date(), addDays(new Date(), 1))).toBe(false);
  expect(isGreaterThan(addDays(new Date(), 1), new Date())).toBe(true);

  expect(isLessThan(new Date(), addDays(new Date(), 1))).toBe(true);
  expect(isLessThan(addDays(new Date(), 1), new Date())).toBe(false);
});

test("inPast returns correctly", () => {
  expect(inPast(new Date())).toBe(false);
  expect(inPast(subDays(new Date(), 1))).toBe(true);
  expect(inPast(addDays(new Date(), 1))).toBe(false);
});

test("inFuture returns correctly", () => {
  expect(inFuture(new Date())).toBe(false);
  expect(inFuture(subDays(new Date(), 1))).toBe(false);
  expect(inFuture(addDays(new Date(), 1))).toBe(true);
});
