'use strict';

/**
 * One-off content seeder for the ECRAN CMS.
 *
 * Boots the BUILT Strapi app (needs `npm run build` first) and creates + publishes
 * starter entries for each collection, plus the Site Profile single type. Idempotent:
 * re-running skips entries whose slug already exists.
 *
 * Run on the server, inside the Node venv, from the app root:
 *   node scripts/seed.js
 */
const { createStrapi } = require('@strapi/strapi');

const slugify = (s) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const PROGRAMS = [
  { title: 'Evidence and Policy Advocacy', summary: 'Turning research, field learning, and child-rights data into policy asks that decision makers can act on.', order: 1 },
  { title: 'Child Protection Systems', summary: 'Supporting stronger prevention, reporting, referral, and response pathways for children at risk of violence or neglect.', order: 2 },
  { title: 'Child Participation', summary: 'Creating safe spaces where children and young people can contribute to decisions that affect their lives.', order: 3 },
  { title: 'Network Coordination', summary: 'Bringing civil society members, technical partners, and community actors together around shared advocacy priorities.', order: 4 },
];

const IMPACT_STORIES = [
  { title: 'A coordinated voice for child rights advocacy', location: 'Addis Ababa', excerpt: 'ECRAN convenes practitioners and advocates around a shared agenda: practical, evidence-led action for survival, development, protection, and participation.' },
  { title: 'From field evidence to policy dialogue', location: 'Regional partners', excerpt: 'The network helps translate local realities into concise briefs, partner conversations, and advocacy moments with public institutions.' },
  { title: 'Shared learning that travels', location: 'Member organizations', excerpt: 'Members exchange tools, case learning, and referral knowledge so strong practice can move across programs instead of staying isolated.' },
];

const RESOURCES = [
  { title: 'ECRAN organizational profile 2025', resourceType: 'Annual report', topic: 'Capacity Building', publishedOn: '2025-12-15', summary: "A comprehensive review of ECRAN's network achievements, financial statements, member directory, and strategic milestones reached throughout 2025." },
  { title: 'Child participation in local decision making', resourceType: 'Policy brief', topic: 'Participation', publishedOn: '2026-03-10', summary: 'Frameworks and practical recommendations to enhance meaningful child and youth participation in sub-city governance and community committees.' },
  { title: 'Evidence standards for child-rights advocacy', resourceType: 'Publication', topic: 'Advocacy', publishedOn: '2026-01-20', summary: 'Guidelines for civil society organizations on collecting, validating, and presenting field evidence to support policy advocacy with government ministries.' },
  { title: 'Partner inquiry and membership pack', resourceType: 'Toolkit', topic: 'Capacity Building', publishedOn: '2026-04-05', summary: 'Information package and registration toolkit for organizations and community-based groups seeking formal ECRAN membership.' },
  { title: 'Ethiopia child protection systems mapping report', resourceType: 'Annual report', topic: 'Child Protection', publishedOn: '2025-09-30', summary: 'An in-depth mapping of prevention, response, and referral systems for child safeguarding across formal government structures and local communities.' },
  { title: 'Safeguarding and ethical engagement toolkit', resourceType: 'Toolkit', topic: 'Child Protection', publishedOn: '2026-02-14', summary: "Practical tools, consent forms, and protocol checklists to ensure children's safety and ethical participation during advocacy campaigns and public dialogue." },
];

const SITE_PROFILE = {
  organizationName: 'Ethiopian Child Rights Advocacy Network',
  mission: 'Promote evidence-based advocacy for child rights in Ethiopia.',
  vision: 'A country where all children enjoy survival, development, protection, and participation rights.',
  legalStatus: 'Registered as a local organization under Proclamation No. 1113/2019.',
  registrationNumber: '7750',
  email: 'info@ecran-et.org',
  address: 'Addis Ababa, Ethiopia',
  tagline: 'Evidence-based advocacy for every Ethiopian child to survive, develop, be protected, and participate',
};

const GET_INVOLVED_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSefVosbpua5Zkh_CwGoPpwil4VCdnJAUOJhr4fsP0cspBtZ1A/viewform';

// Header navigation menu (tree). Mirrors the shape the frontend already expects.
const NAVIGATION = {
  items: [
    { label: 'Home', to: '/' },
    {
      label: 'About Us',
      to: '/who-we-are',
      children: [
        { label: 'About Us', to: '/who-we-are/about-us' },
        { label: 'Our Members', to: '/who-we-are/our-members' },
        { label: 'Our Team', to: '/who-we-are/our-team' },
      ],
    },
    {
      label: 'News',
      to: '/news',
      children: [
        { label: 'News', to: '/news/news' },
        { label: 'Media Center', to: '/news/media-center' },
        { label: 'Vacancies', to: '/news/vacancies' },
        { label: 'Bids', to: '/news/bids' },
      ],
    },
    { label: 'Resources', to: '/resources' },
    { label: 'Contact', to: '/contact' },
  ],
};

