'use server';

export async function saveOnboardingData(answers: Record<string, string>) {
  try {
    // Note: Server actions cannot access localStorage as it's client-side only
    
    // First, try to save the data to API
    try {
      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(answers),
        // Add this to prevent caching issues
        cache: 'no-store'
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API error response:', errorData);
        // Continue even if API fails - we'll just log the error
      }
    } catch (apiError) {
      // If API call fails, just log it but don't fail the whole process
      console.error('API error during onboarding:', apiError);
      // Continue with the process even if API fails
    }
    
    // Return success with redirectTo property to help with client-side navigation
    return { 
      success: true,
      redirectTo: '/dashboard' // Include the redirect destination
    };
  } catch (error) {
    console.error('Error saving onboarding data:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
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