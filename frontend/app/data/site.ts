export const navItems = [
  { label: 'Home', to: '/' },
  {
    label: 'About Us',
    to: '/who-we-are',
    children: [
      { label: 'About Us', to: '/who-we-are/about-us' },
      { label: 'Our Members', to: '/who-we-are/our-members' },
      { label: 'Our Team', to: '/who-we-are/our-team' }
    ]
  },
  {
    label: 'News',
    to: '/news',
    children: [
      { label: 'News', to: '/news/news' },
      { label: 'Media Center', to: '/news/media-center' },
      { label: 'Vacancies', to: '/news/vacancies' },
      { label: 'Bids', to: '/news/bids' }
    ]
  },
  { label: 'Projects', to: '/projects' },
  { label: 'Resources', to: '/resources' },
  { label: 'Contact', to: '/contact' }
]

export const impactStories = [
  {
    place: 'Addis Ababa',
    title: 'A coordinated voice for child rights advocacy',
    text: 'ECRAN convenes practitioners and advocates around a shared agenda: practical, evidence-led action for survival, development, protection, and participation.'
  },
  {
    place: 'Regional partners',
    title: 'From field evidence to policy dialogue',
    text: 'The network helps translate local realities into concise briefs, partner conversations, and advocacy moments with public institutions.'
  },
  {
    place: 'Member organizations',
    title: 'Shared learning that travels',
    text: 'Members exchange tools, case learning, and referral knowledge so strong practice can move across programs instead of staying isolated.'
  }
]

export const resources = [
  { type: 'Annual report', title: 'ECRAN organizational profile 2025', meta: 'PDF, coming soon' },
  { type: 'Policy brief', title: 'Child participation in local decision making', meta: 'Brief, coming soon' },
  { type: 'Publication', title: 'Evidence standards for child-rights advocacy', meta: 'Guide, coming soon' },
  { type: 'Toolkit', title: 'Partner inquiry and membership pack', meta: 'Download, coming soon' }
]

