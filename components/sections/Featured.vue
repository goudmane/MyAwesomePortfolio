<template>
  <section id="projects" class="projects-section">
    <h2 class="numbered-heading" :ref="setItemRef">{{ $t('lang.someOfMyWorks') }}</h2>

    <ul class="projects-grid">
      <li v-for="(project, index) in featuredProjectsData" :key="index" class="project" :ref="setItemRef">
        <div class="project-content">
          <p class="project-overline">{{ $t('lang.featuredProject') }}</p>
          <h3 class="project-title">
            <a :href="project.github">{{ project.title }}</a>
          </h3>
          <div class="project-description" v-html="project.description"></div>

          <ul v-if="project.tech" class="project-tech-list">
            <li v-for="(tech, i) in project.tech" :key="i">{{ tech }}</li>
          </ul>

          <div class="project-links">
            <a v-if="project.github" :href="project.github" aria-label="GitHub Link">
              <Icon name='icon-park-outline:github-one' />
            </a>
            <a v-if="project.external" :href="project.external" aria-label="External Link" class="external">
              <IconExternal />
            </a>
          </div>
        </div>

        <div class="project-image">
          <a :href="project.external || project.github || '#'">
            <img :src="'/static/' + project.cover" :alt="project.title" class="img" />
          </a>
        </div>
      </li>
    </ul>
  </section>
</template>


<script setup>

const { observeElement } = useIntersectionObserver();
const { locale } = useI18n();
const featuredProjectsData = ref(null);
const observedElements = [];

const fetchFeaturedProjects = async () => {
  const featuredProjects = await queryContent(`/${locale.value}/featured`).sort({ 'order': 1 }).find();
  featuredProjectsData.value = featuredProjects || null;
};

onMounted(async () => {
  requestIdleCallback(async () => {
    await fetchFeaturedProjects();
  });
});

const setItemRef = (el) => {
  observeElement(el);
};
</script>


<style lang="scss" scoped>
.projects-section {
  h2 {
    @media (prefers-reduced-motion: no-preference) {
      @include revealingInit;
    }
  }

  ul {
    @include resetList;

    a {
      position: relative;
      z-index: 1;
    }
  }

  .project {
    
    position: relative;
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(12, 1fr);
    align-items: center;
    
    @media (prefers-reduced-motion: no-preference) {
      @include revealingInit;
    }

    @media (max-width: 768px) {
      @include boxShadow;
    }

    &:not(:last-of-type) {
      margin-bottom: 100px;

      @media (max-width: 768px) {
        margin-bottom: 70px;
      }

      @media (max-width: 480px) {
        margin-bottom: 30px;
      }
    }

    &:nth-of-type(odd) {
      .project-content {
        grid-column: 7 / -1;
        text-align: right;

        @media (max-width: 1080px) {
          grid-column: 5 / -1;
        }

        @media (max-width: 768px) {
          grid-column: 1 / -1;
          padding: 40px 40px 30px;
          text-align: left;
        }

        @media (max-width: 480px) {
          padding: 25px 25px 20px;
        }
      }

      .project-tech-list {
        justify-content: flex-end;

        @media (max-width: 768px) {
          justify-content: flex-start;
        }

        li {
          margin: 0 0 5px 20px;

          @media (max-width: 768px) {
            margin: 0 10px 5px 0;
          }
        }
      }

      .project-links {
        justify-content: flex-end;
        margin-left: 0;
        margin-right: -10px;

        @media (max-width: 768px) {
          justify-content: flex-start;
          margin-left: -10px;
          margin-right: 0;
        }
      }

      .project-image {
        grid-column: 1 / 8;

        @media (max-width: 768px) {
          grid-column: 1 / -1;
        }
      }
    }

    .project-content {
      position: relative;
      grid-column: 1 / 7;
      grid-row: 1 / -1;

      @media (max-width: 1080px) {
        grid-column: 1 / 9;
      }

      @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
        grid-column: 1 / -1;
        padding: 40px 40px 30px;
        z-index: 5;
      }

      @media (max-width: 480px) {
        padding: 30px 25px 20px;
      }
    }

    .project-overline {
      margin: 10px 0;
      color: $gold;
      font-family: $font-mono;
      font-size: $fz-xs;
      font-weight: 400;
    }

    .project-title {
      color: $lightest-slate;
      font-size: clamp(24px, 5vw, 28px);

      @media (min-width: 768px) {
        margin: 0 0 20px;
      }

      @media (max-width: 768px) {
        color: $white;

        a {
          position: static;

          &:before {
            content: '';
            display: block;
            position: absolute;
            z-index: 0;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
          }
        }
      }
    }

    .project-description {
      @include boxShadow;
      position: relative;
      z-index: 2;
      padding: 25px;
      border-radius: $border-radius;
      background-color: $light-navy;
      color: $light-slate;
      font-size: $fz-lg;

      @media (max-width: 768px) {
        padding: 20px 0;
        background-color: transparent;
        box-shadow: none;

        &:hover {
          box-shadow: none;
        }
      }

      a {
        @include inlineLink;
      }

      strong {
        color: $white;
        font-weight: normal;
      }
    }

    .project-tech-list {
      display: flex;
      flex-wrap: wrap;
      position: relative;
      z-index: 2;
      margin: 25px 0 10px;
      padding: 0;
      list-style: none;

      li {
        margin: 0 20px 5px 0;
        color: $light-slate;
        font-family: $font-mono;
        font-size: $fz-xs;
        white-space: nowrap;
      }

      @media (max-width: 768px) {
        margin: 10px 0;

        li {
          margin: 0 10px 5px 0;
          color: $lightest-slate;
        }
      }
    }

    .project-links {
      display: flex;
      align-items: center;
      position: relative;
      margin-top: 10px;
      margin-left: -10px;
      color: $lightest-slate;
      align-items: flex-end;

      a {
        @include flexCenter;
        padding: 10px;

        &.external {
          svg {
            width: 22px;
            height: 22px;
            margin-top: -4px;
          }
        }

        svg {
          width: 20px;
          height: 20px;
        }
      }

      .cta {
        @include smallButton;
        margin: 10px;
      }
    }

    .project-image {
      @include boxShadow;
      grid-column: 6 / -1;
      grid-row: 1 / -1;
      position: relative;
      z-index: 1;

      @media (max-width: 768px) {
        grid-column: 1 / -1;
        height: 100%;
        opacity: 0.25;
      }

      a {
        width: 100%;
        height: 100%;
        background-color: $gold;
        border-radius: $border-radius;
        vertical-align: middle;

        &:hover,
        &:focus {
          background: transparent;
          outline: 0;

          &:before,
          .img {
            background: transparent;
            filter: none;
          }
        }

        &:before {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 3;
          transition: $transition;
          background-color: $navy;
          mix-blend-mode: screen;
        }
      }

      .img {
        border-radius: $border-radius;
        mix-blend-mode: multiply;
        filter: grayscale(100%) contrast(1) brightness(90%);

        @media (max-width: 768px) {
          object-fit: cover;
          width: auto;
          height: 100%;
          filter: grayscale(100%) contrast(1) brightness(50%);
        }
      }
    }
  }
}
</style>
