import { hashParams, dehashParams } from "./url";

test("correctly hashes params", () => {
  expect(hashParams({ morning: "string" })).toBe("eyK2cs3BIjoi0HGZIn0=");
});

test("doesn't include #", () => {
  expect(hashParams({ morning: "string" })).toBe("eyK2cs3BIjoi0HGZIn0=");
});

test("correctly dehashes", () => {
  expect(dehashParams("eyK2cs3BIjoi0HGZIn0=")).toEqual({ morning: "string" });
});
