<script lang="ts" setup>
import { PropType } from 'vue';
import { GenreApi } from '@/services/@types/animes';

const props = defineProps({
  genres: {
    type: Array as PropType<GenreApi[]>,
    required: true,
  },
});
</script>

<template>
  <div class="genres">
    <div
      v-for="genre in props.genres"
      :key="genre.id"
      class="genre"
    >
      {{ genre.name }}
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
