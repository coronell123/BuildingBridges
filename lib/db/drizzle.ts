import "dotenv/config";
import { PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import dbConfig from "./config";

// Log connection information
dbConfig.logConnectionInfo();

// Set up connection event handlers
let connectCount = 0;
const onnotice = (message: postgres.Notice) => {
  console.log("Postgres notice:", message.message);
};

// Create the Postgres.js client with improved error handling
export const client = postgres(dbConfig.getConnectionString(), {
  ...dbConfig.getConnectionOptions(),
  onnotice, // Log notices
  onparameter: (key: string, value: string) => {
    if (key === 'client_encoding' || key === 'TimeZone') {
      console.log(`Postgres parameter ${key} = ${value}`);
    }
  },
  debug: process.env.DB_DEBUG === 'true', // Enable debugging if DB_DEBUG=true
  transform: {
    undefined: null, // Transform undefined values to NULL
  },
  connection: {
    application_name: 'building-bridges-website' // Add application name for monitoring
  },
});

// Create and export the Drizzle ORM instance
export const db: PostgresJsDatabase<typeof schema> = drizzle(client, { schema });

console.log("Drizzle client initialized successfully");

// Export database schema for migrations and seeds
export { schema };
