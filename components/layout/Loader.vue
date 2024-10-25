<template>
  <div class="loader"  >
    <div class="logo-wrapper">
      <svg id="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><title>Loader Logo</title><g><g id="B" transform="translate(11.000000, 5.000000)"><path d="M 56.66 41.8 L 42.08 41.8 C 41.54 41.8 41.18 42.16 41.18 42.7 L 41.18 47.2 C 41.18 47.74 41.54 48.1 42.08 48.1 L 49.28 48.1 L 49.28 48.82 C 49.28 53.86 46.04 57.28 40.28 57.28 C 33.44 57.28 29.3 52.24 29.3 43.6 C 29.3 34.96 33.26 29.92 39.92 29.92 C 44.6 29.92 46.94 32.08 48.74 35.86 C 48.74 36.22 49.1 36.4 49.46 36.4 L 56.3 36.4 C 56.48 36.4 56.66 36.22 56.66 35.86 C 56.66 35.86 56.66 35.86 56.66 35.86 C 54.68 27.58 48.38 22.72 39.74 22.72 C 28.4 22.72 21.02 31 21.02 43.6 C 21.02 56.56 28.22 64.48 39.92 64.48 C 50.72 64.48 57.56 57.82 57.56 47.38 L 57.56 42.7 C 57.56 42.16 57.2 41.8 56.66 41.8 Z M 56.66 41.8" fill="currentColor"></path></g><path stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" d="M 50, 5 L 11, 27 L 11, 72 L 50, 95 L 89, 73 L 89, 28 z"></path></g></svg>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import anime from 'animejs';

const loaderStore = useLoaderStore();

const animate = () => {
  const loader = anime.timeline({
    complete: function(anim) {
      loaderStore.setLoading(false)
    }
  });

  loader
    .add({
      targets: '.logo-wrapper',
      delay: 2,
      duration: 2,
      opacity: 1,
      strokeDashoffset: [anime.setDashoffset, 0],
    })
    .add({
      targets: '#logo path',
      delay: 300,
      duration: 1500,
      easing: 'easeInOutQuart',
      strokeDashoffset: [anime.setDashoffset, 0],
    })
    .add({
      targets: '#logo #B',
      duration: 700,
      easing: 'easeInOutQuart',
      opacity: 1,
    })
    .add({
      targets: '#logo',
      delay: 500,
      duration: 300,
      easing: 'easeInOutQuart',
      opacity: 0,
      scale: 0,
    })
    .add({
      targets: '.loader',
      duration: 500,
      easing: 'easeInOutQuart',
      opacity: 0,
      zIndex: -1,
    });
};

onMounted(() => {
    animate();
});
</script>

<style lang="scss" >


.loader {
  @include flexCenter;

  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: $dark-navy;
  z-index: 99;

  .is-mounted {
    opacity: 1;
  }

  .logo-wrapper {
    width: max-content;
    max-width: 100px;
    transition: $transition;
    opacity: 0;
    svg {
      display: block;
      width: 100%;
      height: 100%;
      margin: 0 auto;
      fill: none;
      user-select: none;

      #B {
        opacity: 0;
      }
    }
  }
}

</style>
