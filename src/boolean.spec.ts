import { toggle } from "./boolean";

describe("boolean", () => {
  describe("toggle", () => {
    test("should toggle a false value to true", () => {
      expect(toggle(false)).toBe(true);
    });

    test("should toggle a true value to false", () => {
      expect(toggle(true)).toBe(false);
    });
  });
});
