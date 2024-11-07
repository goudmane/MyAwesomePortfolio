<template>
  <div id="root">
    <a class="skip-to-content" href="#content">Skip to Content</a>
    
    <Loader v-if="isLoading" />

    <div v-else class="styled-content">
      <Nav />
      <Social />
      <Email />
      
      <div id="content">  
        <slot></slot>
      </div>
      <Footer />
    </div>
  
  </div>
</template>

<script setup lang="ts">


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

<style lang="scss" scoped>

div.styled-content {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

</style>

