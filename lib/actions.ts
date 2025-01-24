'use server';

import { db } from './db/drizzle';
import { onboardingData } from './db/schema';
 /*
export async function saveOnboardingData(answers: Record<string, string>) {
  
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
*/
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

export async function saveMentorData(formData: Record<string, string>) {
  const webhookUrl = 'https://hook.eu2.make.com/oqr26wjs824rejodun6qp5e614y2v2jw';
  
  const webhookData = {
    event: 'mentor_signup',
    timestamp: new Date().toISOString(),
    mentorData: {
      ...formData,
      submissionDate: new Date().toISOString()
    }
  };

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(webhookData),
      cache: 'no-store'
    });

    // Log the response for debugging
    console.log('Webhook response status:', response.status);
    const responseText = await response.text();
    console.log('Webhook response:', responseText);

    // Check if the response is ok (status in the range 200-299)
    if (!response.ok) {
      console.error('Webhook error response:', responseText);
      throw new Error(`Webhook request failed with status ${response.status}`);
    }

    return { success: true };
  } catch (error) {
    console.error('Webhook error:', error);
    // Return error object instead of throwing
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
} 