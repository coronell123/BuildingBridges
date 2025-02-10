'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { saveOnboardingData } from '@/lib/actions';
import { useRouter } from 'next/navigation';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  options: { value: string; label: string }[];
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: 'challenges',
    title: 'What challenges have you faced?',
    description: 'Select the primary challenge you want to address:',
    options: [
      { value: 'discrimination', label: 'Discrimination in Education' },
      { value: 'representation', label: 'Lack of Representation' },
      { value: 'resources', label: 'Limited Access to Resources' },
      { value: 'mentorship', label: 'Need for Mentorship' },
    ],
  },
  {
    id: 'goals',
    title: 'What are your goals?',
    description: 'Choose your primary goal:',
    options: [
      { value: 'university', label: 'Prepare for University' },
      { value: 'career', label: 'Career Development' },
      { value: 'skills', label: 'Develop New Skills' },
      { value: 'network', label: 'Build a Support Network' },
    ],
  },
  {
    id: 'interests',
    title: 'Areas of Interest',
    description: 'Select your main area of interest:',
    options: [
      { value: 'psychology', label: 'Psychology' },
      { value: 'social-work', label: 'Social Work' },
      { value: 'education', label: 'Education' },
      { value: 'counseling', label: 'Counseling' },
    ],
  },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const router = useRouter();

  const handleNext = async () => {
    if (currentStep === onboardingSteps.length - 1) {
      // Save answers to database
      await saveOnboardingData(answers);
      // Use Next.js router instead of window.location
      router.push('/dashboard');
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {onboardingSteps.map((_, index) => (
              <div
                key={index}
                className={`h-2 flex-1 mx-1 rounded-full ${
                  index <= currentStep ? 'bg-[#8c52ff]' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-500 text-center">
            Step {currentStep + 1} of {onboardingSteps.length}
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">
                  {onboardingSteps[currentStep].title}
                </h2>
                <p className="text-gray-600 mb-6">
                  {onboardingSteps[currentStep].description}
                </p>

                <RadioGroup
                  value={answers[onboardingSteps[currentStep].id]}
                  onValueChange={(value) =>
                    setAnswers(prev => ({
                      ...prev,
                      [onboardingSteps[currentStep].id]: value
                    }))
                  }
                >
                  <div className="space-y-4">
                    {onboardingSteps[currentStep].options.map((option) => (
                      <div key={option.value} className="flex items-center">
                        <RadioGroupItem value={option.value} id={option.value} />
                        <Label className="ml-2" htmlFor={option.value}>
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>

                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={!answers[onboardingSteps[currentStep].id]}
                  >
                    {currentStep === onboardingSteps.length - 1 ? 'Finish' : 'Next'}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
} 