<template>
    <label class="language-switcher">
        <input type="checkbox" :checked="currentLang === 'en'" @change="toggleLanguage">
        <span class="slider round" :class="currentLang"></span>
        <span class="select-fr" v-if="currentLang !== 'en'">FR</span>
        <span class="select-en" v-if="currentLang === 'en'">EN</span>
    </label>
</template>

<script setup>

const { locale, setLocale } = useI18n()

const currentLang = computed({
    get: () => locale.value,
    set: (value) => {
        locale.value = value;
    },
});

const toggleLanguage = async () => {
    await scrollToTop();
    currentLang.value = currentLang.value === 'fr' ? 'en' : 'fr';
    setLocale(currentLang.value);
};

const scrollToTop = () => {
    return new Promise((resolve) => {

        if (window.scrollY === 0) {
            resolve();
            return;
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
        const checkIfScrolledToTop = () => {
            if (window.scrollY === 0) {
                resolve();
                window.removeEventListener('scroll', checkIfScrolledToTop);
            }
        };
        window.addEventListener('scroll', checkIfScrolledToTop);
    });
};
</script>


<style lang="scss" scoped>
@import url(https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,400i,700,700i);
$speed3: cubic-bezier(0.26, 0.48, 0.08, 0.9);
$height: 32px;

.language-switcher {
    position: relative;
    display: inline-block;
    width: calc($height * 2);
    height: $height;
    margin-left: 10px;


    -webkit-transition: transform 0.17s $speed3;
    -moz-transition: transform 0.17s $speed3;
    -ms-transition: transform 0.17s $speed3;
    -o-transition: transform 0.17s $speed3;
    transition: transform 0.17s $speed3;

    input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .select-fr,
    .select-en {
        position: absolute;
        font-size: calc(#{$height} / 2.5);
        top: calc(#{$height} / 4);
        color: $gold;
    }

    .select-fr {
        right: calc(#{$height} / 3);
    }

    .select-en {
        left: calc(#{$height} / 3);
    }
}

/* The slider */
.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: $navy;
    box-shadow: inset 0px 0px 3px 0px $gold;

    -webkit-transition: 0.4s;
    transition: 0.4s;

    &:before {
        position: absolute;
        content: "";
        height: $height;
        width: $height;
        background-size: 100%;
        left: 0;
        bottom: 0;
        -webkit-transition: 0.4s;
        transition: 0.4s;

    }

    &.fr:before {
        box-shadow: -4px 0px 8px 0px $gold;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 64 64'%3E%3Cpath fill='%23428bc1' d='M1.9 32c0 13.1 8.4 24.2 20 28.3V3.7C10.3 7.8 1.9 18.9 1.9 32'/%3E%3Cpath fill='%23ed4c5c' d='M61.9 32c0-13.1-8.3-24.2-20-28.3v56.6c11.7-4.1 20-15.2 20-28.3'/%3E%3Cpath fill='%23fff' d='M21.9 60.3c3.1 1.1 6.5 1.7 10 1.7s6.9-.6 10-1.7V3.7C38.8 2.6 35.5 2 31.9 2s-6.9.6-10 1.7z'/%3E%3C/svg%3E");
    }

    &.en:before {
        box-shadow: 4px 0px 8px 0px $gold;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 64 64'%3E%3Cpath fill='%232a5f9e' d='M22 60.3V46.5l-10.3 7.6c2.9 2.7 6.4 4.8 10.3 6.2m20 0c3.9-1.4 7.4-3.5 10.3-6.2L42 46.4zM3.7 42c.3 1 .7 1.9 1.2 2.9L8.8 42zm51.5 0l3.9 2.9c.4-.9.8-1.9 1.2-2.9z'/%3E%3Cpath fill='%23fff' d='M23.5 38H2.6c.3 1.4.7 2.7 1.1 4h5.1l-3.9 2.9c.8 1.7 1.7 3.2 2.8 4.7L18 42h4v2l-11.7 8.6l1.4 1.4L22 46.5v13.8c1.3.5 2.6.8 4 1.1V38zm37.9 0H38v23.4c1.4-.3 2.7-.7 4-1.1V46.5L52.3 54c1.4-1.3 2.6-2.7 3.8-4.2L45.4 42h6.8l6.1 4.5c.3-.5.6-1.1.8-1.6L55.2 42h5.1c.4-1.3.8-2.6 1.1-4'/%3E%3Cpath fill='%23ed4c5c' d='M7.7 49.6c.8 1.1 1.6 2.1 2.5 3.1L22 44.1v-2h-4zM45.5 42l10.7 7.8c.4-.5.7-1 1.1-1.5c.1-.1.1-.2.2-.2c.3-.5.7-1.1 1-1.6L52.2 42z'/%3E%3Cpath fill='%232a5f9e' d='M42 3.7v13.8l10.3-7.6C49.4 7.2 45.9 5.1 42 3.7m-20 0c-3.9 1.4-7.4 3.5-10.3 6.2L22 17.6zM60.3 22c-.3-1-.7-1.9-1.2-2.9L55.2 22zM8.8 22l-3.9-2.9c-.4 1-.8 1.9-1.2 2.9z'/%3E%3Cpath fill='%23fff' d='M40.5 26h20.8c-.3-1.4-.7-2.7-1.1-4h-5.1l3.9-2.9c-.8-1.7-1.7-3.2-2.8-4.7L46 22h-4v-2l11.7-8.6l-1.4-1.4L42 17.5V3.7c-1.3-.5-2.6-.8-4-1.1V26zM2.6 26H26V2.6c-1.4.3-2.7.7-4 1.1v13.8L11.7 10c-1.4 1.3-2.6 2.7-3.8 4.2L18.6 22h-6.8l-6.1-4.5c-.3.5-.6 1.1-.8 1.6L8.8 22H3.7c-.4 1.3-.8 2.6-1.1 4'/%3E%3Cg fill='%23ed4c5c'%3E%3Cpath d='M56.3 14.4c-.8-1.1-1.6-2.1-2.5-3.1L42 19.9v2h4zM18.5 22L7.9 14.2c-.4.5-.7 1-1.1 1.5c-.1.1-.1.2-.2.2c-.3.5-.7 1.1-1 1.6l6.1 4.5z'/%3E%3Cpath d='M61.4 26H38V2.6Q35.15 2 32 2c-3.15 0-4.1.2-6 .6V26H2.6Q2 28.85 2 32c0 3.15.2 4.1.6 6H26v23.4q2.85.6 6 .6c3.15 0 4.1-.2 6-.6V38h23.4q.6-2.85.6-6c0-3.15-.2-4.1-.6-6'/%3E%3C/g%3E%3C/svg%3E");
    }
}

input:checked+.slider {
    background-color: $navy;
}

input:focus+.slider {
    box-shadow: none;
}

input:checked+.slider:before {
    -webkit-transform: translateX($height);
    -ms-transform: translateX($height);
    transform: translateX($height);
}

/* Rounded sliders */
.slider.round {
    border-radius: $height;
}

.slider.round:before {
    border-radius: 50%;
}
</style>