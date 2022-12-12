<script lang="ts" setup>
import { PropType } from 'vue';
import { config } from '@/config';
import { StudioApi } from '@/services/@types/animes';

const props = defineProps({
  studios: {
    type: Array as PropType<StudioApi[]>,
    required: true,
  },
});
</script>

<template>
  <div class="studios">
    <div class="title">
      Студии
    </div>
    <div class="studios-content">
      <img
        v-for="studio in props.studios"
        :key="studio.id"
        :src="`${config.shikimoriUrl}${studio.image}`"
        alt="studio logo"
        class="logo"
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.studios {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .title {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .studios-content {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;

    .logo {
      width: auto;
      max-height: 2.5rem;
      object-fit: cover;
    }
  }
}
</style>
