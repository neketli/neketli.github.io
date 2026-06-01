<script setup lang="ts">
import { contacts } from "~/data/portfolio"
import { useI18n } from "~/composables/useI18n"
import { contactIcons } from "~/utils/icons"
import { ref } from "vue"

const { t } = useI18n()
const form = ref({ email: "", telegram: "", description: "" })
const status = ref<"idle" | "sending" | "sent" | "error">("idle")

const contactList = Object.entries(contacts) as [string, string][]

async function submitForm() {
  if (status.value === "sending") return
  status.value = "sending"
  try {
    const res = await fetch("https://neketli.ru/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form.value),
    })
    if (!res.ok) throw new Error("API error")
    status.value = "sent"
  } catch {
    status.value = "error"
  }
}
</script>

<template>
  <section id="contacts" class="relative py-24">
    <div class="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-blue-950/10 to-[#0a1628]" />

    <div class="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <div class="mb-12 text-center">
        <span class="mb-4 inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-300 backdrop-blur-sm">
          {{ t("section.contacts.title") }}
        </span>
        <h2 class="text-3xl font-bold sm:text-4xl">
          <span class="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            {{ t("section.contacts.title") }}
          </span>
        </h2>
        <p class="mt-3 text-sm text-gray-500">{{ t("section.contacts.desc") }}</p>
      </div>

      <div class="grid gap-6 lg:grid-cols-2">
        <GlowingCard class="!rounded-lg !border-blue-500/10 !p-6">
          <h3 class="mb-5 text-base font-semibold text-white">{{ t("contact.form.title") }}</h3>

          <form @submit.prevent="submitForm" class="space-y-3">
            <input
              v-model="form.email"
              type="email"
              :placeholder="t('contact.form.email')"
              class="w-full rounded-lg border border-blue-500/10 bg-blue-500/[0.03] px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none transition-all duration-300 focus:border-blue-400/40 focus:shadow-[0_0_12px_-4px_rgba(59,130,246,0.3)]"
            />
            <input
              v-model="form.telegram"
              type="text"
              :placeholder="t('contact.form.telegram')"
              class="w-full rounded-lg border border-blue-500/10 bg-blue-500/[0.03] px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none transition-all duration-300 focus:border-cyan-400/40 focus:shadow-[0_0_12px_-4px_rgba(6,182,212,0.3)]"
            />
            <textarea
              v-model="form.description"
              rows="4"
              :placeholder="t('contact.form.message')"
              class="w-full resize-none rounded-lg border border-blue-500/10 bg-blue-500/[0.03] px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none transition-all duration-300 focus:border-blue-400/40 focus:shadow-[0_0_12px_-4px_rgba(59,130,246,0.3)]"
            />
            <button
              type="submit"
              :disabled="status === 'sending' || status === 'sent'"
              class="group relative inline-flex h-10 w-full items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 p-[1px] text-sm font-medium text-white transition-all duration-300 hover:shadow-[0_0_25px_-5px_rgba(59,130,246,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span class="inline-flex h-full w-full items-center justify-center rounded-full bg-[#0a1628] transition-all duration-300 group-hover:bg-[#0a1628]/60">
                <template v-if="status === 'sending'">
                  <svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                </template>
                <template v-else-if="status === 'sent'">{{ t("contact.form.sent") }}</template>
                <template v-else-if="status === 'error'">{{ t("contact.form.error") }}</template>
                <template v-else>{{ t("contact.form.send") }}</template>
              </span>
            </button>
          </form>
        </GlowingCard>

        <div class="flex flex-col justify-center gap-4">
          <h3 class="text-base font-semibold text-white">{{ t("contact.links") }}</h3>
          <p class="text-xs text-gray-500">{{ t("contact.pick") }}</p>

          <a
            v-for="[name, url] in contactList"
            :key="name"
            :href="url"
            :target="name === 'email' ? undefined : '_blank'"
            :rel="name === 'email' ? undefined : 'noopener noreferrer'"
            class="group flex items-center gap-3 rounded-lg border border-blue-500/10 bg-blue-500/[0.02] p-3 transition-all duration-300 hover:border-blue-400/30 hover:bg-blue-500/[0.06] hover:shadow-[0_0_15px_-5px_rgba(59,130,246,0.3)]"
          >
            <div
              class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 p-2 text-blue-400 transition-all duration-300 group-hover:bg-cyan-500/10 group-hover:text-cyan-400"
            >
              <Icon :name="contactIcons[name]" class="h-5 w-5" />
            </div>
            <div>
              <p class="text-sm font-medium capitalize text-white">{{ name }}</p>
              <p class="text-[11px] text-gray-600">{{ url.replace(/https?:\/\/|mailto:/, "") }}</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
