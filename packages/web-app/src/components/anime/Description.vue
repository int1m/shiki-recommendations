<script lang="ts" setup>
</script>

<template>
  <div class="description">
    <h2>Описание</h2>
    <div class="description-content">Сообщество душ получает</div>
  </div>
</template>

<style lang="scss" scoped>
.description {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 927px) {
    gap: 2rem;
  }

  .description-content {
    word-break: break-word;
  }
}
</style>
