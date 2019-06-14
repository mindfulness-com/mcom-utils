import { toSeconds } from "./time";

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
