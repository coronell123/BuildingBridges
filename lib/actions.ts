import { getUser } from './db/queries';
import { db } from './db/drizzle';
import { onboardingData } from './db/schema';

export async function saveOnboardingData(answers: Record<string, string>) {
  const user = await getUser();
  if (!user) throw new Error('Not authenticated');

  // Save to database using the onboardingData schema
  await db.insert(onboardingData).values({
    userId: user.id,
    challenges: answers.challenges,
    goals: answers.goals,
    interests: answers.interests,
  });

  // Send webhook
  const webhookUrl = 'https://hook.eu2.make.com/oqjg49cmcicp92jnp9zbsl09bwhp2hlv';
  
  const webhookData = {
    event: 'onboarding_completed',
    timestamp: new Date().toISOString(),
    user: {
      id: user.id,
      email: user.email,
      fullName: user.name || 'not-specified'
    },
    onboarding: {
      challenges: answers.challenges || 'not-specified',
      goals: answers.goals || 'not-specified',
      interests: answers.interests || 'not-specified',
      aiExperience: 'Beginner - New to AI', // Default value as per requirements
      challengeDetails: getChallengeDetails(answers.challenges)
    },
    context: {
      availableTools: [
        {
          id: 'default-tool',
          name: 'Basic Tool',
          category: 'general'
        }
      ]
    }
  };

  await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(webhookData),
  });

  return { success: true };
}

function getChallengeDetails(challenge: string): string {
  switch (challenge) {
    case 'discrimination':
      return 'Discrimination in Education';
    case 'representation':
      return 'Lack of Representation';
    case 'resources':
      return 'Limited Access to Resources';
    case 'mentorship':
      return 'Need for Mentorship';
    default:
      return 'Other challenges';
  }
} 