// Site-wide branding, SEO defaults, social links, footer, and chrome labels.
// `social`: fill any platform URL in the CMS (Global → social) to show its icon in
// the footer; empty values render nothing. `ui`: site-wide micro-copy (footer
// headings, header/footer "Get Involved" label, post-detail chrome) — every key
// falls back to the same copy in the frontend, so editing is optional.
const GLOBAL = {
  siteName: 'ECRAN',
  getInvolvedUrl: GET_INVOLVED_URL,
  defaultSeoTitle: 'ECRAN — Ethiopian Child Rights Advocacy Network',
  defaultSeoDescription:
    "ECRAN brings partners, communities, and decision-makers together to turn evidence into action for children's rights in Ethiopia.",
  social: {
    facebook: '',
    x: '',
    linkedin: 'https://www.linkedin.com/company/ecran-ethiopian-child-right-advocacy-network/',
    instagram: '',
    youtube: '',
    telegram: '',
  },
  footerTagline:
    'Evidence-based advocacy for every Ethiopian child to survive, develop, be protected, and participate',
  footerQuickLinks: [
    { label: 'Who We Are', to: '/who-we-are/about-us' },
    { label: 'News & Announcements', to: '/news/announcements' },
    { label: 'Resources', to: '/resources' },
    { label: 'Contact', to: '/contact' },
  ],
  footerLegalLinks: [
    { label: 'Privacy Policy', to: '/privacy-policy' },
    { label: 'Terms of Service', to: '/terms-of-service' },
  ],
  ui: {
    getInvolvedLabel: 'Get Involved',
    footerHeadings: { registration: 'Registration', quickLinks: 'Quick Links', contact: 'Contact' },
    registrationLabel: 'Registration No:',
    copyrightSuffix: 'All rights reserved.',
    backToNewsLabel: 'Back to News',
    attachmentsHeading: 'Attachments',
    postNotFoundTitle: 'Story not found',
    postNotFoundText: 'This story may have been moved or unpublished.',
    factLabels: { department: 'Department', type: 'Type', location: 'Location / Ref', deadline: 'Deadline' },
    categoryLabels: { news: 'News', vacancy: 'Vacancy', bid: 'Bid / Tender', media: 'Media', announcement: 'Announcement' },
    defaultCtaLabel: 'Learn more',
    errorPage: {
      notFoundTitle: 'Page not found',
      notFoundText: 'The page you are looking for may have been moved or removed.',
      genericTitle: 'Something went wrong',
      genericText: 'An unexpected error occurred. Please try again in a moment.',
      homeLabel: 'Back to homepage',
    },
  },
};

// News-area posts (single collection, category field). Mirrors the copy the
// frontend ships as fallback so the CMS starts fully populated.
const POSTS = [
  { title: 'National Child Rights Advocacy Summit 2026 Announced', category: 'news', publishDate: '2026-05-15', excerpt: 'ECRAN is hosting the annual Child Rights Advocacy Summit next month in Addis Ababa, convening civil society organizations, government officials, and international development partners to align on national child protection policies.' },
  { title: 'Launch of the CSOs Complimentary Report on Child Rights', category: 'news', publishDate: '2026-04-28', excerpt: 'We are pleased to announce the upcoming launch of our Complimentary Report on the implementation of the UN Convention on the Rights of the Child (UNCRC) in Ethiopia. A stakeholder validation workshop will be held next week.' },
  { title: 'Advocacy & Child Safeguarding Training for Member CSOs', category: 'news', publishDate: '2026-04-12', excerpt: 'ECRAN will conduct a three-day intensive capacity building workshop focusing on child-led advocacy, ethical participation, and community protection systems for member organizations in the regional states.' },
  { title: 'Senior Policy Advocacy Officer', category: 'vacancy', publishDate: '2026-05-01', deadline: '2026-06-05', location: 'Addis Ababa, Ethiopia', excerpt: 'ECRAN is looking for an experienced advocate to lead our policy engagement and coordinate research initiatives, translating child-rights field evidence into policy briefs.' },
  { title: 'Monitoring, Evaluation, & Learning (MEL) Specialist', category: 'vacancy', publishDate: '2026-05-01', deadline: '2026-06-12', location: 'Addis Ababa (with regional travel)', excerpt: 'We are seeking a MEL Specialist to design and implement monitoring systems across network activities, helping to track the implementation of regional and national child-rights advocacy.' },
  { title: 'Consultancy Service: Midterm Review of ECRAN Strategic Plan', category: 'bid', publishDate: '2026-05-10', deadline: '2026-06-02', location: 'ECRAN/RFP/2026/04', excerpt: 'ECRAN invites qualified national consultants to submit proposals to conduct a comprehensive midterm review of our 5-year strategic plan, evaluating advocacy outcomes, partnership efficacy, and internal operations.' },
  { title: 'Supply and Delivery of IT Equipment and Networking Hardware', category: 'bid', publishDate: '2026-04-15', deadline: '2026-05-05', location: 'ECRAN/IT/2026/02', excerpt: 'Bids are invited from eligible vendors for the supply of laptops, desktops, server infrastructure, and network configurations to support our new regional coordination nodes.' },
  { title: 'Joint Statement on Regional Child Rights Compliance in Ethiopia', category: 'media', publishDate: '2026-05-10', location: 'Press Release', excerpt: 'Read the official statement jointly released by ECRAN and member CSOs regarding policy compliance checks across regional child protection structures.' },
  { title: 'Consultative Assembly on Child Protection Systems', category: 'media', publishDate: '2026-05-02', location: 'Gallery', excerpt: 'Photos and summaries from the multi-stakeholder policy dialogue convening 40+ member network delegates.' },
  { title: 'ECRAN Announces General Assembly & Executive Council Election Results', category: 'media', publishDate: '2026-04-15', location: 'Press Release', excerpt: 'The network is proud to share updates from its first formal General Assembly, highlighting the appointment of its new Executive board members.' },
];

