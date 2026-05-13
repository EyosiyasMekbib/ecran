<script setup lang="ts">
const sent = ref(false)
</script>

<template>
  <PageHero
    eyebrow="Contact us"
    title="Reach ECRAN for inquiries, partnership conversations, and resource coordination."
    text="The contact page is structured for office details, a map area, and a concise inquiry form."
  />

  <section class="contact-grid">
    <div class="map-panel">
      <span>Addis Ababa, Ethiopia</span>
      <strong>Office location map</strong>
      <p>Map embed placeholder for ECRAN’s confirmed office pin.</p>
    </div>
    <div class="contact-details">
      <h2>Contact details</h2>
      <p>Email: info@ecran.org</p>
      <p>Phone: To be added</p>
      <p>Registration: ACSO No. 7750</p>
    </div>
    <form class="contact-form compact-form" @submit.prevent="sent = true">
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
</template>
