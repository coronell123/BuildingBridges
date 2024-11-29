'use client';

import { useState } from 'react';
import { useFormState } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { resetPassword } from '@/app/(login)/actions';
import Link from 'next/link';
import { ActionState } from '@/lib/auth/middleware';

interface ResetPasswordState {
  error: string;
  success: string;
}

export default function ResetPasswordPage() {
  const [formState, formAction] = useFormState<ActionState<ResetPasswordState>>(
    async (currentState, formData: FormData) => {
      try {
        return await resetPassword(formData);
      } catch (err: any) {
        return { error: err.message || 'An error occurred', success: '' };
      }
    },
    {
      error: '',
      success: '',
    }
  );

  const [step, setStep] = useState<'request' | 'reset'>('request');
  const [isPending, startTransition] = useState(false);

  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          action={(formData) => {
            startTransition(true);
            formAction(formData);
          }}
          className="space-y-4"
          onSubmit={(e) => {
            if (formState.success) {
              e.preventDefault();
              setStep('reset');
            }
            startTransition(false);
          }}
        >
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