// Editable copy for every static page (slug is what the frontend queries). Each
// page's `sections` mirrors EVERY key the frontend reads, so nothing renders from
// a hardcoded fallback once seeded.
const PAGES = [
  {
    title: 'Home', slug: 'home',
    heroTitle: 'Evidence-led advocacy for every child in Ethiopia.',
    heroText: "ECRAN brings partners, communities, and decision-makers together to turn evidence into action for children's rights.",
    sections: {
      heroSignals: ['Policy evidence', 'Child protection', 'Participation'],
      heroImageAlt: 'Ethiopian children standing together outdoors in school uniforms',
      partnerCtaLabel: 'Partner with ECRAN',
      secondaryCtaLabel: 'Learn more about us',
      partnersHeading: 'Our partners',
      showcaseEyebrow: 'What ECRAN makes possible',
      showcaseTitle: 'A stronger public platform for child-rights evidence, partnership, and accountability.',
      showcaseText: 'ECRAN connects field experience, civil society coordination, and policy dialogue so advocacy work can move with a shared public mandate.',
      showcaseLinkLabel: 'Read about ECRAN',
      manifestoLabels: ['Mission', 'Vision', 'Legal status'],
      objectivesEyebrow: 'Network Focus',
      objectivesTitle: 'Stated Objectives',
      objectivesSummary: 'Ten formal objectives, organized into four workstreams so the homepage reads like a strategy rather than a charter document.',
      objectivesCount: '10',
      objectivesCountLabel: 'stated objectives',
      objectivesDetailsLabel: 'Read formal objectives',
      objectives: [
        { range: '01, 09', title: 'Coordinate the network', text: 'Align CSOs, CBOs, members, and national or regional partners around a shared child-rights advocacy agenda.', items: ['Coordinate efforts by CSOs and Community-Based Organizations engaged in advocacy and promotion of the rights of children.', 'Establish and strengthen partnerships and membership with other networks at national, regional and international level.'] },
        { range: '02, 03, 05', title: 'Influence policy and accountability', text: 'Work with public institutions and development partners to shape policy, monitor commitments, and support reporting.', items: ['Liaise with government departments, line ministries and development partners on policy formulation, implementation and monitoring of child-rights instruments.', "Contribute to CSO complementary reports on Ethiopia's commitments to UN and African child-rights mechanisms.", "Work with duty bearers and stakeholders to monitor national, regional and international frameworks concerning children's rights."] },
        { range: '04, 06, 10', title: 'Build capacity and dialogue', text: 'Equip members, leaders, and institutions to advocate, share data, and respond to common challenges facing children.', items: ['Build member capacity in advocacy work, data organization, child-rights promotion, and program development across Ethiopia.', 'Organize dialogue platforms for members to deliberate on shared challenges faced by children and practical ways to address them.', 'Organize training and advocacy programs for public, private, and not-for-profit leaders to become competent child-rights advocates.'] },
        { range: '07, 08', title: 'Generate evidence for action', text: 'Produce research, briefs, reports, and information products that help decision-makers design better interventions for children.', items: ['Undertake basic and action-oriented research, serve as a data clearing house, and produce physical and web-based reports for child-focused programs.', "Prepare evidence-based policy papers and briefs on children's rights for policy makers and practitioners."] },
      ],
      newsEyebrow: 'Latest updates',
      newsTitle: 'Stories from the network',
      newsLinkLabel: 'Read story',
      resourcesEyebrow: 'Resource Library',
      resourcesHeading: 'Reports, briefs, and tools in one accessible center.',
      resourcesCtaLabel: 'View all resources',
    },
  },
  {
    title: 'Impact Stories', slug: 'impact-stories',
    heroTitle: "Stories from ECRAN's network of child-rights advocates.",
    heroText: 'These stories highlight how shared evidence, member coordination, and policy dialogue help child-rights work travel further.',
    sections: {
      heroEyebrow: 'Impact stories',
      connectCtaLabel: 'Connect with ECRAN',
    },
  },
  {
    title: 'News Hub', slug: 'news-hub',
    heroTitle: 'ECRAN news hub',
    heroText: "Follow ECRAN's progress, explore career opportunities, browse media releases, and view active procurement notices.",
    sections: {
      iconPaths: [
        'M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M11,6V12L16.25,15.15L17,13.92L12.5,11.25V6H11Z',
        'M4,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M4,6V18H20V6H4M6,9H9V12H6V9M11,9H18V10H11V9M11,11H18V12H11V11M6,14H18V15H6V14Z',
        'M20,6C20.58,6 21.05,6.2 21.42,6.59C21.8,7 22,7.47 22,8V18C22,18.58 21.8,19.05 21.42,19.42C21.05,19.8 20.58,20 20,20H4C3.42,20 2.95,19.8 2.58,19.42C2.2,19.05 2,18.58 2,18V8C2,7.47 2.2,7 2.58,6.59C2.95,6.2 3.42,6 4,6H8V4C8,3.42 8.2,2.95 8.58,2.58C8.95,2.2 9.42,2 10,2H14C14.58,2 15.05,2.2 15.42,2.58C15.8,2.95 16,3.42 16,4V6H20M10,4V6H14V4H10M20,8H4V18H20V8Z',
        'M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20M8,12H16V14H8V12M8,16H16V18H8V16Z',
      ],
      cards: [
        { title: 'News', text: "Read about ECRAN's latest public updates, child-rights summits, workshops, and network reports.", linkLabel: 'Go to news', linkTo: '/news/news' },
        { title: 'Media Center', text: "Access ECRAN's press statements, official joint releases, and multi-stakeholder gallery archives.", linkLabel: 'Go to media center', linkTo: '/news/media-center' },
        { title: 'Vacancies', text: "Join ECRAN's team. Explore professional roles, consultancies, and career paths in child-rights advocacy.", linkLabel: 'Go to vacancies', linkTo: '/news/vacancies' },
        { title: 'Bids & Tenders', text: 'View open requests for proposals, consultancy services, and procurement notices for ECRAN projects.', linkLabel: 'Go to bids', linkTo: '/news/bids' },
      ],
    },
  },
  {
    title: 'News', slug: 'news', heroTitle: 'News & Updates', heroText: "Stay up to date with ECRAN's latest public announcements, press releases, events, advocacy campaigns, and workshops.",
    sections: { badgeLabel: 'News', readMoreLabel: 'Read full story' },
  },
  {
    title: 'Vacancies', slug: 'vacancies', heroTitle: 'Vacancies', heroText: "Join ECRAN and help us shape policy, build community capacity, and protect children's rights across Ethiopia.",
    sections: { typeBadge: 'Vacancy', ctaLabel: 'Apply now', locationLabel: 'Location:', deadlineLabel: 'Deadline:' },
  },
  {
    title: 'Announcements', slug: 'announcements', heroTitle: 'News & Announcements', heroText: "Stay up to date with ECRAN's latest public announcements, press releases, events, advocacy campaigns, and workshops.",
    sections: { badgeLabel: 'Announcement', readMoreLabel: 'Read full story' },
  },
  {
    title: 'Bids', slug: 'bids', heroTitle: 'Bids & Tenders', heroText: 'View open procurement bids, requests for proposals (RFPs), and consultancy opportunities with ECRAN.',
    sections: { refFallback: 'ECRAN', ctaLabel: 'Request tender documents', refLabel: 'Ref:', publishedLabel: 'Published:', deadlineLabel: 'Deadline:', statusOpenLabel: 'Open', statusClosedLabel: 'Closed' },
  },
  {
    title: 'Media Center', slug: 'media-center', heroTitle: 'Media Center', heroText: 'Access press releases, official statements, event photo galleries, and institutional video resources.',
    sections: { typeLabel: 'Press Release', ctaLabel: 'View details' },
  },
  {
    title: 'Contact', slug: 'contact',
    heroTitle: 'Reach ECRAN for inquiries, partnership conversations, and resource coordination.',
    heroText: 'Have a question or want to get involved? Use the form below to get in touch with our team or find our office location details.',
    body: 'Our team is available to discuss collaborations, policy questions, and membership processes. We aim to respond to all inquiries within two business days.',
    sections: {
      heroEyebrow: 'Contact us',
      connectLabel: 'Connect',
      getInTouchHeading: 'Get in touch',
      inquiryPortalLabel: 'Inquiry Portal',
      sendMessageHeading: 'Send a message',
      registrationPrefix: 'No. ',
      detailLabels: { email: 'Email', location: 'Location', registration: 'ACSO Registration' },
      form: { namePlaceholder: 'Your name', emailPlaceholder: 'Your email address', subjectPlaceholder: 'Subject (optional)', messagePlaceholder: 'How can we help you?' },
      successMessage: 'Message sent successfully!',
      errorMessage: 'Something went wrong. Please try again or email us directly.',
      submitLabel: 'Send message',
    },
  },
  {
    title: 'Our Team', slug: 'our-team',
    heroTitle: 'Small enough to stay focused, connected enough to support a national platform.',
    heroText: 'The team works with board leadership, members, partners, and stakeholders to coordinate advocacy priorities, manage organizational communication, and support resource mobilization for child-rights work.',
    body: "Meet the coordination team supporting ECRAN's members, board, and partners.",
    sections: {
      roleEyebrow: 'Team role',
      principlesLabel: 'Working principles',
      directoryEyebrow: 'Our Team',
      directoryTitle: 'Staff & leadership',
      emptyState: 'Team profiles are published here once added in the CMS.',
      principles: ['Evidence before messaging', 'Safeguarding in every engagement', 'Clear accountability to members', 'Practical coordination over visibility for its own sake'],
    },
  },
  {
    title: 'Our Members', slug: 'our-members',
    heroTitle: 'Members make the work credible because they stay close to children, families, and local systems.',
    heroText: 'ECRAN is designed for organizations and practitioners committed to child protection, participation, development, and evidence-led policy engagement. The network helps members move from isolated learning to coordinated advocacy.',
    body: 'Member profiles are structured around contribution, geography, and child-rights focus areas so visitors can understand how the network works in practice.',
    sections: {
      heroEyebrow: 'Membership platform',
      commitmentsLabel: 'Member commitments',
      ctaLabel: 'Get involved',
      directoryEyebrow: 'Network Members',
      directoryTitle: 'ECRAN coalition partners',
      memberLinkLabel: 'Visit website',
      emptyState: 'Member organizations are published here once added in the CMS.',
      commitments: ['Child safeguarding and ethical participation', 'Evidence-informed public communication', 'Respectful coordination across civil society', 'Practical learning that can be shared'],
    },
  },
  {
    title: 'Who We Are', slug: 'who-we-are',
    heroTitle: 'An Ethiopian network built for credible, coordinated child-rights advocacy.',
    heroText: 'ECRAN is an independent not-for-profit organization established in 2025 and registered by the Agency for Civil Societies Organizations as a local organization.',
    body: 'The network strengthens visibility, communication, partnership engagement, and resource mobilization for child-rights work in Ethiopia. It exists to help members and partners move from fragmented concern to coordinated advocacy.',
    sections: {
      heroEyebrow: 'Who we are',
      backgroundEyebrow: 'Background',
      backgroundTitle: 'Designed to connect evidence with the people who can act on it.',
      cards: [
        { title: 'About Us', text: "ECRAN's purpose, mission, vision, legal status, and evidence-led approach to child-rights advocacy.", linkLabel: 'Read about us', linkTo: '/who-we-are/about-us' },
        { title: 'Our Members', text: 'The organizations and practitioners who contribute field learning, technical expertise, and shared advocacy priorities.', linkLabel: 'Meet our members', linkTo: '/who-we-are/our-members' },
        { title: 'Our Team', text: 'The coordination team supporting governance, programs, partnerships, communication, and accountable delivery.', linkLabel: 'See our team', linkTo: '/who-we-are/our-team' },
        { title: 'Governance', text: "Transparent leadership, board oversight, and member-informed priorities guide ECRAN's advocacy agenda." },
      ],
    },
  },
  {
    title: 'About Us', slug: 'about-us',
    heroTitle: 'An Ethiopian child-rights advocacy network built around evidence, coordination, and accountability.',
    heroText: "ECRAN brings civil society actors, technical partners, and public stakeholders around a shared agenda for children's survival, development, protection, and participation.",
    body: 'Established in 2025, ECRAN strengthens visibility, communication, partnership engagement, and resource mobilization for child-rights work in Ethiopia. The network helps turn fragmented concern into coordinated, evidence-led advocacy.',
    sections: {
      heroEyebrow: 'About ECRAN',
      purposeEyebrow: 'Purpose',
      purposeTitle: "Connecting field realities with the advocacy decisions that shape children's lives.",
      objectivesEyebrow: 'Network Objectives',
      objectivesTitle: 'Ten commitments turned into four workstreams.',
      objectivesSub: 'Each cluster organises the formal objectives into a working logic: network coordination, policy influence, capacity building, and evidence generation.',
      heroMeta: [
        { strong: 'Est.', text: '2025' },
        { strong: 'Reg.', text: 'ACSO No. 7750' },
        { strong: '10', text: 'objectives' },
        { strong: '4', text: 'focus areas' },
      ],
      pillars: [
        { index: '01', name: 'Evidence', desc: 'Grounding every position in field data and documented realities.' },
        { index: '02', name: 'Coordination', desc: 'Aligning CSOs, partners, and communities around a shared agenda.' },
        { index: '03', name: 'Accountability', desc: 'Holding duty-bearers to national and international child-rights commitments.' },
      ],
      howWeWork: { title: 'How We Work', text: 'Listen to communities, document evidence, convene partners, and advocate for policy and practice changes children can feel.' },
      governanceLabels: { mission: 'Mission', vision: 'Vision', legalStatus: 'Legal Status' },
      objectives: [
        { range: '01, 09', title: 'Coordinate the Network', open: true, summary: 'Align CSOs, CBOs, members, and national or regional partners around a shared child-rights advocacy agenda.', items: ['Coordinate efforts by CSOs and Community-Based Organizations engaged in advocacy and promotion of the rights of children.', 'Establish and strengthen partnerships and membership with other networks at national, regional, and international levels.'] },
        { range: '02, 03, 05', title: 'Influence Policy & Accountability', summary: 'Work with public institutions and development partners to shape policy, monitor commitments, and support reporting.', items: ['Liaise with government departments, line ministries, and development partners on policy formulation, implementation, and monitoring of child-rights instruments.', "Contribute to CSO complementary reports on Ethiopia's commitments to UN and African child-rights mechanisms.", "Work with duty-bearers and stakeholders to monitor national, regional, and international frameworks concerning children's rights."] },
        { range: '04, 06, 10', title: 'Build Capacity & Dialogue', summary: 'Equip members, leaders, and institutions to advocate, share data, and respond to common challenges facing children.', items: ['Build member capacity in advocacy work, data organisation, child-rights promotion, and program development across Ethiopia.', 'Organise dialogue platforms for members to deliberate on shared challenges faced by children and practical ways to address them.', 'Organise training and advocacy programs for public, private, and not-for-profit leaders to become competent child-rights advocates.'] },
        { range: '07, 08', title: 'Generate Evidence for Action', summary: 'Produce research, briefs, reports, and information products that help decision-makers design better interventions for children.', items: ['Undertake basic and action-oriented research, serve as a data clearing house, and produce physical and web-based reports for child-focused programs.', "Prepare evidence-based policy papers and briefs on children's rights for policy makers and practitioners."] },
      ],
      cta: { title: 'Ready to advance child rights in Ethiopia?', text: 'Join the network, share evidence, or partner with ECRAN to build a stronger public mandate for every child.', primaryLabel: 'Partner with ECRAN', primaryTo: '/get-involved', secondaryLabel: 'View network members', secondaryTo: '/who-we-are/our-members' },
    },
  },
  {
    title: 'Get Involved', slug: 'get-involved',
    heroTitle: 'Partner with ECRAN to strengthen child-rights advocacy in Ethiopia.',
    heroText: 'ECRAN works with civil society organizations, public institutions, donors, researchers, and community actors who want evidence to move into coordinated action.',
    sections: {
      heroEyebrow: 'Get involved',
      cards: [
        { title: 'Become a member', text: 'Join a coordinated network of organizations committed to child survival, development, protection, and participation.', linkLabel: 'Start a membership inquiry', linkTo: '/contact' },
        { title: 'Partner on advocacy', text: 'Collaborate on evidence briefs, policy dialogue, public campaigns, and shared accountability moments.', linkLabel: 'Explore current resources', linkTo: '/resources' },
        { title: 'Support capacity building', text: 'Help member organizations strengthen safeguarding practice, data use, child participation, and advocacy planning.', linkLabel: 'View member network', linkTo: '/who-we-are/our-members' },
        { title: 'Share opportunities', text: "Send consultancies, events, procurement notices, and coalition opportunities that can serve ECRAN's members.", linkLabel: 'Contact the coordination team', linkTo: '/contact' },
      ],
    },
  },
  {
    title: 'Our Works', slug: 'our-works',
    heroTitle: 'Programs and initiatives advancing child rights across Ethiopia.',
    heroText: 'ECRAN coordinates evidence-based programs that strengthen child protection systems, participation, and policy advocacy at national and regional levels.',
    body: "Our works span research, capacity building, policy dialogue, and direct network coordination — all focused on turning field learning into change for children's rights in Ethiopia.",
    sections: {
      heroEyebrow: 'Our Works / ሥራዎቻችን',
      approachEyebrow: 'Our approach',
      approachTitle: 'From evidence to coordinated action for children.',
      cards: [
        { title: 'ASFP', text: "Advocacy and Social Frontline Program — coordinating frontline civil society actors for stronger child-rights advocacy across Ethiopia's regions.", linkLabel: 'Learn about ASFP', linkTo: '/our-works/asfp' },
        { title: 'Evidence & Policy', text: 'Turning research, field learning, and child-rights data into policy asks that decision makers can act on.' },
        { title: 'Child Protection Systems', text: 'Supporting stronger prevention, reporting, referral, and response pathways for children at risk of violence or neglect.' },
        { title: 'Child Participation', text: 'Creating safe spaces where children and young people can contribute to decisions that affect their lives.' },
      ],
    },
  },
  {
    title: 'ASFP', slug: 'asfp',
    heroTitle: 'Advocacy and Social Frontline Program',
    heroText: "ASFP coordinates frontline civil society organizations to strengthen child-rights advocacy, protection systems, and community-level accountability across Ethiopia's regions.",
    body: 'ASFP builds structured bridges between community-level practitioners, regional networks, and national policy processes — ensuring the realities children face inform the decisions that shape their futures.',
    sections: {
      heroEyebrow: 'Our Works — ASFP',
      focusEyebrow: 'Program focus',
      focusTitle: 'Bringing frontline voices into national policy dialogue.',
      cards: [
        { title: 'Frontline Coordination', text: 'Connecting CSOs and CBOs working directly with children into a structured advocacy coalition with a shared public mandate.' },
        { title: 'Capacity Building', text: 'Equipping member organizations with evidence tools, advocacy skills, and data practices that strengthen their field work.' },
        { title: 'Policy Interface', text: 'Translating frontline evidence into concise briefs, reports, and dialogue moments with public institutions and development partners.' },
        { title: 'Community Accountability', text: "Supporting local-level monitoring of children's rights commitments and creating feedback pathways between communities and decision-makers." },
      ],
      ctaEyebrow: 'Get involved',
      ctaTitle: 'Join the ASFP coalition.',
      ctaText: 'Organizations working at the frontline of child-rights advocacy in Ethiopia are invited to connect with ECRAN and explore how ASFP can strengthen their work.',
      ctaLabel: 'Express interest',
    },
  },
  {
    title: 'Privacy Policy', slug: 'privacy-policy',
    heroTitle: 'Privacy Policy',
    sections: {
      eyebrow: 'Legal',
      contactHeading: 'Contact Us',
      lastUpdated: 'June 2026',
      blocks: [
        { lead: 'ECRAN is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information when you visit our website or interact with our organization.' },
        { title: 'Information We Collect', paragraphs: ["We collect personal information — such as your name and email address — only when you voluntarily contact us or subscribe to our updates. We also gather non-personal data through cookies to improve our website's performance and user experience."] },
        { title: 'How We Use Your Information', paragraphs: ['We use your information to:'], list: ['Respond to your inquiries and messages', 'Send advocacy updates and relevant communications', 'Enhance and improve our services'] },
        { title: "Children's Privacy", paragraphs: ["We take children's privacy seriously. ECRAN does not knowingly collect data from children under 18 without verifiable parental consent. If you believe we have inadvertently collected such information, please contact us immediately."] },
        { title: 'Your Rights', paragraphs: ['You have the right to access, correct, or request deletion of your personal data at any time. To exercise these rights or for any privacy-related questions, please contact us.'] },
      ],
    },
  },
  {
    title: 'Terms of Service', slug: 'terms-of-service',
    heroTitle: 'Terms of Service',
    sections: {
      eyebrow: 'Legal',
      lastUpdated: 'June 2026',
      blocks: [
        { lead: 'By using the ECRAN website, you agree to these Terms of Service. Please read them carefully before accessing or using our site.' },
        { title: 'Permitted Use', paragraphs: ['You may use this website for lawful, non-commercial purposes only. Any use of this site for illegal activities or in violation of applicable laws is strictly prohibited.'] },
        { title: 'Intellectual Property', paragraphs: ['All content on this website — including text, images, and reports — belongs to ECRAN or its partners and is protected by copyright. No reproduction or commercial use of any content is permitted without prior written permission from ECRAN.'] },
        { title: 'Disclaimer of Warranties', paragraphs: ['We provide information on this website in good faith but make no guarantees regarding its accuracy, completeness, or fitness for any particular purpose. Content may be updated without notice.'] },
        { title: 'Limitation of Liability', paragraphs: ['ECRAN is not liable for any direct, indirect, incidental, or consequential damages arising from your use of, or inability to use, this website or its content.'] },
        { title: 'Governing Law', paragraphs: ['These Terms are governed by and construed in accordance with the laws of Ethiopia. Any disputes arising under these Terms shall be subject to the jurisdiction of Ethiopian courts.'] },
        { title: 'Changes to These Terms', paragraphs: ['We may update these Terms at any time. Continued use of the website after any changes constitutes your acceptance of the revised Terms.'] },
      ],
    },
  },
  {
    title: 'Resources', slug: 'resources',
    heroTitle: 'Resource Repository',
    heroText: 'Browse ECRAN reports, policy briefs, publications, and toolkits — filter by type and topic to find what you need.',
    sections: {
      filterTypes: ['All', 'Report', 'Policy Brief', 'Publication', 'Toolkit'],
      filterTopics: ['All', 'Child Protection', 'Participation', 'Advocacy', 'Capacity Building'],
      filterLabels: { search: 'Search', type: 'Resource Type', topic: 'Topic' },
      searchPlaceholder: 'Search resources...',
      allTypesLabel: 'All Types',
      allTopicsLabel: 'All Topics',
      resetLabel: 'Reset Filters',
      resultsShowing: 'Showing',
      resourceNoun: 'resource',
      sortLabel: 'Sort by:',
      sortOptions: [
        { value: 'latest', label: 'Latest' },
        { value: 'oldest', label: 'Oldest' },
        { value: 'title', label: 'Title A-Z' },
      ],
      downloadLabel: 'Download Resource',
      noResults: { title: 'No resources found', text: 'Try adjusting your search terms or filter selections.' },
    },
  },
];

