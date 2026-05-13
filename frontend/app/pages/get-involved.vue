<script setup lang="ts">
const submitted = ref(false)
const form = reactive({
  name: '',
  email: '',
  interest: 'Partnership inquiry',
  message: ''
})

const error = computed(() => submitted.value && (!form.name || !form.email || !form.message))
</script>

<template>
  <PageHero
    eyebrow="Get involved"
    title="Join the network as a partner, volunteer, member, or resource ally."
    text="Use the form below to start a partnership inquiry, express volunteer interest, or discuss how your organization can support child-rights advocacy."
  />

  <section class="form-layout">
    <div class="involvement-panel">
      <p class="eyebrow">Ways to engage</p>
      <h2>Partnerships work best when the ask is specific.</h2>
      <ul>
        <li>Volunteer your professional skills.</li>
        <li>Start a partnership conversation.</li>
        <li>Contribute publications or field learning.</li>
        <li>Explore membership and joint advocacy.</li>
      </ul>
    </div>

    <form class="contact-form" @submit.prevent="submitted = true">
      <label>
        <span>Name or organization</span>
        <input v-model="form.name" type="text" autocomplete="name" placeholder="Your name or organization" />
        <small v-if="submitted && !form.name">Please add a name.</small>
      </label>
      <label>
        <span>Email address</span>
        <input v-model="form.email" type="email" autocomplete="email" placeholder="name@example.org" />
        <small v-if="submitted && !form.email">Please add an email address.</small>
      </label>
      <label>
        <span>Interest area</span>
        <select v-model="form.interest">
          <option>Partnership inquiry</option>
          <option>Volunteer registration</option>
          <option>Membership</option>
          <option>Resource sharing</option>
        </select>
      </label>
      <label>
        <span>Message</span>
        <textarea v-model="form.message" rows="5" placeholder="Tell ECRAN what you would like to discuss." />
        <small v-if="submitted && !form.message">Please include a short message.</small>
      </label>
      <p v-if="submitted && !error" class="success-message">Thank you. This demo form is ready to connect to ECRAN’s email or CRM workflow.</p>
      <button class="button primary" type="submit">Submit inquiry</button>
    </form>
  </section>
</template>
