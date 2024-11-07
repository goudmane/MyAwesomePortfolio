<template>
  <header
    :class="{ 'scroll-up': scrollDirection === 'up', 'scroll-down': scrollDirection === 'down', 'scrolled-to-top': scrolledToTop }"
    class="header">
    <nav>
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

      <div class="styled-links">
        <TransitionGroup tag="ol" name="fadedown">
          <li v-if="!isLoading" v-for="(link, i) in navLinks" :key="i"
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
      </div>

      <Transition tag="div" name="fadedown">
        <Menu></Menu>
      </Transition>
    </nav>
  </header>
</template>

<script setup>

const { scrollDirection, scrolledToTop } = useScrollHandling();

const isMounted = ref(false);
const navLinks = useAppConfig().navLinks;
const isLoading = computed(() => isMounted.value ? useLoaderStore().loading : true);

onMounted(() => {
  isMounted.value = true;
});
</script>

<style lang="scss" scoped>
.header {
  @include flexBetween;
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

  nav {
    @include flexBetween;
    position: relative;
    width: 100%;
    color: $lightest-slate;
    font-family: $font-mono;
    counter-reset: item 0;
    z-index: 12;

    .logo {
      @include flexCenter;

      a {
        color: $gold;
        width: 42px;
        height: 42px;
        position: relative;
        z-index: 1;

        >* {
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

    .styled-links {
      display: flex;
      align-items: center;

      @media (max-width: 768px) {
        display: none;
      }

      :deep(ol) {
        @include flexBetween;
        padding: 0;
        margin: 0;
        list-style: none;

        li {
          margin: 0 5px;
          position: relative;
          counter-increment: item 1;
          font-size: $fz-xs;

          a {
            padding: 10px;

            &:before {
              content: '0' counter(item) '.';
              margin-right: 5px;
              color: $gold;
              font-size: $fz-xxs;
              text-align: right;
            }
          }
        }
      }

      :deep(.resume-button) {
        @include smallButton;
        margin: 0px 15px;
        font-size: $fz-xs;
      }
    }
  }
}
</style>
