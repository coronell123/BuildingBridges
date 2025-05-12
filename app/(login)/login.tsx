'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, GraduationCap, Users, AlertCircle } from 'lucide-react';
import { signIn, signUp } from './actions';
import { ActionState } from '@/lib/auth/middleware';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useState, useTransition, useEffect } from 'react';

export function Login({ mode = 'signin' }: { mode?: 'signin' | 'signup' }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');
  const priceId = searchParams.get('priceId');
  const inviteId = searchParams.get('inviteId');
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    mode === 'signin' ? signIn : signUp,
    { error: '' }
  );
  
  // Add startTransition for form actions
  const [isPending, startTransition] = useTransition();
  
  // Add client-side validation state
  const [validationErrors, setValidationErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  // React to successful authentication
  useEffect(() => {
    // If authentication succeeded (no error) and action completed
    if (state && !state.error && state.success && !isPending && !pending) {
      // Navigate to the path returned by the server action, falling back to defaults if not provided
      const redirectPath = state.redirectTo || (mode === 'signin' ? '/dashboard' : '/onboarding');
      
      // Use router for client-side navigation to avoid server action redirect issues
      router.push(redirectPath);
    }
  }, [state, isPending, pending, mode, router]);

  // Client-side validation function
  const validateForm = (formData: FormData): boolean => {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const errors: {email?: string; password?: string} = {};
    let isValid = true;

    // Email validation
    if (!email || email.trim() === '') {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Password validation
    if (!password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (mode === 'signup' && password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  // Enhanced form submission with validation
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    if (validateForm(formData)) {
      // Wrap formAction call in startTransition
      startTransition(() => {
        formAction(formData);
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[url('/abstract.svg')] bg-center bg-no-repeat bg-cover opacity-10" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative"
      >
        <Card className="shadow-lg border-gray-100">
          <CardContent className="pt-8 pb-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                {mode === 'signup' ? 'Create Account' : 'Welcome Back'}
              </h2>
              <p className="mt-2 text-gray-600">
                {mode === 'signup'
                  ? 'Join our community and start your journey'
                  : 'Sign in to access your account'}
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <input type="hidden" name="redirect" value={redirect || ''} />
              <input type="hidden" name="priceId" value={priceId || ''} />
              <input type="hidden" name="inviteId" value={inviteId || ''} />
              
              <div>
                <Label htmlFor="email" className="text-gray-700">Email address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  maxLength={50}
                  className={`mt-1 rounded-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 ${
                    validationErrors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                  }`}
                  placeholder="you@example.com"
                  onChange={() => {
                    if (validationErrors.email) {
                      setValidationErrors(prev => ({ ...prev, email: undefined }));
                    }
                  }}
                />
                {validationErrors.email && (
                  <div className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {validationErrors.email}
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="password" className="text-gray-700">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={
                    mode === 'signin' ? 'current-password' : 'new-password'
                  }
                  required
                  minLength={mode === 'signup' ? 8 : undefined}
                  maxLength={100}
                  className={`mt-1 rounded-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 ${
                    validationErrors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                  }`}
                  placeholder="••••••••"
                  onChange={() => {
                    if (validationErrors.password) {
                      setValidationErrors(prev => ({ ...prev, password: undefined }));
                    }
                  }}
                />
                {validationErrors.password && (
                  <div className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {validationErrors.password}
                  </div>
                )}
                {mode === 'signup' && (
                  <p className="mt-1 text-xs text-gray-500">
                    Password must be at least 8 characters long
                  </p>
                )}
              </div>

              {/* Enhanced role selection for sign-up only */}
              {mode === 'signup' && (
                <div>
                  <Label htmlFor="role" className="text-gray-700 block mb-2">I am joining as</Label>
                  <RadioGroup defaultValue="STUDENT" name="role" className="mt-2 space-y-3">
                    <div className="flex items-center p-3 border rounded-xl transition-all hover:bg-gray-50 cursor-pointer">
                      <RadioGroupItem 
                        value="STUDENT" 
                        id="role-student" 
                        className="mr-3 text-purple-600" 
                      />
                      <div className="flex items-center">
                        <GraduationCap className="mr-2 h-5 w-5 text-purple-500" />
                        <Label htmlFor="role-student" className="cursor-pointer font-medium">
                          <span className="block text-gray-800">Student</span>
                          <span className="block text-xs text-gray-500 mt-0.5">Looking to learn and grow</span>
                        </Label>
                      </div>
                    </div>
                    <div className="flex items-center p-3 border rounded-xl transition-all hover:bg-gray-50 cursor-pointer">
                      <RadioGroupItem 
                        value="MENTOR" 
                        id="role-mentor" 
                        className="mr-3 text-purple-600" 
                      />
                      <div className="flex items-center">
                        <Users className="mr-2 h-5 w-5 text-purple-500" />
                        <Label htmlFor="role-mentor" className="cursor-pointer font-medium">
                          <span className="block text-gray-800">Mentor</span>
                          <span className="block text-xs text-gray-500 mt-0.5">Ready to guide others</span>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              )}

              {state?.error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  {state.error}
                </div>
              )}

              <Button
                type="submit"
                disabled={pending || isPending}
                className="w-full bg-gradient-to-b from-[#8c52ff] to-black text-white rounded-full py-2.5 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                {(pending || isPending) ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    Loading...
                  </>
                ) : mode === 'signin' ? (
                  'Sign in'
                ) : (
                  'Sign up'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link
                href={mode === 'signup' ? '/sign-in' : '/sign-up'}
                className="text-[#8c52ff] hover:text-[#6b3cc9] transition-colors duration-200"
              >
                {mode === 'signup'
                  ? 'Already have an account? Sign in'
                  : "Don't have an account? Sign up"}
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
