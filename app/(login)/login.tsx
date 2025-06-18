'use client';

import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, GraduationCap, Users, AlertCircle } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useState, useTransition } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { signUp } from './actions';
import type { ActionState } from '@/lib/auth/middleware';

export function Login({ mode = 'signin' }: { mode?: 'signin' | 'signup' }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/dashboard';
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();
  const [signUpState, setSignUpState] = useState<ActionState>({});

  const handleSignIn = async (formData: FormData) => {
    setLoading(true);
    setError('');
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
      callbackUrl: redirect,
    });

    if (res?.error) {
      setError('Invalid email or password.');
    } else if (res?.url) {
      router.push(res.url);
    }
    setLoading(false);
  };

  const handleSignUp = async (formData: FormData) => {
    startTransition(async () => {
      const initialState: ActionState = { error: undefined };
      const result = await signUp(initialState, formData);
      if (result?.error) {
        setSignUpState({ error: result.error });
      } else {
        // On successful sign-up, redirect to sign-in page to log in
        router.push('/sign-in?signup=success');
      }
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (mode === 'signin') {
      handleSignIn(formData);
    } else {
      handleSignUp(formData);
    }
  };
  
    // In the return statement, the button's disabled state depends on `loading` for signin and `isPending` for signup.
    // The error display should use the local `error` state for signin and `signUpState.error` for signup.

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
              <input type="hidden" name="priceId" value={searchParams.get('priceId') || ''} />
              <input type="hidden" name="inviteId" value={searchParams.get('inviteId') || ''} />
              
              <div>
                <Label htmlFor="email" className="text-gray-700">Email address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  maxLength={50}
                  className={`mt-1 rounded-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 ${
                    error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                  }`}
                  placeholder="you@example.com"
                  onChange={() => {
                    if (error) {
                      setError('');
                    }
                  }}
                />
                {error && (
                  <div className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {error}
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
                    error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                  }`}
                  placeholder="••••••••"
                  onChange={() => {
                    if (error) {
                      setError('');
                    }
                  }}
                />
                {error && (
                  <div className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {error}
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

              {mode === 'signup' && signUpState?.error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  {signUpState.error}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading || isPending}
                className="w-full bg-gradient-to-b from-[#8c52ff] to-black text-white rounded-full py-2.5 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                {(loading || isPending) ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    Loading...
                  </>
                ) : mode === 'signin' ? 'Sign in' : 'Sign up'}
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
