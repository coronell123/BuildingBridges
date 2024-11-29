'use server';

import { db } from '@/lib/db/drizzle';
import { onboardingData } from '@/lib/db/schema';
import { getUser } from '@/lib/db/queries';

export async function saveOnboardingData(data: Record<string, string>) {
  const user = await getUser();
  if (!user) throw new Error('Not authenticated');

  await db.insert(onboardingData).values({
    userId: user.id,
    challenges: data.challenges,
    goals: data.goals,
    interests: data.interests,
  });

  // Trigger webhook for personalization
  await fetch(process.env.PERSONALIZATION_WEBHOOK_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId: user.id, ...data }),
  });
} 