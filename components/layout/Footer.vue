<script setup lang="ts">


const socialMedia = [
  /* { name: 'GitHub', url: 'https://github.com/goudmane' },
  { name: 'Twitter', url: 'https://twitter.com/goudmane' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/goudmane' }, */
];
</script>


<template>
  <footer class="footer">
    <div class="social-links">
      <ul>
        <li v-for="(media, i) in socialMedia" :key="i">
          <a :href="media.url" :aria-label="media.name">
            <!-- <Icon :name="media.name" /> -->
          </a>
        </li>
      </ul>
    </div>
    <div class="credit" tabindex="-1">
      <a href="https://github.com/goudmane">
        <div>Construit par Goudmane Oualid</div>
      </a>
    </div>
  </footer>
</template>


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
</style>
