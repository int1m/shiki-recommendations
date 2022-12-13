<script lang="ts" setup>
import { PropType } from 'vue';

import { AnimeApi } from '@/services/@types/animes';

import HorizontalScrollContainer from '@/components/common/HorizontalScrollContainer.vue';
import AnimeCard from '@/components/common/AnimeCard.vue';

const props = defineProps({
  animesSimilar: {
    type: Array as PropType<AnimeApi[]>,
    required: true,
  },
});

const emit = defineEmits(['card-click']);

const onAnimeCardClickHandler = (id: string) => {
  emit('card-click', id);
};
</script>

<template>
  <div class="similar">
    <h2>Похожие</h2>
    <horizontal-scroll-container>
      <anime-card
        v-for="anime in props.animesSimilar"
        :key="anime.externalId"
        :anime="anime"
        @click="onAnimeCardClickHandler(anime._id)"
      />
    </horizontal-scroll-container>
  </div>
</template>

<style lang="scss" scoped>
.similar {
  width: 100%;
  display: flex;
  flex-direction: column;

  h2 {
    margin-left: 1rem;

    @media (min-width: 927px) {
      margin-left: 1.5rem;
    }
  }

  @media (min-width: 927px) {
    gap: 1rem;
  }
}
</style>
