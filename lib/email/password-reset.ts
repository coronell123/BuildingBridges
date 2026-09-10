import 'server-only';

import nodemailer from 'nodemailer';

type PasswordResetEmailInput = {
  to: string;
  resetUrl: string;
};

let passwordResetTransporter: nodemailer.Transporter | null = null;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getTransporter() {
  const requiredSmtpEnv = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS', 'EMAIL_FROM'] as const;
  const missingSmtpEnv = requiredSmtpEnv.filter((key) => !process.env[key]);

  if (missingSmtpEnv.length > 0) {
    throw new Error(`Missing SMTP environment variables: ${missingSmtpEnv.join(', ')}`);
  }

  if (!passwordResetTransporter) {
    const smtpPort = Number(process.env.SMTP_PORT || 587);
    passwordResetTransporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  return passwordResetTransporter;
}

export async function sendPasswordResetEmail({ to, resetUrl }: PasswordResetEmailInput) {
  const transporter = getTransporter();
  const escapedResetUrl = escapeHtml(resetUrl);

  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: 'Reset your Building Bridges password',
    text: [
      'Someone requested a password reset for your Building Bridges account.',
      '',
      'Use the link below to create a new password:',
      resetUrl,
      '',
      'This link expires after one hour.',
      '',
      'If you did not request this, you can ignore this email.',
    ].join('\n'),
    html: `
      <p>Someone requested a password reset for your Building Bridges account.</p>
      <p>
        <a href="${escapedResetUrl}" style="display:inline-block;padding:12px 18px;border-radius:999px;background:#7339E0;color:#ffffff;text-decoration:none;font-weight:700;">
          Reset your password
        </a>
      </p>
      <p>If the button does not work, copy and paste this link into your browser:</p>
      <p><a href="${escapedResetUrl}">${escapedResetUrl}</a></p>
      <p>This link expires after one hour.</p>
      <p>If you did not request this, you can ignore this email.</p>
    `,
  });

  if (info.rejected.length > 0) {
    throw new Error('Password reset email was rejected by the recipient server.');
  }
}

