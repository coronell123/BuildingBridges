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