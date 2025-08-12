import js from "@eslint/js";
import jest from "eslint-plugin-jest";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      ecmaVersion: 2021,
      globals: {
        console: "readonly",
        process: "readonly",
      },
    },
  },
  {
    files: ["tests/**/*.js", "**/*.test.js"],
    plugins: { jest },
  extends: ["jest/recommended"],
    languageOptions: {
      ecmaVersion: 2021,
    },
    rules: {},
  },
]);
