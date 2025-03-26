<script setup>
const slides = [
  { src: 'https://picsum.photos/1100/200?id=1' },
  { src: 'https://picsum.photos/1100/200?id=2' },
  { src: 'https://picsum.photos/1100/200?id=3' },
  { src: 'https://picsum.photos/1100/200?id=4' },
  { src: 'https://picsum.photos/1100/200?id=5' },
]
</script>

<template>
  <SplideContainer>
    <SplideSlide
      v-for="slide in slides"
      :key="slide.src"
    >
      <img
        :src="slide.src"
        alt=""
      >
    </SplideSlide>
  </SplideContainer>
</template>

<script setup>
</script>
