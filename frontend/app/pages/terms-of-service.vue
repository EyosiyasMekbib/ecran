<template>
  <main class="legal-page">
    <div class="legal-hero">
      <div class="legal-hero-inner">
        <span class="legal-eyebrow">Legal</span>
        <h1>Terms of Service</h1>
        <p class="legal-meta">Ethiopian Child Rights Advocacy Network (ECRAN) &mdash; Last Updated: June 2026</p>
      </div>
    </div>

    <div class="legal-content">
      <div class="legal-body">
        <section class="legal-section">
          <p class="legal-lead">
            By using the ECRAN website, you agree to these Terms of Service. Please read them carefully before accessing or using our site.
          </p>
        </section>

        <section class="legal-section">
          <h2>Permitted Use</h2>
          <p>
            You may use this website for lawful, non-commercial purposes only. Any use of this site for illegal activities or in violation of applicable laws is strictly prohibited.
          </p>
        </section>

        <section class="legal-section">
          <h2>Intellectual Property</h2>
          <p>
            All content on this website — including text, images, and reports — belongs to ECRAN or its partners and is protected by copyright. No reproduction or commercial use of any content is permitted without prior written permission from ECRAN.
          </p>
        </section>

        <section class="legal-section">
          <h2>Disclaimer of Warranties</h2>
          <p>
            We provide information on this website in good faith but make no guarantees regarding its accuracy, completeness, or fitness for any particular purpose. Content may be updated without notice.
          </p>
        </section>

        <section class="legal-section">
          <h2>Limitation of Liability</h2>
          <p>
            ECRAN is not liable for any direct, indirect, incidental, or consequential damages arising from your use of, or inability to use, this website or its content.
          </p>
        </section>

        <section class="legal-section">
          <h2>Governing Law</h2>
          <p>
            These Terms are governed by and construed in accordance with the laws of Ethiopia. Any disputes arising under these Terms shall be subject to the jurisdiction of Ethiopian courts.
          </p>
        </section>

        <section class="legal-section">
          <h2>Changes to These Terms</h2>
          <p>
            We may update these Terms at any time. Continued use of the website after any changes constitutes your acceptance of the revised Terms.
          </p>
        </section>
      </div>
    </div>
  </main>
</template>

<style scoped>
.legal-page {
  background: var(--paper);
  min-height: 100vh;
}

.legal-hero {
  background: var(--gradient-brand-deep);
  padding: clamp(4rem, 10vw, 8rem) var(--gutter) clamp(3rem, 7vw, 6rem);
}

.legal-hero-inner {
  max-width: 780px;
  margin: 0 auto;
}

.legal-eyebrow {
  display: inline-block;
  font-family: var(--font-text);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--brand);
  background: rgba(11, 143, 167, 0.12);
  border: 1px solid rgba(11, 143, 167, 0.3);
  padding: 0.3rem 0.75rem;
  border-radius: 2px;
  margin-bottom: 1.25rem;
}

.legal-hero h1 {
  font-family: var(--font-heading);
  font-size: clamp(2rem, 5vw, 3.25rem);
  font-weight: 700;
  color: #fff;
  margin: 0 0 1rem;
  line-height: 1.15;
}

.legal-meta {
  font-family: var(--font-text);
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.55);
  margin: 0;
}

.legal-content {
  padding: clamp(3rem, 8vw, 6rem) var(--gutter);
}

.legal-body {
  max-width: 780px;
  margin: 0 auto;
}

.legal-lead {
  font-size: 1.15rem;
  line-height: 1.75;
  color: var(--ink);
  font-weight: 400;
}

.legal-section {
  margin-bottom: 2.5rem;
  padding-bottom: 2.5rem;
  border-bottom: 1px solid var(--line);
}

.legal-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.legal-section h2 {
  font-family: var(--font-heading);
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--brand-dark);
  margin: 0 0 0.85rem;
}

.legal-section p {
  font-size: 1rem;
  line-height: 1.8;
  color: var(--muted);
  margin: 0 0 0.75rem;
}
</style>
