import { join } from "path";
import { gql } from "apollo-server-express";

import { importSchema } from "./graphql-schema";

const expected = gql`
  type Potato {
    oishii: Boolean
  }
`;

test("should import the schema", () => {
  expect(importSchema(join(__dirname, "./test-schema.spec.gql"))).toEqual(
    expected,
  );
});

test("should import the schema with relative paths", () => {
  expect(importSchema([__dirname, "./test-schema.spec.gql"])).toEqual(expected);
});
