<script setup lang="ts">
import { ref } from 'vue'

const sent = ref(false)
const error = ref(false)
const submitting = ref(false)

// Form state (bound to the inputs via v-model).
const formName = ref('')
const formEmail = ref('')
const formSubject = ref('')
const formMessage = ref('')

const { data: profile } = await useAsyncData('site-profile', () => getSiteProfile())
const { data: page } = await useAsyncData('page-contact', () => getPage('contact'))

await useSeo(page.value)

const email = computed(() => profile.value?.email || 'info@ecran-et.org')
const address = computed(() => profile.value?.address || 'Addis Ababa, Ethiopia')
const registration = computed(() => `${page.value?.sections?.registrationPrefix || 'No. '}${profile.value?.registrationNumber || '7750'}`)

// Editable section labels/headings (page.sections.* with current copy as fallback).
const heroEyebrow = computed(() => page.value?.sections?.heroEyebrow || 'Contact us')
const connectLabel = computed(() => page.value?.sections?.connectLabel || 'Connect')
const getInTouchHeading = computed(() => page.value?.sections?.getInTouchHeading || 'Get in touch')
const inquiryPortalLabel = computed(() => page.value?.sections?.inquiryPortalLabel || 'Inquiry Portal')
const sendMessageHeading = computed(() => page.value?.sections?.sendMessageHeading || 'Send a message')

// Contact detail labels (page.sections.detailLabels.*).
const emailLabel = computed(() => page.value?.sections?.detailLabels?.email || 'Email')
const locationLabel = computed(() => page.value?.sections?.detailLabels?.location || 'Location')
const registrationLabel = computed(() => page.value?.sections?.detailLabels?.registration || 'ACSO Registration')

// Form placeholders (page.sections.form.*).
const namePlaceholder = computed(() => page.value?.sections?.form?.namePlaceholder || 'Your name')
const emailPlaceholder = computed(() => page.value?.sections?.form?.emailPlaceholder || 'Your email address')
const subjectPlaceholder = computed(() => page.value?.sections?.form?.subjectPlaceholder || 'Subject (optional)')
const messagePlaceholder = computed(() => page.value?.sections?.form?.messagePlaceholder || 'How can we help you?')

// Form feedback + submit label.
const successMessage = computed(
  () => page.value?.sections?.successMessage || 'Thank you — your message has been sent. We aim to reply within two business days.'
)
const errorMessage = computed(() => page.value?.sections?.errorMessage || 'Something went wrong. Please try again or email us directly.')
// A cold CMS can take a while to answer, so an unreachable server gets its own
// wording — "try again" is wrong advice when the fix is to wait a moment.
const unreachableMessage = computed(
  () =>
    page.value?.sections?.unreachableMessage ||
    `We couldn't reach the server just now. Please try again in a moment, or email us at ${email.value}.`
)
const submitLabel = computed(() => page.value?.sections?.submitLabel || 'Send message')
const sendingLabel = computed(() => page.value?.sections?.sendingLabel || 'Sending…')
const sendAnotherLabel = computed(() => page.value?.sections?.sendAnotherLabel || 'Send another message')

const errorReason = ref<'invalid' | 'unreachable' | null>(null)
const failureMessage = computed(() => (errorReason.value === 'unreachable' ? unreachableMessage.value : errorMessage.value))

/**
 * Posts the same message to Netlify Forms, which emails the team.
 *
 * The CMS cannot send the notification itself: it runs on Render, which blocks
 * outbound SMTP, so connections to the mail server time out. Netlify sends over
 * its own infrastructure, so nothing has to leave Render on a mail port.
 *
 * Netlify discovers forms by parsing deployed HTML, which is why the hidden
 * `contact` form below has to exist in the built page — this fetch alone would
 * 404. Failures are swallowed: the submission is already saved in the CMS, and
 * a missed notification must not show the visitor an error.
 */
async function notifyNetlify(payload: Record<string, string>) {
  try {
    await $fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ 'form-name': 'contact', 'bot-field': '', ...payload }).toString()
    })
  } catch (err) {
    console.error('[contact] Netlify notification failed', err)
  }
}

