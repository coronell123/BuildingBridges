import "dotenv/config";

/**
 * Centralized database configuration
 * Manages connection strings, timeouts, and pools across different environments
 */

// Export database connection configuration
export const dbConfig = {
  /**
   * Get the appropriate connection string for the current environment
   * Follows a priority order of environment variables
   */
  getConnectionString(): string {
    // Local database connection string (for local development)
    const localDbUrl = 'postgresql://postgres:postgres@localhost:5432/building_bridges_dev';

    // Explicit environment URLs should always win, including during local dev.
    const rawUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;
    if (rawUrl) {
      try {
        const url = new URL(rawUrl);
        const isLocalHost = ['localhost', '127.0.0.1', '::1'].includes(url.hostname);
        if (!isLocalHost && !url.searchParams.has('sslmode')) {
          url.searchParams.set('sslmode', 'require');
        }
        return url.toString();
      } catch {
        // If URL parsing fails, fall back to raw value
        return rawUrl;
      }
    }

    if (process.env.LOCAL_DATABASE_URL) {
      return process.env.LOCAL_DATABASE_URL;
    }
    
    // If no valid connection string is found, fall back to local development
    console.warn('No database connection string found in environment. Using local development database.');
    return localDbUrl;
  },
  
  /**
   * Get connection options for postgres client
   */
  getConnectionOptions() {
    const connectionString = this.getConnectionString();
    let isRemoteDatabase = process.env.USE_CLOUD_DB === 'true';

    try {
      const url = new URL(connectionString);
      isRemoteDatabase = !['localhost', '127.0.0.1', '::1'].includes(url.hostname);
    } catch {
      isRemoteDatabase = process.env.NODE_ENV !== 'development';
    }

    return {
      max: process.env.DB_POOL_SIZE ? parseInt(process.env.DB_POOL_SIZE, 10) : 10,
      prepare: true, // Enables prepared statements for better security
      idle_timeout: process.env.DB_IDLE_TIMEOUT ? parseInt(process.env.DB_IDLE_TIMEOUT, 10) : 30, // seconds
      connect_timeout: process.env.DB_CONNECT_TIMEOUT ? parseInt(process.env.DB_CONNECT_TIMEOUT, 10) : 30, // seconds
      // postgres.js accepts ssl: 'require' to enforce TLS
      ...(isRemoteDatabase ? { ssl: 'require' as const } : {}),
    };
  },
  
  /**
   * Get database schema for migrations and seeds
   */
  getSchema() {
    return process.env.DB_SCHEMA || 'public';
  },
  
  /**
   * Log the current database connection information
   */
  logConnectionInfo() {
    const connectionString = this.getConnectionString();
    const url = new URL(connectionString);
    const host = url.hostname;
    const database = url.pathname.replace('/', '');
    
    console.log(`Connecting to database: ${host}/${database}`);
  }
};

// Export a singleton instance
export default dbConfig; 