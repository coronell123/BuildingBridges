import "dotenv/config";
import { neon, neonConfig } from '@neondatabase/serverless';
import { Pool } from '@neondatabase/serverless';
import * as schema from "./schema";
import { DrizzleClient } from './types';

// Define unified type for the different Neon client options
export type NeonClient = Pool | ReturnType<typeof neon>;

// Get the standardized connection string using the same function from drizzle.ts
const getConnectionString = () => {
  // Primary connection string
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }
  
  // Fallback connection string
  if (process.env.POSTGRES_URL) {
    return process.env.POSTGRES_URL;
  }
  
  // No valid connection string found
  throw new Error('Database connection string not found. Either DATABASE_URL or POSTGRES_URL must be set.');
};

const connectionString = getConnectionString();
console.log(`Connecting to Neon database (host: ${new URL(connectionString).hostname})`);

// For WebSocket connections in Node.js
let pool: NeonClient;
let db: DrizzleClient;

try {
  // Try to dynamically import 'ws' package for WebSocket connections
  // eslint-disable-next-line
  const ws = require('ws');
  neonConfig.webSocketConstructor = ws;
  pool = new Pool({ connectionString });
  console.log("Using Neon WebSocket pool connection");
  
  // Import the appropriate drizzle connector for serverless
  const { drizzle } = require('drizzle-orm/neon-serverless');
  db = drizzle(pool, { schema });
} catch (e) {
  console.log("WebSocket package not available, using Neon HTTP connection");
  // Fallback to HTTP connections if ws is not available
  pool = neon(connectionString);
  
  // Import the appropriate drizzle connector for HTTP
  const { drizzle } = require('drizzle-orm/neon-http');
  db = drizzle(pool, { schema });
}

// Create the drizzle client with our schema
export { db };

// Export for usage in migrations if needed
export { pool as client }; 