'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { customerPortalAction } from '@/lib/payments/actions';
import { useUser } from '@clerk/nextjs';

type SubscriptionData = {
  planName: string | null;
  subscriptionStatus: string | null;
};

type SettingsProps = {
  subscriptionData: SubscriptionData;
};

export function Settings({ subscriptionData }: SettingsProps) {
  const { isLoaded } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <section className="flex-1 p-4 lg:p-8">
      <h1 className="text-lg lg:text-2xl font-medium mb-6">Account Settings</h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Subscription</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div className="mb-4 sm:mb-0">
                <p className="font-medium">
                  Current Plan: {subscriptionData.planName || 'Free'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {subscriptionData.subscriptionStatus === 'active'
                    ? 'Billed monthly'
                    : subscriptionData.subscriptionStatus === 'trialing'
                    ? 'Trial period'
                    : 'No active subscription'}
                </p>
              </div>
              <form action={customerPortalAction}>
                <Button type="submit" variant="outline">
                  Manage Subscription
                </Button>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
