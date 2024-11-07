<template>
    <div ref="wrapperRef" class="menu">

        <button @click="toggleMenu" :aria-label="'Menu'" ref="buttonRef" class="hamburger-button"
            :class="{ 'menu-open': isMenuOpen }">
            <div class="ham-box">
                <div class="ham-box-inner"></div>
            </div>
        </button>

        <aside class="sidebar" :class="{ 'menu-open': isMenuOpen }" :aria-hidden="!isMenuOpen" :tabindex="isMenuOpen ? 1 : -1">
            <nav ref="navRef">
                <ol>
                    <li v-for="(link, index) in navLinks" :key="index">
                        <NuxtLink :to="link.url" @click="setisMenuOpen(false)">
                            {{ $t('lang.' + link.name) }}
                        </NuxtLink>
                    </li>
                </ol>
                <ResumeButton :isLoading="false" />
                <LangSwitcher></LangSwitcher>
            </nav>
        </aside>
    </div>
</template>

<script setup>

const isMenuOpen = ref(false);
const buttonRef = ref(null);
const navRef = ref(null);
const wrapperRef = ref(null);
const bodyClasses = ['no-scroll', 'blur'];


const navLinks = useAppConfig().navLinks;

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
    toggleScroll(isMenuOpen.value);
};

const toggleScroll = () => {
    if (isMenuOpen.value) {
        document.body.classList.add(...bodyClasses);
    } else {
        document.body.classList.remove(...bodyClasses);
    }
};

let menuFocusables = [];
let firstFocusableEl = null;
let lastFocusableEl = null;

const setFocusables = () => {
    if (buttonRef.value && navRef.value) {
        menuFocusables = [buttonRef.value, ...Array.from(navRef.value.querySelectorAll('a'))];
        firstFocusableEl = menuFocusables[0];
        lastFocusableEl = menuFocusables[menuFocusables.length - 1];
    }
};

const handleTabNavigation = (e) => {
    if (e.key === 'Tab' && menuFocusables.length > 1) {
        if (e.shiftKey && document.activeElement === firstFocusableEl) {
            e.preventDefault();
            lastFocusableEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastFocusableEl) {
            e.preventDefault();
            firstFocusableEl.focus();
        }
    }
};

const onKeyDown = (e) => {
    if (e.key === 'Escape') {
        isMenuOpen.value = false;
    } else {
        handleTabNavigation(e);
    }
};

const onResize = () => {
    if (window.innerWidth > 768) {
        isMenuOpen.value = false;
    }
};

onMounted(() => {
    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);
    document.body.classList.remove(...bodyClasses);
    nextTick(() => {
        setFocusables();
    });
});

onUnmounted(() => {
    document.removeEventListener('keydown', onKeyDown);
    window.removeEventListener('resize', onResize);
});

useOnClickOutside(wrapperRef, () => {
    if (isMenuOpen.value) {
        toggleMenu();
    }
});
</script>

<style lang="scss" scoped>
.menu {
    display: none;

    @media (max-width: 768px) {
        display: block;
    }
}

.hamburger-button {
    display: none;

    @media (max-width: 768px) {
        @include flexCenter;
        position: relative;
        z-index: 10;
        margin-right: -15px;
        padding: 15px;
        border: 0;
        background-color: transparent;
        color: inherit;
        text-transform: none;
        transition: opacity 0.15s linear, filter 0.15s linear;

        &.menu-open {
            .ham-box-inner {
                transform: rotate(225deg);
                transition-delay: 0.12s;
                transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);

                &:before {
                    width: 100%;
                    top: 0;
                    opacity: 0;
                    transition: $ham-before-active;
                }

                &:after {
                    width: 100%;
                    bottom: 0;
                    transform: rotate(-90deg);
                    transition: $ham-after-active;
                }
            }
        }
    }

    .ham-box {
        display: inline-block;
        position: relative;
        width: $hamburger-width;
        height: 24px;
    }

    .ham-box-inner {
        position: absolute;
        top: 50%;
        right: 0;
        width: $hamburger-width;
        height: 2px;
        border-radius: $border-radius;
        background-color: $gold;
        transition: transform 0.22s;
        transform: rotate(0deg);
        transition-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);

        &:before,
        &:after {
            content: '';
            display: block;
            position: absolute;
            right: 0;
            width: $hamburger-width;
            height: 2px;
            border-radius: 4px;
            background-color: $gold;
            transition: transform 0.15s ease;
        }

        &:before {
            width: 120%;
            top: -10px;
            opacity: 1;
            transition: $ham-before;
        }

        &:after {
            width: 80%;
            bottom: -10px;
            transform: rotate(0);
            transition: $ham-after;
        }
    }
}


.sidebar {

    @media (max-width: 768px) {
        @include flexCenter;
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        padding: 50px 10px;
        width: min(75vw, 400px);
        height: 100vh;
        outline: 0;
        background-color: $light-navy;
        box-shadow: -10px 0px 30px -15px $navy-shadow;
        z-index: 9;
        transform: translateX(100vw);
        visibility: hidden;
        transition: $transition;

        &.menu-open {
            transform: translateX(0);
            visibility: visible;
        }
    }

    nav {
        @include flexBetween;
        width: 100%;
        flex-direction: column;
        color: $lightest-slate;
        font-family: $font-mono;
        text-align: center;
    }

    ol {
        padding: 0;
        margin: 0;
        list-style: none;
        width: 100%;

        li {
            position: relative;
            margin: 0 auto 20px;
            counter-increment: item 1;
            font-size: clamp($fz-sm, 4vw, $fz-lg);

            @media (max-width: 600px) {
                margin: 0 auto 10px;
            }

            &:before {
                content: '0' counter(item) '.';
                display: block;
                margin-bottom: 5px;
                color: $gold;
                font-size: $fz-sm;
            }
        }

        a {
            @include link;
            width: 100%;
            padding: 3px 20px 20px;
        }
    }

    :deep(.resume-button) {
        @include smallButton;
        margin: 0px 15px 30px;
        font-size: $fz-xs;
    }
}
</style>