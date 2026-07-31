# ECRAN website — content editor's guide

Everything on ecran-et.org is edited here, with no developer involved: news,
vacancies, bids, resources, team members, partners, page text, contact details
and the menu.

This guide assumes no technical background. Read sections 1–4 once, then use the
rest as a reference.

---

## 1. Two rules that explain almost everything

**Rule 1 — nothing appears on the website until you press Publish.**
Saving stores your work privately. Publishing puts it on the public site. A
saved-but-unpublished item is invisible to visitors.

**Rule 2 — the website takes a few minutes to update.**
The public site is a set of pre-built pages, which is why it loads fast. When
you publish, it rebuilds automatically: about 10 seconds before the rebuild
starts, then 2–5 minutes to finish. **Wait 5 minutes and refresh before
concluding something is broken.**

A useful consequence of Rule 2: publishing several changes together triggers one
rebuild, not one each. Do your edits, publish them, then wait once.

---

## 2. Signing in

Go to **https://ecran-cms.onrender.com/admin** and sign in with your email and
password.

> **The first page load can take up to a minute.** The CMS sleeps when unused
> and has to wake up. This is normal — wait, don't refresh repeatedly. Once
> awake it is fast.

Forgotten password: use **Forgot password** on the sign-in screen, or ask
whoever administers the CMS to reset it.

---

## 3. Getting around

The left sidebar has three things you will use:

| Item | What it is |
| --- | --- |
| **Content Manager** | Where all text and content is edited. You will spend ~95% of your time here |
| **Media Library** | All uploaded images and PDFs |
| **Settings** | Administration. Avoid unless you know what you are changing |

Inside **Content Manager**, content is split into two groups:

- **Collection types** — things there are *many* of: posts, resources, team
  members, partners. You add, edit and delete entries.
- **Single types** — things there is exactly *one* of: Site Profile, Global,
  Navigation. You only ever edit them.

---

## 4. Draft and Published

Every entry is either a **draft** or **published**. The status is shown at the
top of the entry.

| Button | What happens |
| --- | --- |
| **Save** | Stores your changes. Not visible to the public |
| **Publish** | Makes it live, and triggers the website rebuild |
| **Unpublish** | Removes it from the public site. The entry is kept |

**Editing something already published:** your edits are saved as a new draft.
The old version stays live until you press **Publish** again. So always finish
with Publish.

To take something down — a filled vacancy, an expired bid — use **Unpublish**
rather than deleting. Unpublishing is reversible; deleting is not.

---

## 5. What controls what

| Part of the website | Where to edit it |
| --- | --- |
| News, vacancies, bids, announcements, media coverage | **Post** |
| Reports, briefs, toolkits (PDF downloads) | **Resource** |
| Impact stories | **Impact Story** |
| Staff and board listings | **Team Member** |
| Member organisations | **Member Organization** |
| Partner logos on the homepage | **Partner** |
| Programmes / our works | **Program** |
| Headings and paragraphs on a specific page | **Page** |
| Address, email, phone, mission, vision, registration no. | **Site Profile** |
| Logo, footer text, social links, default SEO | **Global** |
| The top menu | **Navigation** |
| Messages sent through the contact form | **Contact Submission** (read-only) |

---

## 6. Everyday tasks

### 6.1 Publish a news item, vacancy, bid or announcement

All five live in **Post**, separated by the **Category** field.

1. **Content Manager → Post → Create new entry.**
2. Fill in:

| Field | Notes |
| --- | --- |
| **Title** | Required |
| **Slug** | Click **Generate** beside it. This becomes the web address |
| **Category** | Required — see the table below. **This decides which page it appears on** |
| **Excerpt** | 1–2 sentences. Shown in listings and link previews |
| **Body** | The full text |
| **Publish date** | Controls ordering. Newest first |
| **Featured image** | Optional. See §7 |
| **Attachment** | Optional PDF, e.g. the full bid document |

3. **Save**, then **Publish**.

