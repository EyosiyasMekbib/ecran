/**
 * Emails the team whenever the public contact form creates a submission.
 *
 * Sends through the cPanel mailbox that already handles ecran-et.org mail (see
 * the `email` block in config/plugins.ts), so there is no third-party sender
 * and no DNS work — the existing SPF record already authorises that host.
 *
 * Deliberately NOT awaited. afterCreate runs inside the visitor's request, so
 * awaiting a slow or blocked SMTP connection would stall their response; the
 * frontend retries a timed-out submit, which would then duplicate the row.
 * Firing and forgetting keeps the response immediate and the row unique.
 *
 * Mail is best-effort either way: the row is committed before this runs, so a
 * send failure only costs a notification, never the message. Failures land in
 * the Strapi log and the submission is still in the CMS under Contact
 * Submissions.
 *
 * Required env: SMTP_USERNAME, SMTP_PASSWORD (the cPanel mailbox credentials).
 */
export default {
  afterCreate(event: { result: Record<string, any> }) {
    const { name, email, subject, message, id } = event.result;

    const to = process.env.CONTACT_NOTIFY_EMAIL || 'info@ecran-et.org';

    if (!process.env.SMTP_PASSWORD) {
      strapi.log.warn(
        `[contact] submission #${id} saved, but SMTP_PASSWORD is not set — no notification sent`
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

    // The From address stays the authenticated mailbox — sending as the visitor
    // would fail SPF and get filtered. Their address goes in replyTo, so Reply
    // in the mail client answers them directly.
    strapi
      .plugin('email')
      .service('email')
      .send({ to, replyTo: email, subject: subjectLine, text })
      .then(() => {
        strapi.log.info(`[contact] notification sent to ${to} for submission #${id}`);
      })
      .catch((err: unknown) => {
        strapi.log.error(
          `[contact] submission #${id} saved but notification to ${to} failed: ${
            err instanceof Error ? err.message : err
          }`
        );
      });
  },
};
