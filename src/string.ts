import * as lodash from "lodash";

export const camelCase = lodash.camelCase;
export const capitalCase = lodash.startCase;
export const startCase = lodash.startCase;
export const dotCase = (val: string) => kebabCase(val).replace(/-/g, ".");
export const kebabCase = lodash.kebabCase;
export const hyphenCase = lodash.kebabCase;
export const noCase = (val: string) =>
  lodash.startCase(val).toLocaleLowerCase();
export const pascalCase = (val: string) => lodash.upperFirst(camelCase(val));
export const pathCase = (val: string) => kebabCase(val).replace(/-/g, "/");
export const sentenceCase = (val: string) =>
  lodash.upperFirst(kebabCase(val).replace(/-/g, " "));
export const snakeCase = lodash.snakeCase;