async function submitForm() {
  error.value = false
  errorReason.value = null
  submitting.value = true
  const payload = {
    name: formName.value,
    email: formEmail.value,
    subject: formSubject.value,
    message: formMessage.value
  }
  const result = await submitContact(payload)
  if (result.ok) await notifyNetlify(payload)
  submitting.value = false
  if (result.ok) {
    // Clear the fields so a stray second submit can't duplicate the message.
    formName.value = ''
    formEmail.value = ''
    formSubject.value = ''
    formMessage.value = ''
    sent.value = true
  } else {
    error.value = true
    errorReason.value = result.reason ?? 'invalid'
  }
}

function resetForm() {
  sent.value = false
  error.value = false
  errorReason.value = null
}
</script>

<template>
  <PageHero
    class="contact-hero"
    :eyebrow="heroEyebrow"
    :title="page?.heroTitle || 'Reach ECRAN for inquiries, partnership conversations, and resource coordination.'"
    :text="page?.heroText || 'Have a question or want to get involved? Use the form below to get in touch with our team or find our office location details.'"
  />

  <main class="contact-page-layout">
    <section class="contact-grid">
      <div class="contact-info">
        <span class="section-label">{{ connectLabel }}</span>
        <h2 class="contact-heading">{{ getInTouchHeading }}</h2>
        <p class="contact-desc">
          {{ page?.body || 'Our team is available to discuss collaborations, policy questions, and membership processes. We aim to respond to all inquiries within two business days.' }}
        </p>

        <div class="contact-details-list">
          <div class="detail-row">
            <span class="detail-label">{{ emailLabel }}</span>
            <a :href="`mailto:${email}`" class="detail-value">{{ email }}</a>
          </div>
          <div class="detail-row">
            <span class="detail-label">{{ locationLabel }}</span>
            <span class="detail-value">{{ address }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">{{ registrationLabel }}</span>
            <span class="detail-value">{{ registration }}</span>
          </div>
        </div>
      </div>

      <div class="contact-form-container">
        <span class="section-label">{{ inquiryPortalLabel }}</span>
        <h2 class="contact-heading">{{ sendMessageHeading }}</h2>

        <!-- Netlify registers a form by parsing the deployed HTML at build time, so
             this static copy must exist for the real (JS) submit to be accepted —
             without it the POST 404s. Never shown; the visible form below is the
             one people use. Field names must match what notifyNetlify sends.
             Kept outside the v-if/v-else pair below, which must stay adjacent. -->
        <form name="contact" data-netlify="true" netlify-honeypot="bot-field" hidden>
          <input type="text" name="name" />
          <input type="email" name="email" />
          <input type="text" name="subject" />
          <textarea name="message"></textarea>
          <input type="text" name="bot-field" />
        </form>

        <!-- On success the form is replaced by the confirmation, so the outcome is
             unmissable and the visitor cannot resubmit the same message. -->
        <div v-if="sent" class="form-confirmation" role="status" aria-live="polite">
          <svg viewBox="0 0 24 24" width="32" height="32" aria-hidden="true">
            <path
              d="M20 6 9 17l-5-5"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="none"
            />
          </svg>
          <p class="success-message">{{ successMessage }}</p>
          <button type="button" class="button secondary" @click="resetForm">{{ sendAnotherLabel }}</button>
        </div>

        <form v-else class="contact-modern-form" @submit.prevent="submitForm">
          <div class="form-field">
            <input type="text" id="name" v-model="formName" :placeholder="namePlaceholder" required />
          </div>
          <div class="form-field">
            <input type="email" id="email" v-model="formEmail" :placeholder="emailPlaceholder" required />
          </div>
          <div class="form-field">
            <input type="text" id="subject" v-model="formSubject" :placeholder="subjectPlaceholder" />
          </div>
          <div class="form-field">
            <textarea id="message" v-model="formMessage" rows="5" :placeholder="messagePlaceholder" required></textarea>
          </div>
          <p v-if="error" class="error-message" role="alert">{{ failureMessage }}</p>
          <button class="button primary submit-button" type="submit" :disabled="submitting">
            {{ submitting ? sendingLabel : submitLabel }}
          </button>
        </form>
      </div>
    </section>
  </main>
</template>
