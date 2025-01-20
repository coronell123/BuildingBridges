import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.POSTGRES_URL) {
  throw new Error('POSTGRES_URL environment variable is not set');
}

// Specific configuration for Neon's serverless database
const connectionString = process.env.POSTGRES_URL;
const queryClient = postgres(connectionString, {
  prepare: false,
  connect_timeout: 30,
  keep_alive: 30,  // Keep alive interval in seconds
  connection: {
    options: `-c statement_timeout=60000`,
  },
  ssl: {
    rejectUnauthorized: false
  },
  idle_timeout: 20,
  max_lifetime: 60 * 30
});

export const db = drizzle(queryClient, { schema });
export const migrationClient = postgres(connectionString);
