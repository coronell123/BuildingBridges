import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings } from './settings';

//import { getTeamForUser, getUser } from '@/lib/db/queries';

export default async function DashboardPage() {
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-in');
  }

  // Demo data
  const stats = [
    {
      title: 'Total Sessions',
      value: '12',
      description: 'Learning sessions completed'
    },
    {
      title: 'Active Goals',
      value: '3',
      description: 'Current learning goals'
    },
    {
      title: 'Achievements',
      value: '8',
      description: 'Badges earned'
    },
    {
      title: 'Community',
      value: '24',
      description: 'Connected peers'
    }
  ];

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Welcome back, {user.firstName || 'there'}!
        </h2>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                'Completed Python Basics workshop',
                'Connected with mentor Sarah',
                'Submitted project milestone',
                'Joined Web Development group'
              ].map((activity, i) => (
                <div key={i} className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{activity}</p>
                    <p className="text-sm text-muted-foreground">
                      {`${i + 1} day${i === 0 ? '' : 's'} ago`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                'Career Mentorship Session - Tomorrow',
                'Tech Workshop - Next Week',
                'Community Meetup - In 2 weeks'
              ].map((event, i) => (
                <div key={i} className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{event}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}


