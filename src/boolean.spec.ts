import { toggle } from "./boolean";

test("toggle", () => {
  expect(toggle(true)).toBe(false);
  expect(toggle(false)).toBe(true);
});
