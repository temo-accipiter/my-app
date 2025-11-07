/**
 * Environment variables configuration with Zod validation
 * This ensures type safety and validates env vars at runtime
 *
 * Usage:
 *   import { env } from "@/config/env"
 *   console.log(env.NEXT_PUBLIC_APP_URL)
 */

import { z } from "zod";

// Define the schema for environment variables
const envSchema = z.object({
  // Node environment
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),

  // Public variables (accessible in browser)
  NEXT_PUBLIC_APP_URL: z
    .string()
    .url()
    .default("http://localhost:3000")
    .describe("Public URL of the application"),

  // Supabase public variables (required for authentication)
  NEXT_PUBLIC_SUPABASE_URL: z
    .string()
    .url()
    .describe("Supabase project URL"),

  NEXT_PUBLIC_SUPABASE_ANON_KEY: z
    .string()
    .min(1)
    .describe("Supabase anonymous/public API key"),

  // Optional public variables
  NEXT_PUBLIC_API_URL: z.string().url().optional().describe("Public API URL"),

  NEXT_PUBLIC_ENABLE_ANALYTICS: z
    .string()
    .transform((val) => val === "true")
    .optional()
    .describe("Enable analytics tracking"),

  NEXT_PUBLIC_ENABLE_DEBUG: z
    .string()
    .transform((val) => val === "true")
    .optional()
    .describe("Enable debug mode"),

  // Server-only variables (never sent to browser)
  // Uncomment and add your server-side env vars as needed:
  /*
  DATABASE_URL: z
    .string()
    .url()
    .describe("Database connection URL"),

  API_SECRET_KEY: z
    .string()
    .min(32)
    .describe("Secret key for API authentication"),

  NEXTAUTH_SECRET: z
    .string()
    .min(32)
    .describe("NextAuth.js secret for session encryption"),

  NEXTAUTH_URL: z
    .string()
    .url()
    .describe("NextAuth.js base URL"),
  */
});

// Type inference from schema
export type Env = z.infer<typeof envSchema>;

/**
 * Validates and parses environment variables
 * Throws an error if validation fails
 */
function validateEnv(): Env {
  try {
    const parsed = envSchema.parse(process.env);
    return parsed;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.issues.map((err) => {
        const path = err.path.join(".");
        return `  - ${path}: ${err.message}`;
      });

      throw new Error(
        `Invalid environment variables:\n${missingVars.join("\n")}\n\n` +
          `Please check your .env.local file and ensure all required variables are set.`
      );
    }
    throw error;
  }
}

/**
 * Validated environment variables
 * Safe to use throughout the application
 */
export const env = validateEnv();

/**
 * Helper to check if we're in production
 */
export const isProduction = env.NODE_ENV === "production";

/**
 * Helper to check if we're in development
 */
export const isDevelopment = env.NODE_ENV === "development";

/**
 * Helper to check if we're in test mode
 */
export const isTest = env.NODE_ENV === "test";
