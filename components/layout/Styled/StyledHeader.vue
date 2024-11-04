<template>
    <header :class="{'scroll-up': scrollDirection === 'up', 'scroll-down': scrollDirection === 'down', 'scrolled-to-top': scrolledToTop}" class="header">

    <slot></slot>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';

const props = defineProps({
  scrollDirection: {
    type: String,
    default: 'down',
  },
  scrolledToTop: {
    type: Boolean,
    default: true,
  },
});

const scrollDirection = ref('down');
const scrolledToTop = ref(true);
const prevScroll = ref(0);

const handleScroll = () => {
  const currentScroll = window.scrollY;

  scrolledToTop.value = currentScroll < 50;

  if (currentScroll > 50) {
    scrollDirection.value = (currentScroll > prevScroll.value) ? 'down' : 'up';
  }

  prevScroll.value = currentScroll;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});

</script>

<style lang="scss" scoped>
.header {
  @include flexBetween;
  /* Assuming this mixin aligns items */
  position: fixed;
  top: 0;
  z-index: 11;
  padding: 0 50px;
  width: 100%;
  height: $nav-height;
  background-color: rgba(10, 25, 47, 0.85);
  backdrop-filter: blur(10px);
  transition: height 0.3s, transform 0.3s;

  @media (max-width: 1080px) {
    padding: 0 40px;
  }

  @media (max-width: 768px) {
    padding: 0 25px;
  }

  &.scroll-down:not(.scrolled-to-top) {
    height: $nav-scroll-height;
    transform: translateY(calc($nav-scroll-height) * -1);
    box-shadow: 0 10px 30px -10px $navy-shadow;
  }

  &.scroll-up:not(.scrolled-to-top) {
    height: $nav-scroll-height;
    transform: translateY(0px);
    background-color: rgba(10, 25, 47, 0.85);
    box-shadow: 0 10px 30px -10px $navy-shadow;
  }
}
</style>
