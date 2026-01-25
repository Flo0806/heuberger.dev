<script setup lang="ts">
const { t } = useI18n()

interface UseItem {
  name: string
  description: string
  icon: string
  link?: string
  highlight?: boolean
}

interface UseCategory {
  icon: string
  items: UseItem[]
}

type CategoryKey = 'editor' | 'fonts' | 'extensions' | 'terminal' | 'devtools'

const uses: Record<CategoryKey, UseCategory> = {
  editor: {
    icon: 'i-simple-icons-visualstudiocode',
    items: [
      { name: 'VS Code', description: 'Primary Editor', icon: 'i-simple-icons-visualstudiocode', link: 'https://code.visualstudio.com/' },
      { name: 'Palenight Theme', description: 'Color Theme', icon: 'i-heroicons-swatch', link: 'https://marketplace.visualstudio.com/items?itemName=whizkydee.material-palenight-theme' },
      { name: 'Material Icon Theme', description: 'File Icons', icon: 'i-heroicons-folder', link: 'https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme' }
    ]
  },
  fonts: {
    icon: 'i-heroicons-language',
    items: [
      { name: 'Cascadia Code NF', description: 'Primary Font', icon: 'i-heroicons-code-bracket', link: 'https://github.com/microsoft/cascadia-code' },
      { name: 'Monaspace Neon', description: 'Alternative Font', icon: 'i-heroicons-sparkles', link: 'https://monaspace.githubnext.com/' },
      { name: 'Font Ligatures', description: 'Enabled', icon: 'i-heroicons-link' }
    ]
  },
  extensions: {
    icon: 'i-heroicons-puzzle-piece',
    items: [
      { name: 'Claude Code', description: 'AI Assistant', icon: 'i-simple-icons-anthropic', link: 'https://marketplace.visualstudio.com/items?itemName=anthropic.claude-code' },
      { name: 'GitHub Copilot', description: 'AI Pair Programming', icon: 'i-simple-icons-githubcopilot', link: 'https://marketplace.visualstudio.com/items?itemName=GitHub.copilot' },
      { name: 'Volar', description: 'Vue Language Support', icon: 'i-simple-icons-vuedotjs', link: 'https://marketplace.visualstudio.com/items?itemName=Vue.volar' },
      { name: 'ESLint', description: 'Linting', icon: 'i-simple-icons-eslint', link: 'https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint' },
      { name: 'Prettier', description: 'Code Formatting', icon: 'i-simple-icons-prettier', link: 'https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode' },
      { name: 'Tailwind CSS', description: 'IntelliSense', icon: 'i-simple-icons-tailwindcss', link: 'https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss' },
      { name: 'lintmon', description: 'Lint Monitoring (by me)', icon: 'i-heroicons-eye', link: 'https://marketplace.visualstudio.com/items?itemName=FHSoftDev.lintmon', highlight: true }
    ]
  },
  terminal: {
    icon: 'i-heroicons-command-line',
    items: [
      { name: 'Windows Terminal', description: 'Terminal Emulator', icon: 'i-simple-icons-windowsterminal', link: 'https://github.com/microsoft/terminal' },
      { name: 'WSL 2 (Ubuntu)', description: 'Dev Environment', icon: 'i-simple-icons-ubuntu', link: 'https://ubuntu.com/desktop/wsl' },
      { name: 'Oh My Zsh', description: 'Shell Framework', icon: 'i-simple-icons-zsh', link: 'https://ohmyz.sh/' },
      { name: 'pnpm', description: 'Package Manager', icon: 'i-simple-icons-pnpm', link: 'https://pnpm.io/' }
    ]
  },
  devtools: {
    icon: 'i-heroicons-wrench-screwdriver',
    items: [
      { name: 'Docker', description: 'Containerization', icon: 'i-simple-icons-docker', link: 'https://www.docker.com/' },
      { name: 'Postman', description: 'API Testing', icon: 'i-simple-icons-postman', link: 'https://www.postman.com/' },
      { name: 'MobaXterm', description: 'SSH Client', icon: 'i-heroicons-server', link: 'https://mobaxterm.mobatek.net/' },
      { name: 'Zen Browser', description: 'Primary Browser', icon: 'i-simple-icons-zen', link: 'https://zen-browser.app/' }
    ]
  }
}

const categories: CategoryKey[] = ['editor', 'fonts', 'extensions', 'terminal', 'devtools']
</script>

<template>
  <section
    id="uses"
    class="section-padding"
  >
    <div class="container mx-auto px-4">
      <div class="max-w-6xl mx-auto">
        <!-- Section Header -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
          class="text-center mb-16"
        >
          <h2 class="text-4xl md:text-5xl font-bold mb-4">
            <span class="gradient-text">{{ t('uses.title') }}</span>
          </h2>
          <p class="text-xl text-zinc-600 dark:text-zinc-400">{{ t('uses.subtitle') }}</p>
        </div>

        <!-- Uses Categories -->
        <div class="grid md:grid-cols-2 gap-8">
          <div
            v-for="(category, catIndex) in categories"
            :key="category"
            v-motion
            :initial="{ opacity: 0, y: 40 }"
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 500, delay: catIndex * 150 } }"
            class="glass rounded-2xl p-6"
          >
            <h3 class="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mb-6 flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
                <UIcon :name="uses[category].icon" class="w-5 h-5 text-orange-400" />
              </div>
              {{ t(`uses.categories.${category}`) }}
            </h3>

            <div class="space-y-3">
              <component
                :is="item.link ? 'a' : 'div'"
                v-for="item in uses[category].items"
                :key="item.name"
                :href="item.link"
                :target="item.link ? '_blank' : undefined"
                :rel="item.link ? 'noopener noreferrer' : undefined"
                class="flex items-center gap-4 p-3 rounded-xl transition-all duration-300"
                :class="[
                  item.highlight
                    ? 'bg-orange-500/10 border border-orange-500/30 hover:border-orange-500/50'
                    : 'hover:bg-zinc-800/50',
                  item.link ? 'cursor-pointer' : ''
                ]"
              >
                <div class="w-10 h-10 rounded-lg bg-zinc-800/80 flex items-center justify-center shrink-0">
                  <UIcon
                    :name="item.icon"
                    :class="[
                      'w-5 h-5',
                      item.highlight ? 'text-orange-400' : 'text-zinc-400'
                    ]"
                  />
                </div>
                <div class="flex-1 min-w-0">
                  <div class="font-medium text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                    {{ item.name }}
                    <UBadge v-if="item.highlight" color="primary" variant="subtle" size="xs">
                      {{ t('uses.myExtension') }}
                    </UBadge>
                  </div>
                  <div class="text-sm text-zinc-600 dark:text-zinc-500">{{ item.description }}</div>
                </div>
                <UIcon
                  v-if="item.link"
                  name="i-heroicons-arrow-top-right-on-square"
                  class="w-4 h-4 text-zinc-500 dark:text-zinc-600"
                />
              </component>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
