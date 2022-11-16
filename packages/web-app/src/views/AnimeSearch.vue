<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useQuery } from 'vue-query';

import { getOngoingAnimes, getPopularAnimes, searchAnimes } from '@/services/animes';

import { useDebounce } from '@/hooks/useDebounce';

import HorizontalScrollContainer from '@/components/common/HorizontalScrollContainer.vue';
import AnimeSearchHeader from '@/components/anime-search/AnimeSearchHeader.vue';
import AnimeCard from '@/components/common/AnimeCard.vue';

const { data: animesOngoing, isLoading: isLoadingOngoing } = useQuery(['get-ongoing-animes'], getOngoingAnimes, {
  refetchOnWindowFocus: false,
});

const { data: animesPopular, isFetching: isLoadingPopular } = useQuery(['get-popular-animes'], getPopularAnimes, {
  refetchOnWindowFocus: false,
});

const searchQuery = ref('');
const searchEnabled = computed(() => searchQuery.value !== '');

const { data: searchResult } = useQuery(['search-animes', searchQuery], () => searchAnimes(searchQuery.value), {
  refetchOnWindowFocus: false,
  enabled: searchEnabled,
});

const animeSearched = computed(() => searchResult.value ?? []);

const onSearchInputHandler = (searchValue: string) => {
  searchQuery.value = searchValue;
};

const onSearchInputHandlerDebounce = useDebounce(onSearchInputHandler, 400);
</script>

<template>
  <div class="anime-search">
    <anime-search-header :animes="animeSearched" @search="onSearchInputHandlerDebounce" />
    <div class="anime-cards-container">
      <span class="anime-cards-title">Сейчас на экранах</span>
      <horizontal-scroll-container v-if="!isLoadingOngoing" class="anime-cards-scrollable">
        <anime-card
          v-for="anime in animesOngoing"
          :key="anime.externalId"
          :anime="anime"
        />
      </horizontal-scroll-container>
    </div>

    <div class="anime-cards-container">
      <span class="anime-cards-title">Популярное</span>
      <horizontal-scroll-container v-if="!isLoadingPopular" class="anime-cards-scrollable">
        <anime-card
          v-for="anime in animesPopular"
          :key="anime.externalId"
          :anime="anime"
        />
      </horizontal-scroll-container>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.anime-search {
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
