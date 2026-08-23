import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import stylistic from "@stylistic/eslint-plugin";
import globals from "globals";
import importPlugin from "eslint-plugin-import";

export default defineConfig([
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  { ignores: ["**/dist/**", "**/node_modules/**"] },
  {
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.eslint.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      globals: { ...globals.node },
    },
  },
  {
    plugins: {
      "@stylistic": stylistic,
      import: importPlugin,
    },
  },
  {
    settings: {
      "import/resolver": {
        typescript: true,
      },
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx", "**/*.mjs", "**/*.cjs"],
    rules: {
      "no-empty": ["off"],
      quotes: ["error", "double", { avoidEscape: true, allowTemplateLiterals: true }],
      "@stylistic/semi": ["error", "always"],
      "@typescript-eslint/no-require-imports": ["off"],
      "@typescript-eslint/no-empty-function": ["off"],
      "import/no-extraneous-dependencies": ["error", { packageDir: [import.meta.dirname] }],
    },
  },
]);
