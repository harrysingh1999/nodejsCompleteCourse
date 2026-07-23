import js from "@eslint/js";
import globals from "globals";

export default [
  {
    ignores: [
      "node_modules/**",
      "public/**",
      "views/**",
      "tailwind.config.js",
      "nodemon.json",
    ],
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.es2022,
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      "max-len": ["error", { code: 150 }],
      indent: ["error", 2, { SwitchCase: 1 }],
      semi: ["error", "always"],
      "no-trailing-spaces": "error",
      "arrow-parens": ["error", "always"],
      "object-curly-spacing": ["error", "always"],
      "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0 }],
      "prefer-const": "error",
      "padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "*", next: "return" },
        { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
        { blankLine: "always", prev: "*", next: "function" },
      ],
    },
  },
];
