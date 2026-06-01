<script setup lang="ts">
import { computed } from "vue"
import { useI18n } from "~/composables/useI18n"

const { t, locale, toggleLocale } = useI18n()

const pageTitle = computed(() => `${t("hero.firstName")} ${t("hero.lastName")} | ${t("hero.role.0")}`)
const pageDesc = computed(() => locale.value === "en"
  ? "Personal developer portfolio. Vue.js, Nuxt, Golang."
  : "Личное портфолио разработчика. Vue.js, Nuxt, Golang."
)

useHead({
  title: pageTitle,
  meta: [
    { name: "description", content: pageDesc },
    { name: "theme-color", content: "#0a1628" },
  ],
  link: [
    { rel: "icon", type: "image/svg+xml", href: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>👨‍💻</text></svg>" },
  ],
})

useSeoMeta({
  ogTitle: pageTitle,
  ogDescription: pageDesc,
  ogType: "website",
})
</script>

<template>
  <div class="relative min-h-screen bg-[#0a1628] text-white selection:bg-blue-500/20">
    <GridBackground />

    <nav class="fixed left-1/2 top-4 z-50 -translate-x-1/2">
      <div class="flex items-center gap-1 rounded-full border border-blue-500/20 bg-[#0a1628]/80 px-2 py-1 backdrop-blur-xl">
        <a
          v-for="link in [
            { to: '#hero', key: 'nav.hero' },
            { to: '#skills', key: 'nav.skills' },
            { to: '#experience', key: 'nav.experience' },
            { to: '#contacts', key: 'nav.contacts' },
          ]"
          :key="link.to"
          :href="link.to"
          class="rounded-full px-4 py-2 text-sm text-gray-400 transition-all duration-300 hover:bg-blue-500/10 hover:text-blue-300"
        >
          {{ t(link.key) }}
        </a>
        <div class="mx-1 h-5 w-px bg-blue-500/20" />
        <button
          @click="toggleLocale()"
          class="rounded-full px-3 py-2 text-sm font-medium text-blue-400 transition-all duration-300 hover:bg-blue-500/10"
        >
          {{ locale === "ru" ? "EN" : "RU" }}
        </button>
      </div>
    </nav>

    <main class="relative z-10">
      <HeroSection />
      <SkillsSection />
      <ExperienceSection />
      <ContactSection />
    </main>

    <footer class="relative z-10 border-t border-blue-500/10 py-8 text-center">
      <p class="text-sm text-gray-600">
        &copy; {{ new Date().getFullYear() }} neketli
      </p>
    </footer>
  </div>
</template>
