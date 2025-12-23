<script setup lang="ts">
const { t } = useI18n()
const appConfig = useAppConfig()

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-zinc-300/50 dark:border-zinc-800/50 py-8">
    <div class="container mx-auto px-4">
      <div class="flex flex-col items-center gap-4">
        <!-- Built with (centered) -->
        <div class="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-500">
          <span>{{ t('footer.builtWith') }}</span>
          <a
            href="https://nuxt.com"
            target="_blank"
            rel="noopener noreferrer"
            class="text-orange-400 hover:text-orange-300 transition-colors"
          >
            Nuxt
          </a>
          <span>&</span>
          <UIcon name="i-heroicons-heart-solid" class="w-4 h-4 text-red-500" />
        </div>

        <!-- Copyright & Social Links -->
        <div class="flex flex-col md:flex-row items-center justify-between w-full gap-4">
          <div class="text-sm text-zinc-600 dark:text-zinc-500">
            &copy; {{ currentYear }} Florian Heuberger. {{ t('footer.rights') }}
          </div>

          <!-- Social Links -->
          <div class="flex items-center gap-3">
          <a
            :href="appConfig.site.socials.github"
            target="_blank"
            rel="noopener noreferrer"
            class="text-zinc-600 dark:text-zinc-500 hover:text-orange-400 transition-colors"
            aria-label="GitHub"
          >
            <UIcon name="i-simple-icons-github" class="w-5 h-5" />
          </a>
          <a
            :href="appConfig.site.socials.linkedin"
            target="_blank"
            rel="noopener noreferrer"
            class="text-zinc-600 dark:text-zinc-500 hover:text-orange-400 transition-colors"
            aria-label="LinkedIn"
          >
            <UIcon name="i-simple-icons-linkedin" class="w-5 h-5" />
          </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
