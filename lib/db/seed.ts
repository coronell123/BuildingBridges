import { stripe } from '../payments/stripe';
import { db } from './drizzle';
import { users, teams, teamMembers, onboardingData } from './schema';
import { hashPassword } from '@/lib/auth/session';

async function createStripeProducts() {
  console.log('Creating Stripe products and prices...');

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
}

async function seed() {
  console.log('🌱 Starting Building Bridges database seeding...');

  // Create test users with different roles
  const testUsers = [
    {
      email: 'admin@buildingbridges.de',
      name: 'Dr. Sarah Weber',
      password: 'admin123',
      role: 'ADMIN' as const,
    },
    {
      email: 'student1@buildingbridges.de',
      name: 'Amira Hassan',
      password: 'student123',
      role: 'STUDENT' as const,
    },
    {
      email: 'student2@buildingbridges.de',
      name: 'Leyla Özkan',
      password: 'student123',
      role: 'STUDENT' as const,
    },
    {
      email: 'mentor1@buildingbridges.de',
      name: 'Dr. Fatima Al-Rashid',
      password: 'mentor123',
      role: 'MENTOR' as const,
    },
    {
      email: 'mentor2@buildingbridges.de',
      name: 'Prof. Dr. Priya Sharma',
      password: 'mentor123',
      role: 'MENTOR' as const,
    },
  ];

  const createdUsers = [];

  for (const userData of testUsers) {
    const passwordHash = await hashPassword(userData.password);
    
    const [user] = await db
      .insert(users)
      .values({
        email: userData.email,
        name: userData.name,
        passwordHash: passwordHash,
        role: userData.role,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      })
      .returning();

    createdUsers.push(user);
    console.log(`✅ Created ${userData.role.toLowerCase()}: ${userData.name} (${userData.email})`);
  }

  // Create Building Bridges main team
  const [team] = await db
    .insert(teams)
    .values({
      name: 'Building Bridges Projekt',
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();

  console.log('✅ Created main team: Building Bridges Projekt');

  // Add all users to the main team
  for (const user of createdUsers) {
    await db.insert(teamMembers).values({
      teamId: team.id,
      userId: user.id,
      role: user.role === 'ADMIN' ? 'owner' : user.role.toLowerCase(),
      joinedAt: new Date(),
    });
  }

  console.log('✅ Added all users to the main team');

  // Add sample onboarding data for students
  const studentUsers = createdUsers.filter(user => user.role === 'STUDENT');
  
  for (const student of studentUsers) {
    await db.insert(onboardingData).values({
      userId: student.id,
      challenges: student.name === 'Amira Hassan' 
        ? 'Übergang von der Schule zur Universität, Studienfinanzierung, fehlende Vorbilder in der Psychologie'
        : 'Sprachbarrieren im akademischen Kontext, Vereinbarkeit von Familie und Studium, Selbstzweifel',
      goals: student.name === 'Amira Hassan'
        ? 'Psychologie-Studium erfolgreich abschließen, später als Therapeutin arbeiten, andere junge Frauen unterstützen'
        : 'Master in Sozialer Arbeit, Promotion anstreben, Forschung zu Migration und Integration',
      interests: student.name === 'Amira Hassan'
        ? 'Klinische Psychologie, Traumatherapie, interkulturelle Beratung, Peer-Support'
        : 'Soziale Gerechtigkeit, Bildungsförderung, Community-Arbeit, Diversity & Inclusion',
      createdAt: new Date(),
    });
  }

  console.log('✅ Added onboarding data for students');

  // Create Stripe products if needed
  await createStripeProducts();

  console.log('🎉 Building Bridges database seeding completed successfully!');
  console.log('\n📋 Test Account Summary:');
  console.log('┌─────────────────────────────────────────────────────────────┐');
  console.log('│                    Building Bridges Test Accounts           │');
  console.log('├─────────────────────────────────────────────────────────────┤');
  console.log('│ Admin:                                                      │');
  console.log('│   Email: admin@buildingbridges.de                          │');
  console.log('│   Password: admin123                                        │');
  console.log('│   Name: Dr. Sarah Weber                                     │');
  console.log('├─────────────────────────────────────────────────────────────┤');
  console.log('│ Students:                                                   │');
  console.log('│   Email: student1@buildingbridges.de                       │');
  console.log('│   Password: student123                                      │');
  console.log('│   Name: Amira Hassan                                        │');
  console.log('│                                                             │');
  console.log('│   Email: student2@buildingbridges.de                       │');
  console.log('│   Password: student123                                      │');
  console.log('│   Name: Leyla Özkan                                         │');
  console.log('├─────────────────────────────────────────────────────────────┤');
  console.log('│ Mentors:                                                    │');
  console.log('│   Email: mentor1@buildingbridges.de                        │');
  console.log('│   Password: mentor123                                       │');
  console.log('│   Name: Dr. Fatima Al-Rashid                               │');
  console.log('│                                                             │');
  console.log('│   Email: mentor2@buildingbridges.de                        │');
  console.log('│   Password: mentor123                                       │');
  console.log('│   Name: Prof. Dr. Priya Sharma                             │');
  console.log('└─────────────────────────────────────────────────────────────┘');
}

seed()
  .catch((error) => {
    console.error('❌ Seed process failed:', error);
    process.exit(1);
  })
  .finally(() => {
    console.log('\n✨ Seed process finished. Exiting...');
    process.exit(0);
  });
