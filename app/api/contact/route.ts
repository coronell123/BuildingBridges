import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const CONTACT_RECIPIENT = 'sumerasajid141@gmail.com';

export const runtime = 'nodejs';

type ContactRequestBody = {
  name?: unknown;
  firstName?: unknown;
  lastName?: unknown;
  email?: unknown;
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
    const message = getString(body.message);

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const smtpPort = Number(process.env.SMTP_PORT || 587);
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const subject = `New message from ${name} — Building Bridges`;
    const text = [
      `Name: ${name}`,
      `Email: ${email}`,
      '',
      'Message:',
      message,
    ].join('\n');
    const html = `
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: CONTACT_RECIPIENT,
      replyTo: email,
      subject,
      text,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending contact email:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send message.' },
      { status: 500 }
    );
  }
}
