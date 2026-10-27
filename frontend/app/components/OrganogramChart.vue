<script setup lang="ts">
// Interactive, accessible, and responsive Organizational Chart for ECRAN
interface OrgNode {
  title: string
  role: string
  description?: string
  subItems?: string[]
}

const leadership = {
  generalAssembly: {
    title: 'General Assembly',
    role: 'Supreme Governing Body',
    description: 'Composed of 40+ accredited civil society Member Organizations across Ethiopia; approves network strategy, bylaws, and elects the Board.'
  },
  board: {
    title: 'Board of Directors',
    role: 'Strategic Governance & Policy Oversight',
    description: 'Elected representatives providing strategic oversight, policy direction, financial stewardship, and institutional accountability.'
  },
  advisory: {
    title: 'Internal Audit & Advisory',
    role: 'Independent Oversight',
    description: 'Advises the Board on compliance, safeguarding integrity, and statutory standards under Proclamation No. 1113/2019.'
  },
  executiveDirector: {
    title: 'Executive Director & Secretariat',
    role: 'Operational Leadership & Coordination',
    description: 'Leads day-to-day coordination, manages network staff, represents ECRAN externally, and drives strategic execution.'
  }
}

const departments: OrgNode[] = [
  {
    title: 'Programs & Policy Advocacy',
    role: 'Evidence & Influence',
    description: 'Translates grassroots child-rights evidence into national policy dialogue, research briefs, and legislative advocacy.',
    subItems: ['Evidence & Applied Research', 'Child Protection Systems', 'Child & Youth Participation']
  },
  {
    title: 'Network Coordination & Membership',
    role: 'Coalition & Capacity',
    description: 'Facilitates inter-agency coordination, member support, regional nodes, and technical capacity-building programs.',
    subItems: ['Member Engagement', 'Regional Coordination Nodes', 'Advocacy Capacity Building']
  },
  {
    title: 'Safeguarding & Quality Assurance',
    role: 'Standards & Ethics',
    description: 'Guarantees child safeguarding protocols, ethical research compliance, and rigorous monitoring across all member engagements.',
    subItems: ['Child Safeguarding Standards', 'Accountability & Compliance', 'Monitoring & Evaluation']
  },
  {
    title: 'Finance, Admin & Communications',
    role: 'Operations & Public Mandate',
    description: 'Manages grant compliance, institutional finances, human resources, media engagement, and public communications.',
    subItems: ['Financial & Grants Management', 'Operations & HR', 'Media Relations & Press']
  }
]
</script>

<template>
  <div class="organogram-container" aria-label="ECRAN Organizational Structure">
    <!-- Level 1: General Assembly -->
    <div class="org-level level-ga">
      <div class="org-card card-ga">
        <span class="org-badge">Governance Level 1</span>
        <h3 class="org-title">{{ leadership.generalAssembly.title }}</h3>
        <p class="org-role">{{ leadership.generalAssembly.role }}</p>
        <p class="org-desc">{{ leadership.generalAssembly.description }}</p>
      </div>
    </div>

    <!-- Connector GA -> Board -->
    <div class="org-connector-vertical" aria-hidden="true" />

    <!-- Level 2: Board + Advisory Committee -->
    <div class="org-level level-board-row">
      <div class="org-card card-board">
        <span class="org-badge">Governance Level 2</span>
        <h3 class="org-title">{{ leadership.board.title }}</h3>
        <p class="org-role">{{ leadership.board.role }}</p>
        <p class="org-desc">{{ leadership.board.description }}</p>
      </div>

      <div class="org-card card-advisory">
        <span class="org-badge badge-alt">Independent</span>
        <h3 class="org-title">{{ leadership.advisory.title }}</h3>
        <p class="org-role">{{ leadership.advisory.role }}</p>
        <p class="org-desc">{{ leadership.advisory.description }}</p>
      </div>
    </div>

    <!-- Connector Board -> Secretariat -->
    <div class="org-connector-vertical" aria-hidden="true" />

    <!-- Level 3: Executive Director / Secretariat -->
    <div class="org-level level-ed">
      <div class="org-card card-ed">
        <span class="org-badge">Executive Level</span>
        <h3 class="org-title">{{ leadership.executiveDirector.title }}</h3>
        <p class="org-role">{{ leadership.executiveDirector.role }}</p>
        <p class="org-desc">{{ leadership.executiveDirector.description }}</p>
      </div>
    </div>

    <!-- Connector Secretariat -> Departments -->
    <div class="org-connector-vertical" aria-hidden="true" />
    <div class="org-connector-horizontal" aria-hidden="true" />

    <!-- Level 4: Operational Directorates / Departments -->
    <div class="org-level level-depts">
      <div v-for="dept in departments" :key="dept.title" class="org-card card-dept">
        <span class="org-badge badge-dept">{{ dept.role }}</span>
        <h4 class="org-title">{{ dept.title }}</h4>
        <p class="org-desc">{{ dept.description }}</p>
        <ul v-if="dept.subItems?.length" class="org-subitems">
          <li v-for="item in dept.subItems" :key="item">{{ item }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.organogram-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 3rem auto;
  padding: 0 1rem;
}

