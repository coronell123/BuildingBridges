#!/usr/bin/env tsx

/**
 * Production Database Setup Script
 * Automatically runs migrations and sets up the database for production deployments
 * This script is called during Vercel builds when NODE_ENV=production
 */

import dotenv from 'dotenv';
import path from 'path';
import { Pool } from '@neondatabase/serverless';

// Load environment variables
dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

console.log(`🚀 Database setup started for environment: ${process.env.NODE_ENV}`);

/**
 * Get the appropriate database connection string
 */
function getDatabaseUrl(): string {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }
  
  if (process.env.POSTGRES_URL) {
    return process.env.POSTGRES_URL;
  }
  
  throw new Error('No database connection string found. Set DATABASE_URL or POSTGRES_URL environment variable.');
}

/**
 * Check if we're in a production environment and should run migrations
 */
function shouldRunMigrations(): boolean {
  // Always run migrations in production
  if (isProduction) {
    console.log('✅ Production environment detected - migrations will run');
    return true;
  }
  
  // In development, only run if explicitly requested
  if (isDevelopment && process.env.AUTO_MIGRATE === 'true') {
    console.log('✅ Development environment with AUTO_MIGRATE=true - migrations will run');
    return true;
  }
  
  console.log('ℹ️  Skipping migrations for this environment');
  return false;
}

/**
 * Test database connection
 */
async function testConnection(connectionString: string): Promise<boolean> {
  try {
    console.log('🔗 Testing database connection...');
    
    const pool = new Pool({ connectionString });
    const client = await pool.connect();
    
    const result = await client.query('SELECT NOW() as current_time, version() as postgres_version');
    console.log(`✅ Database connection successful`);
    console.log(`📅 Server time: ${result.rows[0].current_time}`);
    console.log(`🐘 PostgreSQL version: ${result.rows[0].postgres_version.split(' ')[0]}`);
    
    client.release();
    await pool.end();
    
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}

/**
 * Run database migrations using Drizzle
 */
async function runMigrations(): Promise<boolean> {
  try {
    console.log('🔄 Starting database migrations...');
    
    const connectionString = getDatabaseUrl();
    const pool = new Pool({ connectionString });
    
    // Dynamically import migration function
    const { migrate } = await import('drizzle-orm/neon-serverless/migrator');
    const { drizzle } = await import('drizzle-orm/neon-serverless');
    
    // Create drizzle instance
    const db = drizzle(pool);
    
    // Run migrations
    await migrate(db, {
      migrationsFolder: path.join(process.cwd(), 'lib/db/migrations'),
    });
    
    console.log('✅ Database migrations completed successfully');
    await pool.end();
    
    return true;
  } catch (error) {
    console.error('❌ Migration failed:', error);
    return false;
  }
}

/**
 * Check if tables exist in the database
 */
async function checkTablesExist(): Promise<boolean> {
  try {
    const connectionString = getDatabaseUrl();
    const pool = new Pool({ connectionString });
    const client = await pool.connect();
    
    const result = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('users', 'teams', 'team_members')
      ORDER BY table_name;
    `);
    
    const tables = result.rows.map(row => row.table_name);
    console.log(`📊 Found tables: ${tables.join(', ')}`);
    
    const hasRequiredTables = ['users', 'teams', 'team_members'].every(table => 
      tables.includes(table)
    );
    
    client.release();
    await pool.end();
    
    return hasRequiredTables;
  } catch (error) {
    console.error('❌ Error checking tables:', error);
    return false;
  }
}

/**
 * Main setup function
 */
async function setupProductionDatabase() {
  try {
    console.log('🎯 Building Bridges - Production Database Setup');
    console.log('============================================');
    
    // Check environment
    if (!shouldRunMigrations()) {
      console.log('ℹ️  Database setup skipped for this environment');
      process.exit(0);
    }
    
    // Get connection string
    const connectionString = getDatabaseUrl();
    console.log(`🔗 Database: ${new URL(connectionString).hostname}`);
    
    // Test connection
    const connectionSuccess = await testConnection(connectionString);
    if (!connectionSuccess) {
      console.error('❌ Cannot proceed - database connection failed');
      process.exit(1);
    }
    
    // Check if tables already exist
    const tablesExist = await checkTablesExist();
    if (tablesExist) {
      console.log('✅ Database already initialized - skipping migrations');
      console.log('🎉 Production database is ready!');
      process.exit(0);
    }
    
    // Run migrations
    console.log('🔄 Database not initialized - running migrations...');
    const migrationSuccess = await runMigrations();
    
    if (!migrationSuccess) {
      console.error('❌ Database setup failed during migration');
      process.exit(1);
    }
    
    // Verify setup
    const finalCheck = await checkTablesExist();
    if (!finalCheck) {
      console.error('❌ Database setup verification failed');
      process.exit(1);
    }
    
    console.log('🎉 Production database setup completed successfully!');
    console.log('✅ Your application is ready to serve requests');
    
  } catch (error) {
    console.error('❌ Fatal error during database setup:', error);
    process.exit(1);
  }
}

// Run setup if called directly (ES module equivalent)
if (import.meta.url === `file://${process.argv[1]}`) {
  setupProductionDatabase();
}

export { setupProductionDatabase, testConnection, runMigrations }; 