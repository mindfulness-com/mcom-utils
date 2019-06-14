import { GraphQLResolveInfo } from "graphql";
import * as graphqlFields from "graphql-fields";
import { keysDeep, filterKeys } from "./object";

export const selectedFields = (
  info: GraphQLResolveInfo,
  filter?: string,
): string[] => {
  const fields = keysDeep(graphqlFields(info));
  return filter ? filterKeys(fields, `${filter}.`) : fields;
};
