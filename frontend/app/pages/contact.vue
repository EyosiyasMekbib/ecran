<script setup lang="ts">
import { ref } from 'vue'

const sent = ref(false)

const { data: profile } = await useAsyncData('site-profile', () => getSiteProfile())
const { data: page } = await useAsyncData('page-contact', () => getPage('contact'))

const email = computed(() => profile.value?.email || 'info@ecran-et.org')
const address = computed(() => profile.value?.address || 'Addis Ababa, Ethiopia')
const registration = computed(() => `No. ${profile.value?.registrationNumber || '7750'}`)
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
        <span class="section-label">Connect</span>
        <h2 class="contact-heading">Get in touch</h2>
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
        <span class="section-label">Inquiry Portal</span>
        <h2 class="contact-heading">Send a message</h2>

        <form class="contact-modern-form" @submit.prevent="sent = true">
          <div class="form-field">
            <input type="email" id="email" placeholder="Your email address" required />
          </div>
          <div class="form-field">
            <textarea id="message" rows="5" placeholder="How can we help you?" required></textarea>
          </div>
          <p v-if="sent" class="success-message">Message sent successfully!</p>
          <button class="button primary submit-button" type="submit">
            Send message
          </button>
        </form>
      </div>
    </section>
  </main>
</template>
