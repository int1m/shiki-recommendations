<script setup lang="ts">
import AppProvider from '@/AppProvider.vue';

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
  vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

</script>

<template>
  <app-provider>
    <router-view />
  </app-provider>
</template>

<style lang="scss">
@import 'styles/index';

#app {
  height: 100%;

  @media (max-width: 926px) {
    height: calc(var(--vh, 1vh) * 100);
  }
}

.n-config-provider {
  height: 100%;

  @media (max-width: 926px) {
    height: calc(var(--vh, 1vh) * 100);
  }
}
</style>
