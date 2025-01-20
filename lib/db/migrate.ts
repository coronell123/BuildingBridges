import dotenv from 'dotenv';
import path from 'path';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { migrationClient, db } from './drizzle';

dotenv.config();

async function main() {
  await migrate(db, {
    migrationsFolder: path.join(process.cwd(), '/lib/db/migrations'),
  });
  console.log(`Migrations complete`);
  await migrationClient.end();
}

main();
