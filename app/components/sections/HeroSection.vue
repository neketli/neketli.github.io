<script setup lang="ts">
import { computed } from "vue"
import { contacts } from "~/data/portfolio"
import { useI18n } from "~/composables/useI18n"
import { contactIcons } from "~/utils/icons"

const { t } = useI18n()

const roles = computed(() => [
  t("hero.role.0"),
  t("hero.role.1"),
  t("hero.role.2"),
  t("hero.role.3"),
  t("hero.role.4"),
])

const contactList = Object.entries(contacts) as [string, string][]
</script>

<template>
  <section id="hero" class="relative min-h-screen overflow-hidden">
    <BlackHoleBackground
      strokeColor="#3b82f6"
      class="min-h-screen"
      :particleRGBColor="[96, 165, 250]"
    >
      <div class="absolute inset-0 z-10 bg-[#0a1628]/70" />
      <div class="relative z-20 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-4 text-center">
        <div class="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-300 backdrop-blur-sm">
          <span class="h-2 w-2 rounded-full bg-green-400" style="box-shadow: 0 0 8px rgba(34,197,94,0.6);" />
          {{ t("hero.location") }}
        </div>

        <div class="mb-4 overflow-hidden">
          <h1 class="text-6xl font-bold tracking-tight sm:text-8xl lg:text-9xl">
            <span class="inline-block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent mr-2" style="animation: heroReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards">
              {{ t("hero.firstName") }}
            </span>
            <span class="inline-block bg-gradient-to-r from-blue-500 via-purple-400 to-blue-400 bg-clip-text text-transparent" style="animation: heroReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards">
              {{ t("hero.lastName") }}
            </span>
          </h1>
        </div>

        <div class="mb-8 h-14 text-2xl font-light sm:text-3xl lg:text-4xl">
          <ClientOnly>
            <FlipWords
              :words="roles"
              :duration="4000"
              class="text-2xl sm:text-3xl lg:text-4xl bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent"
            />
            <template #fallback>
              <span class="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">{{ roles[0] }}</span>
            </template>
          </ClientOnly>
        </div>

        <p class="mx-auto mb-12 max-w-2xl text-base text-gray-400 sm:text-lg">
          {{ t("hero.bio") }}
        </p>

        <div class="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#contacts"
            class="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 p-[1px] font-medium text-white transition-all duration-500 hover:shadow-[0_0_50px_-5px_rgba(59,130,246,0.6)] hover:scale-105"
          >
            <span class="inline-flex h-full w-full items-center justify-center rounded-full bg-[#0a1628] px-8 transition-all duration-300 group-hover:bg-[#0a1628]/40">
              {{ t("hero.contact") }}
            </span>
          </a>
          <a
            href="#experience"
            class="group relative inline-flex h-12 items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/10 px-8 font-medium text-blue-300 backdrop-blur-sm transition-all duration-500 hover:border-blue-400/50 hover:bg-blue-500/20 hover:text-blue-200 hover:scale-105"
          >
            {{ t("hero.experience") }}
          </a>
        </div>

        <div class="mt-16 flex items-center justify-center gap-4">
          <a
            v-for="[name, url] in contactList"
            :key="name"
            :href="url"
            :target="name === 'email' ? undefined : '_blank'"
            :rel="name === 'email' ? undefined : 'noopener noreferrer'"
            class="group flex h-11 w-11 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/5 text-gray-400 backdrop-blur-sm transition-all duration-300 hover:border-blue-400/50 hover:bg-blue-500/15 hover:text-blue-300 hover:shadow-[0_0_20px_-5px_rgba(59,130,246,0.4)]"
          >
            <Icon :name="contactIcons[name]" class="h-5 w-5" />
          </a>
        </div>
      </div>
    </BlackHoleBackground>

    <div class="pointer-events-none absolute bottom-0 left-0 right-0 z-30 h-64 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/60 to-transparent" />
    <div class="pointer-events-none absolute bottom-0 left-0 right-0 z-30 h-32 blur-[30px] bg-gradient-to-t from-[#0a1628] to-transparent opacity-60" />
  </section>
</template>

<style scoped>
@keyframes heroReveal {
  from { opacity: 0; transform: translateY(60px); filter: blur(8px); }
  to { opacity: 1; transform: translateY(0); filter: blur(0); }
}
</style>
