<script lang="ts" setup>
import { useQuery } from 'vue-query';

import { getOngoingAnimes, getPopularAnimes } from '@/services/animes';

import HorizontalScrollContainer from '@/components/common/HorizontalScrollContainer.vue';
import AnimeCard from '@/components/common/AnimeCard.vue';
import AnimePage from '@/components/common/AnimePage.vue';

const { data: animesOngoing, isLoading: isLoadingOngoing } = useQuery(['get-ongoing-animes'], getOngoingAnimes, {
  refetchOnWindowFocus: false,
});

const { data: animesPopular, isLoading: isLoadingPopular } = useQuery(['get-popular-animes'], getPopularAnimes, {
  refetchOnWindowFocus: false,
});

</script>

<template>
  <div class="main">
    <!--<div class="anime-cards-container">
      <div class="anime-cards-title">Сейчас на экранах</div>
      <horizontal-scroll-container v-if="!isLoadingOngoing" class="anime-cards-scrollable">
        <anime-card
          v-for="anime in animesOngoing"
          :key="anime.externalId"
          :anime="anime"
        />
      </horizontal-scroll-container>
    </div>

    <div class="anime-cards-container">
      <div class="anime-cards-title">Популярное</div>
      <horizontal-scroll-container v-if="!isLoadingPopular" class="anime-cards-scrollable">
        <anime-card
          v-for="anime in animesPopular"
          :key="anime.externalId"
          :anime="anime"
        />
      </horizontal-scroll-container>
    </div>-->
    <AnimePage> </AnimePage>
  </div>
</template>

<style lang="scss" scoped>
.main {
  background-color: var(--color-background);
  padding-bottom: 1.875rem;

  .anime-cards-container {
    margin-top: 0.5rem;

    @media (min-width: 927px) {
      margin-top: 1rem;
    }

    .anime-cards-title {
      margin-left: var(--padding-containter);
      font-size: 1.5rem;
      font-weight: 600;

      @media (min-width: 927px) {
        font-size: 2.5rem;
      }
    }

    .anime-cards-scrollable {
      @media (min-width: 927px) {
        margin-top: 0.875rem;
      }
    }
  }
}
</style>
