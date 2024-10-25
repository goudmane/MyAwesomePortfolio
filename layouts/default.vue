<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute();

const isHome = ref(true);
const loaderStore = useLoaderStore();
const isLoading = computed(() => loaderStore.loading);

const handleExternalLinks = () => {
  const allLinks = Array.from(document.querySelectorAll('a'));
  allLinks.forEach(link => {
    if (link.host !== window.location.host) {
      link.setAttribute('rel', 'noopener noreferrer');
      link.setAttribute('target', '_blank');
    }
  });
};

</script>

<template>
  <div id="root">
    <a class="skip-to-content" href="#content">Skip to Content</a>
    
    <Loader v-if="isLoading && isHome && true" />

    <div v-else class="styledContent">
      <Nav />
      <Social :isHome="isHome" />
      <Email :isHome="isHome" />
      
      <div id="content">  
        <slot></slot>
      </div>
      <Footer />
    </div>
  
  </div>
</template>

<style lang="scss" scoped>

div.styledContent {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

</style>

