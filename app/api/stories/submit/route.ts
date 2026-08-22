import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { stories } from '@/lib/db/schema';

export const runtime = 'nodejs';

type StorySubmitBody = {
  sessionId?: unknown;
  consent?: unknown;
  story?: {
    title?: unknown;
    summary?: unknown;
    timeline?: unknown;
    quotes?: unknown;
    empowermentMessage?: unknown;
  };
  conversation?: unknown;
};

type ValidStorySubmitBody = {
  sessionId: string;
  consent: boolean;
  story: {
    title: string;
    summary: string;
    timeline: unknown[];
    quotes: unknown[];
    empowermentMessage: string;
  };
  conversation: unknown[];
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function parseBody(body: StorySubmitBody): { ok: true; data: ValidStorySubmitBody } | { ok: false; error: string } {
  if (!isNonEmptyString(body.sessionId)) return { ok: false, error: 'sessionId is required.' };
  if (typeof body.consent !== 'boolean') return { ok: false, error: 'consent must be a boolean.' };
  if (!isRecord(body.story)) return { ok: false, error: 'story is required.' };
  if (!isNonEmptyString(body.story.title)) return { ok: false, error: 'story.title is required.' };
  if (!isNonEmptyString(body.story.summary)) return { ok: false, error: 'story.summary is required.' };
  if (!Array.isArray(body.story.timeline)) return { ok: false, error: 'story.timeline must be an array.' };
  if (!Array.isArray(body.story.quotes)) return { ok: false, error: 'story.quotes must be an array.' };
  if (!isNonEmptyString(body.story.empowermentMessage)) {
    return { ok: false, error: 'story.empowermentMessage is required.' };
  }
  if (!Array.isArray(body.conversation)) return { ok: false, error: 'conversation must be an array.' };

  return {
    ok: true,
    data: {
      sessionId: body.sessionId.trim(),
      consent: body.consent,
      story: {
        title: body.story.title.trim(),
        summary: body.story.summary.trim(),
        timeline: body.story.timeline,
        quotes: body.story.quotes,
        empowermentMessage: body.story.empowermentMessage.trim(),
      },
      conversation: body.conversation,
    },
  };
}

export async function POST(request: NextRequest) {
  const configuredApiKey = process.env.STORIES_API_KEY;
  const incomingApiKey = request.headers.get('x-api-key');

  if (!configuredApiKey || incomingApiKey !== configuredApiKey) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  let body: StorySubmitBody;

  try {
    body = (await request.json()) as StorySubmitBody;
  } catch {
    return NextResponse.json({ success: false, message: 'Request body must be valid JSON.' }, { status: 400 });
  }

  try {
    const parsed = parseBody(body);

    if (!parsed.ok) {
      return NextResponse.json({ success: false, message: parsed.error }, { status: 400 });
    }

    const data = parsed.data;

    const [createdStory] = await db
      .insert(stories)
      .values({
        sessionId: data.sessionId,
        title: data.story.title,
        summary: data.story.summary,
        timeline: data.story.timeline,
        quotes: data.story.quotes,
        empowermentMessage: data.story.empowermentMessage,
        rawConversation: data.conversation,
        consentGiven: data.consent,
        status: 'pending_review',
      })
      .returning({ id: stories.id });

    return NextResponse.json({ success: true, id: createdStory.id });
  } catch (error) {
    console.error('Error submitting story:', error);
    return NextResponse.json({ success: false, message: 'Failed to submit story.' }, { status: 500 });
  }
}

