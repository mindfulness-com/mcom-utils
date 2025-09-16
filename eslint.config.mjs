import typescriptEslint from "@typescript-eslint/eslint-plugin";
import _import from "eslint-plugin-import";
import prettier from "eslint-plugin-prettier";
import { fixupPluginRules } from "@eslint/compat";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  // Ignore generated / irrelevant files
  {
    ignores: ["**/*.d.ts", "**/node_modules", "**/docs", "**/dist"],
  },

  // Base recommended configs
  ...compat.extends(
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier",
  ),
  {
    plugins: {
      "@typescript-eslint": typescriptEslint,
      import: fixupPluginRules(_import),
      prettier,
    },
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: "module",
    },
    settings: {
      // Parsers
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"],
      },
      // Resolvers
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,       // lets ESLint read TS types
          project: "./tsconfig.json", // points to your TS config
        },
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx", ".mjs"],
          moduleDirectory: ["node_modules", "src/"],
          tryExtensions: [".js", ".jsx", ".ts", ".tsx", ".mjs", ".d.ts"],
        },
      },
      // Ignore false positives for Lodash
      "import/ignore": ["lodash", "lodash/fp"],
    },
    rules: {
      "prettier/prettier": "error",
      "import/named": "error",
      "import/no-unresolved": "error",
      "@typescript-eslint/explicit-member-accessibility": "off", // make "error" when ready to fix
      "@typescript-eslint/no-explicit-any": "warn", // make "error" when ready to fix
      "@typescript-eslint/explicit-function-return-type": "off", // make "error" when ready to fix
      "@typescript-eslint/no-var-requires": "warn", // make "error" when ready to fix
      "@typescript-eslint/no-unused-vars": [
        "warn", // leave as "warn", because becomes annoying during dev otherwise
        {
          ignoreRestSiblings: true,
          argsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/ban-ts-comment": "error",
    },
  },

  // JS / mjs files
  {
    files: ["**/*.js", "**/*.mjs"],
    plugins: {
      prettier,
    },
    rules: {
      "@typescript-eslint/no-var-requires": "off",
    },
  },

  // Test files
  {
    files: ["**/*.spec.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];
