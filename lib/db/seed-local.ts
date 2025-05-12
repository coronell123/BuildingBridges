import dotenv from 'dotenv';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { hashPassword } from '@/lib/auth/session';
import * as schema from './schema';
import { users, teams, teamMembers } from './schema';
import { stripe } from '../payments/stripe';

dotenv.config({ path: '.env.development' });

/**
 * Seed function for local development database
 * Creates test user, team, and stripe products
 */
async function seed() {
  console.log('Starting seed for local development database...');
  
  // Get local database connection string
  const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/building_bridges_dev';
  
  console.log(`Connecting to local Postgres database: ${new URL(connectionString).hostname}`);
  
  try {
    // Create postgres connection for local development
    const client = postgres(connectionString, {
      prepare: false,
      max: 1, // Reduced pool size for seeding
    });
    
    // Create drizzle client
    const db = drizzle(client, { schema });
    
    // Create test user
    console.log('Creating test user...');
    const email = 'test@test.com';
    const password = 'admin123';
    const passwordHash = await hashPassword(password);

    const [user] = await db
      .insert(users)
      .values([
        {
          email: email,
          name: 'Test User',
          passwordHash: passwordHash,
          role: 'ADMIN',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
      ])
      .returning();

    console.log('Initial user created with email:', email);

    // Create test team
    console.log('Creating test team...');
    const [team] = await db
      .insert(teams)
      .values({
        name: 'Test Team',
      })
      .returning();

    await db.insert(teamMembers).values({
      teamId: team.id,
      userId: user.id,
      role: 'owner',
    });

    console.log('Test team created and linked to user');

    // Create stripe products
    await createStripeProducts();
    
    console.log('Local database seeding completed successfully');
    client.end();
  } catch (error) {
    console.error('Local seeding failed:', error);
    process.exit(1);
  }
  
  process.exit(0);
}

/**
 * Create stripe test products
 */
async function createStripeProducts() {
  console.log('Creating Stripe products and prices...');

  try {
    const baseProduct = await stripe.products.create({
      name: 'Base',
      description: 'Base subscription plan',
    });

    await stripe.prices.create({
      product: baseProduct.id,
      unit_amount: 800, // $8 in cents
      currency: 'usd',
      recurring: {
        interval: 'month',
        trial_period_days: 7,
      },
    });

    const plusProduct = await stripe.products.create({
      name: 'Plus',
      description: 'Plus subscription plan',
    });

    await stripe.prices.create({
      product: plusProduct.id,
      unit_amount: 1200, // $12 in cents
      currency: 'usd',
      recurring: {
        interval: 'month',
        trial_period_days: 7,
      },
    });

    console.log('Stripe products and prices created successfully.');
  } catch (error) {
    console.warn('Failed to create Stripe products:', error);
    console.log('Continuing with database seeding...');
  }
}

// Run the seed function
seed(); 