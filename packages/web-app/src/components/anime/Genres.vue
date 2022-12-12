<script lang="ts" setup>
</script>

<template>
  <div class="genres">
    <div class="genre">
      Супер сила
    </div>
    <div class="genre">
      Экшен
    </div>
    <div class="genre">
      Приключения
    </div>
    <div class="genre">
      Комедия
    </div>
    <div class="genre">
      Сверхъестественное
    </div>
    <div class="genre">
      Сёнен
    </div>
  </div>
</template>

<style lang="scss" scoped>
.genres {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;

  .genre {
    padding: 0.625rem;
    align-content: center;
    background-color: var(--color-background-light);
    box-shadow: 0 12px 40px 10px rgba(19, 19, 19, 0.05);
    border-radius: var(--border-radius-default-small);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