**Category decides the destination page:**

| Category | Appears on |
| --- | --- |
| `news` | /news/news |
| `vacancy` | /news/vacancies |
| `bid` | /news/bids |
| `announcement` | /news/announcements |
| `media` | /news/media-center |

Extra fields that only matter for some categories:

- **Vacancies:** *Deadline*, *Location*, *Department*, *Employment type*.
- **Bids:** *Deadline*, plus the tender document under *Attachment*.
- **Media coverage:** *External URL* to link out to the original article, and
  *CTA label* for the button wording.

> **When a vacancy or bid closes,** open it and press **Unpublish**. The deadline
> date does not remove it automatically.

### 6.2 Add a downloadable resource

1. **Content Manager → Resource → Create new entry.**
2. **Title**, then **Generate** the slug.
3. **Resource type** — one of: `Annual report`, `Policy brief`, `Publication`,
   `Toolkit`, `Other`.
4. **Topic** — one of: `Child Protection`, `Participation`, `Advocacy`,
   `Capacity Building`. This drives the filter buttons on /resources.
5. **Summary** — a short description. It is shown on the card, so keep it to
   about two lines.
6. **Document** — upload the PDF.
7. **Published on** — the date shown on the card.
8. **Save**, then **Publish**.

### 6.3 Add an impact story

**Content Manager → Impact Story.** Fill in Title, generate the Slug, set
**Location**, write an **Excerpt** (shown on the homepage and the listing) and
the full **Body**. Add a **Cover image** if you have one. Save and Publish.

### 6.4 Team members, member organisations, partners

All three work the same way and all have an **Order** field.

**Order** controls position: 1 appears first, then 2, then 3. Leave gaps
(10, 20, 30) so you can insert someone later without renumbering everyone.

| Type | Fields |
| --- | --- |
| **Team Member** | Name, slug, Role, Bio, Photo, Order |
| **Member Organization** | Name, slug, URL (their website), Logo, Order |
| **Partner** | Name, Website, Logo, Order — appears in the homepage logo strip |

### 6.5 Change wording on a specific page

Page text lives in **Page**, one entry per page. Find the entry by its **Slug**:

| Slug | Page |
| --- | --- |
| `home` | Homepage |
| `who-we-are` | Who We Are |
| `about-us` | About Us |
| `our-team` | Our Team |
| `our-members` | Our Members |
| `our-works` | Our Works |
| `asfp` | ASFP |
| `impact-stories` | Impact Stories |
| `resources` | Resources |
| `contact` | Contact |
| `get-involved` | Get Involved |
| `news-hub` | News landing page |
| `news`, `vacancies`, `bids`, `announcements`, `media-center` | The five news sections |
| `privacy-policy`, `terms-of-service` | Legal pages |

Safe fields to edit:

| Field | What it changes |
| --- | --- |
| **Hero title** | The big heading at the top |
| **Hero text** | The paragraph under it |
| **Body** | The main text area |
| **Hero image** | The banner image |
| **SEO title / description** | Google results and link previews |

> **Never change the Slug of a Page entry.** The website looks each page up by
> its slug; renaming it makes that page fall back to its built-in default text.

### 6.6 The "Sections" field — read before touching

Some pages have a **Sections** field containing text in a technical format
(`{ "key": "value" }`). It holds the smaller labels — button wording, eyebrow
text above headings, card titles.

If you are comfortable, you may change text **between the quotation marks**:

```
"resourcesCtaLabel": "View all resources"
                      ^^^^^^^^^^^^^^^^^^ safe to change
```

Never change anything else — not the names on the left, not the commas, braces
or quotation marks. One missing comma prevents the whole entry from saving.

**Safety net:** if a value is emptied or removed, the website falls back to its
original built-in wording. Nothing breaks visually; the text just reverts.

When in doubt, leave Sections alone and ask a developer.

### 6.7 Organisation details, footer, menu

