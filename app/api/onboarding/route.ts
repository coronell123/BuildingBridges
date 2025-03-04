import { NextRequest, NextResponse } from 'next/server';
import { getUser } from '@/lib/db/queries';
import { db } from '@/lib/db/drizzle';
import { onboardingData } from '@/lib/db/schema';

export async function POST(request: NextRequest) {
  try {
    // Get the current user
    const user = await getUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not authenticated' },
        { status: 401 }
      );
    }
    
    // Parse the onboarding data from the request
    const data = await request.json();
    
    // Save to the onboardingData table
    await db.insert(onboardingData).values({
      userId: user.id,
      challenges: data.challenges || '',
      goals: data.goals || '',
      interests: data.interests || '',
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in onboarding API:', error);
    return NextResponse.json(
      { error: 'Failed to save onboarding data' },
      { status: 500 }
    );
  }
} 