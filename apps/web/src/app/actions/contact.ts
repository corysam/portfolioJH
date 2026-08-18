'use server';

type ContactState =
  | { status: 'idle' }
  | { status: 'success' }
  | { status: 'error'; error: string };

export const initialContactState: ContactState = { status: 'idle' };

export async function submitContact(_: ContactState, formData: FormData): Promise<ContactState> {
  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const subject = String(formData.get('subject') ?? '').trim();
  const message = String(formData.get('message') ?? '').trim();

  if (!name || !email || !subject || !message) {
    return { status: 'error', error: 'All fields are required.' };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: 'error', error: 'Please provide a valid email address.' };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? 'onboarding@resend.dev';

  if (!apiKey || !to) {
    // Dev mode: log to server console so the form is testable without secrets.
    console.info('[contact-form]', { name, email, subject, message });
    return { status: 'success' };
  }

  let res: Response;
  try {
    res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: email,
        subject: `[Portfolio] ${subject}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      }),
    });
  } catch (err) {
    console.error('[contact-form] resend network error', err);
    return { status: 'error', error: 'Could not send message. Please try again later.' };
  }

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    console.error('[contact-form] resend failed', res.status, text);
    return { status: 'error', error: 'Could not send message. Please try again later.' };
  }

  return { status: 'success' };
}

export type { ContactState };
