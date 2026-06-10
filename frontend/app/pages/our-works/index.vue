<script setup lang="ts">
useHead({
  title: 'Our Works | ECRAN',
  meta: [
    { name: 'description', content: "ECRAN's programs and initiatives advancing child rights in Ethiopia through evidence-based advocacy and coordinated action." }
  ]
})
</script>

<template>
  <PageHero
    eyebrow="Our Works / ሥራዎቻችን"
    title="Programs and initiatives advancing child rights across Ethiopia."
    text="ECRAN coordinates evidence-based programs that strengthen child protection systems, participation, and policy advocacy at national and regional levels."
  />

  <section class="split-section">
    <div>
      <p class="eyebrow">Our approach</p>
      <h2>From evidence to coordinated action for children.</h2>
    </div>
    <p>
      Our works span research, capacity building, policy dialogue, and direct network coordination — all focused on turning field learning into change for children's rights in Ethiopia.
    </p>
  </section>

  <div class="section-light-blue">
    <section class="governance-grid our-works-grid">
      <article>
        <span>01</span>
        <h2>ASFP</h2>
        <p>Advocacy and Social Frontline Program — coordinating frontline civil society actors for stronger child-rights advocacy across Ethiopia's regions.</p>
        <NuxtLink to="/our-works/asfp">Learn about ASFP</NuxtLink>
      </article>
      <article>
        <span>02</span>
        <h2>Evidence & Policy</h2>
        <p>Turning research, field learning, and child-rights data into policy asks that decision makers can act on.</p>
      </article>
      <article>
        <span>03</span>
        <h2>Child Protection Systems</h2>
        <p>Supporting stronger prevention, reporting, referral, and response pathways for children at risk of violence or neglect.</p>
      </article>
      <article>
        <span>04</span>
        <h2>Child Participation</h2>
        <p>Creating safe spaces where children and young people can contribute to decisions that affect their lives.</p>
      </article>
    </section>
  </div>
</template>
