/**
 * Common TypeScript type definitions for database clients
 */
import { type NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { type NeonQueryFunction } from '@neondatabase/serverless';
import * as schema from './schema';

// This type covers both HTTP and WebSocket connection types for Neon
export type DrizzleClient = NeonHttpDatabase<typeof schema> | any; 