async function seedCollection(strapi, uid, rows, upsert = false) {
  let created = 0;
  for (const row of rows) {
    const slug = row.slug || slugify(row.title);
    const existing = await strapi.documents(uid).findMany({ filters: { slug }, status: 'published' });
    if (existing && existing.length) {
      if (upsert) {
        await strapi.documents(uid).update({ documentId: existing[0].documentId, data: { ...row, slug } });
        await strapi.documents(uid).publish({ documentId: existing[0].documentId });
        console.log(`  updated: ${uid} "${row.title}"`);
      } else {
        console.log(`  skip (exists): ${uid} "${row.title}"`);
      }
      continue;
    }
    const doc = await strapi.documents(uid).create({ data: { ...row, slug } });
    await strapi.documents(uid).publish({ documentId: doc.documentId });
    created += 1;
    console.log(`  created + published: ${uid} "${row.title}"`);
  }
  return created;
}

async function seedSingle(strapi, uid, data, upsert = false) {
  const current = await strapi.documents(uid).findFirst({ status: 'published' });
  if (current && current.organizationName) {
    if (upsert) {
      await strapi.documents(uid).update({ documentId: current.documentId, data });
      await strapi.documents(uid).publish({ documentId: current.documentId });
      console.log(`  updated: ${uid}`);
    } else {
      console.log(`  skip (exists): ${uid}`);
    }
    return 0;
  }
  const doc = await strapi.documents(uid).create({ data });
  await strapi.documents(uid).publish({ documentId: doc.documentId });
  console.log(`  created + published: ${uid}`);
  return 1;
}

