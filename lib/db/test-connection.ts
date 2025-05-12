import dotenv from 'dotenv';
import { db } from './neon-client';
import { users, User } from './schema';
import { DrizzleClient } from './types';

dotenv.config();

/**
 * Simple script to test database connectivity using the Neon serverless driver
 * over HTTP instead of TCP connections.
 * 
 * This is especially useful when IP restrictions prevent direct TCP connections.
 */
async function main() {
  console.log('Testing database connection with Neon serverless driver...');
  
  try {
    // Run a simple query to check connectivity
    const userList = await db.select().from(users).limit(5);
    console.log('Connection successful!');
    console.log(`Retrieved ${userList.length} users from database`);
    
    if (userList.length > 0) {
      console.log('First few users:', userList.map((u: User) => ({ id: u.id, email: u.email, role: u.role })));
    } else {
      console.log('No users found in the database');
    }
    
    console.log('Database connection test completed successfully');
  } catch (error) {
    console.error('Connection test failed:', error);
    process.exit(1);
  }
  
  process.exit(0);
}

main(); 