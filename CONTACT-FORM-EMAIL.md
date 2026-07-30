# Contact form email — configuration guide

How the contact form on `/contact` turns into an email in the `info@ecran-et.org`
inbox, and what you have to set up to switch it on.

Only **one** secret is missing: the mailbox password. Everything else is in the
repo already.

---

## 1. How it works

```
visitor fills /contact
        │
        ▼
POST https://ecran-cms.onrender.com/api/contact-submissions
        │
        ├──► row saved in Strapi ──► Content Manager → Contact Submissions
        │                            (this always happens)
        │
        └──► afterCreate lifecycle ──► SMTP to mail.ecran-et.org:465
                                       └──► info@ecran-et.org
```

Files involved:

| File | Role |
| --- | --- |
| `frontend/app/pages/contact.vue` | The form, success panel, error messages |
| `frontend/app/composables/useStrapi.ts` | `submitContact()` — POST, timeout, retry |
| `backend/src/api/contact-submission/.../lifecycles.ts` | Composes and sends the email |
| `backend/config/plugins.ts` | SMTP connection settings |
| `render.yaml` | Declares the environment variables |

Two deliberate design choices worth knowing before you debug anything:

- **The row is saved before the email is attempted.** A mail failure never loses
  a message — it is already in the CMS. Worst case you lose the notification,
  not the enquiry.
- **The email is not awaited.** `afterCreate` runs inside the visitor's HTTP
  request. If SMTP hangs (which is how a blocked port behaves), awaiting it
  would stall their response, the frontend would retry, and you would get
  duplicate rows. So the send is fired and forgotten, with failures logged.

---

## 2. What you need to set

Six variables. Five have values committed in `render.yaml`; only
`SMTP_PASSWORD` is a secret you must paste in yourself.

| Variable | Value | Notes |
| --- | --- | --- |
| `SMTP_HOST` | `mail.ecran-et.org` | cPanel mail server |
| `SMTP_PORT` | `465` | Implicit TLS. 587 and 25 are also open |
| `SMTP_SECURE` | `true` | Must be `true` for port 465 |
| `SMTP_USERNAME` | `info@ecran-et.org` | Full address, not just `info` |
| `SMTP_PASSWORD` | *(the mailbox password)* | **Secret — set in dashboard only** |
| `CONTACT_NOTIFY_EMAIL` | `info@ecran-et.org` | Change this to redirect notifications |
| `CONTACT_FROM_EMAIL` | `info@ecran-et.org` | Must match `SMTP_USERNAME` for SPF |

### Getting the password

In cPanel → **Email Accounts** → find `info@ecran-et.org` → **Manage** →
either read the existing password or **Generate** a new one. If you generate a
new one, anyone using that mailbox in a mail client has to update it too.

### Setting it in Render

Render Dashboard → **ecran-cms** → **Environment** → **Add Environment
Variable** → key `SMTP_PASSWORD`, value the password → **Save Changes**. Saving
triggers a redeploy automatically.

> **Which variables do you actually have to add?**
>
> Depends on how the service was created:
>
> - **Created from the blueprint** (`render.yaml`): the five non-secret values
>   are applied for you; add only `SMTP_PASSWORD`.
> - **Created manually** in the dashboard: `render.yaml` is *ignored entirely*,
>   so add **all six** rows from the table above by hand.
>
> To tell which: if the service has a **Blueprint** section in its settings, it
> is blueprint-managed. When in doubt, add all six — setting a value that
> matches the default is harmless.

No DNS changes are needed. The existing SPF record already authorises this
host:

```
v=spf1 +mx +ip4:91.204.209.22 ~all
```

That is the main reason for using the cPanel mailbox rather than a third-party
sender — those require adding DKIM/SPF records to `ecran-et.org`.

---

## 3. Test it

1. Open <https://ecran-et.org/contact> and submit the form with a real message.
2. You should see the green confirmation panel replace the form. If the CMS was
   asleep, this can take up to a minute on the first submit — that is the free
   instance waking up, and the retry logic covers it.
3. Check the `info@ecran-et.org` inbox. **Check the spam folder too** on the
   first send.
4. Check the Render logs: Dashboard → **ecran-cms** → **Logs**, and filter for
   `[contact]`.

What the log lines mean:

| Log line | Meaning |
| --- | --- |
| `[contact] notification sent to info@ecran-et.org for submission #12` | Working. |
| `[contact] submission #12 saved, but SMTP_PASSWORD is not set` | Variable missing or the redeploy hasn't finished. |
| `[contact] submission #12 saved but notification ... failed: ...` | Reached SMTP and it refused, or the connection timed out. See below. |

The submission always appears in Strapi → **Content Manager** → **Contact
Submissions** regardless, so you can cross-check against what arrived by email.

---

## 4. Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| `SMTP_PASSWORD is not set` | Variable absent, or deploy still running | Add it, wait for the redeploy to finish |
| `Invalid login` / `535` | Wrong password, or username missing the domain | Username must be the full `info@ecran-et.org` |
| `ETIMEDOUT` / `ESOCKET` / `Connection timeout` | **Outbound SMTP blocked by the host** | Not fixable with SMTP settings — see below |
| `self signed certificate` | TLS mismatch on the mail host | Try `SMTP_PORT=587` with `SMTP_SECURE=false` (STARTTLS) |
| `550 relay denied` | Mailbox not permitted to send to that address | Confirm the mailbox is active in cPanel |
| Form shows an error, no row in CMS | CMS unreachable, or public create permission missing | Check the service is live; the permission is granted at boot in `backend/src/index.ts` |
| Form shows success but no email and no `[contact]` log at all | Running an old build | Confirm the deploy includes commit `dff58fa` or later |
| Email arrives in spam | New sending pattern, no DMARC record | Optionally add a DMARC record; mark as not-spam once |

### If outbound SMTP is blocked

This is the one failure mode that configuration cannot solve. Many hosts block
outbound SMTP ports to prevent spam, and it shows up as a **connection
timeout**, not a refusal. Port 465 being open on `mail.ecran-et.org` does not
mean the host will let the connection out.

If the logs show timeouts, the fix is to send over HTTPS instead, via an
HTTP-API provider such as Resend. That implementation already exists in git
history at commit `a448907` and can be restored — it needs a Resend account and
DKIM/SPF records on `ecran-et.org`, and if you add Resend's SPF entry you must
**merge it into the existing record** rather than adding a second one, or mail
from your cPanel mailboxes will start failing.

---

## 5. Changing things later

- **Send to a different address:** change `CONTACT_NOTIFY_EMAIL` in Render. No
  code change, no redeploy beyond the automatic one.
- **Notify several people:** either use a cPanel forwarder on `info@`, or set
  `CONTACT_NOTIFY_EMAIL` to a comma-separated list — nodemailer accepts that.
- **Change the email wording:** edit `lifecycles.ts`.
- **Change the form's on-screen copy:** it is CMS-managed. Strapi → Pages →
  `contact` → `sections`, keys `successMessage`, `errorMessage`, `submitLabel`.
  The code falls back to the current wording when those are empty.

---

## 6. Local testing

```bash
cd backend
SMTP_PASSWORD='the-password' CONTACT_NOTIFY_EMAIL='your@own.address' pnpm develop
```

Then point the frontend at your local CMS and submit the form:

```bash
cd frontend
NUXT_PUBLIC_STRAPI_URL=http://localhost:1337 pnpm dev
```

Send to your own address first rather than `info@`, so tests do not clutter the
team inbox.
