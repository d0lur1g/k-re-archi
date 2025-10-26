// eslint.config.mjs
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";

const eslintConfig = defineConfig([
  // Configs Next.js (ordre important)
  ...nextVitals,
  ...nextTs,

  // Prettier en dernier pour désactiver les règles conflictuelles
  prettier,

  // Ignores globaux
  globalIgnores([
    // Build artifacts
    ".next/**",
    "out/**",
    "build/**",
    "dist/**",

    // Type definitions
    "next-env.d.ts",
    "*.d.ts",

    // Dependencies
    "node_modules/**",

    // Git hooks
    ".husky/**",

    // Cache
    ".turbo/**",
    "*.tsbuildinfo",
  ]),
]);

export default eslintConfig;
