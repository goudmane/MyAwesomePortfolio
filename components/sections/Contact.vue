<script setup lang="ts">
import { ref, onMounted } from 'vue';

const email = useAppConfig().email;
const { locale } = useI18n();

const revealContainer = ref<HTMLElement | null>(null);
const contactStatment = ref<any>(null);


const fetchcontact = async () => {
  const contactStatmentData = await queryContent(`/${locale.value}/contact`).findOne();
  contactStatment.value = contactStatmentData || null;
  console.log(contactStatmentData);
  
};

onMounted(async () => {
  await fetchcontact();
});
</script>

<template>
  <section class="contact-section" id="contact" ref="revealContainer">
    <h2 class="numbered-heading overline">{{ $t('lang.whatsNext') }}</h2>

    <h2 class="title">{{ $t('lang.getIntoTouch') }}</h2>

    <ContentRendererMarkdown :value="contactStatment" v-if="contactStatment" />

    <a class="email-link" :href="`mailto:${email}`">{{ $t('lang.sayHello') }}</a>
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