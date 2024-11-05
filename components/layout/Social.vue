<template>
  <Side :isHome="isHome" orientation="left">
    <ul class="styled-social-list">
      <li v-for="(item, index) in socialMedia" :key="index">
        <a :href="item.url" :aria-label="item.name" target="_blank" rel="noreferrer">
          <Icon :name="item.icon" />
        </a>
      </li>
    </ul>
  </Side>
</template>

<script setup lang="ts">

const config = useAppConfig();
const socialMedia = config.socialMedia;

// Define props
const props = defineProps({
  isHome: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>

.styled-social-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;

  &:after {
    content: '';
    display: block;
    width: 1px;
    height: 90px;
    margin: 0 auto;
    background-color: $light-slate;
  }

  li {
    &:last-of-type {
      margin-bottom: 20px;
    }

    a {
      padding: 10px;

      &:hover,
      &:focus {
        transform: translateY(-3px);
      }

      span {
        width: 20px;
        height: 20px;
        vertical-align: middle;
      }
    }
  }
}

</style>
