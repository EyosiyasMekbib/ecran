<script setup lang="ts">
import { ref, computed } from 'vue'

interface Resource {
  title: string
  type: string
  topic: string
  date: string
  fileSize: string
  pages: number
  description: string
  downloadUrl: string
}

const resourcesData: Resource[] = [
  {
    title: 'ECRAN Annual Organizational Profile 2025',
    type: 'Report',
    topic: 'Capacity Building',
    date: '2025-12-15',
    fileSize: '2.4 MB',
    pages: 34,
    description: 'A comprehensive review of ECRAN’s network achievements, financial statements, member directory, and strategic milestones reached throughout 2025.',
    downloadUrl: '#'
  },
  {
    title: 'Child Participation in Local Decision Making',
    type: 'Policy Brief',
    topic: 'Participation',
    date: '2026-03-10',
    fileSize: '1.2 MB',
    pages: 8,
    description: 'A policy brief detailing frameworks and practical recommendations to enhance meaningful child and youth participation in sub-city governance and community committees.',
    downloadUrl: '#'
  },
  {
    title: 'Evidence Standards for Child-Rights Advocacy',
    type: 'Publication',
    topic: 'Advocacy',
    date: '2026-01-20',
    fileSize: '4.8 MB',
    pages: 52,
    description: 'Guidelines for civil society organizations on collecting, validating, and presenting field evidence to support policy advocacy with government ministries.',
    downloadUrl: '#'
  },
  {
    title: 'Partner Inquiry & Network Membership Pack 2026',
    type: 'Toolkit',
    topic: 'Capacity Building',
    date: '2026-04-05',
    fileSize: '3.1 MB',
    pages: 18,
    description: 'Information package and registration toolkit for non-governmental organizations and community-based groups seeking formal ECRAN membership.',
    downloadUrl: '#'
  },
  {
    title: 'Ethiopia Child Protection Systems Mapping Report',
    type: 'Report',
    topic: 'Child Protection',
    date: '2025-09-30',
    fileSize: '5.6 MB',
    pages: 120,
    description: 'An in-depth mapping of prevention, response, and referral systems for child safeguarding across both formal government structures and local communities.',
    downloadUrl: '#'
  },
  {
    title: 'Safeguarding and Ethical Engagement Toolkit',
    type: 'Toolkit',
    topic: 'Child Protection',
    date: '2026-02-14',
    fileSize: '2.1 MB',
    pages: 40,
    description: 'Practical tools, consent forms, and protocol checklists to ensure children’s safety and ethical participation during advocacy campaigns and public dialogue.',
    downloadUrl: '#'
  }
]

const searchQuery = ref('')
const selectedType = ref('All')
const selectedTopic = ref('All')
const sortBy = ref('latest')

const types = ['All', 'Report', 'Policy Brief', 'Publication', 'Toolkit']
const topics = ['All', 'Child Protection', 'Participation', 'Advocacy', 'Capacity Building']

const typeCounts = computed(() => {
  const counts: Record<string, number> = { All: resourcesData.length }
  types.forEach(t => {
    if (t !== 'All') {
      counts[t] = resourcesData.filter(r => r.type === t).length
    }
  })
  return counts
})

const topicCounts = computed(() => {
  const counts: Record<string, number> = { All: resourcesData.length }
  topics.forEach(t => {
    if (t !== 'All') {
      counts[t] = resourcesData.filter(r => r.topic === t).length
    }
  })
  return counts
})

const filteredResources = computed(() => {
  let result = [...resourcesData]

  if (searchQuery.value.trim() !== '') {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(r => 
      r.title.toLowerCase().includes(q) || 
      r.description.toLowerCase().includes(q)
    )
  }

  if (selectedType.value !== 'All') {
    result = result.filter(r => r.type === selectedType.value)
  }

  if (selectedTopic.value !== 'All') {
    result = result.filter(r => r.topic === selectedTopic.value)
  }

  if (sortBy.value === 'latest') {
    result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } else if (sortBy.value === 'oldest') {
    result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  } else if (sortBy.value === 'title') {
    result.sort((a, b) => a.title.localeCompare(b.title))
  }

  return result
})

