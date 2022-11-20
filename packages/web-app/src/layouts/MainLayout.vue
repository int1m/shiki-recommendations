<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useQuery } from 'vue-query';

import { useInitialStore } from '@/stores/initialStore';

import { searchAnimes } from '@/services/animes';

import { useDebounce } from '@/hooks/useDebounce';

import NavBar from '@/components/common/NavBar.vue';
import Footer from '@/components/common/Footer.vue';
import AnimeSearchHeader from '@/components/anime-search/AnimeSearchHeader.vue';

const initialStore = useInitialStore();

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
  <div class="main-layout">
    <nav-bar class="nav-bar" />
    <main>
      <anime-search-header :animes="animeSearched" @search="onSearchInputHandlerDebounce" />
      <router-view class="view" />
      <Footer v-if="initialStore.isMobileVersion" />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.main-layout {
  height: calc(var(--vh, 1vh) * 100);
  display: flex;
  flex-direction: column-reverse;

  @media (min-width: 927px) {
    height: 100%;
    flex-direction: row;
  }

  main {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow-y: auto;

    .view {
      flex: 1;
    }
  }
}
</style>
