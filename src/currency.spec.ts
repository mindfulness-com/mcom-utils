import { format } from "./currency";

test("should never return technical currencies", () => {
  expect(format(12.99, "AUD")).toBe("$12.99"); // not AU$
  expect(format(12.99, "HKD")).toBe("$12.99"); // not HK$
  expect(format(12.99, "USD")).toBe("$12.99"); // not USD$
  expect(format(1299, "JPY")).toBe("¥1,299"); // not JP¥
});

test("should throw a useful error for invalid currency", () => {
  expect(() => format(12.99, "JJJX")).toThrowError(
    expect.objectContaining({ message: "Invalid currency: JJJX" }),
  );
});
