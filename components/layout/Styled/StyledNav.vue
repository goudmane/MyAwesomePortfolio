<template>
  <nav>
    <slot></slot>
  </nav>
</template>

<script setup lang="ts">
</script>

<style lang="scss">

nav {
  @include flexBetween; /* Assuming this mixin aligns items */
  position: relative;
  width: 100%;
  color: $lightest-slate;
  font-family: $font-mono;
  counter-reset: item 0;
  z-index: 12;

  
}

</style>
