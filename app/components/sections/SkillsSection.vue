<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from "vue"
import { skillsFrontend, skillsBackend, skillsDevops, skillsAI } from "~/data/portfolio"
import { useI18n } from "~/composables/useI18n"

const { t } = useI18n()

const skillCategories = [
  { id: "frontend", key: "skills.tab.frontend", skills: skillsFrontend },
  { id: "backend", key: "skills.tab.backend", skills: skillsBackend },
  { id: "devops", key: "skills.tab.devops", skills: skillsDevops },
  { id: "ai", key: "skills.tab.ai", skills: skillsAI },
]

const activeCategory = ref("frontend")

const activeSkills = computed(() =>
  skillCategories.find(c => c.id === activeCategory.value)?.skills ?? [],
)

const skillsAnimated = ref(false)

function setCategory(id: string) {
  activeCategory.value = id
  skillsAnimated.value = false
  nextTick(() => {
    requestAnimationFrame(() => {
      skillsAnimated.value = true
    })
  })
}

function skillDescKey(name: string): string {
  return "sd." + name
    .toLowerCase()
    .replace(/[/]/g, "_")
    .replace(/[\s&]+/g, "_")
    .replace(/_+/g, "_")
}

function skillDesc(name: string): string {
  const key = skillDescKey(name)
  const translated = t(key)
  return translated !== key ? translated : ""
}

function levelColor(level: number): string {
  if (level >= 9) return "bg-blue-400"
  if (level >= 7) return "bg-cyan-400"
  if (level >= 5) return "bg-blue-500"
  return "bg-blue-600"
}

const sectionRef = ref<HTMLElement | null>(null)

onMounted(() => {
  const el = sectionRef.value
  if (!el) return
  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0]
      if (entry?.isIntersecting) {
        skillsAnimated.value = true
        observer.disconnect()
      }
    },
    { threshold: 0.2 },
  )
  observer.observe(el)
})
</script>

<template>
  <section id="skills" ref="sectionRef" class="relative py-24">
    <div class="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-blue-950/10 to-[#0a1628]" />

    <div class="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div class="mb-12 text-center">
        <span class="mb-4 inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-300 backdrop-blur-sm">
          {{ t("section.skills.title") }}
        </span>
        <h2 class="text-3xl font-bold sm:text-4xl">
          <span class="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            {{ t("section.skills.title") }}
          </span>
        </h2>
        <p class="mt-3 text-sm text-gray-500">{{ t("section.skills.desc") }}</p>
      </div>

      <div class="mb-10 flex justify-center gap-2">
        <button
          v-for="cat in skillCategories"
          :key="cat.id"
          @click="setCategory(cat.id)"
          class="rounded-full px-5 py-2 text-sm font-medium transition-all duration-300"
          :class="activeCategory === cat.id
            ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/20'
            : 'border border-blue-500/20 bg-blue-500/5 text-gray-400 hover:border-blue-400/30 hover:text-blue-300'"
        >
          {{ t(cat.key) }}
        </button>
      </div>

      <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div
          v-for="skill in activeSkills"
          :key="skill.name"
          class="group rounded-lg border border-blue-500/10 bg-blue-500/[0.03] p-4 transition-all duration-300 hover:border-blue-400/30 hover:bg-blue-500/[0.06] hover:shadow-[0_0_20px_-8px_rgba(59,130,246,0.3)]"
        >
          <div class="mb-2 flex items-center justify-between">
            <h3 class="text-sm font-medium text-white">{{ skill.name }}</h3>
            <span v-if="skill.level" class="flex h-6 w-6 items-center justify-center rounded bg-blue-500/10 text-[10px] font-bold text-blue-300">
              {{ skill.level }}
            </span>
          </div>

          <p v-if="skillDesc(skill.name)" class="mb-2 text-[11px] leading-relaxed text-gray-500">
            {{ skillDesc(skill.name) }}
          </p>

          <div v-if="skill.level" class="h-1 w-full overflow-hidden rounded-full bg-blue-500/10">
            <div
              class="h-full rounded-full transition-all duration-1000 ease-out"
              :class="levelColor(skill.level)"
              :style="{ width: skillsAnimated ? (skill.level / 10) * 100 + '%' : '0%' }"
            />
          </div>

          <div v-if="skill.services" class="mt-2 flex flex-wrap gap-1">
            <span
              v-for="service in skill.services"
              :key="service"
              class="rounded bg-blue-500/5 px-1.5 py-0.5 text-[10px] text-gray-500"
            >
              {{ service }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
