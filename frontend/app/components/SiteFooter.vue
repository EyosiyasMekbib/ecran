<template>
  <footer class="site-footer">
    <div class="footer-main">
      <div class="footer-brand">
        <img src="/ecran-logo.jpg" alt="ECRAN logo" class="footer-logo" />
        <p>Ethiopian Child Rights Advocacy Network works for evidence-based advocacy so every child in Ethiopia can survive, develop, be protected, and participate.</p>
      </div>
      <div class="footer-grid">
        <section>
          <h2>Registration</h2>
          <p>Local organization registered with ACSO under Civil Societies Proclamation No. 1113/2019.</p>
          <p>Registration No: <strong>7750</strong></p>
        </section>
        <section>
          <h2>Quick Links</h2>
          <nav class="footer-nav">
            <NuxtLink to="/who-we-are/about-us">Who We Are</NuxtLink>
            <NuxtLink to="/news/announcements">News & Announcements</NuxtLink>
            <NuxtLink to="/resources">Resources</NuxtLink>
            <a href="https://forms.google.com" target="_blank" rel="noopener noreferrer">Get Involved</a>
          </nav>
        </section>
        <section>
          <h2>Contact</h2>
          <address>
            <p>Addis Ababa, Ethiopia<br />
            <a href="mailto:info@ecran.org">info@ecran-et.org</a></p>
          </address>
        </section>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; {{ new Date().getFullYear() }} ECRAN. All rights reserved.</p>
      <div class="footer-legal">
        <NuxtLink to="/">Privacy Policy</NuxtLink>
        <NuxtLink to="/">Terms of Service</NuxtLink>
      </div>
    </div>
  </footer>
</template>
