# Contact form email — configuration guide

How a message submitted at `/contact` reaches `info@ecran-et.org`.

Notifications are sent by **Netlify Forms**, not by the CMS. There is no SMTP
server, no API key and no DNS record to configure — only one setting to switch
on in the Netlify dashboard.

---

## 1. How it works

```
visitor fills /contact
        │
        ├──► POST to Strapi ────► row saved in the CMS
        │                         (Content Manager → Contact Submissions)
        │
        └──► POST to Netlify ───► Netlify emails info@ecran-et.org
```

Both happen on every submission: the CMS keeps the permanent record, Netlify
delivers the notification.

### Why not send from the CMS

The obvious design — Strapi sends the email over SMTP — was built and deployed,
and it does not work. Strapi runs on Render, and **Render blocks outbound
SMTP**. Connections to `mail.ecran-et.org:465` are silently dropped:

```
21:29:48.491  POST /api/contact-submissions (249 ms) 201
21:29:58.593  [contact] submission #9 saved but notification failed: Connection timeout
```

A *connection* timeout, not an auth error — the TCP connection never opened, so
the mailbox password was never even tested. Cloud providers block ports
25/465/587 by default to stop spammers abusing their IP ranges. No setting,
port or credential fixes it.

Netlify avoids the problem entirely: the browser posts over HTTPS (port 443,
never blocked) and Netlify's own infrastructure sends the mail.

### Files involved

| File | Role |
| --- | --- |
| `frontend/app/pages/contact.vue` | The form, the hidden Netlify form, `notifyNetlify()` |
| `frontend/app/composables/useStrapi.ts` | `submitContact()` — saves to the CMS |
| `netlify.toml` | `pnpm generate` → publish `dist` |

The **hidden form** in `contact.vue` is load-bearing. Netlify discovers forms by
parsing deployed HTML at build time; without that static copy the POST returns
404. Its field names must match what `notifyNetlify()` sends.

---

## 2. Switch it on (one-time)

1. **Netlify → your site → Forms.** If it offers *Enable form detection*, click
   it, then trigger a redeploy so the build is parsed.
2. **Submit the form once** at <https://ecran-et.org/contact>. This is what makes
   the `contact` form appear in the dashboard — it will not exist before a first
   submission.
3. **Netlify → Forms → `contact` → Settings and usage → Form notifications →
   Add notification → Email notification.** Set the recipient to
   `info@ecran-et.org` and save.

Step 3 is the one that actually sends mail. Until it is configured, submissions
are captured and listed in the dashboard but nobody is emailed.

Nothing needs to be set in Render, and no DNS records change.

---

## 3. Verify

- **Netlify → Forms → `contact`** lists the submission.
- `info@ecran-et.org` receives the notification (**check spam on the first one**).
- **Strapi → Content Manager → Contact Submissions** holds the same message.

If the CMS was asleep, the first submit can take up to a minute while the free
instance wakes; the frontend retries and shows the confirmation panel when done.

---

## 4. Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| Form never appears in Netlify → Forms | Form detection off, or no submission yet | Enable detection, redeploy, submit once |
| Submissions listed, but no email | No notification configured | Section 2, step 3 |
| Console: `[contact] Netlify notification failed` with 404 | Hidden form missing from the build | Confirm `data-netlify="true"` is in `dist/contact/index.html` |
| Message in CMS but not in Netlify | Netlify POST failed | Check the browser console; the CMS save is independent |
| Nothing anywhere, error shown | CMS unreachable | Check the Render service is live |
| Emails go to spam | New sending pattern | Mark as not-spam once |

Submissions are capped at **100/month** on Netlify's free tier. Above that,
notifications stop but the CMS keeps recording everything.

---

## 5. Changing things later

- **Recipient:** Netlify → Forms → `contact` → Form notifications. No deploy.
- **More recipients:** add another email notification.
- **On-screen copy:** CMS-managed. Strapi → Pages → `contact` → `sections`, keys
  `successMessage`, `errorMessage`, `unreachableMessage`, `submitLabel`,
  `sendingLabel`, `sendAnotherLabel`. Code falls back to the current wording.

### Leftover Render variables

`SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USERNAME`, `SMTP_PASSWORD`,
`CONTACT_NOTIFY_EMAIL` and `CONTACT_FROM_EMAIL` are still set on the `ecran-cms`
service from the abandoned SMTP attempt. Nothing reads them now. Safe to delete,
and worth deleting `SMTP_PASSWORD` since it is a live mailbox credential.

### If you ever want the CMS to send mail itself

It needs an HTTP-API provider rather than SMTP. A working Resend implementation
is in git history at commit `a448907` and can be restored — it requires a Resend
account and DKIM/SPF records on `ecran-et.org`. If you add Resend's SPF entry,
**merge it into the existing record** rather than adding a second one, or mail
from your cPanel mailboxes will start failing.