.org-level {
  display: flex;
  justify-content: center;
  width: 100%;
}

.level-board-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  max-width: 52rem;
}

@media (min-width: 640px) {
  .level-board-row {
    grid-template-columns: 1.6fr 1fr;
  }
}

.level-depts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 16.5rem), 1fr));
  gap: 1.5rem;
  width: 100%;
  max-width: 76rem;
}

/* Card Styles */
.org-card {
  background: #ffffff;
  border: 1px solid var(--line, #e2e8f0);
  border-radius: 1rem;
  padding: 1.5rem 1.6rem;
  box-shadow: 0 4px 14px rgba(6, 23, 47, 0.04);
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
  position: relative;
}

.org-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(6, 23, 47, 0.08);
  border-color: #cbd5e1;
}

.card-ga {
  max-width: 38rem;
  width: 100%;
  border-top: 4px solid var(--primary, #24306f);
  background: linear-gradient(180deg, #f8faff 0%, #ffffff 100%);
  text-align: center;
}

.card-board {
  border-top: 4px solid #0284c7;
}

.card-advisory {
  border-top: 4px solid #64748b;
  background: #fcfdfe;
}

.card-ed {
  max-width: 36rem;
  width: 100%;
  border-top: 4px solid #10b981;
  background: linear-gradient(180deg, #f2fcf6 0%, #ffffff 100%);
  text-align: center;
}

.card-dept {
  border-top: 3px solid #3b82f6;
  display: flex;
  flex-direction: column;
}

.card-dept:nth-child(2) {
  border-top-color: #8b5cf6;
}
.card-dept:nth-child(3) {
  border-top-color: #059669;
}
.card-dept:nth-child(4) {
  border-top-color: #d97706;
}

/* Badges & Typography */
.org-badge {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 0.25rem 0.65rem;
  border-radius: 9999px;
  background: #eef2ff;
  color: var(--primary, #24306f);
  margin-bottom: 0.75rem;
}

.badge-alt {
  background: #f1f5f9;
  color: #475569;
}

.badge-dept {
  background: #f0f9ff;
  color: #0369a1;
  align-self: flex-start;
}

.org-title {
  font-family: var(--font-heading, inherit);
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--dark, #06172f);
  margin: 0 0 0.25rem;
}

.card-dept .org-title {
  font-size: 1.05rem;
}

.org-role {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--primary, #24306f);
  margin: 0 0 0.65rem;
}

.org-desc {
  font-size: 0.88rem;
  line-height: 1.55;
  color: var(--muted, #475569);
  margin: 0;
}

.org-subitems {
  margin: 1rem 0 0;
  padding: 0.75rem 0 0 1.25rem;
  border-top: 1px dashed var(--line, #e2e8f0);
  font-size: 0.82rem;
  color: #334155;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

/* Connector Lines */
.org-connector-vertical {
  width: 2px;
  height: 1.75rem;
  background: #cbd5e1;
}

.org-connector-horizontal {
  width: 80%;
  max-width: 68rem;
  height: 2px;
  background: #cbd5e1;
  margin-bottom: 1.75rem;
  display: none;
}

@media (min-width: 820px) {
  .org-connector-horizontal {
    display: block;
  }
}
</style>
