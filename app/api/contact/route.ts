// app/api/contact/route.ts
// Contact form endpoint. Validates input and forwards it to a webhook when
// CONTACT_WEBHOOK_URL is configured (Slack / Discord / Zapier / Make, etc.).
// Without a webhook it accepts and logs the message server-side so the form
// is functional out of the box — wire a provider before relying on delivery.

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  // Honeypot: real users leave this empty; bots tend to fill it.
  company?: unknown;
};

const isNonEmptyString = (v: unknown): v is string =>
  typeof v === 'string' && v.trim().length > 0;

const isEmail = (v: unknown): v is string =>
  typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return Response.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
  }

  // Silently accept honeypot hits so bots get a success without reaching us.
  if (isNonEmptyString(body.company)) {
    return Response.json({ ok: true, delivered: false });
  }

  if (!isNonEmptyString(body.name) || !isEmail(body.email) || !isNonEmptyString(body.message)) {
    return Response.json(
      { ok: false, error: 'Please provide your name, a valid email, and a message.' },
      { status: 422 },
    );
  }

  const submission = {
    name: body.name.trim(),
    email: body.email.trim(),
    message: body.message.trim(),
    receivedAt: new Date().toISOString(),
  };

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `New contact from ${submission.name} <${submission.email}>:\n${submission.message}`,
          submission,
        }),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
      return Response.json({ ok: true, delivered: true });
    } catch (err) {
      console.error('[contact] webhook delivery failed:', err);
      // Fall through to the logged-but-not-delivered path below.
    }
  }

  // No webhook configured (or it failed) — record it so it isn't lost.
  console.log('[contact] new submission:', submission);
  return Response.json({ ok: true, delivered: false });
}
