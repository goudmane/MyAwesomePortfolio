<template>
  <section class="hero-section">
    <TransitionGroup tag="div" name="fadeup" >
      <div 
        v-if="!isLoading && !prefersReducedMotion"
        v-for="(item, i) in items"
        :key="i"
        :style="{ transitionDelay: `${(i + 1) * 100}ms` }"
      >
        <component :is="item.tag" :class="item.class" v-html="item.text"
          :href="(item.class === 'email-link') ? emailLink : null"
        >
         
        </component>
      </div>
    </TransitionGroup>
  </section>
</template>

<script setup lang="ts">
const { locale } = useI18n();

const isMounted = ref(false);
const prefersReducedMotion = ref(false);
const loaderStore = useLoaderStore();

const items = ref<any[]>([]);


const fetchHeroData = async () => {
  const heroData = await queryContent(`${locale.value}/hero`).findOne();
  items.value = heroData ? heroData.items : [];
};


onMounted(async () => {
  prefersReducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  await fetchHeroData();
  isMounted.value = true;
});

const emailLink = computed(() => `mailto:${useAppConfig().email}`);
const isLoading = computed(() => isMounted.value ? loaderStore.loading : true);
</script>

<style lang="scss">


.hero-section {
  @include flexCenter;
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  padding: 0;

  @media (max-width: 480px) and (min-height: 700px) {
    padding-bottom: 10vh;
  }

  h1 {
    margin: 0 0 30px 4px;
    color: $gold;
    font-family: $font-mono;
    font-size: clamp($fz-sm, 5vw, $fz-md);
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 10px;
    color: $slate;
    line-height: 0.9;
    span.gold {
      color: $gold;
    }
  }

  p {
    margin: 20px 0 0;
    max-width: 720px;
    @media (max-width: 480px) and (min-height: 700px) {
      max-width: 540px;  
    }
  }

  .email-link {
    @include bigButton; 
    margin-top: 50px;
  }

  .medium-heading {
    .laravel{
      color:$laravel;
    }
    .nuxt{
      color:$nuxt;
    }
  }  
}


</style>
