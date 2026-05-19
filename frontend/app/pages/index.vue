<script setup lang="ts">
import { impactStories, programs, resources } from '~/data/site'

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
        <div class="node-dot dot-6"></div>
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
            <NuxtLink to="/programs" class="button secondary">Explore programs</NuxtLink>
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
    <section class="story-section">
      <div class="section-heading">
        <p class="eyebrow">What ECRAN makes possible</p>
        <h2>A stronger public platform for child-rights evidence, partnership, and accountability.</h2>
      </div>
      <div class="manifesto-list">
        <article class="manifesto-item">
          <span>01</span>
          <div class="content">
            <p>Mission</p>
            <h3>Promote evidence-based advocacy for child rights in Ethiopia.</h3>
            <NuxtLink to="/who-we-are">Read about ECRAN</NuxtLink>
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
    <div class="objectives-header">
      <p class="eyebrow">Network Focus</p>
      <h2>Stated Objectives</h2>
      <p class="objectives-intro">
        ECRAN operates under ten defined objectives to coordinate CSOs, influence policy, build local capacity, and generate evidence for children's rights.
      </p>
    </div>
    <div class="objectives-list">
      <div class="objective-item">
        <span class="obj-number">01</span>
        <p class="obj-text">Coordinate efforts that are being made by CSOs and Community-Based Organizations (CBOs) engaged in advocacy and promotion of the rights of children.</p>
      </div>
      <div class="objective-item">
        <span class="obj-number">02</span>
        <p class="obj-text">Liaise with government departments, line ministries and other development partners in matters related to policy formulation, implementation and monitoring of international and regional instruments regarding the protection of the rights of children.</p>
      </div>
      <div class="objective-item">
        <span class="obj-number">03</span>
        <p class="obj-text">Actively engage in the compilation of CSOs Complimentary Reports regarding the commitments made by the Government of Ethiopia to the UN Committee on the Rights of the child, UN Human Rights Council and African Committee of Experts on the Rights and Welfare of the Child.</p>
      </div>
      <div class="objective-item">
        <span class="obj-number">04</span>
        <p class="obj-text">Build capacities of its members in conducting advocacy work, organizing data regarding the situation of vulnerable children, contribute effectively to the promotion of child rights and to the development of interventions in different parts of Ethiopia.</p>
      </div>
      <div class="objective-item">
        <span class="obj-number">05</span>
        <p class="obj-text">Work closely with duty bearers and stakeholders in the monitoring and implementation of national, regional and international frameworks and legal instruments concerning the rights of children in Ethiopia.</p>
      </div>
      <div class="objective-item">
        <span class="obj-number">06</span>
        <p class="obj-text">In consultation with the concerned authorities, duty bearers and stakeholders, organize platforms for members of the network to conduct dialogue on common challenges that are being faced by children and deliberate on ways of overcoming such challenges.</p>
      </div>
      <div class="objective-item">
        <span class="obj-number">07</span>
        <p class="obj-text">Undertake basic and action oriented research to generate evidence on the current status of Ethiopian Children and serve as a data clearing house through producing physical and web-based information and reports that are aimed at developing new programs and interventions for children.</p>
      </div>
      <div class="objective-item">
        <span class="obj-number">08</span>
        <p class="obj-text">Prepare evidence based policy papers/briefs on children’s rights to help policy makers and practitioners consider better ways of addressing the problem.</p>
      </div>
      <div class="objective-item">
        <span class="obj-number">09</span>
        <p class="obj-text">Establish and strengthen partnerships and membership with other networks at national, regional and international level.</p>
      </div>
      <div class="objective-item">
        <span class="obj-number">10</span>
        <p class="obj-text">Organize training and advocacy programs for leaders of public, private and not-for profit institutions to create a cadre of supportive and competent role models who will be advocating for the rights of Ethiopian children in their various jurisdictions.</p>
      </div>
    </div>
  </section>



  <section class="news-band">
    <div>
      <p class="eyebrow">Latest updates</p>
      <h2>Stories from the network</h2>
    </div>
    <div class="news-scroll" aria-label="Impact stories">
      <article v-for="story in impactStories" :key="story.title">
        <span>{{ story.place }}</span>
        <h3>{{ story.title }}</h3>
        <p>{{ story.text }}</p>
      </article>
    </div>
  </section>

  <div class="section-dark">
    <section class="resource-callout">
      <div>
        <p class="eyebrow">Library</p>
        <h2>Reports, briefs, and tools will live in one accessible resource center.</h2>
      </div>
      <ul>
        <li v-for="resource in resources.slice(0, 3)" :key="resource.title">
          <span>{{ resource.type }}</span>
          <strong>{{ resource.title }}</strong>
        </li>
      </ul>
    </section>
  </div>
</template>
