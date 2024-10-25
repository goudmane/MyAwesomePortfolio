<template>
  <div class="styled-links">
    <slot></slot>
    <slot name="resume"></slot>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>



.styled-links {
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }

  :deep(ol) {
    @include flexBetween; /* Explicitly include the flexBetween mixin */
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      margin: 0 5px;
      position: relative;
      counter-increment: item 1;
      font-size: $fz-xs;

      a {
        padding: 10px;

        &:before {
          content: '0' counter(item) '.';
          margin-right: 5px;
          color: $gold;
          font-size: $fz-xxs;
          text-align: right;
        }
      }
    }
  }

  :deep(.resume-button) {
    @include smallButton; /* Explicitly include the smallButton mixin */
    margin: 0px 15px;
    font-size: $fz-xs;
  }
}

</style>
