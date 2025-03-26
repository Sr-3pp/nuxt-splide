<script setup lang="ts">
import { Splide as SplideRoot } from '@splidejs/vue-splide'
import { computed } from 'vue'
import { useRuntimeConfig } from '#app'

const props = defineProps<{
  options?: Record<string, number>
  variant?: string
}>()

const config = useRuntimeConfig()
const globalOptions = config.public.splide?.defaults || {}

const mergedOptions = computed(() => ({
  ...globalOptions,
  ...props.options,
}))

const variant = computed(() => props.variant || globalOptions.variant || '')
</script>

<template>
  <SplideRoot
    v-bind="$attrs"
    :options="mergedOptions"
    :class="variant ? `splide--${variant}` : ''"
  >
    <slot />
  </SplideRoot>
</template>
