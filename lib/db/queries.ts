import { desc, and, eq, isNull } from 'drizzle-orm';
import { db } from './drizzle';
import { activityLogs, teamMembers, teams, users } from './schema';

export async function getTeamByStripeCustomerId(customerId: string) {
  const result = await db
    .select()
    .from(teams)
    .where(eq(teams.stripeCustomerId, customerId))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

export async function updateTeamSubscription(
  teamId: number,
  subscriptionData: {
    stripeSubscriptionId: string | null;
    stripeProductId: string | null;
    planName: string | null;
    subscriptionStatus: string;
  }
) {
  await db
    .update(teams)
    .set({
      ...subscriptionData,
      updatedAt: new Date(),
    })
    .where(eq(teams.id, teamId));
}

export async function getTeamForUser(userId: number) {
  const result = await db
    .select({
      id: teams.id,
      name: teams.name,
      createdAt: teams.createdAt,
      updatedAt: teams.updatedAt,
      stripeCustomerId: teams.stripeCustomerId,
      stripeSubscriptionId: teams.stripeSubscriptionId,
      stripeProductId: teams.stripeProductId,
      planName: teams.planName,
      subscriptionStatus: teams.subscriptionStatus,
      teamMembers: teamMembers,
    })
    .from(teams)
    .innerJoin(teamMembers, eq(teams.id, teamMembers.teamId))
    .innerJoin(users, eq(teamMembers.userId, users.id))
    .where(eq(teamMembers.userId, userId))
    .execute();

  if (!result.length) return null;

  const team = result[0];
  const membersWithUsers = await db
    .select({
      id: teamMembers.id,
      role: teamMembers.role,
      userId: teamMembers.userId,
      teamId: teamMembers.teamId,
      joinedAt: teamMembers.joinedAt,
      user: {
        id: users.id,
        name: users.name,
        email: users.email,
      },
    })
    .from(teamMembers)
    .innerJoin(users, eq(teamMembers.userId, users.id))
    .where(eq(teamMembers.teamId, team.id));

  return {
    ...team,
    teamMembers: membersWithUsers,
  };
}
