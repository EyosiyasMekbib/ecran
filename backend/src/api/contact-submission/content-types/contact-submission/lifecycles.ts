/**
 * Emails the team whenever the public contact form creates a submission.
 *
 * Sends through Resend's HTTP API rather than SMTP: Render restricts outbound
 * SMTP, so a nodemailer/port-587 setup can fail there in ways that are hard to
 * diagnose. A plain POST needs no provider package and no plugin config.
 *
 * The row is always stored first (that is the core create); mail is best-effort
 * on top. If sending fails — bad key, provider outage, unverified domain — we
 * log and swallow, so the visitor still gets a success response and the message
 * is never lost: it is already in the CMS under Contact Submissions.
 *
 * Required env: RESEND_API_KEY. CONTACT_FROM_EMAIL must be an address on a
 * domain verified in Resend; the visitor's address goes in reply_to instead, so
 * hitting Reply in the mail client answers them directly.
 */
const RESEND_ENDPOINT = 'https://api.resend.com/emails';

export default {
  async afterCreate(event: { result: Record<string, any> }) {
    const { name, email, subject, message, id } = event.result;

    const to = process.env.CONTACT_NOTIFY_EMAIL || 'info@ecran-et.org';
    const from = process.env.CONTACT_FROM_EMAIL || 'ECRAN Website <noreply@ecran-et.org>';
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      strapi.log.warn(
        `[contact] submission #${id} saved, but RESEND_API_KEY is not set — no notification sent`
      );
      return;
    }

    const subjectLine = subject
      ? `ECRAN contact form: ${subject}`
      : `ECRAN contact form: new message from ${name}`;

    const text = [
      `Name:    ${name}`,
      `Email:   ${email}`,
      `Subject: ${subject || '(none)'}`,
      '',
      message,
      '',
      `— Submission #${id} via the ecran-et.org contact form.`,
    ].join('\n');

    try {
      const res = await fetch(RESEND_ENDPOINT, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: email,
          subject: subjectLine,
          text,
        }),
      });

      if (!res.ok) {
        // Resend reports rejected sends with a 4xx/5xx plus a JSON body; surface it.
        throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
      }

      strapi.log.info(`[contact] notification sent to ${to} for submission #${id}`);
    } catch (err) {
      // Never fail the request over mail — the submission is already persisted.
      strapi.log.error(
        `[contact] submission #${id} saved but notification to ${to} failed: ${
          err instanceof Error ? err.message : err
        }`
      );
    }
  },
};
