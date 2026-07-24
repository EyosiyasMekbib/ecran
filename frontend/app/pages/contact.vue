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
const registration = computed(() => `No. ${profile.value?.registrationNumber || '7750'}`)

// Editable section labels/headings (page.sections.* with current copy as fallback).
const connectLabel = computed(() => page.value?.sections?.connectLabel || 'Connect')
const getInTouchHeading = computed(() => page.value?.sections?.getInTouchHeading || 'Get in touch')
const inquiryPortalLabel = computed(() => page.value?.sections?.inquiryPortalLabel || 'Inquiry Portal')
const sendMessageHeading = computed(() => page.value?.sections?.sendMessageHeading || 'Send a message')

async function submitForm() {
  error.value = false
  submitting.value = true
  const ok = await submitContact({
    name: formName.value,
    email: formEmail.value,
    subject: formSubject.value,
    message: formMessage.value
  })
  submitting.value = false
  if (ok) {
    sent.value = true
  } else {
    error.value = true
  }
}
</script>

<template>
  <PageHero
    class="contact-hero"
    eyebrow="Contact us"
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
            <span class="detail-label">Email</span>
            <a :href="`mailto:${email}`" class="detail-value">{{ email }}</a>
          </div>
          <div class="detail-row">
            <span class="detail-label">Location</span>
            <span class="detail-value">{{ address }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">ACSO Registration</span>
            <span class="detail-value">{{ registration }}</span>
          </div>
        </div>
      </div>

      <div class="contact-form-container">
        <span class="section-label">{{ inquiryPortalLabel }}</span>
        <h2 class="contact-heading">{{ sendMessageHeading }}</h2>

        <form class="contact-modern-form" @submit.prevent="submitForm">
          <div class="form-field">
            <input type="text" id="name" v-model="formName" placeholder="Your name" required />
          </div>
          <div class="form-field">
            <input type="email" id="email" v-model="formEmail" placeholder="Your email address" required />
          </div>
          <div class="form-field">
            <input type="text" id="subject" v-model="formSubject" placeholder="Subject (optional)" />
          </div>
          <div class="form-field">
            <textarea id="message" v-model="formMessage" rows="5" placeholder="How can we help you?" required></textarea>
          </div>
          <p v-if="sent" class="success-message">Message sent successfully!</p>
          <p v-if="error" class="error-message">Something went wrong. Please try again or email us directly.</p>
          <button class="button primary submit-button" type="submit" :disabled="submitting">
            Send message
          </button>
        </form>
      </div>
    </section>
  </main>
</template>
