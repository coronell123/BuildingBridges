import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Settings,
  LogOut,
  UserPlus,
  Lock,
  UserCog,
  AlertCircle,
  UserMinus,
  Mail,
  CheckCircle,
  type LucideIcon,
} from 'lucide-react';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db/drizzle';
import { activityLogs, teamMembers, users } from '@/lib/db/schema';
import { desc, eq, and } from 'drizzle-orm';

const iconMap: Record<string, LucideIcon> = {
  'SIGN_UP': UserPlus,
  'SIGN_IN': UserCog,
  'SIGN_OUT': LogOut,
  'UPDATE_PASSWORD': Lock,
  'DELETE_ACCOUNT': UserMinus,
  'UPDATE_ACCOUNT': Settings,
  'CREATE_TEAM': UserPlus,
  'REMOVE_TEAM_MEMBER': UserMinus,
  'INVITE_TEAM_MEMBER': Mail,
  'ACCEPT_INVITATION': CheckCircle,
};

function getRelativeTime(date: Date) {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600)
    return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800)
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  return date.toLocaleDateString();
}

function formatAction(action: string): string {
  switch (action) {
    case 'SIGN_UP':
      return 'You signed up';
    case 'SIGN_IN':
      return 'You signed in';
    case 'SIGN_OUT':
      return 'You signed out';
    case 'UPDATE_PASSWORD':
      return 'You changed your password';
    case 'DELETE_ACCOUNT':
      return 'You deleted your account';
    case 'UPDATE_ACCOUNT':
      return 'You updated your account';
    case 'CREATE_TEAM':
      return 'You created a new team';
    case 'REMOVE_TEAM_MEMBER':
      return 'You removed a team member';
    case 'INVITE_TEAM_MEMBER':
      return 'You invited a team member';
    case 'ACCEPT_INVITATION':
      return 'You accepted an invitation';
    default:
      return 'Unknown action occurred';
  }
}

export default async function ActivityPage() {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, userId))
    .limit(1);

  if (!user[0]) {
    return <div>User not found</div>;
  }

  const userTeam = await db
    .select({
      teamId: teamMembers.teamId,
    })
    .from(teamMembers)
    .where(eq(teamMembers.userId, user[0].id))
    .limit(1);

  if (!userTeam[0]) {
    return <div>No team found</div>;
  }

  const logs = await db
    .select({
      id: activityLogs.id,
      action: activityLogs.action,
      timestamp: activityLogs.timestamp,
      ipAddress: activityLogs.ipAddress,
    })
    .from(activityLogs)
    .where(and(
      eq(activityLogs.userId, userId),
      eq(activityLogs.teamId, userTeam[0].teamId)
    ))
    .orderBy(desc(activityLogs.timestamp))
    .limit(50);

  return (
    <section className="flex-1 p-4 lg:p-8">
      <h1 className="text-lg lg:text-2xl font-medium text-gray-900 mb-6">
        Activity Log
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {logs.length > 0 ? (
            <ul className="space-y-4">
              {logs.map((log) => {
                const Icon = iconMap[log.action] || Settings;
                const formattedAction = formatAction(log.action);

                return (
                  <li key={log.id} className="flex items-center space-x-4">
                    <div className="bg-orange-100 rounded-full p-2">
                      <Icon className="w-5 h-5 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {formattedAction}
                        {log.ipAddress && ` from IP ${log.ipAddress}`}
                      </p>
                      <p className="text-xs text-gray-500">
                        {getRelativeTime(new Date(log.timestamp))}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-12">
              <AlertCircle className="h-12 w-12 text-orange-500 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No activity yet
              </h3>
              <p className="text-sm text-gray-500 max-w-sm">
                When you perform actions like signing in or updating your
                account, they'll appear here.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
