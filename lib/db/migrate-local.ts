import dotenv from 'dotenv';
import path from 'path';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import * as schema from './schema';

dotenv.config({ path: '.env.development' });

/**
 * Migration script for local development
 * Uses a direct connection to localhost PostgreSQL
 */
async function main() {
  console.log('Starting migrations for local development database...');
  
  // Get local database connection string
  const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/building_bridges_dev';
  
  console.log(`Connecting to local Postgres database: ${new URL(connectionString).hostname}`);
  
  try {
    // Create postgres connection for local development
    const client = postgres(connectionString, {
      prepare: false,
      max: 1, // Reduced pool size for migrations
    });
    
    // Create drizzle client
    const db = drizzle(client, { schema });
    
    // Run migrations
    await migrate(db, {
      migrationsFolder: path.join(process.cwd(), '/lib/db/migrations'),
    });
    
    console.log('Local migrations completed successfully');
    client.end();
  } catch (error) {
    console.error('Local migration failed:', error);
    process.exit(1);
  }
  
  process.exit(0);
}

main(); 