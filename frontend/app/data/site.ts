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
  { label: 'Resources', to: '/resources' },
  { label: 'Contact', to: '/contact' }
]

export const programs = [
  {
    title: 'Evidence and Policy Advocacy',
    text: 'Turning research, field learning, and child-rights data into policy asks that decision makers can act on.',
    image: '/brand/evidence-card.svg'
  },
  {
    title: 'Child Protection Systems',
    text: 'Supporting stronger prevention, reporting, referral, and response pathways for children at risk of violence or neglect.',
    image: '/brand/protection-card.svg'
  },
  {
    title: 'Child Participation',
    text: 'Creating safe spaces where children and young people can contribute to decisions that affect their lives.',
    image: '/brand/participation-card.svg'
  },
  {
    title: 'Network Coordination',
    text: 'Bringing civil society members, technical partners, and community actors together around shared advocacy priorities.',
    image: '/brand/network-card.svg'
  }
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
