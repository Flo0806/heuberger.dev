<script setup lang="ts">
const { t } = useI18n()

const primarySkills = [
  { name: 'Vue.js', icon: 'i-simple-icons-vuedotjs', color: 'text-green-400', link: 'https://vuejs.org/' },
  { name: 'Nuxt', icon: 'i-simple-icons-nuxtdotjs', color: 'text-green-500', link: 'https://nuxt.com/' },
  { name: 'TypeScript', icon: 'i-simple-icons-typescript', color: 'text-blue-400', link: 'https://www.typescriptlang.org/' },
  { name: 'Node.js', icon: 'i-simple-icons-nodedotjs', color: 'text-green-600', link: 'https://nodejs.org/' },
  { name: 'NestJS', icon: 'i-simple-icons-nestjs', color: 'text-rose-600', link: 'https://nestjs.com/' },
  { name: 'Python', icon: 'i-simple-icons-python', color: 'text-yellow-400', link: 'https://www.python.org/' }
]

const secondarySkills = [
  { name: 'Angular', icon: 'i-simple-icons-angular', color: 'text-red-500', link: 'https://angular.io/' },
  { name: 'React', icon: 'i-simple-icons-react', color: 'text-cyan-400', link: 'https://react.dev/' },
  { name: 'Next.js', icon: 'i-simple-icons-nextdotjs', color: 'text-zinc-100', link: 'https://nextjs.org/' }
]

const tools = [
  { name: 'Git', icon: 'i-simple-icons-git', color: 'text-orange-500', link: 'https://git-scm.com/' },
  { name: 'GitHub', icon: 'i-simple-icons-github', color: 'text-zinc-100', link: 'https://github.com/' },
  { name: 'GitLab', icon: 'i-simple-icons-gitlab', color: 'text-orange-600', link: 'https://gitlab.com/' },
  { name: 'Docker', icon: 'i-simple-icons-docker', color: 'text-blue-500', link: 'https://www.docker.com/' },
  { name: 'VS Code', icon: 'i-simple-icons-visualstudiocode', color: 'text-blue-400', link: 'https://code.visualstudio.com/' },
  { name: 'Tailwind', icon: 'i-simple-icons-tailwindcss', color: 'text-cyan-400', link: 'https://tailwindcss.com/' },
  { name: 'PostgreSQL', icon: 'i-simple-icons-postgresql', color: 'text-blue-300', link: 'https://www.postgresql.org/' },
  { name: 'MongoDB', icon: 'i-simple-icons-mongodb', color: 'text-green-500', link: 'https://www.mongodb.com/' },
  { name: 'InfluxDB', icon: 'i-simple-icons-influxdb', color: 'text-purple-400', link: 'https://www.influxdata.com/' },
  { name: 'Linux', icon: 'i-simple-icons-linux', color: 'text-yellow-500', link: 'https://www.linux.org/' },
  { name: 'Windows', icon: 'i-simple-icons-windows', color: 'text-blue-400', link: 'https://www.microsoft.com/windows' },
  { name: 'macOS', icon: 'i-simple-icons-apple', color: 'text-zinc-300', link: 'https://www.apple.com/macos/' }
]

</script>

<template>
  <section
    id="skills"
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
            <span class="gradient-text">{{ t('skills.title') }}</span>
          </h2>
          <p class="text-xl text-zinc-400">{{ t('skills.subtitle') }}</p>
        </div>

        <!-- Primary Skills -->
        <div class="mb-12">
          <h3
            v-motion
            :initial="{ opacity: 0 }"
            :visible-once="{ opacity: 1, transition: { duration: 400 } }"
            class="text-lg font-semibold text-zinc-300 mb-6 text-center"
          >
            {{ t('skills.primary') }}
          </h3>
          <div class="flex flex-wrap justify-center gap-4">
            <a
              v-for="(skill, index) in primarySkills"
              :key="skill.name"
              :href="skill.link"
              target="_blank"
              rel="noopener noreferrer"
              v-motion
              :initial="{ opacity: 0, scale: 0.8 }"
              :visible-once="{ opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, delay: index * 100 } }"
              class="glass rounded-xl px-6 py-4 flex items-center gap-3 cursor-pointer hover:border-orange-500/50 hover:scale-105 transition-all duration-200"
            >
              <UIcon :name="skill.icon" :class="[skill.color, 'w-8 h-8']" />
              <span class="font-medium">{{ skill.name }}</span>
            </a>
          </div>
        </div>

        <!-- Secondary Skills -->
        <div class="mb-12">
          <h3
            v-motion
            :initial="{ opacity: 0 }"
            :visible-once="{ opacity: 1, transition: { duration: 400, delay: 300 } }"
            class="text-lg font-semibold text-zinc-300 mb-6 text-center"
          >
            {{ t('skills.secondary') }}
          </h3>
          <div class="flex flex-wrap justify-center gap-4">
            <a
              v-for="(skill, index) in secondarySkills"
              :key="skill.name"
              :href="skill.link"
              target="_blank"
              rel="noopener noreferrer"
              v-motion
              :initial="{ opacity: 0, x: -20 }"
              :visible-once="{ opacity: 1, x: 0, transition: { duration: 400, delay: 400 + index * 80 } }"
              class="glass rounded-xl px-5 py-3 flex items-center gap-3 cursor-pointer hover:border-orange-500/50 hover:scale-105 transition-all duration-200"
            >
              <UIcon :name="skill.icon" :class="[skill.color, 'w-6 h-6']" />
              <span class="text-sm">{{ skill.name }}</span>
            </a>
          </div>
        </div>

        <!-- Tools -->
        <div>
          <h3
            v-motion
            :initial="{ opacity: 0 }"
            :visible-once="{ opacity: 1, transition: { duration: 400, delay: 500 } }"
            class="text-lg font-semibold text-zinc-300 mb-6 text-center"
          >
            {{ t('skills.tools') }}
          </h3>
          <div class="flex flex-wrap justify-center gap-3">
            <a
              v-for="(tool, index) in tools"
              :key="tool.name"
              :href="tool.link"
              target="_blank"
              rel="noopener noreferrer"
              v-motion
              :initial="{ opacity: 0, y: 15 }"
              :visible-once="{ opacity: 1, y: 0, transition: { duration: 300, delay: 600 + index * 50 } }"
              class="glass rounded-lg px-4 py-2 flex items-center gap-2 cursor-pointer hover:border-orange-500/50 hover:scale-110 hover:-translate-y-0.5 transition-all duration-200"
            >
              <UIcon :name="tool.icon" :class="[tool.color, 'w-5 h-5']" />
              <span class="text-sm text-zinc-400 dark:text-zinc-400">{{ tool.name }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
