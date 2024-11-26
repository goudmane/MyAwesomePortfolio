<template>
    <a v-if="!isLoading" :href="resumeLink" class="resume-button" target="_blank" rel="noopener noreferrer" download>
        {{ $t('lang.resume') }}
    </a>
</template>

<script setup>

const props = defineProps({
    isLoading: {
        type: Boolean,
        default: false,
    },
});

const withATS = " ATS"
const { locale } = useI18n();
const resumeLink = computed(() => `/static/pdf/Goudmane Oualid${withATS} ${locale.value}.pdf`);
</script>

<style scoped>
</style>