**Site Profile** (single type) — the facts used across the site:
organisation name, tagline, mission, vision, legal status, registration number,
email, phone, address. Changing the email here updates it on the contact page
and in the footer at once.

**Global** (single type) — logo, favicon, footer tagline, footer link lists,
social media links, and the default SEO title/description used by pages that
have not set their own.

- **Social links:** fill in a platform's URL and its icon appears in the footer;
  leave it empty and it does not. Supported: Facebook, X/Twitter, LinkedIn,
  Instagram, YouTube, Telegram.

**Navigation** (single type) — the top menu. It is in the technical format
described in §6.6. Menu changes are best requested from a developer.

### 6.8 Reading contact form messages

**Content Manager → Contact Submission** lists everything sent through the
contact form: name, email, subject, message.

These are **read-only records** — you cannot reply from here. Reply from your
normal email to the address on the message.

Every submission is recorded here, so **this list is the reliable copy**. A
notification email is also sent to `info@ecran-et.org` once email notifications
are switched on (see `CONTACT-FORM-EMAIL.md`); if that has not been done, or a
notification goes astray, the message is still safely in this list.

---

## 7. Images and files

**Before uploading:**

| | Guidance |
| --- | --- |
| **Format** | JPG for photographs, PNG for logos, PDF for documents |
| **Size** | Keep photos under about 500 KB. Resize before uploading — a 5 MB phone photo makes the page slow |
| **Dimensions** | Around 1600px wide is plenty for a banner |
| **Filename** | Use descriptive names: `annual-report-2025.pdf`, not `doc1.pdf`. The filename can be visible to the public |

**Alternative text.** When you upload, fill in the **Alternative text** field
with a short description of the image ("Children in a classroom in Addis
Ababa"). Screen-reader users depend on it, and it helps search engines. Leave it
blank for purely decorative images.

**Reusing an image:** it stays in the Media Library — pick it from there instead
of uploading a second copy.

> Replacing a file in the Media Library changes it **everywhere** it is used.

---

## 8. Writing well for the website

- **Titles:** clear over clever. They appear in listings, search results and
  social shares out of context.
- **Excerpts:** 1–2 sentences. Do not simply repeat the title.
- **Paste from Word carefully:** it can carry hidden formatting. If the result
  looks wrong, paste as plain text and re-apply formatting in the editor.
- **Links:** check them after publishing.
- **Dates:** set them deliberately — several listings sort by date.

---

## 9. When something looks wrong

| Symptom | Likely cause | What to do |
| --- | --- | --- |
| Change not on the site | Not published, or rebuild still running | Confirm status is **Published**, wait 5 minutes, refresh |
| Still missing after 15 minutes | Rebuild failed | Contact a developer |
| Admin very slow to load | CMS was asleep | Wait up to a minute; normal on first use |
| Cannot save — a field is red | A required field is empty | Required fields are marked; fill it in |
| Cannot save, no obvious reason | Usually a typo in a Sections field | Undo the Sections edit (§6.6) |
| Post on the wrong page | Wrong **Category** | Change the category, publish again |
| Old text came back | A Sections value was emptied | Re-enter the text |
| Item in the wrong position | **Order** values | Lower number = earlier |
| Page reverted to generic text | A Page **Slug** was changed | Restore the original slug (§6.5) |

**Before reporting a problem,** note: what you changed, the entry name, whether
you pressed Publish, and how long ago. It makes diagnosis much faster.

---

## 10. Please do not

- Change a **Slug** on a Page entry (§6.5).
- Delete entries to hide them — **Unpublish** instead, it is reversible.
- Edit anything under **Settings**, especially Users, Roles or Permissions.
- Edit the structure of **Sections** or **Navigation** beyond the text values.
- Upload very large images (§7).

Everything else is safe to experiment with. An unpublished draft is invisible to
the public, editing a published entry leaves the live version untouched until
you press Publish again, and a mistake in a Sections value falls back to the
built-in wording rather than breaking the page.

There is no undo history, though — so for a big rewrite, copy the existing text
into a document first.
