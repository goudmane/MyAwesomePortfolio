<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { usePrefersReducedMotion } from '@/composables/usePrefersReducedMotion';

const email = useAppConfig().email;

const revealContainer = ref<HTMLElement | null>(null);
const prefersReducedMotion = usePrefersReducedMotion();

onMounted(() => {
  /* if (!prefersReducedMotion) {
    sr.reveal(revealContainer.value, srConfig());
  } */
});
</script>

<template>
  <section class="contact-section" id="contact" ref="revealContainer">
    <h2 class="numbered-heading overline">What’s Next?</h2>

    <h2 class="title">Get In Touch</h2>

    <p>
      Bien que je sois actuellement à la recherche de nouvelles opportunités, ma boîte de
      réception est toujours ouverte. Que vous ayez une question ou que vous souhaitiez simplement
      dire bonjour, je ferai de mon mieux pour vous répondre !
    </p>

    <a class="email-link" :href="`mailto:${email}`">Dis bonjour</a>
  </section>
</template>


<style lang="scss" scoped>



.contact-section {
  max-width: 600px;
  margin: 0 auto 100px;
  text-align: center;

  @media (max-width: 768px) {
    margin: 0 auto 50px;
  }

  .overline {
    display: block;
    margin-bottom: 20px;
    color: $gold;
    font-family: $font-mono;
    font-size: $fz-md;
    font-weight: 400;

    &:before {
      bottom: 0;
      font-size: $fz-sm;
    }

    &:after {
      display: none;
    }
  }

  .title {
    font-size: clamp(40px, 5vw, 60px);
  }

  .email-link {
    @include bigButton;
    margin-top: 50px;
  }
}

</style>