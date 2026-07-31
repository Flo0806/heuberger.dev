/**
 * Every head tag that search engines and social crawlers read.
 *
 * Called once from app.vue so the tags exist on every route, and driven by
 * i18n so title, description and og:locale follow the active language.
 *
 * On `meta keywords`: Google has ignored it for well over a decade. It is
 * emitted for the few engines that still look, but the real weight sits in the
 * title, the description and the JSON-LD `knowsAbout` list below - those are
 * what actually carry the ZUGFeRD/XRechnung, jasy, Nuxtathon and Nuxt topics.
 */
export function useSiteSeo() {
  const { t, locale, locales } = useI18n();
  const localeHead = useLocaleHead();
  const appConfig = useAppConfig();
  const route = useRoute();

  const site = appConfig.site;

  const canonical = computed(() => new URL(route.path, site.url).href);
  const ogImage = computed(() => new URL(site.ogImage, site.url).href);

  /** 'de-DE' -> 'de_DE'; Open Graph wants an underscore, i18n stores a dash. */
  const toOgLocale = (language: string) => language.replace('-', '_');

  const configured = computed(() =>
    locales.value.filter((entry) => typeof entry === 'object' && Boolean(entry.language)),
  );

  const ogLocale = computed(() =>
    toOgLocale(configured.value.find((entry) => entry.code === locale.value)?.language ?? ''),
  );

  /**
   * Built here rather than taken from useLocaleHead().meta: that returns loose
   * `MetaAttrs` records, which unhead's stricter meta union rejects. Two tags
   * are not worth a cast, and this way the language list stays the only source.
   */
  const alternateOgLocales = computed(() =>
    configured.value
      .filter((entry) => entry.code !== locale.value)
      .map((entry) => ({
        property: 'og:locale:alternate',
        content: toOgLocale(entry.language!),
      })),
  );

  useHead(() => ({
    // Carries lang="de"/"en" onto <html>; without it the document has no
    // language at all, which costs both SEO and screen-reader pronunciation.
    htmlAttrs: localeHead.value.htmlAttrs,
    // localeHead.link stays out on purpose: with strategy 'no_prefix' both
    // languages share one URL, so i18n emits no alternates anyway. Switching
    // to a prefix strategy means spreading it in here as well.
    link: [{ rel: 'canonical', href: canonical.value }],
    meta: [
      ...alternateOgLocales.value,
      // Not part of useSeoMeta's vocabulary, so it goes in by hand.
      { name: 'keywords', content: t('seo.keywords') },
    ],
  }));

  useSeoMeta({
    title: () => t('seo.title'),
    description: () => t('seo.description'),
    author: site.name,

    ogType: 'website',
    ogSiteName: site.name,
    ogTitle: () => t('seo.title'),
    ogDescription: () => t('seo.description'),
    ogUrl: () => canonical.value,
    ogImage: () => ogImage.value,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageType: 'image/jpeg',
    ogImageAlt: () => t('seo.imageAlt'),
    ogLocale: () => ogLocale.value,

    twitterCard: 'summary_large_image',
    twitterTitle: () => t('seo.title'),
    twitterDescription: () => t('seo.description'),
    twitterImage: () => ogImage.value,
    twitterImageAlt: () => t('seo.imageAlt'),
  });

  // Person schema. `knowsAbout` is the machine-readable version of the topic
  // list and feeds entity understanding, unlike the keywords meta tag.
  useHead(() => ({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: site.name,
          url: site.url,
          image: ogImage.value,
          jobTitle: t('hero.title'),
          description: t('seo.description'),
          sameAs: Object.values(site.socials),
          knowsAbout: [
            'Nuxt',
            'Vue.js',
            'TypeScript',
            'Node.js',
            'ZUGFeRD',
            'XRechnung',
            'Factur-X',
            'EN 16931',
            'E-Rechnung',
            'PDF generation',
            'jasy',
            'Nuxtathon',
            'Nuxt Modules',
            'Fullstack Development',
          ],
        }),
      },
    ],
  }));
}
