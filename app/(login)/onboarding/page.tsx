'use client';

import { useState, useEffect, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { saveOnboardingData } from '@/lib/actions';

// Define onboarding steps
const onboardingSteps = [
  {
    id: 'careerStage',
    title: 'Welcome to Building Bridges',
    description: 'Let\'s set up your profile to match you with the perfect mentor.',
    question: 'How would you describe your current career stage?',
    options: [
      'Student',
      'Recent graduate',
      'Early career professional',
      'Mid-career professional',
      'Career changer'
    ]
  },
  // ... more steps ...
];

export default function OnboardingPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already onboarded - client-side only
  useEffect(() => {
    // This now runs only on the client
    try {
      const onboardingData = localStorage.getItem('onboardingData');
      if (onboardingData) {
        // Use startTransition for smooth navigation
        startTransition(() => {
          router.push('/dashboard');
        });
      }
    } catch (error) {
      console.error('Error checking onboarding status:', error);
    }
  }, [router]);

  const handleNext = () => {
    if (currentStep === onboardingSteps.length - 1) {
      // Final step - submit all answers
      setIsSubmitting(true);
      setError(null);
      
      // Save current selection first
      const updatedAnswers = {
        ...answers,
        [onboardingSteps[currentStep].id]: selectedOption || ''
      };
      
      // Save to localStorage on client side for future reference
      try {
        localStorage.setItem('onboardingData', JSON.stringify(updatedAnswers));
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
      
      // Call server action
      saveOnboardingData(updatedAnswers)
        .then(result => {
          setIsSubmitting(false);
          
          if (result.success) {
            // If server action completed successfully and has a redirectTo property,
            // navigate to that location using startTransition
            if (result.redirectTo) {
              startTransition(() => {
                router.push(result.redirectTo);
              });
            }
          } else {
            // Handle error case
            setError(result.error || 'An error occurred during onboarding');
          }
        })
        .catch(err => {
          setIsSubmitting(false);
          setError('An unexpected error occurred');
          console.error('Onboarding error:', err);
        });
    } else {
      // Not the final step - proceed to next question
      // Save current selection and move to next step
      if (selectedOption) {
        setAnswers({
          ...answers,
          [onboardingSteps[currentStep].id]: selectedOption
        });
        setCurrentStep(currentStep + 1);
        setSelectedOption(null);
      }
    }
  };

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
  };

  const currentStepData = onboardingSteps[currentStep];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-2">{currentStepData.title}</h2>
          <p className="text-gray-600 mb-6">{currentStepData.description}</p>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">{currentStepData.question}</h3>
            <div className="space-y-2">
              {currentStepData.options.map((option) => (
                <div
                  key={option}
                  className={`p-3 border rounded-md cursor-pointer ${
                    selectedOption === option
                      ? 'border-[#8c52ff] bg-[#f5f0ff]'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleSelectOption(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {error && (
          <div className="mt-4 p-2 bg-red-100 text-red-800 rounded-md">
            {error}
          </div>
        )}
        
        <div className="mt-6 flex justify-between">
          {currentStep > 0 && (
            <Button
              variant="outline"
              onClick={() => setCurrentStep(currentStep - 1)}
              disabled={isSubmitting}
              className="flex items-center"
            >
              Back
            </Button>
          )}
          <Button
            onClick={handleNext}
            disabled={!selectedOption || isSubmitting}
            className={`bg-[#8c52ff] hover:bg-[#7340d3] text-white flex items-center ${
              currentStep === 0 ? 'ml-auto' : ''
            }`}
          >
            {isSubmitting ? 'Submitting...' : 
             currentStep === onboardingSteps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
} 