import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const CONTACT_RECIPIENT = 'sumerasajid141@gmail.com';
const CONTACT_SENDER = 'onboarding@resend.dev';

export const runtime = 'nodejs';

type ContactRequestBody = {
  name?: unknown;
  firstName?: unknown;
  lastName?: unknown;
  email?: unknown;
  organization?: unknown;
  subject?: unknown;
  language?: unknown;
  message?: unknown;
};

function getString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ContactRequestBody;
    const firstName = getString(body.firstName);
    const lastName = getString(body.lastName);
    const name = getString(body.name) || [firstName, lastName].filter(Boolean).join(' ');
    const email = getString(body.email);
    const organization = getString(body.organization);
    const inquirySubject = getString(body.subject);
    const language = getString(body.language);
    const message = getString(body.message);

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('Missing RESEND_API_KEY for contact form email delivery.');
      return NextResponse.json(
        { success: false, message: 'Email delivery is not configured.' },
        { status: 500 }
      );
    }

    const subject = inquirySubject
      ? `Building Bridges contact: ${inquirySubject}`
      : `New message from ${name} — Building Bridges`;
    const details = [
      `Name: ${name}`,
      `Email: ${email}`,
      organization ? `Organization: ${organization}` : '',
      inquirySubject ? `Subject: ${inquirySubject}` : '',
      language ? `Language: ${language}` : '',
    ].filter(Boolean);
    const text = [
      ...details,
      '',
      'Message:',
      message,
    ].join('\n');
    const html = `
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      ${organization ? `<p><strong>Organization:</strong> ${escapeHtml(organization)}</p>` : ''}
      ${inquirySubject ? `<p><strong>Subject:</strong> ${escapeHtml(inquirySubject)}</p>` : ''}
      ${language ? `<p><strong>Language:</strong> ${escapeHtml(language)}</p>` : ''}
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
    `;

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: CONTACT_SENDER,
      to: CONTACT_RECIPIENT,
      replyTo: email,
      subject,
      text,
      html,
    });

    if (error) {
      console.error('Resend contact email error:', error);
      return NextResponse.json(
        { success: false, message: 'Failed to send message.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending contact email:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send message.' },
      { status: 500 }
    );
  }
}
