'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { resetPassword } from '@/app/(login)/actions';

type ResetPasswordState = {
  error: string;
  success: string;
};

export default function ResetPasswordPage() {
  const [step, setStep] = useState<'request' | 'reset'>('request');
  const [formState, setFormState] = useState<ResetPasswordState>({
    error: '',
    success: '',
  });
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    const formData = new FormData(e.currentTarget);

    // Call the resetPassword function
    const result = await resetPassword(formData);
    setFormState(result);

    // Handle success or transition between steps
    if (result.success && step === 'request') {
      setStep('reset'); // Transition to "reset password" step
    }

    setIsPending(false);
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 'request' ? (
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Enter your email"
              />
            </div>
          ) : (
            <>
              <div>
                <Label htmlFor="token">Reset Token</Label>
                <Input
                  id="token"
                  name="token"
                  required
                  placeholder="Enter reset token"
                />
              </div>
              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  required
                  minLength={8}
                  placeholder="Enter your new password"
                />
              </div>
            </>
          )}
          <Button type="submit" className="w-full" disabled={isPending}>
            {step === 'request' ? 'Request Reset' : 'Reset Password'}
          </Button>
        </form>
        {formState.error && (
          <p className="text-red-500 text-sm mt-2">{formState.error}</p>
        )}
        {formState.success && (
          <p className="text-green-500 text-sm mt-2">{formState.success}</p>
        )}
      </CardContent>
    </Card>
  );
}