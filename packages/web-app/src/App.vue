<script setup lang="ts">
import AppProvider from '@/AppProvider.vue';
import MainLayout from '@/layouts/MainLayout.vue';
import { useInitialStore } from '@/stores/initialStore';

const initialStore = useInitialStore();

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

initialStore.$patch({
  isMobileVersion: window.innerWidth < 927,
});
window.addEventListener('resize', () => {
  if (window.innerWidth < 927) {
    initialStore.$patch({
      isMobileVersion: true,
    });
  } else {
    initialStore.$patch({
      isMobileVersion: false,
    });
  }
  vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

</script>

<template>
  <app-provider>
    <main-layout>
      <router-view />
    </main-layout>
  </app-provider>
</template>

<style lang="scss">
@import 'styles/index';

#app {
  height: 100%;

  @media (max-width: 926px) {
    height: calc(var(--vh, 1vh) * 100);
  }

  @media (min-width: 927px) {
    --padding-containter: 1.5rem;
  }
}

.n-config-provider {
  height: 100%;

  @media (max-width: 926px) {
    height: calc(var(--vh, 1vh) * 100);
  }
}
</style>
