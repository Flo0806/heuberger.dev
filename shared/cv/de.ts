import type { CvData } from './types';

/**
 * German CV. A bullet prefixed with "[TODO]" renders red on the page - use it
 * for anything not yet verified, so nothing invented ships unnoticed.
 */
export const cvDe: CvData = {
  locale: 'de',
  name: 'Florian Heuberger',
  title: 'Senior Fullstack Developer',
  focus: 'Vue, Nuxt, TypeScript und Node.js',
  tagline:
    'Vom Bäckermeister zum Nuxt-Core-Contributor - Code seit 2000, 17 Jahre Führungserfahrung, seit 2022 beides im Hauptberuf.',
  claim: [
    'Ich schreibe seit 2000 Code, seit 2022 hauptberuflich.',
    'Kein Informatikstudium. Programmieren war für mich nie ein Beruf, sondern eine Berufung – heute ist es beides.',
  ],
  location: 'Oberpfalz, Bayern. Remote und hybrid.',
  availability: 'Angestellt bei DADG, offen für Open-Source-Kooperationen.',
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
    { label: 'E-Mail', href: 'mailto:fh@flogersoft.de', icon: 'i-heroicons-envelope' },
  ],
  summary: [
    'Senior Fullstack Developer mit Schwerpunkt Vue, Nuxt, TypeScript und Node.js, Mitglied des Nuxt-Ökosystems: Ich schreibe Code für **Nuxt** und pflege mehrere eigene Packages.',
    'Davor lag ein anderer Weg - Meisterbrief im Bäckerhandwerk, Teamleitung, sechs Jahre Regionalleitung im Vertrieb, dann die eigene Firma.',
    'Heute leite ich bei der DADG ein Team aus vier Junior-Entwicklern, bilde einen Fachinformatiker aus und entwickle neben Web-Anwendungen eine Flutter-App.',
  ],
  facts: [
    {
      value: '#1',
      label: 'Nuxtathon 2026',
      note: '66 Core-Issues in 48 Stunden, Platz 1 von 34',
      href: 'https://nuxtathon.live',
    },
    {
      value: '20+',
      label: 'Packages veröffentlicht',
      note: 'als Maintainer: vorm, jasy, nuxt-spyglass',
    },
    { value: '4+1', label: 'im Team', note: 'vier Entwickler geführt, ein Azubi in Ausbildung' },
    { value: '150+', label: 'Maschinen live', note: 'OEE-Dashboard bei Kiefel, weltweit' },
    {
      value: '350',
      label: 'Mitarbeiter verantwortet',
      note: '12 Standorte, 25 Mio. € Umsatz - in der Zeit davor',
    },
  ],
  awards: [
    {
      title: 'Champion - Nuxtathon #1',
      org: 'Nuxt Community Hackathon',
      date: '2026-07',
      description:
        'Erster Community-Hackathon am Nuxt-Core-Repository: 66 Issues über 9 gemergte Pull Requests in 48 Stunden geschlossen - Platz 1 von 34 Teilnehmern. Das Live-Leaderboard des Events (nuxtathon.live) habe ich selbst gebaut.',
      href: 'https://nuxtathon.live',
    },
  ],
  principles: [
    {
      title: 'KI als Werkzeug, nicht als Autor',
      text: 'Ich arbeite täglich mit KI-Agenten - ich leite sie, gebe Kontext, prüfe jede Zeile. Kein Vibe Coding: Nichts geht ins Repository, was ich nicht verstanden und reviewt habe. Die Tooling-Seite habe ich selbst gebaut - nuxt-spyglass liefert Agenten die Logs, die sie zum Debuggen brauchen.',
      icon: 'i-heroicons-cpu-chip',
    },
    {
      title: 'Stabil vor schnell',
      text: 'TypeScript strict von Ende zu Ende, automatisierte Tests, Linting und Formatierung als Pflicht im CI. Eine Anwendung ist fertig, wenn sie unter Last und nach dem dritten Refactoring noch sauber läuft.',
      icon: 'i-heroicons-shield-check',
    },
    {
      title: 'Reviews als Führungsinstrument',
      text: 'Jeder Pull Request wird gelesen, auch meiner. Mit Juniors und Azubi sind Reviews und Pair Programming Ausbildung, nicht Kontrolle - so wird aus vier Juniors ein Team, das selbst reviewt.',
      icon: 'i-heroicons-users',
    },
    {
      title: 'Jede Abhängigkeit braucht einen Grund',
      text: 'jano ist ein vollwertiger Terminal-Editor in 59 KB - das geht nur, wenn sich jede Dependency einzeln rechtfertigen muss. An Produktionscode lege ich dasselbe Maß an.',
      icon: 'i-heroicons-scale',
    },
  ],
  entries: [
    {
      track: 'tech',
      from: '2025-05',
      to: null,
      role: 'Senior Fullstack Developer · Team Lead · Ausbilder',
      org: 'DADG - Die Auto und Dienstleistungsgesellschaft mbH',
      orgHref: 'https://dadg.de',
      summary:
        'Technische Verantwortung für die B2B-Plattform audesk und die internen Tools, fachliche Führung des Junior-Teams.',
      bullets: [
        'audesk - B2B-Webplattform rund um das Fahrzeug, aufgebaut mit Nuxt und TypeScript.',
        'Flutter-App zur Fahrzeug-Fotografie als mobile Ergänzung zu audesk (iOS & Android aus einer Codebasis).',
        'XKfz - digitale Kfz-Zulassung in Deutschland, angebunden an die behördlichen Schnittstellen.',
        'Versandmanager - interne Logistik-Anwendung mit Anbindung von DHL, Deutsche Post und GO Express.',
        'Führung von 4 Junior-Entwicklern: Code Reviews, Architektur-Entscheidungen, Pair Programming.',
        'Ausbilder eines Fachinformatikers (Anwendungsentwicklung) - Ausbildereignung aus der Meisterprüfung.',
      ],
      reason:
        'Der Sondermaschinenbau war ein Umweg. Ich wollte zurück ins Web - in ein Softwareunternehmen mit Vue und Nuxt im Kern.',
      tags: [
        'Nuxt',
        'Vue',
        'TypeScript',
        'Node.js',
        'Flutter',
        'Dart',
        'API-Integration',
        'Team Lead',
      ],
    },
    {
      track: 'tech',
      from: '2025-01',
      to: '2025-04',
      role: 'Fullstack Developer · HMI / Visualisierung',
      org: 'Hammermeister manufacturing & solutions GmbH',
      summary:
        'Industrie-Software für den Sondermaschinenbau: schnelle, moderne Maschinenbedienung (HMI).',
      bullets: [
        'Entwicklung eines modernen, performanten HMI für Sondermaschinen mit C# und VisiWin.',
        'Administration der GitLab-Instanz: Repositories, CI/CD, Zugriffsrechte für das Entwicklungsteam.',
      ],
      reason:
        'Familiärer Umzug zurück in die Heimat, 400 km von Freilassing - Kiefel war damit nicht mehr erreichbar.',
      tags: ['HMI', 'C# / .NET', 'VisiWin', 'GitLab', 'Sondermaschinenbau'],
    },
    {
      track: 'tech',
      from: '2022-12',
      to: '2024-12',
      role: 'Fullstack Software Developer',
      org: 'Kiefel GmbH (Brückner Group)',
      orgHref: 'https://www.kiefel.com',
      location: 'Freilassing',
      summary:
        'Sondermaschinenbau der Brückner Group: IoT-Monitoring für den weltweiten Maschinenpark.',
      bullets: [
        'OEE-Dashboard, das über 150 Maschinen online und in Echtzeit überwacht - Verfügbarkeit, Leistung und Qualität auf einen Blick.',
        'Fullstack-Umsetzung: Angular-Frontend, NestJS-Backend, Zeitreihen in InfluxDB, Maschinendaten über Azure IoT Hub.',
        'Betrieb in der Azure-Cloud; Arbeit im SCRUM-Team mit JIRA und Confluence.',
      ],
      tags: ['Angular', 'NestJS', 'InfluxDB', 'Azure IoT Hub', 'Azure', 'IoT', 'OEE', 'SCRUM'],
    },
    {
      track: 'craft',
      from: '2020-11',
      to: '2022-11',
      role: 'Teamleiter Meisterbäckerei',
      org: 'Globus SB-Warenhaus Freilassing',
      summary:
        'Führung des Produktionsteams mit 35 Mitarbeitern, parallel die Zertifikate für den Wechsel.',
      tags: ['35 Mitarbeiter', 'Teamführung'],
    },
    {
      track: 'tech',
      from: '2020-01',
      to: '2022-11',
      role: 'Der Wechsel in die Softwareentwicklung',
      org: 'Neben dem Vollzeitjob',
      pivot: true,
      summary:
        'Was fehlte, waren Nachweise. Zwei Jahre lang React-, Angular-, Node.js- und Git-Zertifikate neben dem Vollzeitjob, dazu die ersten veröffentlichten Open-Source-Packages. Der Code auf GitHub war die Bewerbung.',
      tags: ['React', 'Angular', 'Node.js', 'Git'],
    },
    {
      track: 'craft',
      from: '2018-07',
      to: '2020-10',
      role: 'Selbstständig · Leiter Vertrieb',
      org: 'Vapor Ex Machina',
      summary:
        'Aufbau und Führung des Vertriebs für E-Zigaretten und Zubehör - unternehmerische Verantwortung von Einkauf bis Kunde.',
      tags: ['Unternehmertum', 'Vertrieb', 'B2B/B2C'],
    },
    {
      track: 'craft',
      from: '2012-07',
      to: '2018-06',
      role: 'Regionalleiter · Verantwortlicher im Vertrieb',
      org: 'Globus SB-Warenhaus Koordination',
      location: 'St. Wendel',
      summary:
        'Sechs Jahre Vertriebsverantwortung für 12 Standorte mit 350 Mitarbeitern und 25 Mio. € Jahresumsatz.',
      bullets: [
        'Steuerung von Sortiment, Prozessen und Führungskräften über 12 Filialen.',
        'Ergebnisverantwortung für 25 Mio. € Umsatz - Kennzahlen, Planung, Reporting.',
      ],
      tags: ['12 Standorte', '350 Mitarbeiter', '25 Mio. € Umsatz', 'Vertrieb'],
    },
    {
      track: 'craft',
      from: '2007-07',
      to: '2012-06',
      role: 'Teamleiter Meisterbäckerei',
      org: 'Globus SB-Warenhaus Freilassing',
      summary:
        'Führung eines Produktionsteams mit 35 Mitarbeitern: Personalplanung, Qualität, Kennzahlen.',
      tags: ['35 Mitarbeiter', 'Teamführung', 'Produktion'],
    },
    {
      track: 'craft',
      from: '2001-08',
      to: '2007-06',
      role: 'Bäcker: Ausbildung & Gesellenjahre',
      org: 'Bäckerei Heuberger · Globus Schwandorf',
      summary:
        'Ausbildung zum Bäcker (2001–2004, Abschluss mit Mittlerer Reife), Geselle im Familienbetrieb, Wehrdienst 2005, dann Meisterbäckerei bei Globus, danach die Meisterschule.',
      tags: ['Bäckerhandwerk'],
    },
  ],
  projects: [
    {
      name: 'jasy',
      href: 'https://jasy.dev',
      description:
        'Deklarative PDF-Erzeugung in TypeScript - mit ZUGFeRD-, Factur-X- und XRechnung-Engine (EN 16931).',
      tags: ['TypeScript', 'PDF', 'E-Rechnung'],
      npm: '@jasy/pdf',
    },
    {
      name: 'vorm-vue / vorm-nuxt',
      href: 'https://github.com/Flo0806/vorm',
      description: 'Typsichere, schema-basierte Formular-Validierung für Vue 3 und Nuxt.',
      tags: ['Vue 3', 'Nuxt Module', 'TypeScript'],
      npm: 'vorm-vue',
    },
    {
      name: 'nuxt-spyglass',
      href: 'https://spyglass.fh-softdev.de',
      description:
        'Korreliert Browser- und Server-Logs an einer Stelle und stellt sie KI-Agenten per MCP bereit.',
      tags: ['Nuxt Module', 'MCP', 'DevTools'],
      npm: 'nuxt-spyglass',
    },
    {
      name: 'nuxt-pigeon',
      href: 'https://github.com/Flo0806/nuxt-pigeon',
      description:
        'Nachrichten senden und empfangen über Telegram, Discord, Slack, ntfy, Mastodon, Bluesky und Webhooks.',
      tags: ['Nuxt Module', 'Integrations'],
      npm: 'nuxt-pigeon',
    },
    {
      name: 'nuxt.care',
      href: 'https://nuxt.care',
      description: 'Audit-Tool für Nuxt-Module: Gesundheit, Abhängigkeiten, Best Practices.',
      tags: ['Nuxt', 'Tooling'],
    },
    {
      name: 'jano',
      href: 'https://janoeditor.dev',
      description:
        'Terminal-Editor mit Plugin-System, Multi-Cursor und Syntax-Highlighting - 100 % JavaScript.',
      tags: ['Node.js', 'CLI'],
    },
    {
      name: 'DM Hero',
      href: 'https://dm-hero.com',
      description: 'Kampagnen-Management für Game Master mit KI-Integration - 80+ GitHub Stars.',
      tags: ['Nuxt', 'AI', 'SaaS'],
    },
    {
      name: 'Nuxtathon Leaderboard',
      href: 'https://nuxtathon.live',
      description:
        'Live-Rangliste des ersten Nuxt Community Hackathons - Nuxt 4, Nitro, GitHub API in Echtzeit.',
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
        { name: 'IoT & OEE-Monitoring' },
        { name: 'VS Code Extensions' },
      ],
    },
    {
      label: 'Daten',
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
        { name: 'Git / GitHub / GitLab (Admin)' },
        { name: 'CI/CD (GitHub Actions, GitLab CI)' },
        { name: 'Linux-Server (Debian/Ubuntu)' },
        { name: 'oxlint / oxfmt' },
        { name: 'MCP / KI-Agenten' },
      ],
    },
    {
      label: 'Methoden & Führung',
      skills: [
        { name: 'SCRUM' },
        { name: 'JIRA / Confluence' },
        { name: 'Code Reviews & Mentoring' },
        { name: 'Ausbildereignung (AdA)' },
        { name: 'Teamführung' },
        { name: 'Vertrieb & Kundenkommunikation' },
      ],
    },
  ],
  education: [
    {
      from: '2020-01',
      to: '2022-12',
      title: 'Zertifikate: React, Angular, Node.js, Git & GitHub',
      org: 'Udemy',
      note: 'Neben dem Vollzeitjob erworben. Urkunden auf Anfrage.',
    },
    {
      from: '2007-04',
      to: '2008-07',
      title: 'Meisterbrief im Bäckerhandwerk',
      org: 'Handwerkskammer',
      note: 'Inkl. Ausbildereignung (Teil IV der Meisterprüfung) sowie Kommunikations- und Führungsseminare.',
    },
    {
      from: '2001-08',
      to: '2004-08',
      title: 'Ausbildung zum Bäcker · Qualifizierter Bildungsabschluss (Mittlere Reife)',
      org: 'Bäckerei Heuberger',
    },
  ],
  languages: [
    { name: 'Deutsch', level: 'Muttersprache' },
    { name: 'Englisch', level: 'Fließend in Wort und Schrift (Arbeitssprache in Open Source)' },
  ],
  keywords: [
    'Senior Fullstack Developer',
    'Full-Stack-Entwickler',
    'Frontend Developer',
    'Vue.js',
    'Nuxt',
    'TypeScript',
    'Node.js',
    'Flutter',
    'HMI',
    'Open Source Maintainer',
    'Team Lead',
    'Ausbilder',
    'KI-gestützte Entwicklung',
    'MCP',
    'IoT',
    'Azure',
  ],
};
