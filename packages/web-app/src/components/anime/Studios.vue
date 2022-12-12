<script lang="ts" setup>
</script>

<template>
  <div class="studios">
    <div class="title">
      Студии
    </div>
    <div class="studios-content">
      <img
        src="https://dere.shikimori.one/system/studios/original/569.png?1351013196"
        alt="studio logo"
        class="logo"
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.studios {
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 927px) {
    padding: 0;
  }

  .title {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .studios-content {
    .logo {
      width: auto;
      max-height: 2.5rem;
    }
  }
}
</style>
