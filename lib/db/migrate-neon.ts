import dotenv from 'dotenv';
import path from 'path';
import { client, NeonClient } from './neon-client';
import { Pool } from '@neondatabase/serverless';

dotenv.config();

/**
 * Migration script that uses the Neon serverless driver
 * This detects and uses the appropriate migration driver based on the connection type
 */
async function main() {
  console.log('Starting migrations with Neon driver...');
  
  try {
    // Dynamically import the correct migration function based on client type
    if (client instanceof Pool) {
      // This is a Pool instance, use neon-serverless migrator
      const { migrate } = await import('drizzle-orm/neon-serverless/migrator');
      // Use type assertion to avoid TypeScript errors
      // At runtime, this is safe as long as client is properly configured
      await migrate(client as any, {
        migrationsFolder: path.join(process.cwd(), '/lib/db/migrations'),
      });
    } else {
      // This is an HTTP client, use neon-http migrator
      const { migrate } = await import('drizzle-orm/neon-http/migrator');
      // Use type assertion to avoid TypeScript errors
      // At runtime, this is safe as long as client is properly configured
      await migrate(client as any, {
        migrationsFolder: path.join(process.cwd(), '/lib/db/migrations'),
      });
    }
    
    console.log('Migrations completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
  
  // Close connection for WebSocket pool if applicable
  if (client instanceof Pool) {
    await client.end();
    console.log('Connection pool closed');
  }
  
  process.exit(0);
}

main(); 