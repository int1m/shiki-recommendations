<script lang="ts" setup>
import NavBar from '@/components/common/NavBar.vue';
</script>

<template>
  <div class="main-layout">
    <main>
      <router-view />
    </main>
    <nav-bar />
  </div>
</template>

<style lang="scss" scoped>
.main-layout {
  height: calc(var(--vh, 1vh) * 100);
  display: flex;
  flex-direction: column;

  @media (min-width: 927px) {
    height: 100%;

    flex-direction: row-reverse;
  }

  main {
    flex: 1;
  }
}
</style>
