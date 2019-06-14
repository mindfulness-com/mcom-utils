jest.mock("graphql-fields", () => jest.fn());

import * as graphqlFields from "graphql-fields";
import { selectedFields } from "./graphql-fields";

test("should return deeply nested fields", () => {
  (graphqlFields as jest.Mock).mockReturnValue({
    prop1: {
      prop2a: {},
      prop2b: {},
      prop2c: {
        prop3a: {},
        prop3b: {},
      },
    },
    prop4: {},
  });
  expect(selectedFields({} as any)).toEqual([
    "prop1",
    "prop1.prop2a",
    "prop1.prop2b",
    "prop1.prop2c",
    "prop1.prop2c.prop3a",
    "prop1.prop2c.prop3b",
    "prop4",
  ]);
});

test("should return deeply nested fields for the prefix location", () => {
  (graphqlFields as jest.Mock).mockReturnValue({
    prop1: {
      prop2a: {},
      prop2b: {},
      prop2c: {
        prop3a: {},
        prop3b: {},
      },
    },
    prop4: {},
  });
  expect(selectedFields({} as any, "prop1.prop2c")).toEqual([
    "prop3a",
    "prop3b",
  ]);
});
