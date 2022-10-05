<script lang="ts" setup>
import AnimeSearchHeader from '@/components/anime-search/AnimeSearchHeader.vue';
import AnimeCard from '@/components/common/AnimeCard.vue';
</script>

<template>
  <div class="anime-search">
    <anime-search-header />
    <div class="anime-cards-container">
      <span class="anime-cards-title">Сейчас на экранах</span>
      <div class="anime-cards">
        <div class="anime-cards-scrollable">
          <anime-card />
          <anime-card />
          <anime-card />
          <anime-card />
          <anime-card />
          <anime-card />
          <anime-card />
          <anime-card />
          <anime-card />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.anime-search {
  height: 100%;
  background-color: #ffffff;

  .anime-cards-container {
    margin-top: 1.875rem;

    @media (min-width: 927px) {
      margin-top: 2.5rem;
    }

    .anime-cards-title {
      margin-left: var(--padding-containter);
      font-size: 1.5rem;
      font-weight: 600;

      @media (min-width: 927px) {
        font-size: 2.5rem;
      }
    }

    .anime-cards {
      display: flex;
      position: relative;

      @media (min-width: 927px) {
        margin-top: 0.875rem;
      }

      .anime-cards-scrollable {
        display: flex;
        overflow-x: auto;
        user-select: none;
        scroll-behavior: smooth;
        -ms-overflow-style: none;
        padding: 1rem 0;

        &::-webkit-scrollbar {
          width: 0;
          height: 0;
          background: transparent;
        }

        div {
          margin-right: 1.25rem;
        }
        @media (min-width: 927px) {
          div {
            margin-right: 1.25rem;
          }
        }

        div:first-child {
          margin-left: var(--padding-containter);
        }
      }
    }
  }
}
</style>
