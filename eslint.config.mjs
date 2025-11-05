import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettierConfig from "eslint-config-prettier";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // Prettier integration - disable conflicting rules
  prettierConfig,

  // Custom rules for strict TypeScript and best practices
  {
    rules: {
      // TypeScript strict rules
      "@typescript-eslint/no-explicit-any": "error", // Force typing instead of 'any'
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_", // Allow unused vars starting with _
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/explicit-function-return-type": "off", // Type inference is good
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],

      // React best practices
      "react/react-in-jsx-scope": "off", // Not needed in Next.js
      "react/prop-types": "off", // TypeScript handles this
      "react-hooks/rules-of-hooks": "error", // Enforce hooks rules
      "react-hooks/exhaustive-deps": "warn", // Warn about missing deps

      // General code quality
      "no-console": ["warn", { allow: ["warn", "error"] }], // Warn on console.log
      "prefer-const": "error", // Use const when possible
      "no-var": "error", // No var, use let/const
      eqeqeq: ["error", "always"], // Require === instead of ==
      curly: ["error", "all"], // Always use braces

      // Next.js specific
      "@next/next/no-html-link-for-pages": "error",
    },
  },

  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Additional ignores
    "node_modules/**",
    ".turbo/**",
    "coverage/**",
  ]),
]);

export default eslintConfig;
