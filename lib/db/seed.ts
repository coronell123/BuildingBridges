import 'dotenv/config';
import { db } from './drizzle';
import * as schema from './schema';
import bcrypt from 'bcryptjs';
import { sql } from 'drizzle-orm';

const { hash } = bcrypt;

async function seed() {
  console.log('🌱 Starting database seed...');

  if (
    !process.env.ADMIN_EMAIL ||
    !process.env.ADMIN_PASSWORD ||
    !process.env.MENTOR_EMAIL ||
    !process.env.MENTOR_PASSWORD ||
    !process.env.STUDENT_EMAIL ||
    !process.env.STUDENT_PASSWORD
  ) {
    throw new Error('Sample user credentials are not fully set in environment variables');
  }

  // Hashing passwords
  const adminPasswordHash = await hash(process.env.ADMIN_PASSWORD!, 10);
  const mentorPasswordHash = await hash(process.env.MENTOR_PASSWORD!, 10);
  const studentPasswordHash = await hash(process.env.STUDENT_PASSWORD!, 10);

  // Upserting users
  // This is a simple delete and insert, suitable for a seed script.
  
  console.log('Clearing existing sample users if they exist...');
  await db.delete(schema.users).where(
      sql`${schema.users.email} IN (${process.env.ADMIN_EMAIL}, ${process.env.MENTOR_EMAIL}, ${process.env.STUDENT_EMAIL})`
  );
  
  console.log('Inserting new sample users...');
  await db.insert(schema.users).values([
    {
      name: 'Admin User',
      email: process.env.ADMIN_EMAIL!,
      passwordHash: adminPasswordHash,
      role: 'ADMIN',
    },
    {
      name: 'Mentor User',
      email: process.env.MENTOR_EMAIL!,
      passwordHash: mentorPasswordHash,
      role: 'MENTOR',
    },
    {
      name: 'Student User',
      email: process.env.STUDENT_EMAIL!,
      passwordHash: studentPasswordHash,
      role: 'STUDENT',
    },
  ]);

  console.log('✅ Database seeded successfully!');
}

seed()
  .catch((error) => {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  })
  .finally(async () => {
    console.log('Seed process finished. Exiting...');
    const { client } = await import('./drizzle');
    await client.end();
    process.exit(0);
  });
