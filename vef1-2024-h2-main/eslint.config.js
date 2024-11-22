import { defineConfig } from "eslint-define-config";

export default defineConfig({
  languageOptions: {
    globals: {
      window: "readonly",
      process: "readonly",
    },
  },
  rules: {
    "no-console": "warn",
  },
});
