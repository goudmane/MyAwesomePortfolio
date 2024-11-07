<template>
  <div :class="[orientation === 'left' ? 'left' : 'right']">
    <Transition  tag="div" name="fade">
        <slot v-if="isMounted" />
    </Transition>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  orientation: {
    type: String,
    default: 'left',
  },
});

const isMounted = ref(false);
const loaderDelay = useAppConfig().loaderDelay;

onMounted(() => {

  const timeout = setTimeout(() => {
    isMounted.value = true;
  }, loaderDelay);

  onBeforeUnmount(() => {
    clearTimeout(timeout);
  });

});


</script>

<style lang="scss" scoped>


.left {
  left: 40px; 
  @include sideStyles(left);
}

.right {
  right: 40px;
  @include sideStyles(right);
}

</style>
