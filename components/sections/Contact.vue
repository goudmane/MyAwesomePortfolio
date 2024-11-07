<template>
  <section id="contact" class="contact-section" ref="container">
    <h2 class="numbered-heading overline">{{ $t('lang.whatsNext') }}</h2>

    <h2 class="title">{{ $t('lang.getIntoTouch') }}</h2>

    <ContentRendererMarkdown :value="contactStatment" v-if="contactStatment" />

    <a class="email-link" :href="`mailto:${email}`">{{ $t('lang.sayHello') }}</a>
  </section>
</template>

<script setup>

const { observeElement } = useIntersectionObserver();
const email = useAppConfig().email;
const { locale } = useI18n();

const contactStatment = ref(null);
const container = ref(null);


const fetchcontact = async () => {
  const contactStatmentData = await queryContent(`/${locale.value}/contact`).findOne();
  contactStatment.value = contactStatmentData || null;
};

onMounted(async () => {
  await fetchcontact();
  observeElement(container.value);
});
</script>

<style lang="scss" scoped>
.contact-section {
  
  max-width: 600px;
  margin: 0 auto 100px;
  text-align: center;

  @media (prefers-reduced-motion: no-preference) {
    @include revealingInit;
  }

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