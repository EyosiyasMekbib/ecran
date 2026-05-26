<script setup lang="ts">
import { impactStories, resources } from '~/data/site'

useHead({
  title: 'ECRAN | Ethiopian Child Rights Advocacy Network',
  meta: [
    { name: 'description', content: 'ECRAN is an Ethiopian child rights advocacy network promoting evidence-based advocacy, partnership, and child participation.' }
  ]
})
</script>

<template>
  <div class="above-fold">
    <section class="home-hero">
      <div class="hero-nodes" aria-hidden="true">
        <div class="node-line line-1"></div>
        <div class="node-line line-2"></div>
        <div class="node-line line-3"></div>
        <div class="node-dot dot-1"></div>
        <div class="node-dot dot-2"></div>
        <div class="node-dot dot-3"></div>
        <div class="node-dot dot-4"></div>
        <div class="node-dot dot-5"></div>
      </div>
      <div class="hero-container">
        <div class="hero-copy reveal">
          <div class="hero-signals" aria-label="ECRAN focus areas">
            <span>Policy evidence</span>
            <span>Child protection</span>
            <span>Participation</span>
          </div>
          <h1>Evidence-led advocacy for every child in Ethiopia.</h1>
          <p>
            ECRAN brings partners, communities, and decision-makers together to turn evidence into action for children's rights.
          </p>
          <div class="hero-actions">
            <NuxtLink to="/get-involved" class="button primary">Partner with ECRAN</NuxtLink>
            <NuxtLink to="/who-we-are/about-us" class="button secondary">Learn more about us</NuxtLink>
          </div>
        </div>
        <div class="hero-visual reveal delay-1" aria-label="Ethiopian children standing together outdoors">
          <img src="/brand/ecran-children-header.png" alt="Ethiopian children standing together outdoors in school uniforms" />
        </div>
      </div>
    </section>

    <section class="partners-section">
      <div class="partners-container">
        <h3>Our partners</h3>
        <div class="partners-marquee">
          <div class="partner-placeholder"></div>
          <div class="partner-placeholder"></div>
          <div class="partner-placeholder"></div>
          <div class="partner-placeholder"></div>
          <div class="partner-placeholder"></div>
          <div class="partner-placeholder"></div>
          <div class="partner-placeholder"></div>
          <div class="partner-placeholder"></div>
        </div>
      </div>
    </section>
  </div>

  <div class="section-dark">
    <section class="story-section story-showcase">
      <div class="story-anchor">
        <p class="eyebrow">What ECRAN makes possible</p>
        <h2>A stronger public platform for child-rights evidence, partnership, and accountability.</h2>
        <p>
          ECRAN connects field experience, civil society coordination, and policy dialogue so advocacy work can move with a shared public mandate.
        </p>
        <NuxtLink to="/who-we-are/about-us" class="story-link">Read about ECRAN</NuxtLink>
      </div>
      <div class="manifesto-list">
        <article class="manifesto-item">
          <span>01</span>
          <div class="content">
            <p>Mission</p>
            <h3>Promote evidence-based advocacy for child rights in Ethiopia.</h3>
          </div>
        </article>
        <article class="manifesto-item">
          <span>02</span>
          <div class="content">
            <p>Vision</p>
            <h3>A country where all children enjoy survival, development, protection, and participation rights.</h3>
          </div>
        </article>
        <article class="manifesto-item">
          <span>03</span>
          <div class="content">
            <p>Legal status</p>
            <h3>Registered as a local organization under Proclamation No. 1113/2019.</h3>
          </div>
        </article>
      </div>
    </section>
  </div>

  <section class="objectives-section">
    <div class="objectives-heading-block">
      <p class="eyebrow">Network Focus</p>
      <h2>Stated Objectives</h2>
      <p class="objectives-summary">
        Ten formal objectives, organized into four workstreams so the homepage reads like a strategy rather than a charter document.
      </p>
    </div>

    <div class="objectives-showcase">
      <aside class="objective-index" aria-label="Ten stated objectives grouped into four workstreams">
        <strong>10</strong>
        <span>stated objectives</span>
        <div class="objective-index-list" aria-hidden="true">
          <span>01</span><span>02</span><span>03</span><span>04</span><span>05</span>
          <span>06</span><span>07</span><span>08</span><span>09</span><span>10</span>
        </div>
      </aside>

      <div class="objective-themes">
        <article class="objective-theme">
          <span class="objective-range">01, 09</span>
          <div>
            <h3>Coordinate the network</h3>
            <p>Align CSOs, CBOs, members, and national or regional partners around a shared child-rights advocacy agenda.</p>
            <details>
              <summary>Read formal objectives</summary>
              <ul>
                <li>Coordinate efforts by CSOs and Community-Based Organizations engaged in advocacy and promotion of the rights of children.</li>
                <li>Establish and strengthen partnerships and membership with other networks at national, regional and international level.</li>
              </ul>
            </details>
          </div>
        </article>

        <article class="objective-theme">
          <span class="objective-range">02, 03, 05</span>
          <div>
            <h3>Influence policy and accountability</h3>
            <p>Work with public institutions and development partners to shape policy, monitor commitments, and support reporting.</p>
            <details>
              <summary>Read formal objectives</summary>
              <ul>
                <li>Liaise with government departments, line ministries and development partners on policy formulation, implementation and monitoring of child-rights instruments.</li>
                <li>Contribute to CSO complementary reports on Ethiopia’s commitments to UN and African child-rights mechanisms.</li>
                <li>Work with duty bearers and stakeholders to monitor national, regional and international frameworks concerning children’s rights.</li>
              </ul>
            </details>
          </div>
        </article>

        <article class="objective-theme">
          <span class="objective-range">04, 06, 10</span>
          <div>
            <h3>Build capacity and dialogue</h3>
            <p>Equip members, leaders, and institutions to advocate, share data, and respond to common challenges facing children.</p>
            <details>
              <summary>Read formal objectives</summary>
              <ul>
                <li>Build member capacity in advocacy work, data organization, child-rights promotion, and program development across Ethiopia.</li>
                <li>Organize dialogue platforms for members to deliberate on shared challenges faced by children and practical ways to address them.</li>
                <li>Organize training and advocacy programs for public, private, and not-for-profit leaders to become competent child-rights advocates.</li>
              </ul>
            </details>
          </div>
        </article>

        <article class="objective-theme">
          <span class="objective-range">07, 08</span>
          <div>
            <h3>Generate evidence for action</h3>
            <p>Produce research, briefs, reports, and information products that help decision-makers design better interventions for children.</p>
            <details>
              <summary>Read formal objectives</summary>
              <ul>
                <li>Undertake basic and action-oriented research, serve as a data clearing house, and produce physical and web-based reports for child-focused programs.</li>
                <li>Prepare evidence-based policy papers and briefs on children’s rights for policy makers and practitioners.</li>
              </ul>
            </details>
          </div>
        </article>
      </div>
    </div>
  </section>



  <section class="news-section">
    <div class="news-header">
      <p class="eyebrow">Latest updates</p>
      <h2>Stories from the network</h2>
    </div>
    <div class="news-grid" aria-label="Impact stories">
      <article v-for="story in impactStories" :key="story.title" class="news-card">
        <div class="news-card-meta">
          <span class="news-tag">{{ story.place }}</span>
        </div>
        <div class="news-card-content">
          <h3>{{ story.title }}</h3>
          <p>{{ story.text }}</p>
        </div>
        <div class="news-card-footer">
          <NuxtLink to="/impact-stories" class="news-link">
            Read story <span class="arrow">&rarr;</span>
          </NuxtLink>
        </div>
      </article>
    </div>
  </section>

  <div class="section-dark">
    <section class="library-section">
      <div class="library-header">
        <div class="library-title-block">
          <p class="eyebrow">Resource Library</p>
          <h2>Reports, briefs, and tools in one accessible center.</h2>
        </div>
        <NuxtLink to="/resources" class="button secondary-light">View all resources</NuxtLink>
      </div>
      
      <div class="library-grid">
        <article v-for="resource in resources.slice(0, 3)" :key="resource.title" class="resource-card">
          <div class="resource-type-icon">
            <svg class="file-icon" viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
            </svg>
            <span class="resource-badge">{{ resource.type }}</span>
          </div>
          <h3>{{ resource.title }}</h3>
          <div class="resource-meta">
            <span class="resource-status">{{ resource.meta }}</span>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>
