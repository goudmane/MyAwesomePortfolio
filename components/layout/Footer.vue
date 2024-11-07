<template>
  <footer class="footer">
    <div class="social-links">
      <ul>
        <li v-for="(item, index) in socialMedia" :key="index">
          <a :href="item.url" :aria-label="item.name" target="_blank" rel="noreferrer">
            <Icon :name="item.icon" />
          </a>
        </li>
      </ul>
    </div>
    <div class="credit" tabindex="-1">
      <div>
        {{ $t('lang.builtBy') }}
        <a href="https://github.com/goudmane">Goudmane Oualid</a>
        {{ $t('lang.designInspiredBy') }}
        <a class="bchiang7" href="https://v4.brittanychiang.com/" target="_blank" rel="noopener noreferrer">bchiang7</a>
      </div>
    </div>
  </footer>
</template>

<script setup>

const socialMedia = useAppConfig().socialMedia;
</script>


<style lang="scss" scoped>
.footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
  min-height: 70px;
  padding: 15px;
  text-align: center;
}

.social-links {
  display: none;

  @media (max-width: 768px) {
    display: block;
    width: 100%;
    max-width: 270px;
    margin: 0 auto 10px;
    color: $light-slate;
  }

  ul {
    display: flex;
    justify-content: space-between;
    padding: 0;
    margin: 0;
    list-style: none;

    a {
      padding: 10px;
      
      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
}

.credit {
  color: $light-slate;
  font-family: $font-mono;
  font-size: $fz-xxs;
  line-height: 1;

  a {
    padding: 10px;
  }
}

.bchiang7{
  &:hover, &:focus {
      color: #64ffda;
  }
}
</style>
