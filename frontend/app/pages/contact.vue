<script setup lang="ts">
import { ref } from 'vue'

const sent = ref(false)
</script>

<template>
  <PageHero
    class="contact-hero"
    eyebrow="Contact us"
    title="Reach ECRAN for inquiries, partnership conversations, and resource coordination."
    text="Have a question or want to get involved? Use the form below to get in touch with our team or find our office location details."
  />

  <main class="contact-page-layout">
    <section class="contact-grid">
      <div class="contact-info">
        <div class="contact-details">
          <h2>Contact details</h2>
          <p><strong>Email:</strong> info@ecran.org</p>
          <p><strong>Phone:</strong> To be added</p>
          <p><strong>Registration:</strong> ACSO No. 7750</p>
        </div>
        <div class="map-panel">
          <span>Addis Ababa, Ethiopia</span>
          <strong>Office location map</strong>
          <p>Map embed placeholder for ECRAN’s confirmed office pin.</p>
        </div>
      </div>

      <form class="contact-form compact-form" @submit.prevent="sent = true">
        <h2>Send an inquiry</h2>
        <label>
          <span>Your email</span>
          <input type="email" placeholder="name@example.org" required />
        </label>
        <label>
          <span>Inquiry</span>
          <textarea rows="4" placeholder="How can ECRAN help?" required />
        </label>
        <p v-if="sent" class="success-message">Message captured in the demo flow.</p>
        <button class="button primary" type="submit">Send message</button>
      </form>
    </section>
  </main>
</template>
