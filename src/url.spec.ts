import { hashParams, dehashParams } from "./url";

test("correctly hashes params", () => {
  expect(hashParams({ morning: "string" }).split("-")[0]).toEqual(
    "eyJtb3JuaW5nIjoic3RyaW5nIn0=",
  );
});

test("adds encrypted value", () => {
  expect(hashParams({ morning: "string" }).split("-")[1]).toBeDefined();
});

test("doesn't include #", () => {
  expect(hashParams({ morning: "string" }).indexOf("#")).toBe(-1);
});

test("correctly dehashes", () => {
  expect(
    dehashParams(
      "eyJtb3JuaW5nIjoic3RyaW5nIn0=-JDJiJDA2JGJJODdYbkdpaUZTU2ZwTy5NMHFEcS4wYTc4Y3BkSWg2NDBmTS90VDdtSGRxc3VBSFlBeXl1",
    ),
  ).toEqual({
    morning: "string",
  });
});

test("throws error when contents is modified dehashes", () => {
  expect(() =>
    dehashParams(
      "eyJtb3JuaW5nIjoic3RyaW5nc3MifQ==-JDJiJDA2JGJJODdYbkdpaUZTU2ZwTy5NMHFEcS4wYTc4Y3BkSWg2NDBmTS90VDdtSGRxc3VBSFlBeXl1",
    ),
  ).toThrow();
});
