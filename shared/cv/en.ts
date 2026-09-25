import type { CvData } from './types';

/** English CV. See de.ts for the meaning of "[TODO]" bullets. */
export const cvEn: CvData = {
  locale: 'en',
  name: 'Florian Heuberger',
  title: 'Senior Fullstack Developer',
  focus: 'Vue, Nuxt, TypeScript and Node.js',
  tagline:
    'From master baker to Nuxt core contributor - coding since 2000, 17 years of leadership, both full-time since 2022.',
  claim: [
    'I have been writing code since 2000, full-time since 2022.',
    'No computer science degree. Programming was never a job to me, it was a calling – today it is both.',
  ],
  location: 'Upper Palatinate, Bavaria. Remote and hybrid.',
  availability: 'Employed at DADG · open to open-source collaboration',
  links: [
    { label: 'GitHub', href: 'https://github.com/Flo0806', icon: 'i-simple-icons-github' },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/florian-heuberger-93700b166/',
      icon: 'i-simple-icons-linkedin',
    },
    { label: 'npm', href: 'https://www.npmjs.com/~flogersoft', icon: 'i-simple-icons-npm' },
    {
      label: 'Bluesky',
      href: 'https://bsky.app/profile/flo-heuberger.bsky.social',
      icon: 'i-simple-icons-bluesky',
    },
    { label: 'Email', href: 'mailto:fh@flogersoft.de', icon: 'i-heroicons-envelope' },
  ],
  summary: [
    'Senior Fullstack Developer focused on Vue, Nuxt, TypeScript and Node.js, member of the Nuxt ecosystem: I contribute to **Nuxt** and maintain several packages of my own.',
    'Before that came a different path - master craftsman certificate in baking, team lead, six years as a regional sales manager, then my own company.',
    'Today I lead a team of four junior developers at DADG, train an apprentice software developer and build a Flutter app alongside web applications.',
  ],
  facts: [
    {
      value: '#1',
      label: 'Nuxtathon 2026',
      note: '66 core issues in 48 hours, 1st of 34',
      href: 'https://nuxtathon.live',
    },
    {
      value: '20+',
      label: 'packages published',
      note: 'as maintainer: vorm, jasy, nuxt-spyglass',
    },
    { value: '4+1', label: 'in the team', note: 'four developers led, one apprentice in training' },
    { value: '150+', label: 'machines live', note: 'OEE dashboard at Kiefel, worldwide' },
    {
      value: '350',
      label: 'people led',
      note: '12 locations, €25M revenue - in the years before',
    },
  ],
  awards: [
    {
      title: 'Champion - Nuxtathon #1',
      org: 'Nuxt Community Hackathon',
      date: '2026-07',
      description:
        'The first community hackathon on the Nuxt core repository: 66 issues closed through 9 merged pull requests in 48 hours - 1st of 34 participants. I also built the live leaderboard of the event (nuxtathon.live).',
      href: 'https://nuxtathon.live',
    },
  ],
  principles: [
    {
      title: 'AI as a tool, not as the author',
      text: 'I work with AI agents every day - I direct them, give them context, and review every line. No vibe coding: nothing enters a repository that I have not understood and reviewed. I built the tooling side myself - nuxt-spyglass gives agents the logs they need to debug.',
      icon: 'i-heroicons-cpu-chip',
    },
    {
      title: 'Stability first',
      text: 'Strict TypeScript end to end, automated tests, linting and formatting enforced in CI. An application is done when it still runs cleanly under load and after the third refactoring.',
      icon: 'i-heroicons-shield-check',
    },
    {
      title: 'Reviews as a leadership tool',
      text: 'Every pull request gets read, mine included. With juniors and the apprentice, reviews and pair programming are training, not control - that is how four juniors become a team that reviews itself.',
      icon: 'i-heroicons-users',
    },
    {
      title: 'Every dependency needs a reason',
      text: 'jano is a full terminal editor in 59 KB - only possible when every dependency has to justify itself. I hold production code to the same standard.',
      icon: 'i-heroicons-scale',
    },
  ],
  entries: [
    {
      track: 'tech',
      from: '2026-07',
      to: '2026-07',
      role: 'Nuxtathon #1 Champion',
      org: 'Nuxt Community Hackathon',
      orgHref: 'https://nuxtathon.live',
      summary: '66 core issues closed in 48 hours. 1st of 34.',
      tags: ['Nuxt Core', 'Open Source'],
    },
    {
      track: 'tech',
      // TODO: exact start date at DADG
      from: '2025-07',
      to: null,
      role: 'Senior Fullstack Developer · Team Lead · Trainer',
      org: 'DADG - Die Auto und Dienstleistungsgesellschaft mbH',
      orgHref: 'https://dadg.de',
      summary:
        'Technical ownership of the audesk B2B platform and the internal tools, leadership of the junior team.',
      bullets: [
        'audesk - B2B web platform around the vehicle, built with Nuxt and TypeScript.',
        'Flutter app for vehicle photography as the mobile companion to audesk (iOS & Android from one codebase).',
        'XKfz - digital vehicle registration in Germany, integrated with the government interfaces.',
        'Shipping manager - internal logistics application integrating DHL, Deutsche Post and GO Express.',
        'Leading 4 junior developers: code reviews, architecture decisions, pair programming.',
        'Trainer of an apprentice IT specialist (application development) - training licence from the master craftsman exam.',
      ],
      reason:
        'Special machinery turned out to be a detour. I wanted back into the web - into a software company with Vue and Nuxt at its core.',
      tags: [
        'Nuxt',
        'Vue',
        'TypeScript',
        'Node.js',
        'Flutter',
        'Dart',
        'API integration',
        'Team Lead',
      ],
    },
    {
      track: 'tech',
      from: '2025-01',
      // TODO: end date at Hammermeister
      to: '2025-06',
      role: 'Fullstack Developer · HMI / Visualisation',
      org: 'Hammermeister manufacturing & solutions GmbH',
      summary:
        'Industrial software for special-purpose machinery: a fast, modern machine interface (HMI).',
      bullets: [
        'Developed a modern, high-performance HMI for special-purpose machines with C# and VisiWin.',
        'Administered the GitLab instance: repositories, CI/CD, access control for the development team.',
      ],
      reason:
        'A family move back home, 400 km from Freilassing - Kiefel was no longer within reach.',
      tags: ['HMI', 'C# / .NET', 'VisiWin', 'GitLab', 'Special machinery'],
    },
    {
      track: 'tech',
      // TODO: verify period - the original overlaps Kiefel (from 12/2020) with Globus (until 11/2022)
      from: '2022-12',
      to: '2024-12',
      role: 'Fullstack Software Developer',
      org: 'Kiefel GmbH (Brückner Group)',
      orgHref: 'https://www.kiefel.com',
      location: 'Freilassing',
      summary:
        'Special-purpose machinery at the Brückner Group: IoT monitoring for the global machine fleet.',
      bullets: [
        'OEE dashboard monitoring 150+ machines online and in real time - availability, performance and quality at a glance.',
        'Fullstack implementation: Angular frontend, NestJS backend, time series in InfluxDB, machine data via Azure IoT Hub.',
        'Operated on Azure; worked in a SCRUM team with JIRA and Confluence.',
      ],
      tags: ['Angular', 'NestJS', 'InfluxDB', 'Azure IoT Hub', 'Azure', 'IoT', 'OEE', 'SCRUM'],
    },
    {
      track: 'craft',
      from: '2020-11',
      to: '2022-11',
      role: 'Team Lead, In-Store Bakery',
      org: 'Globus SB-Warenhaus Freilassing',
      summary:
        'Led the production team of 35, earning the certificates for the switch alongside it.',
      tags: ['35 staff', 'Team leadership'],
    },
    {
      track: 'tech',
      from: '2020-01',
      to: '2022-11',
      role: 'The switch into software development',
      org: 'Next to a full-time job',
      pivot: true,
      summary:
        'What was missing was proof. Two years of React, Angular, Node.js and Git certificates next to a full-time job, plus the first published open-source packages. The code on GitHub was the application.',
      tags: ['React', 'Angular', 'Node.js', 'Git'],
    },
    {
      track: 'craft',
      from: '2018-07',
      to: '2020-10',
      role: 'Self-employed · Head of Sales',
      org: 'Vapor Ex Machina',
      summary:
        'Built and ran sales for e-cigarettes and accessories - entrepreneurial responsibility from purchasing to customer.',
      tags: ['Entrepreneurship', 'Sales', 'B2B/B2C'],
    },
    {
      track: 'craft',
      from: '2012-07',
      to: '2018-06',
      role: 'Regional Manager · Head of Sales',
      org: 'Globus SB-Warenhaus, central office',
      location: 'St. Wendel',
      summary:
        'Six years of sales responsibility for 12 locations with 350 employees and €25M annual revenue.',
      bullets: [
        'Managed assortment, processes and store leaders across 12 branches.',
        'P&L responsibility for €25M revenue - KPIs, planning, reporting.',
      ],
      tags: ['12 locations', '350 staff', '€25M revenue', 'Sales'],
    },
    {
      track: 'craft',
      from: '2007-07',
      to: '2012-06',
      role: 'Team Lead, In-Store Bakery',
      org: 'Globus SB-Warenhaus Freilassing',
      summary: 'Led a production team of 35: staffing, quality, KPIs.',
      tags: ['35 staff', 'Team leadership', 'Production'],
    },
    {
      track: 'craft',
      from: '2001-08',
      to: '2007-06',
      role: 'Baker: apprenticeship & journeyman years',
      org: 'Bäckerei Heuberger · Globus Schwandorf',
      summary:
        'Apprenticeship as a baker (2001–2004, with secondary school certificate), journeyman in the family business, military service in 2005, then in-store bakery at Globus, followed by master school.',
      tags: ['Baking trade'],
    },
  ],
  projects: [
    {
      name: 'jasy',
      href: 'https://jasy.dev',
      description:
        'Declarative PDF generation in TypeScript - with a ZUGFeRD, Factur-X and XRechnung engine (EN 16931).',
      tags: ['TypeScript', 'PDF', 'E-invoicing'],
      npm: '@jasy/pdf',
    },
    {
      name: 'vorm-vue / vorm-nuxt',
      href: 'https://github.com/Flo0806/vorm',
      description: 'Type-safe, schema-based form validation for Vue 3 and Nuxt.',
      tags: ['Vue 3', 'Nuxt Module', 'TypeScript'],
      npm: 'vorm-vue',
    },
    {
      name: 'nuxt-spyglass',
      href: 'https://spyglass.fh-softdev.de',
      description:
        'Correlates browser and server logs in one place and exposes them to AI agents over MCP.',
      tags: ['Nuxt Module', 'MCP', 'DevTools'],
      npm: 'nuxt-spyglass',
    },
    {
      name: 'nuxt-pigeon',
      href: 'https://github.com/Flo0806/nuxt-pigeon',
      description:
        'Send and receive messages across Telegram, Discord, Slack, ntfy, Mastodon, Bluesky and webhooks.',
      tags: ['Nuxt Module', 'Integrations'],
      npm: 'nuxt-pigeon',
    },
    {
      name: 'nuxt.care',
      href: 'https://nuxt.care',
      description: 'Audit tool for Nuxt modules: health, dependencies, best practices.',
      tags: ['Nuxt', 'Tooling'],
    },
    {
      name: 'jano',
      href: 'https://janoeditor.dev',
      description:
        'Terminal editor with plugin system, multi-cursor and syntax highlighting - 100% JavaScript.',
      tags: ['Node.js', 'CLI'],
    },
    {
      name: 'DM Hero',
      href: 'https://dm-hero.com',
      description: 'Campaign management for game masters with AI integration - 80+ GitHub stars.',
      tags: ['Nuxt', 'AI', 'SaaS'],
    },
    {
      name: 'Nuxtathon Leaderboard',
      href: 'https://nuxtathon.live',
      description:
        'Live ranking of the first Nuxt community hackathon - Nuxt 4, Nitro, GitHub API in real time.',
      tags: ['Nuxt 4', 'Nitro', 'Realtime'],
    },
  ],
  skills: [
    {
      label: 'Frontend',
      skills: [
        { name: 'Vue.js' },
        { name: 'Nuxt' },
        { name: 'TypeScript' },
        { name: 'Tailwind CSS' },
        { name: 'Nuxt UI' },
        { name: 'Angular' },
        { name: 'React / Next.js' },
      ],
    },
    {
      label: 'Backend',
      skills: [
        { name: 'Node.js' },
        { name: 'Nitro / h3' },
        { name: 'NestJS' },
        { name: 'C# / .NET' },
        { name: 'Python' },
        { name: 'REST & WebSockets' },
      ],
    },
    {
      label: 'Mobile & Desktop',
      skills: [
        { name: 'Flutter / Dart' },
        { name: 'HMI (C# / VisiWin)' },
        { name: 'IoT & OEE monitoring' },
        {
          name: 'VS Code extensions',
          href: 'https://marketplace.visualstudio.com/items?itemName=FHSoftDev.lintmon',
        },
      ],
    },
    {
      label: 'Data',
      skills: [
        { name: 'PostgreSQL' },
        { name: 'MSSQL' },
        { name: 'MySQL' },
        { name: 'MongoDB' },
        { name: 'InfluxDB' },
        { name: 'Redis' },
        { name: 'RabbitMQ' },
      ],
    },
    {
      label: 'DevOps & Tooling',
      skills: [
        { name: 'Docker' },
        { name: 'Azure / Azure IoT Hub' },
        { name: 'Git / GitHub / GitLab (admin)' },
        { name: 'CI/CD (GitHub Actions, GitLab CI)' },
        { name: 'Linux servers (Debian/Ubuntu)' },
        { name: 'oxlint / oxfmt' },
        { name: 'MCP / AI agents' },
      ],
    },
    {
      label: 'Methods & Leadership',
      skills: [
        { name: 'SCRUM' },
        { name: 'JIRA / Confluence' },
        { name: 'Code reviews & mentoring' },
        { name: 'Certified trainer (AdA)' },
        { name: 'Team leadership' },
        { name: 'Sales & customer communication' },
      ],
    },
  ],
  education: [
    {
      from: '2020-01',
      to: '2022-12',
      title: 'Certificates: React, Angular, Node.js, Git & GitHub',
      org: 'Udemy',
      note: 'Earned next to a full-time job. Certificates on request.',
    },
    {
      from: '2007-04',
      to: '2008-07',
      title: 'Master Craftsman Certificate in Baking (Meisterbrief)',
      org: 'Chamber of Crafts',
      note: 'Includes the trainer licence (part IV of the master exam) plus communication and leadership seminars.',
    },
    {
      from: '2001-08',
      to: '2004-08',
      title: 'Apprenticeship as a Baker · qualified secondary school certificate (Mittlere Reife)',
      org: 'Bäckerei Heuberger',
    },
  ],
  languages: [
    { name: 'German', level: 'Native' },
    { name: 'English', level: 'Fluent, written and spoken (working language in open source)' },
  ],
  keywords: [
    'Senior Fullstack Developer',
    'Full-Stack Engineer',
    'Frontend Developer',
    'Vue.js',
    'Nuxt',
    'TypeScript',
    'Node.js',
    'Flutter',
    'HMI',
    'Open Source Maintainer',
    'Team Lead',
    'Trainer',
    'AI-assisted development',
    'MCP',
    'IoT',
    'Azure',
  ],
};
