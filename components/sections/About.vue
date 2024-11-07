<template>
  <section id="about" ref="container" class="about-section content">
    <h2 class="numbered-heading">{{ $t('lang.aboutMe') }}</h2>

    <div class="inner">
      <div class="text">
        <ContentRendererMarkdown :value="about" v-if="about" />
        <ul class="skills-list">
          <li v-for="(skill, i) in skills" :key="i">{{ skill }}</li>
        </ul>
      </div>

      <div class="picture">
        <div class="wrapper">
          <img src="public/static/me.jpeg" alt="Goudmane Oualid Picture" class="img" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>

const { observeElement } = useIntersectionObserver();
const { locale } = useI18n();
const container = ref(null);

const about = ref(null);
const skills = ref([]);

const fetchAboutAndSkills = async () => {

  const aboutData = await queryContent(`/${locale.value}/about`).findOne();
  about.value = aboutData || null;

  const skillsData = await queryContent(`/${locale.value}/about/skills`).findOne();
  skills.value = skillsData?.skills || [];

};

onMounted(async () => {
  await fetchAboutAndSkills();
  observeElement(container.value);
});

</script>


<style lang="scss">
.hex {
  display: block;
  margin: 0 auto;
  position: relative;
  width: 440px;
  height: 394px;
  -webkit-clip-path: polygon(25% 3.5%, 75% 3.5%, 100% 50%, 75% 96.5%, 25% 96.5%, 0% 50%);
  clip-path: polygon(25% 3.5%, 75% 3.5%, 100% 50%, 75% 96.5%, 25% 96.5%, 0% 50%);
  background-color: $gold;
}


.hex-border {
  position: absolute;
  top: 5px;
  left: 5px;
  width: calc(100% - 10px);
  height: calc(100% - 10px);
  -webkit-clip-path: inherit;
  clip-path: inherit;
  background-color: transparent;
}

.hex-background {
  position: absolute;
  top: 1px;
  left: 1px;
  width: calc(100% - 2px);
  height: calc(100% - 2px);
}

.hex .img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
}


.about-section {
  
  $border-radius: 50%;
  max-width: 1000px;
  margin: 0 auto;

  @media (prefers-reduced-motion: no-preference) {
    @include revealingInit;
  }

  .inner {
    display: grid;
    grid-template-columns: 5fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }

  .text {
    ul.skills-list {
      display: grid;
      grid-template-columns: repeat(2, minmax(140px, 200px));
      grid-gap: 0 10px;
      padding: 0;
      margin: 20px 0 0 0;
      list-style: none;

      li {
        position: relative;
        margin-bottom: 10px;
        padding-left: 20px;
        font-family: $font-mono;
        font-size: $fz-xs;

        &:before {
          content: '▹';
          position: absolute;
          left: 0;
          color: $gold;
          font-size: $fz-sm;
          line-height: 12px;
        }
      }
    }
  }

  .picture {
    position: relative;
    max-width: 300px;
    margin-top: 50px;

    .wrapper {

      display: block;
      position: relative;
      width: 100%;
      border-radius: $border-radius;
      background-color: $gold;

      &:hover,
      &:focus {
        outline: 0;

        &:after {
          top: 15px;
          left: 15px;
        }

        .img {
          filter: none;
          mix-blend-mode: normal;
        }
      }

      .img {
        position: relative;
        border-radius: $border-radius;
        mix-blend-mode: multiply;
        filter: grayscale(100%) contrast(1);
        transition: $transition;
      }

      &:before,
      &:after {
        content: '';
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: $border-radius;
        transition: $transition;
      }

      &:before {
        top: 0;
        left: 0;
        background-color: $navy;
        mix-blend-mode: screen;
      }

      &:after {
        border: 5px solid $gold;
        top: 20px;
        left: 20px;
        z-index: -1;
      }
    }
  }
}
</style>
