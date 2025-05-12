import "dotenv/config";
import { Pool, neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

// Check for DATABASE_URL environment variable
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

// Required for WebSocket connections in Node.js
neonConfig.webSocketConstructor = ws;

// Create a connection pool
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

/**
 * Execute a simple query to test database connectivity
 */
export async function testConnection() {
  const client = await pool.connect();
  
  try {
    // Test connection with a simple query
    console.log("Testing database connection...");
    const result = await client.query('SELECT NOW() as time, current_user as user');
    
    console.log("Connection successful!");
    console.log(`Server time: ${result.rows[0].time}`);
    console.log(`Connected as: ${result.rows[0].user}`);
    
    // Check for user table
    const tableResult = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'users'
      );
    `);
    
    if (tableResult.rows[0].exists) {
      console.log("Users table exists!");
      
      // Get user count
      const userCount = await client.query('SELECT COUNT(*) FROM users');
      console.log(`User count: ${userCount.rows[0].count}`);
      
      // Get role enum values
      const roleEnum = await client.query(`
        SELECT pg_enum.enumlabel
        FROM pg_type 
        JOIN pg_enum ON pg_enum.enumtypid = pg_type.oid
        WHERE pg_type.typname = 'user_role'
        ORDER BY pg_enum.enumsortorder;
      `);
      
      if (roleEnum.rows.length > 0) {
        console.log("User role enum values:", roleEnum.rows.map(r => r.enumlabel));
      } else {
        console.log("User role enum not found");
      }
    } else {
      console.log("Users table does not exist");
    }
    
    return true;
  } catch (error) {
    console.error("Connection test failed:", error);
    return false;
  } finally {
    // Release the client back to the pool
    client.release();
  }
}

/**
 * Run database migrations via SQL
 */
export async function runMigrations() {
  const client = await pool.connect();
  
  try {
    // Begin transaction
    await client.query('BEGIN');
    
    // Check if the user_role enum type exists
    const enumExists = await client.query(`
      SELECT EXISTS (
        SELECT 1 FROM pg_type WHERE typname = 'user_role'
      );
    `);
    
    if (!enumExists.rows[0].exists) {
      console.log("Creating user_role enum type...");
      await client.query(`
        CREATE TYPE user_role AS ENUM ('ADMIN', 'STUDENT', 'MENTOR');
      `);
    } else {
      console.log("user_role enum type already exists");
    }
    
    // Alter users table to add role column if it doesn't exist
    const columnExists = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'users' 
        AND column_name = 'role'
      );
    `);
    
    if (!columnExists.rows[0].exists) {
      console.log("Adding role column to users table...");
      await client.query(`
        ALTER TABLE users ADD COLUMN role user_role NOT NULL DEFAULT 'STUDENT';
      `);
    } else {
      console.log("role column already exists in users table");
    }
    
    // Commit transaction
    await client.query('COMMIT');
    console.log("Migrations completed successfully");
    return true;
  } catch (error) {
    // Rollback transaction on error
    await client.query('ROLLBACK');
    console.error("Migration failed:", error);
    return false;
  } finally {
    // Release the client back to the pool
    client.release();
  }
}

// Export the pool for other modules to use
export { pool }; 