const hasActiveFilters = computed(() => {
  return searchQuery.value !== '' || selectedType.value !== 'All' || selectedTopic.value !== 'All'
})

const resetFilters = () => {
  searchQuery.value = ''
  selectedType.value = 'All'
  selectedTopic.value = 'All'
  sortBy.value = 'latest'
}

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('en-US', options)
}
</script>

<template>
  <PageHero
    class="resources-hero"
    title="Resource Repository"
    text="Explore and download ECRAN's research publications, policy briefs, toolkit guidelines, and annual reports detailing child-rights progress in Ethiopia."
  />

  <main class="resources-layout">
    <aside class="resources-filters" aria-label="Filter resources">
      <div class="filter-group">
        <h2 class="filter-group-title">Search</h2>
        <div class="search-wrapper">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search resources..."
            class="search-input"
          />
          <svg class="search-icon" viewBox="0 0 24 24" width="18" height="18">
            <path fill="currentColor" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
          </svg>
        </div>
      </div>

      <div class="filter-group">
        <h2 class="filter-group-title">Resource Type</h2>
        <ul class="filter-list">
          <li v-for="type in types" :key="type">
            <button
              type="button"
              class="filter-btn"
              :class="{ active: selectedType === type }"
              @click="selectedType = type"
            >
              <span>{{ type === 'All' ? 'All Types' : type }}</span>
              <span class="filter-count">{{ typeCounts[type] }}</span>
            </button>
          </li>
        </ul>
      </div>

      <div class="filter-group">
        <h2 class="filter-group-title">Topic</h2>
        <ul class="filter-list">
          <li v-for="topic in topics" :key="topic">
            <button
              type="button"
              class="filter-btn"
              :class="{ active: selectedTopic === topic }"
              @click="selectedTopic = topic"
            >
              <span>{{ topic === 'All' ? 'All Topics' : topic }}</span>
              <span class="filter-count">{{ topicCounts[topic] }}</span>
            </button>
          </li>
        </ul>
      </div>

      <button
        v-if="hasActiveFilters"
        type="button"
        class="reset-filters-btn"
        @click="resetFilters"
      >
        <svg viewBox="0 0 24 24" width="16" height="16">
          <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
        </svg>
        <span>Reset Filters</span>
      </button>
    </aside>

    <section class="resources-content" aria-label="Matching resources">
      <div class="resources-meta-bar">
        <span class="results-count">
          Showing {{ filteredResources.length }} resource{{ filteredResources.length === 1 ? '' : 's' }}
        </span>
        <div class="sort-wrapper">
          <label for="sort-select" class="results-count">Sort by:</label>
          <select id="sort-select" v-model="sortBy" class="sort-select">
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="title">Title A-Z</option>
          </select>
        </div>
      </div>

      <div class="resources-grid">
        <article
          v-for="resource in filteredResources"
          :key="resource.title"
          class="resource-card"
        >
          <div>
            <div class="resource-card-meta">
              <span
                class="resource-badge"
                :class="'type-' + resource.type.toLowerCase().replace(' ', '-')"
              >
                {{ resource.type }}
              </span>
              <span class="resource-topic">{{ resource.topic }}</span>
            </div>
            <h3>{{ resource.title }}</h3>
            <div class="resource-card-specs">
              <time :datetime="resource.date">{{ formatDate(resource.date) }}</time>
              <span>&bull;</span>
              <span>{{ resource.pages }} pages</span>
              <span>&bull;</span>
              <span>{{ resource.fileSize }}</span>
            </div>
            <p>{{ resource.description }}</p>
          </div>
          <div class="resource-card-footer">
            <button type="button" class="download-link-btn">
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path fill="currentColor" d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
              </svg>
              <span>Download Resource</span>
            </button>
          </div>
        </article>

        <div v-if="filteredResources.length === 0" class="no-results">
          <h3>No resources found</h3>
          <p>Try adjusting your search terms or filter selections.</p>
        </div>
      </div>
    </section>
  </main>
</template>
