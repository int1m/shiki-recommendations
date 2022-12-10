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
    <img
      class="poster"
      src="https://moe.shikimori.one/system/animes/original/41467.jpg?1668635043"
      alt="anime poster"
    >
    <Action />
    <Genres />
    <Rating />
    <RatesStatuses />
    <Information />
    <Description />
    <Studios />
    <MainCharacters />
    <Authors />
    <Similar />
  </div>
</template>

<style lang="scss" scoped>
.anime {
  width: 100%;
}
</style>
