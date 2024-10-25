<template>
  <section ref="container" class="about-section content">
    <h2 class="numbered-heading">{{ $t('lang.aboutMe') }}</h2>

    <div class="inner">
      <div class="text">
        <!-- <div v-html="renderHtml(aboutContent)"/> -->
        <ContentRendererMarkdown :value="about" v-if="about" />
        <ul class="skills-list">
          <li v-for="(skill, i) in skills" :key="i">{{ skill }}</li>
        </ul>
      </div>

      <div class="picture">
        <div class="wrapper">
          <img src="/static/me.jpg" alt="Goudmane Oualid Picture" class="img"/>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

const { locale } = useI18n();
const container = ref<HTMLElement | null>(null);

const about = ref<any>(null);
const skills = ref<string[]>([]);

const fetchAboutAndSkills = async () => {
  
  const aboutData = await queryContent(`/${locale.value}/about`).findOne();
  about.value = aboutData || null;

  const skillsData = await queryContent(`/${locale.value}/about/skills`).findOne();
  skills.value = skillsData?.skills || [];

};

onMounted(async () => {
  await fetchAboutAndSkills();
});

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-delay');
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  if (container.value) {
    observer.observe(container.value);
  }
});
</script>


<style lang="scss" >


.about-section {
  max-width: 1000px;
  margin: 0 auto;

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
      /* @include boxShadow; */
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
        border: 2px solid $gold;
        top: 20px;
        left: 20px;
        z-index: -1;
      }
    }
  }
}

.animate-delay {
  animation-duration: 2s;
  animation-fill-mode: both;
  animation-name: animate-delay;
}

@keyframes animate-delay {
  0% {
    opacity: 0;
    transform: translateY(10px);
    -webkit-transform: translateY(30px);
    -moz-transform: translateY(20px);
    -ms-transform: translateY(20px);
    -o-transform: translateY(20px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
    -webkit-transform: translateY(0);
    -moz-transform: translateY(0);
    -ms-transform: translateY(0);
    -o-transform: translateY(0);
  }
}

.content {
  opacity: 0;
  transform: translateY(10px);
  -webkit-transform: translateY(20px);
  -moz-transform: translateY(20px);
  -ms-transform: translateY(20px);
  -o-transform: translateY(20px);
}
</style>
