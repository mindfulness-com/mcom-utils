import { format } from "./currency";

describe("currency", () => {
  describe("format", () => {
    test("should never return technical currencies", () => {
      expect(format(12.99, "AUD")).toBe("$12.99"); // not AU$
      expect(format(12.99, "HKD")).toBe("$12.99"); // not HK$
      expect(format(12.99, "USD")).toBe("$12.99"); // not USD$
      expect(format(1299, "JPY")).toBe("¥1,299"); // not JP¥
    });

    test("should throw a useful error for invalid currency", () => {
      expect(() => format(12.99, "JJJX")).toThrowErrorMatchingInlineSnapshot(
        '"Invalid currency: JJJX"',
      );
    });
  });
});
