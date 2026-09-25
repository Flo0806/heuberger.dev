import { cvByLocale, formatCvMonth, isCvLocale } from '#shared/cv';
import type { CvData } from '#shared/cv';

/**
 * The CV as Markdown, for machines.
 *
 * LLM-based screening tools and AI crawlers read Markdown far more reliably
 * than a hydrated SPA. Rendered from the same shared data as /cv, so it can
 * never drift from what a human sees. `?lang=en` for English, German default.
 */
function render(cv: CvData) {
  const present = cv.locale === 'de' ? 'heute' : 'present';
  const month = (iso: string | null) => formatCvMonth(iso, cv.locale, present);
  const range = (from: string, to: string | null) =>
    from === to ? month(from) : `${month(from)} – ${month(to)}`;
  const h =
    cv.locale === 'de'
      ? {
          summary: 'Kurzprofil',
          facts: 'Fakten',
          awards: 'Auszeichnungen',
          principles: 'Wie ich arbeite',
          reason: 'Warum der Wechsel',
          tech: 'Berufserfahrung Software',
          craft: 'Frühere Laufbahn: Handwerk & Führung',
          projects: 'Open Source & Projekte',
          skills: 'Kenntnisse',
          education: 'Ausbildung & Zertifikate',
          languages: 'Sprachen',
          keywords: 'Stichworte',
          links: 'Links',
        }
      : {
          summary: 'Profile',
          facts: 'Facts',
          awards: 'Awards',
          principles: 'How I work',
          reason: 'Why the move',
          tech: 'Work experience: Software',
          craft: 'Earlier career: Craft & Leadership',
          projects: 'Open source & projects',
          skills: 'Skills',
          education: 'Education & certificates',
          languages: 'Languages',
          keywords: 'Keywords',
          links: 'Links',
        };

  const entry = (e: CvData['entries'][number]) =>
    [
      `### ${e.role}`,
      `${e.org}${e.location ? `, ${e.location}` : ''} · ${range(e.from, e.to)}`,
      e.summary ? `\n${e.summary}` : '',
      ...(e.bullets?.filter((b) => !b.startsWith('[TODO]')).map((b) => `- ${b}`) ?? []),
      e.reason ? `\n${h.reason}: ${e.reason}` : '',
      e.tags?.length ? `\n_${e.tags.join(', ')}_` : '',
    ]
      .filter(Boolean)
      .join('\n');

  const tech = cv.entries.filter((e) => e.track === 'tech' && !e.pivot);
  const pivot = cv.entries.find((e) => e.pivot);
  const craft = cv.entries.filter((e) => e.track === 'craft');

  return [
    `# ${cv.name}`,
    `**${cv.title}** - ${cv.focus}`,
    '',
    cv.tagline,
    '',
    ...cv.claim,
    '',
    `- ${cv.location}`,
    `- ${cv.availability}`,
    '',
    `## ${h.links}`,
    ...cv.links.map((l) => `- ${l.label}: ${l.href.replace('mailto:', '')}`),
    '',
    `## ${h.summary}`,
    ...cv.summary.flatMap((p) => [p, '']),
    `## ${h.facts}`,
    ...cv.facts.map((f) => `- **${f.value}** ${f.label}${f.note ? ` (${f.note})` : ''}`),
    '',
    `## ${h.awards}`,
    ...cv.awards.flatMap((a) => [
      `### ${a.title}`,
      `${a.org} · ${month(a.date)} · ${a.href}`,
      '',
      a.description,
      '',
    ]),
    `## ${h.principles}`,
    ...cv.principles.map((p) => `- **${p.title}.** ${p.text}`),
    '',
    `## ${h.tech}`,
    '',
    ...tech.flatMap((e) => [entry(e), '']),
    ...(pivot ? [entry(pivot), ''] : []),
    `## ${h.craft}`,
    '',
    ...craft.flatMap((e) => [entry(e), '']),
    `## ${h.projects}`,
    ...cv.projects.map(
      (p) => `- **${p.name}** – ${p.description} (${p.tags.join(', ')}) ${p.href}`,
    ),
    '',
    `## ${h.skills}`,
    ...cv.skills.map((g) => `- **${g.label}:** ${g.skills.map((s) => s.name).join(', ')}`),
    '',
    `## ${h.education}`,
    ...cv.education.map(
      (e) => `- ${range(e.from, e.to)}: **${e.title}**, ${e.org}${e.note ? ` – ${e.note}` : ''}`,
    ),
    '',
    `## ${h.languages}`,
    ...cv.languages.map((l) => `- ${l.name}: ${l.level}`),
    '',
    `## ${h.keywords}`,
    cv.keywords.join(', '),
    '',
  ].join('\n');
}

export default defineEventHandler((event) => {
  const lang = getQuery(event).lang;
  const cv = cvByLocale[isCvLocale(lang) ? lang : 'de'];

  setResponseHeader(event, 'Content-Type', 'text/markdown; charset=utf-8');
  setResponseHeader(event, 'Cache-Control', 'public, max-age=3600');
  return render(cv);
});
