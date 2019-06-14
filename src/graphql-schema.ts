import { join } from "path";
import { readFileSync } from "fs";
import { gql } from "apollo-server-express";
import { DocumentNode } from "graphql";
import { compose, isArray } from "lodash/fp";

const resolvePath = (filePath: string | string[]): string =>
  isArray(filePath) ? join(...filePath) : filePath;

export const importSchemaString = (filePath: string): string =>
  readFileSync(filePath, "utf8");

export const importSchema = (filePath: string | string[]): DocumentNode =>
  compose(
    gql,
    importSchemaString,
    resolvePath,
  )(filePath);
