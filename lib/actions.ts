export async function saveOnboardingData(answers: Record<string, string>) {
  // Implement your database saving logic here
  // For example, using fetch to call your API endpoint:
  const response = await fetch('/api/onboarding', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(answers),
  });
  
  return response.json();
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