export const staticPosts = [
  {
    title: 'National Child Rights Advocacy Summit 2026 Announced',
    slug: 'national-child-rights-advocacy-summit-2026-announced',
    category: 'news',
    date: 'May 15, 2026',
    deadline: '',
    location: 'Addis Ababa, Ethiopia',
    excerpt: 'ECRAN is hosting the annual Child Rights Advocacy Summit next month in Addis Ababa, convening civil society organizations, government officials, and international development partners to align on national child protection policies.',
    body: '<p>The Ethiopian Child Rights Advocacy Network (ECRAN) is pleased to announce the <strong>National Child Rights Advocacy Summit 2026</strong>, taking place in Addis Ababa.</p><p>This landmark event will bring together over 150 leaders from civil society, government line ministries, UN agencies, and youth advocate networks. The summit’s primary objective is to review national progress on child-rights instruments, discuss regional safeguarding systems, and agree upon a shared policy advocacy roadmap for the upcoming strategic period.</p><h3>Key Summit Themes</h3><ul><li>Strengthening Community-Level Child Protection Pathways</li><li>Evidence-Led Policy Engagement with Government Duty-Bearers</li><li>Ethical Child Participation and Youth-Led Advocacy</li><li>Resource Mobilization and Multi-Sectoral Partnership Building</li></ul><p>Further details regarding registration, keynote speakers, and breakout session agendas will be communicated in subsequent releases.</p>',
    image: '/brand/ecran-children-header.png',
    attachments: [],
    externalUrl: '',
    department: '',
    employmentType: '',
    ctaLabel: 'Read full story'
  },
  {
    title: 'Launch of the CSOs Complimentary Report on Child Rights',
    slug: 'launch-of-the-csos-complimentary-report-on-child-rights',
    category: 'news',
    date: 'April 28, 2026',
    deadline: '',
    location: 'Addis Ababa, Ethiopia',
    excerpt: 'We are pleased to announce the upcoming launch of our Complimentary Report on the implementation of the UN Convention on the Rights of the Child (UNCRC) in Ethiopia. A stakeholder validation workshop will be held next week.',
    body: '<p>ECRAN, in collaboration with its coalition of member organizations, will officially launch the <strong>CSOs Complimentary Report on Child Rights in Ethiopia</strong>.</p><p>This comprehensive report synthesizes grassroots evidence, qualitative case studies, and quantitative monitoring data collected by frontline civil society organizations across all regional states. It offers independent analysis and constructive recommendations to strengthen Ethiopia’s implementation of the UNCRC and the African Charter on the Rights and Welfare of the Child.</p><p>A validation workshop bringing together civil society delegates and partner representatives will precede the formal publication.</p>',
    image: '/brand/network-card.svg',
    attachments: [],
    externalUrl: '',
    department: '',
    employmentType: '',
    ctaLabel: 'Read full story'
  },
  {
    title: 'Advocacy & Child Safeguarding Training for Member CSOs',
    slug: 'advocacy-and-child-safeguarding-training-for-member-csos',
    category: 'news',
    date: 'April 12, 2026',
    deadline: '',
    location: 'Regional States, Ethiopia',
    excerpt: 'ECRAN will conduct a three-day intensive capacity building workshop focusing on child-led advocacy, ethical participation, and community protection systems for member organizations in the regional states.',
    body: '<p>As part of its organizational commitment to member capacity development, ECRAN is organizing a three-day training program on <strong>Child Safeguarding and Advocacy Methodologies</strong>.</p><p>The training equips field practitioners and program officers with standard operating protocols for ethical child engagement, safe reporting channels, and impact evaluation tools.</p>',
    image: '/brand/protection-card.svg',
    attachments: [],
    externalUrl: '',
    department: '',
    employmentType: '',
    ctaLabel: 'Read full story'
  },
  {
    title: 'Consultancy Service: Midterm Review of ECRAN Strategic Plan',
    slug: 'consultancy-service-midterm-review-of-ecran-strategic-plan',
    category: 'bid',
    date: 'May 10, 2026',
    deadline: 'June 2, 2026',
    location: 'ECRAN/RFP/2026/04',
    department: '',
    employmentType: '',
    excerpt: 'ECRAN invites qualified national consultants to submit proposals to conduct a comprehensive midterm review of our 5-year strategic plan, evaluating advocacy outcomes, partnership efficacy, and internal operations.',
    body: '<p>ECRAN invites eligible and certified consulting firms or independent experts to submit technical and financial proposals for the Midterm Evaluation of our Strategic Plan.</p><h3>Scope of Work</h3><ul><li>Assess progress toward strategic goals, outcomes, and milestone achievements.</li><li>Evaluate stakeholder engagement, governance effectiveness, and coalition sustainability.</li><li>Provide actionable recommendations for the remaining implementation period.</li></ul><p>Complete terms of reference (ToR) can be requested by emailing <a href="mailto:info@ecran-et.org">info@ecran-et.org</a> with reference <strong>ECRAN/RFP/2026/04</strong>.</p>',
    image: null,
    attachments: [],
    externalUrl: '',
    ctaLabel: 'Request tender documents'
  },
  {
    title: 'Supply and Delivery of IT Equipment and Networking Hardware',
    slug: 'supply-and-delivery-of-it-equipment-and-networking-hardware',
    category: 'bid',
    date: 'April 15, 2026',
    deadline: 'May 5, 2026',
    location: 'ECRAN/IT/2026/02',
    department: '',
    employmentType: '',
    excerpt: 'Bids are invited from eligible vendors for the supply of laptops, desktops, server infrastructure, and network configurations to support our new regional coordination nodes.',
    body: '<p>ECRAN announces a competitive bid for the procurement of office IT equipment and networking hardware.</p><p>Eligible suppliers registered with relevant Ethiopian regulatory bodies are invited to submit their bids in sealed envelopes or via our designated procurement channel.</p>',
    image: null,
    attachments: [],
    externalUrl: '',
    ctaLabel: 'Request tender documents'
  },
  {
    title: 'Joint Statement on Regional Child Rights Compliance in Ethiopia',
    slug: 'joint-statement-on-regional-child-rights-compliance-in-ethiopia',
    category: 'media',
    date: 'May 10, 2026',
    deadline: '',
    location: 'Press Release',
    department: '',
    employmentType: '',
    excerpt: 'Read the official statement jointly released by ECRAN and member CSOs regarding policy compliance checks across regional child protection structures.',
    body: '<p><strong>ADDIS ABABA</strong> — ECRAN and its coalition of 40+ member civil society organizations have issued a joint press statement highlighting the vital need for consistent child protection standard enforcement across all regional administrations.</p><p>The statement calls upon regional authorities to strengthen budget allocations for child welfare units, expedite response mechanisms for children at risk, and sustain regular dialogue with civil society partners.</p>',
    image: null,
    attachments: [],
    externalUrl: '',
    ctaLabel: 'Read press release'
  },
  {
    title: 'Consultative Assembly on Child Protection Systems',
    slug: 'consultative-assembly-on-child-protection-systems',
    category: 'media',
    date: 'May 2, 2026',
    deadline: '',
    location: 'Gallery',
    department: '',
    employmentType: '',
    excerpt: 'Photos and summaries from the multi-stakeholder policy dialogue convening 40+ member network delegates.',
    body: '<p>ECRAN convened a high-level consultative assembly in Addis Ababa, bringing together over 40 delegates from member organizations across Ethiopia.</p><p>Delegates shared regional case studies, reviewed protection protocol implementations, and developed joint advocacy actions.</p>',
    image: null,
    attachments: [],
    externalUrl: '',
    ctaLabel: 'View details'
  },
  {
    title: 'ECRAN Announces General Assembly & Executive Council Election Results',
    slug: 'ecran-announces-general-assembly-and-executive-council-election-results',
    category: 'media',
    date: 'April 15, 2026',
    deadline: '',
    location: 'Press Release',
    department: '',
    employmentType: '',
    excerpt: 'The network is proud to share updates from its first formal General Assembly, highlighting the appointment of its new Executive board members.',
    body: '<p>ECRAN concluded its General Assembly meeting, successfully electing new members to the Executive Board.</p><p>The newly appointed council brings diverse expertise from grassroots community development, legal advocacy, and academic research to steer the network’s strategic direction.</p>',
    image: null,
    attachments: [],
    externalUrl: '',
    ctaLabel: 'Read press release'
  }
]

export const staticPartners = [
  { name: 'Ministry of Women and Social Affairs (MoWSA)', url: 'https://mowsa.gov.et', logo: null },
  { name: 'Ethiopian Human Rights Commission (EHRC)', url: 'https://ehrc.org', logo: null },
  { name: 'Save the Children Ethiopia', url: 'https://ethiopia.savethechildren.net', logo: null },
  { name: 'UNICEF Ethiopia', url: 'https://www.unicef.org/ethiopia', logo: null },
  { name: 'Plan International Ethiopia', url: 'https://plan-international.org/ethiopia', logo: null },
  { name: 'ChildFund Ethiopia', url: 'https://www.childfund.org', logo: null },
  { name: 'African Child Policy Forum (ACPF)', url: 'https://africanchildforum.org', logo: null },
  { name: 'SOS Children’s Villages Ethiopia', url: 'https://www.sos-childrensvillages.org', logo: null }
]
