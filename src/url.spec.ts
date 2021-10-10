import { hashParams, dehashParams } from "./url";

test("correctly hashes params", () => {
  expect(hashParams({ morning: "string" })).toBe(
    "eyJtb3JuaW5nIjoic3RyaW5nIn0=",
  );
});

test("doesn't include #", () => {
  expect(hashParams({ morning: "string" })).toBe(
    "eyJtb3JuaW5nIjoic3RyaW5nIn0=",
  );
});

test("correctly dehashes", () => {
  expect(dehashParams("eyJtb3JuaW5nIjoic3RyaW5nIn0=")).toEqual({
    morning: "string",
  });
});
