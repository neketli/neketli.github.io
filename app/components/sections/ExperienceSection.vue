<script setup lang="ts">
import { onMounted, reactive, ref } from "vue"
import { experiences } from "~/data/portfolio"
import { useI18n } from "~/composables/useI18n"

const { t } = useI18n()

const visibleCards = reactive(new Set<number>())
const cardRefs = ref<(HTMLElement | null)[]>([])

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const idx = Number(entry.target.getAttribute("data-index"))
          if (!isNaN(idx)) {
            visibleCards.add(idx)
          }
          observer.unobserve(entry.target)
        }
      }
    },
    { threshold: 0.15 },
  )
  for (const el of cardRefs.value) {
    if (el) observer.observe(el)
  }
})
</script>

<template>
  <section id="experience" class="relative py-24">
    <div class="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-blue-950/10 to-[#0a1628]" />

    <div class="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <div class="mb-12 text-center">
        <span class="mb-4 inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-300 backdrop-blur-sm">
          {{ t("section.experience.title") }}
        </span>
        <h2 class="text-3xl font-bold sm:text-4xl">
          <span class="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            {{ t("section.experience.title") }}
          </span>
        </h2>
        <p class="mt-3 text-sm text-gray-500">{{ t("section.experience.desc") }}</p>
      </div>

      <div class="relative">
        <div class="absolute left-7 top-0 h-full w-px bg-gradient-to-b from-blue-500/50 via-cyan-500/50 to-blue-500/50 max-md:left-3" />

        <div
          v-for="(exp, i) in experiences"
          :key="exp.id"
          :ref="(el) => { cardRefs[i] = el as HTMLElement | null }"
          :data-index="i"
          class="group relative mb-8 pl-16 max-md:pl-12 last:mb-0 transition-all duration-700"
          :class="visibleCards.has(i) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
        >
          <div class="absolute left-5 top-1 flex h-4 w-4 items-center justify-center max-md:left-1.5">
            <div class="h-3.5 w-3.5 rounded-full border-2 border-blue-400 bg-[#0a1628] transition-all duration-500 group-hover:scale-150 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
          </div>

          <GlowingCard class="!rounded-lg !border-blue-500/10 !p-5 hover:!border-blue-400/30">
            <div class="mb-3 flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 class="text-base font-bold text-white">{{ t(`exp.${i}.company`) }}</h3>
                <p class="text-xs text-blue-300">{{ t(`exp.${i}.role`) }}</p>
              </div>
              <span class="whitespace-nowrap rounded-full bg-blue-500/10 px-2.5 py-0.5 text-[11px] text-blue-300">
                {{ t(`exp.${i}.period`) }}
              </span>
            </div>

            <div class="mb-3 flex flex-wrap gap-1">
              <span
                v-for="tech in exp.stack"
                :key="tech"
                class="rounded bg-blue-500/10 px-2 py-0.5 text-[11px] text-cyan-300"
              >
                {{ tech }}
              </span>
            </div>

            <ul class="space-y-1.5">
              <li
                v-for="j in exp.taskCount"
                :key="j"
                class="flex items-start gap-2 text-xs text-gray-400"
              >
                <span class="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-cyan-500" />
                {{ t(`exp.${i}.task.${j - 1}`) }}
              </li>
            </ul>
          </GlowingCard>
        </div>
      </div>
    </div>
  </section>
</template>
