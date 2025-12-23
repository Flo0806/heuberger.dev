<script setup lang="ts">
const scrollTo = (href: string) => {
  const el = document.querySelector(href)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <div>
    <SectionsHeroSection @scroll-to="scrollTo" />
    <SectionsAboutSection />
    <SectionsSkillsSection />
    <SectionsProjectsSection />
    <SectionsUsesSection />
    <SectionsHardwareSection />
    <SectionsContactSection />
  </div>
</template>
