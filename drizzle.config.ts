import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required");
}

// Parse the DATABASE_URL
const url = new URL(process.env.DATABASE_URL);

export default defineConfig({
  schema: "./lib/db/schema.ts", // Path to your schema file
  out: "./lib/db/migrations", // Output directory for migrations
  dialect: "postgresql", // PostgreSQL dialect
  // Database connection configuration
  dbCredentials: {
    host: url.hostname,
    port: parseInt(url.port || "5432"),
    user: url.username,
    password: url.password,
    database: url.pathname.substring(1), // Remove leading '/'
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false
  },
  // Prefix all tables with building_bridges_
  tablesFilter: "building_bridges_*",
  // Use public schema
  schemaFilter: ["public"],
  // Strict mode for safety
  strict: true,
  // Enable verbose logging
  verbose: true
});
