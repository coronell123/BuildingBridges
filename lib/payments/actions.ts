'use server';

import { redirect } from 'next/navigation';
import { createCheckoutSession, createCustomerPortalSession } from './stripe';
import { auth } from '@clerk/nextjs/server';

export async function checkoutAction(formData: FormData) {
  const { userId, redirectToSignIn } = await auth()
  if (!userId) return redirectToSignIn();

  const priceId = formData.get('priceId') as string;
  if (!priceId) throw new Error('No price ID provided');

  await createCheckoutSession({ 
    userId,
    priceId 
  });
}

export async function customerPortalAction() {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  const portalSession = await createCustomerPortalSession(userId);
  redirect(portalSession.url);
}
