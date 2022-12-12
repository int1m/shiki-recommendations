<script lang="ts" setup>
import { AnimeApi } from '@/services/@types/animes';
import HorizontalScrollContainer from '@/components/common/HorizontalScrollContainer.vue';
import AnimeCard from '@/components/common/AnimeCard.vue';

const animesSimilar: AnimeApi[] = [
  {
    externalId: 414,
    url: '123',
    score: 8,
    rating: '18+',
    name: 'Anime',
    nameRussian: 'Аниме',
    studios: [],
    genres: [],
    images: {
      original: '/system/animes/original/41467.jpg?1668635043',
    },
    duration: 4,
    episodes: 3,
    episodesAired: 4,
    favoured: false,
    anons: false,
    ongoing: false,
    ratesScoresStats: [],
    ratesStatusesStats: [],
    characters: [],
    persons: [],
  },
  {
    externalId: 414,
    url: '123',
    score: 8,
    rating: '18+',
    name: 'Anime',
    nameRussian: 'Аниме',
    studios: [],
    genres: [],
    images: {
      original: '/system/animes/original/41467.jpg?1668635043',
    },
    duration: 4,
    episodes: 3,
    episodesAired: 4,
    favoured: false,
    anons: false,
    ongoing: false,
    ratesScoresStats: [],
    ratesStatusesStats: [],
    characters: [],
    persons: [],
  },
  {
    externalId: 414,
    url: '123',
    score: 8,
    rating: '18+',
    name: 'Anime',
    nameRussian: 'Аниме',
    studios: [],
    genres: [],
    images: {
      original: '/system/animes/original/41467.jpg?1668635043',
    },
    duration: 4,
    episodes: 3,
    episodesAired: 4,
    favoured: false,
    anons: false,
    ongoing: false,
    ratesScoresStats: [],
    ratesStatusesStats: [],
    characters: [],
    persons: [],
  },
];
</script>

<template>
  <div class="similar">
    <h2>Похожие</h2>
    <horizontal-scroll-container>
      <anime-card
        v-for="anime in animesSimilar"
        :key="anime.externalId"
        :anime="anime"
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
