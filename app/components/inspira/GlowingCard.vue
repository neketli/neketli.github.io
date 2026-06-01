<script setup lang="ts">
interface Props {
  class?: string
}

const props = defineProps<Props>()
</script>

<template>
  <div
    class="group relative rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-500 hover:border-blue-500/50 hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.4)]"
    :class="props.class"
  >
    <div class="pointer-events-none absolute -inset-px hidden rounded-xl opacity-0 transition-opacity group-hover:block group-hover:opacity-100" />
    <slot />
  </div>
</template>