// Generic single-type seeder: create + publish if none exists yet.
async function seedSingleGeneric(strapi, uid, data, upsert = false) {
  const current = await strapi.documents(uid).findFirst({ status: 'published' });
  if (current) {
    if (upsert) {
      await strapi.documents(uid).update({ documentId: current.documentId, data });
      await strapi.documents(uid).publish({ documentId: current.documentId });
      console.log(`  updated: ${uid}`);
    } else {
      console.log(`  skip (exists): ${uid}`);
    }
    return 0;
  }
  const doc = await strapi.documents(uid).create({ data });
  await strapi.documents(uid).publish({ documentId: doc.documentId });
  console.log(`  created + published: ${uid}`);
  return 1;
}

/**
 * Seed all starter content using an EXISTING Strapi instance. Idempotent
 * (skips entries whose slug already exists). Called both by the CLI wrapper
 * below and by the app bootstrap (src/index.ts) on a fresh/empty database.
 */
async function runSeed(strapi, opts = {}) {
  const upsert = !!opts.upsert;
  const log = (strapi && strapi.log) || console;
  log.info(`Seeding ECRAN content${upsert ? ' (upsert)' : ''}...`);
  await seedCollection(strapi, 'api::program.program', PROGRAMS, upsert);
  await seedCollection(strapi, 'api::impact-story.impact-story', IMPACT_STORIES, upsert);
  await seedCollection(strapi, 'api::resource.resource', RESOURCES, upsert);
  await seedCollection(strapi, 'api::post.post', POSTS, upsert);
  await seedCollection(strapi, 'api::page.page', PAGES, upsert);
  await seedSingle(strapi, 'api::site-profile.site-profile', SITE_PROFILE, upsert);
  await seedSingleGeneric(strapi, 'api::global.global', GLOBAL, upsert);
  await seedSingleGeneric(strapi, 'api::navigation.navigation', NAVIGATION, upsert);
  log.info('Seed complete.');
}

module.exports = { runSeed };

// Direct invocation: `node scripts/seed.js` — boots the built app, seeds, exits.
if (require.main === module) {
  (async () => {
    const strapi = await createStrapi({ distDir: './dist' }).load();
    try {
      await runSeed(strapi);
    } catch (err) {
      console.error('Seed failed:', err);
      process.exitCode = 1;
    } finally {
      await strapi.destroy();
      process.exit(process.exitCode || 0);
    }
  })();
}
