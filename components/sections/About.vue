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
          <img src="public/static/me.jpeg" alt="Goudmane Oualid Picture" class="img" />
        </div>
        <!-- <div class="hex">
          <div class="hex-border">
            <div class="hex-background">
              <img src="public/static/me.jpeg" alt="Goudmane Oualid Picture" class="img" />
            </div>
          </div>
        </div> -->

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
          setTimeout(() => {
            entry.target.classList.add('animate-delay');
          }, 200);
        }
      });
    },
    {
      threshold: 0.25,
    }
  );

  if (container.value) {
    observer.observe(container.value);
  }
});
</script>


<style lang="scss">
.hex {
  display: block;
  margin: 0 auto;
  position: relative;
  width: 440px; /* Outer width */
  height: 394px; /* Outer height */
  -webkit-clip-path: polygon(25% 3.5%, 75% 3.5%, 100% 50%, 75% 96.5%, 25% 96.5%, 0% 50%);
  clip-path: polygon(25% 3.5%, 75% 3.5%, 100% 50%, 75% 96.5%, 25% 96.5%, 0% 50%);
  background-color: $gold; /* Hexagon border color */
}

/* Inner hexagon to create gap between border and image */
.hex-border {
  position: absolute;
  top: 5px; /* Gap from the border */
  left: 5px; /* Gap from the border */
  width: calc(100% - 10px); /* Adjust size to create the gap */
  height: calc(100% - 10px); /* Adjust size to create the gap */
  -webkit-clip-path: inherit;
  clip-path: inherit;
  background-color: transparent; /* Inner hexagon background color */
}

/* Inner hexagon for image */
.hex-background {
  position: absolute;
  top: 1px;
  left: 1px;
  width: calc(100% - 2px);
  height: calc(100% - 2px);
}

/* Image inside hexagon */
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
        border: 5px solid $gold;
        top: 20px;
        left: 20px;
        z-index: -1;
      }
    }
  }
}

.animate-delay {
  animation: animate-delay 500ms cubic-bezier(0.645, 0.045, 0.355, 1) forwards;
  transform-origin: bottom;
  opacity: 0;
}

@keyframes animate-delay {
  0% {
    opacity: 0;
    transform: translateY(20px);
    -webkit-transform: translateY(40px);
    -moz-transform: translateY(40px);
    -ms-transform: translateY(40px);
    -o-transform: translateY(40px);
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
  transform: translateY(20px);
  -webkit-transform: translateY(40px);
  -moz-transform: translateY(40px);
  -ms-transform: translateY(40px);
  -o-transform: translateY(40px);
}
</style>
