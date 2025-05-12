/**
 * Database connection exports
 * 
 * This file is a simple re-export of the standardized drizzle database client
 * to maintain backward compatibility with existing imports.
 * All database connections are now managed in ./drizzle.ts to ensure consistency.
 */

import { db, client as queryClient } from './drizzle';

// Re-export database connection for backwards compatibility
export const migrationClient = queryClient;
export { db }; 