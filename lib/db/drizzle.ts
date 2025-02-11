import "dotenv/config";
import { PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

if (!process.env.POSTGRES_URL) {
  throw new Error('POSTGRES_URL environment variable is not set');
}

const connectionString = process.env.POSTGRES_URL;

// Create postgres connection
const client = postgres(connectionString, {
  prepare: false,
  connect_timeout: 30, // increased to 30 seconds
  idle_timeout: 30,
  max: 3, // reduced pool size
  connection: {
    timezone: 'UTC'
  }
});

const drizzleClient = drizzle(client, { schema });

declare global {
  var database: PostgresJsDatabase<typeof schema> | undefined;
}

export const db = global.database || drizzleClient;
export { client }; // Export for migrations
if (process.env.NODE_ENV !== "production") global.database = db;
