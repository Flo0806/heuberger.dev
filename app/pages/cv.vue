<script setup lang="ts">
/**
 * /cv - the résumé.
 *
 * Built for two readers at once: a person skimming for the story, and an
 * ATS / screening model parsing for facts. Hence real headings, <time> tags,
 * text skills and a Person schema with hasOccupation and award - the pieces
 * a machine actually scores on.
 */
const { t } = useI18n();
const { cv } = useCv();
const appConfig = useAppConfig();

// The layout's observer only ran on its own mount; cards on a page reached
// by client navigation would stay hidden without a fresh pass here.
useCardReveal();

useSeoMeta({
  title: () => t('cv.seo.title'),
  description: () => t('cv.seo.description'),
  ogTitle: () => t('cv.seo.title'),
  ogDescription: () => t('cv.seo.description'),
  twitterTitle: () => t('cv.seo.title'),
  twitterDescription: () => t('cv.seo.description'),
  ogType: 'profile',
});

const current = computed(() =>
  cv.value.entries.find((entry) => entry.track === 'tech' && entry.to === null),
);

useHead(() => ({
  script: [
    {
      key: 'cv-jsonld',
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        dateModified: '2026-09-12',
        mainEntity: {
          '@type': 'Person',
          name: cv.value.name,
          url: `${appConfig.site.url}/cv`,
          jobTitle: cv.value.title,
          description: cv.value.summary.join(' '),
          sameAs: cv.value.links
            .filter((link) => link.href.startsWith('http'))
            .map((link) => link.href),
          worksFor: current.value
            ? { '@type': 'Organization', name: current.value.org, url: current.value.orgHref }
            : undefined,
          hasOccupation: cv.value.entries
            .filter((entry) => !entry.pivot)
            .map((entry) => ({
              '@type': 'Occupation',
              name: entry.role,
              occupationLocation: entry.location
                ? { '@type': 'City', name: entry.location }
                : undefined,
              startDate: entry.from,
              endDate: entry.to ?? undefined,
              // Not a schema.org property; harmless for parsers, useful for LLMs.
              employer: entry.org,
              skills: entry.tags?.join(', '),
            })),
          award: cv.value.awards.map(
            (award) => `${award.title} (${award.org}, ${award.date.slice(0, 4)})`,
          ),
          hasCredential: cv.value.education.map((item) => ({
            '@type': 'EducationalOccupationalCredential',
            name: item.title,
            recognizedBy: { '@type': 'Organization', name: item.org },
            dateCreated: item.to ?? undefined,
          })),
          knowsAbout: cv.value.skills.flatMap((group) => group.skills.map((skill) => skill.name)),
          knowsLanguage: cv.value.languages.map((language) => language.name),
        },
      }),
    },
  ],
}));
</script>

<template>
  <div class="cv-page">
    <CvSheet />
    <CvPrinciples />
    <CvTimeline />
    <CvProjects />
    <CvSkills />
    <CvEducation />
  </div>
</template>
