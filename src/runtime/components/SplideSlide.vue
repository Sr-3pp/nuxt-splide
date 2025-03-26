<script setup lang="ts">
import { SplideSlide as Slide } from '@splidejs/vue-splide'
</script>

<template>
  <Slide v-bind="$attrs">
    <slot />
  </Slide>
</template>
