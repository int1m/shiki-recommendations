<script lang="ts" setup>
import Action from '@/components/anime/Action.vue';
import Genres from '@/components/anime/Genres.vue';
import Rating from '@/components/anime/Rating.vue';
import RatesStatuses from '@/components/anime/RatesStatuses.vue';
import Information from '@/components/anime/Information.vue';
import Description from '@/components/anime/Description.vue';
import Studios from '@/components/anime/Studios.vue';
import MainCharacters from '@/components/anime/MainCharacters.vue';
import Authors from '@/components/anime/Authors.vue';
import Similar from '@/components/anime/Similar.vue';
</script>

<template>
  <div class="anime">
    <h2>Блич: Тысячелетняя кровавая война</h2>
    <div class="poster-container">
      <img
        class="poster"
        src="https://moe.shikimori.one/system/animes/original/41467.jpg?1668635043"
        alt="anime poster"
      >
      <Action />
    </div>
    <Genres />
    <div class="anime-main-info">
      <Rating />
      <RatesStatuses />
      <Information />
      <Description />
      <Studios />
    </div>
    <MainCharacters />
    <Authors />
    <Similar />
  </div>
</template>

<style lang="scss" scoped>
.anime {
  width: 100%;

  .poster-container {
    padding: 0 1rem;
    display: flex;
    flex-direction: column;

    @media (min-width: 440px) {
      max-width: 340px;
    }

    .poster {
      width: 100%;
      height: 100%;
      max-height: 480px;
      object-fit: cover;
      border-radius: var(--border-radius-default);
    }
  }
}
</style>
