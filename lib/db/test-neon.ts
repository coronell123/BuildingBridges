import { testConnection, runMigrations } from './neon-simple';

// Main function that runs both connection test and migrations
async function main() {
  console.log('===== Testing Neon Serverless Database Connection =====');
  
  // First test the connection
  const connectionSuccess = await testConnection();
  
  if (!connectionSuccess) {
    console.error('Connection test failed, aborting migrations');
    process.exit(1);
  }
  
  console.log('\n===== Running Database Migrations =====');
  
  // If connection is successful, run migrations
  const migrationSuccess = await runMigrations();
  
  if (!migrationSuccess) {
    console.error('Migration failed');
    process.exit(1);
  }
  
  console.log('\n===== Database Setup Complete =====');
  process.exit(0);
}

// Run the main function
main().catch(error => {
  console.error('Unexpected error:', error);
  process.exit(1);
}); 