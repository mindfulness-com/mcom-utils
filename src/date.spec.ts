import { getUtcOffset } from "./date";

test("gets utc timezone offset correctly", () => {
  expect(getUtcOffset(new Date(2019, 5, 22), "Australia/Sydney")).toBe(-600);
});
