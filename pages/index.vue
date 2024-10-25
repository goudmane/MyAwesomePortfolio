<script setup lang="ts">

const styledMainContainer = {
/*   counterReset: 'section', */
};

</script>

<template>
  <NuxtLayout>
    <main class="fillHeight" :style="styledMainContainer">
      <Hero />
      <About />
      <Jobs />
      <Featured />
      <!-- <Projects /> -->
      <Contact />
    </main>
  </NuxtLayout>
</template>

<style lang="scss"scoped>
</style>
