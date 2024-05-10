"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.snakeCase = exports.sentenceCase = exports.pathCase = exports.pascalCase = exports.noCase = exports.hyphenCase = exports.kebabCase = exports.dotCase = exports.startCase = exports.titleCase = exports.capitalCase = exports.camelCase = void 0;
const change_case_all_1 = require("change-case-all");
exports.camelCase = change_case_all_1.Case.camel;
exports.capitalCase = change_case_all_1.Case.capital;
const titleCase = (val) => change_case_all_1.Case.title(change_case_all_1.Case.no(val));
exports.titleCase = titleCase;
const startCase = (val) => change_case_all_1.Case.title(change_case_all_1.Case.no(val));
exports.startCase = startCase;
exports.dotCase = change_case_all_1.Case.dot;
exports.kebabCase = change_case_all_1.Case.kebab;
exports.hyphenCase = change_case_all_1.Case.kebab;
exports.noCase = change_case_all_1.Case.no;
exports.pascalCase = change_case_all_1.Case.pascal;
exports.pathCase = change_case_all_1.Case.path;
exports.sentenceCase = change_case_all_1.Case.sentence;
exports.snakeCase = change_case_all_1.Case.snake;
//# sourceMappingURL=string.js.map