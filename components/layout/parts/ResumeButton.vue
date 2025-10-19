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

const { locale } = useI18n();
const resumeLink = computed(() => `/static/pdf/Goudmane Oualid ${locale.value}.pdf`);
</script>

<style scoped>
</style>