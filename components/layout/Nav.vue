<template>
  <StyledHeader :scrollDirection="scrollDirection" :scrolledToTop="scrolledToTop">
    <StyledNav>
      <Transition tag="div" name="fadeup">
        <div v-if="!isLoading" class="logo" tabindex="-1">
          <NuxtLink to="/" aria-label="home">
            <div className="hex-container">
              <IconHex />
            </div>
            <div className="logo-container">
              <IconLogo />
            </div>
          </NuxtLink>
        </div>
      </Transition>

      <StyledLinks>
        <TransitionGroup tag="ol" name="fadedown">
          <li v-if="!isLoading && !prefersReducedMotion" v-for="(link, i) in navLinks" :key="i"
            :style="{ transitionDelay: `${(i + 1) * 100}ms` }">
            <NuxtLink :to="link.url">{{ $t('lang.' + link.name) }}</NuxtLink>
          </li>
        </TransitionGroup>
        <Transition tag="div" name="fadedown">
          <ResumeButton :isLoading="isLoading" />
        </Transition>
        <Transition tag="div" name="fadedown">
          <LangSwitcher></LangSwitcher>
        </Transition>
      </StyledLinks>

      <Transition tag="div" name="fadedown">
        <Menu></Menu>
      </Transition>
    </StyledNav>
  </StyledHeader>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import Menu from './Menu.vue';
const { locale } = useI18n();



const isMounted = ref(false);
const prefersReducedMotion = usePrefersReducedMotion();
const navLinks = useAppConfig().navLinks;
const scrollDirection = ref('down');
const scrolledToTop = ref(true);
const prevScroll = ref(0);
const isLoading = computed(() => isMounted.value ? useLoaderStore().loading : true);
const currentLang = computed(() => locale.value);


onMounted(() => {
  isMounted.value = true;
});
</script>

<style lang="scss" scoped>
.logo {
  @include flexCenter;
  /* Explicitly include flexCenter mixin */

  a {
    color: $gold;
    width: 42px;
    height: 42px;
    position: relative;
    z-index: 1;

    > *{
      width: 100%;
      height: 100%;
    }

    .hex-container {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;

      @media (prefers-reduced-motion: no-preference) {
        transition: $transition;
      }
    }

    .logo-container {
      position: relative;
      z-index: 1;

      svg {
        fill: none;
        user-select: none;

        @media (prefers-reduced-motion: no-preference) {
          transition: $transition;
        }

        polygon {
          fill: $navy;
        }
      }
    }

    &:hover,
    &:focus {
      outline: 0;
      transform: translate(-4px, -4px);

      .hex-container {
        transform: translate(4px, 3px);
      }
    }
  }
}
</style>
