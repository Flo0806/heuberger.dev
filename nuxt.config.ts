// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxt/content', '@nuxt/image', '@nuxt/test-utils', '@nuxt/ui', '@nuxtjs/i18n'],

  css: ['~/assets/css/main.css'],

  ui: {
    // `accent` as its own alias, so Ember has to be requested explicitly via
    // color="accent" instead of showing up everywhere by default.
    theme: {
      colors: ['primary', 'secondary', 'accent', 'success', 'info', 'warning', 'error'],
    },
  },

  i18n: {
    locales: [
      { code: 'de', language: 'de-DE', file: 'de.json', name: 'Deutsch' },
      { code: 'en', language: 'en-US', file: 'en.json', name: 'English' },
    ],
    defaultLocale: 'de',
    langDir: '../i18n/locales',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_locale',
      alwaysRedirect: false,
    },
  },

  runtimeConfig: {
    githubToken: '',
  },

  nitro: {
    // entry.css is ~245 KB and was shipped raw: Nitro does not compress public
    // assets unless told to, and the build wrote no .gz/.br alongside them.
    // A render-blocking quarter-megabyte stylesheet is what made the finished
    // styling arrive seconds after the markup.
    compressPublicAssets: { gzip: true, brotli: true },

    storage: {
      data: {
        driver: 'fsLite',
        base: './.data/counter',
      },
    },
  },

  app: {
    head: {
      // Title and description come from useSiteSeo(), which drives them
      // through i18n. Leaving copies here would emit them twice.
      meta: [
        { name: 'theme-color', content: '#f6f8fa', media: '(prefers-color-scheme: light)' },
        { name: 'theme-color', content: '#0e141b', media: '(prefers-color-scheme: dark)' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },
});
