import { ref } from 'vue';
import { defineStore } from 'pinia';

import { AnimeApi } from '@/services/@types/animes';

export const useRecommendationStore = defineStore('recommendationStore', () => {
  const recommendationAnimes = ref<AnimeApi[] | undefined>(undefined);

  return {
    recommendationAnimes,
  };
}, { persist: true });
