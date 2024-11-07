<template>
  <Side orientation="right">
    <div class="styled-link-wrapper">
      <a :href="`mailto:${email}`">{{ email }}</a>
    </div>
  </Side>
</template>

<script setup>

const email = useAppConfig().email;

</script>

<style lang="scss" scoped>
.styled-link-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.styled-link-wrapper::after {
  content: '';
  display: block;
  width: 1px;
  height: 90px;
  margin: 0 auto;
  background-color: $light-slate;
}

.styled-link-wrapper a {
  margin: 20px auto;
  padding: 10px;
  font-family: $font-mono;
  font-size: $fz-xxs;
  line-height: $fz-lg;
  letter-spacing: 0.1em;
  writing-mode: vertical-rl;
}

.styled-link-wrapper a:hover,
.styled-link-wrapper a:focus {
  transform: translateY(-3px);
}
</style>
