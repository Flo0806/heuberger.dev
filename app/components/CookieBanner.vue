<script setup lang="ts">
const { t } = useI18n()

const isVisible = ref(false)

onMounted(() => {
  // Check if user already accepted
  const accepted = localStorage.getItem('cookie-consent')
  if (!accepted) {
    isVisible.value = true
  }
})

const accept = () => {
  localStorage.setItem('cookie-consent', 'accepted')
  isVisible.value = false
}
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-4"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-4"
  >
    <div
      v-if="isVisible"
      class="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50"
    >
      <div class="glass rounded-2xl p-5 shadow-xl border border-zinc-700/50 dark:border-zinc-700/50">
        <div class="flex items-start gap-4">
          <div class="shrink-0 w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
            <UIcon name="i-heroicons-shield-check" class="w-5 h-5 text-orange-400" />
          </div>
          <div class="flex-1">
            <h3 class="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
              {{ t('cookies.title') }}
            </h3>
            <p class="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
              {{ t('cookies.description') }}
            </p>
            <div class="flex items-center gap-3">
              <UButton
                color="primary"
                size="sm"
                @click="accept"
              >
                {{ t('cookies.accept') }}
              </UButton>
              <a
                href="/privacy"
                class="text-sm text-zinc-500 hover:text-orange-400 transition-colors"
              >
                {{ t('cookies.learnMore') }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
