'use server';

import { and, desc, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db/drizzle';
import { getUser } from '@/lib/db/queries';
import { stories } from '@/lib/db/schema';

type StoryReviewActionState = {
  type: 'success' | 'error' | null;
  message: string;
};

function formatSubmittedOn(value: Date | string | null) {
  if (!value) return 'Unknown';
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return 'Unknown';
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export async function getPendingStoriesForReview() {
  const rows = await db
    .select({
      id: stories.id,
      sessionId: stories.sessionId,
      title: stories.title,
      summary: stories.summary,
      consentGiven: stories.consentGiven,
      status: stories.status,
      createdAt: stories.createdAt,
    })
    .from(stories)
    .where(eq(stories.status, 'pending_review'))
    .orderBy(desc(stories.createdAt));

  return rows.map((row) => ({
    id: row.id,
    sessionId: row.sessionId,
    title: row.title,
    summary: row.summary,
    consentGiven: row.consentGiven,
    status: row.status,
    submittedOn: formatSubmittedOn(row.createdAt),
  }));
}

export async function reviewStoryAction(
  _previousState: StoryReviewActionState,
  formData: FormData
): Promise<StoryReviewActionState> {
  const user = await getUser();
  if (!user || user.role !== 'ADMIN') {
    return { type: 'error', message: 'Unauthorized. Only admins can review stories.' };
  }

  const storyId = Number(formData.get('storyId'));
  const decision = formData.get('decision');

  if (!Number.isInteger(storyId) || storyId <= 0) {
    return { type: 'error', message: 'Invalid story ID.' };
  }

  const nextStatus = decision === 'approve' ? 'approved' : decision === 'reject' ? 'rejected' : null;
  if (!nextStatus) {
    return { type: 'error', message: 'Invalid review decision.' };
  }

  try {
    const [updatedStory] = await db
      .update(stories)
      .set({ status: nextStatus })
      .where(and(eq(stories.id, storyId), eq(stories.status, 'pending_review')))
      .returning({ id: stories.id, title: stories.title });

    if (!updatedStory) {
      return {
        type: 'error',
        message: 'Story was not found or has already been reviewed.',
      };
    }

    revalidatePath('/portal/admin');
    revalidatePath('/portal/admin/stories/review');

    return {
      type: 'success',
      message: `Story "${updatedStory.title}" was ${nextStatus === 'approved' ? 'approved' : 'rejected'}.`,
    };
  } catch (error) {
    console.error('Error reviewing story:', error);
    return { type: 'error', message: 'Could not update the story review status.' };
  }
}

