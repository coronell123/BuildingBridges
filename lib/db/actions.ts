'use server';

import { db } from '@/lib/db/drizzle';
import { onboardingData } from '@/lib/db/schema';
import { currentUser } from '@clerk/nextjs/server';

export async function saveOnboardingData(data: Record<string, string>) {
  const user = await currentUser();
  if (!user) throw new Error('Not authenticated');
  // Trigger webhook for personalization
  await fetch(process.env.PERSONALIZATION_WEBHOOK_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId: user.id, ...data }),
  });
} 