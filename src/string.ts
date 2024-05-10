import { Case } from "change-case-all";

export const camelCase = Case.camel;
export const capitalCase = Case.capital;
export const titleCase = (val: string) => Case.title(Case.no(val));
export const startCase = (val: string) => Case.title(Case.no(val));
export const dotCase = Case.dot;
export const kebabCase = Case.kebab;
export const hyphenCase = Case.kebab;
export const noCase = Case.no;
export const pascalCase = Case.pascal;
export const pathCase = Case.path;
export const sentenceCase = Case.sentence;
export const snakeCase = Case.snake;
