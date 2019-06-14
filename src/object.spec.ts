/* eslint-disable @typescript-eslint/no-explicit-any */

import { omitEmpty, keysDeep, filterKeys } from "./object";

test("should only strip null and undefiend", () => {
  const test: Record<string, any> = {
    a: "",
    b: "asdas",
    c: false,
    d: null,
    e: undefined,
    f: 0,
  };
  expect(omitEmpty(test)).toEqual({
    a: "",
    b: "asdas",
    c: false,
    f: 0,
  });
});

test("should return deeply nested fields", () => {
  const obj = {
    prop1: {
      prop2a: {},
      prop2b: {},
      prop2c: {
        prop3a: {},
        prop3b: {},
      },
    },
    prop4: {},
  };
  expect(keysDeep(obj)).toEqual([
    "prop1",
    "prop1.prop2a",
    "prop1.prop2b",
    "prop1.prop2c",
    "prop1.prop2c.prop3a",
    "prop1.prop2c.prop3b",
    "prop4",
  ]);
});

test("should clip prefix from key paths", () => {
  const keys = [
    "prop1",
    "prop1.prop2a",
    "prop1.prop2b",
    "prop1.prop2c",
    "prop1.prop2c.prop3a",
    "prop1.prop2c.prop3b",
    "prop4",
  ];
  expect(filterKeys(keys, "prop1.prop2c.")).toEqual(["prop3a", "prop3b"]);
});
