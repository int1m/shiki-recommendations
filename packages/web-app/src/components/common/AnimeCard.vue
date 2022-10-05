<script lang="ts" setup>
import { useGetCSSVariable } from '@/hooks/useCssVariables';

import VIconImport from '@/components/kit/VIconImport/VIconImport.vue';
import { useInitialStore } from '@/stores/initialStore';

const initialStore = useInitialStore();

const colorPrimary = useGetCSSVariable('--color-primary');
</script>

<template>
  <div class="anime-card">
    <img
      class="anime-card-poster"
      src="https://kawai.shikimori.one/system/animes/original/51096.jpg?1662797576"
      alt="anime poster"
    >
    <div class="anime-card-info">
      <div class="anime-card-info-content">
        <span class="anime-card-type">
          TV Сериал
        </span>
        <div class="anime-card-rating">
          <v-icon-import
            name="star"
            :size="initialStore.isMobileVersion ? 12 : 18"
            :fill="colorPrimary"
          />
          <span class="anime-card-rating-value">8.4</span>
        </div>
      </div>
      <div class="anime-card-title">Добро пожаловать в класс превосходства 2</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.anime-card {
  max-width: 152px;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  gap: 0.75rem;
  cursor: pointer;
  user-select: none;
  transition: transform ease-out .1s;

  @media (min-width: 927px) {
    max-width: 200px;
  }

  &:hover {
    transform: scale(1.025);
  }

  .anime-card-poster {
    width: 100%;
    height: auto;
    border-radius: var(--border-radius-card);
    user-select: none;
    pointer-events: none;
  }

  .anime-card-info {
    .anime-card-info-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.75rem;
      line-height: 1;

      @media (min-width: 927px) {
        font-size: 0.875rem;
        line-height: 1.5;
      }

      .anime-card-type {
        color: #979AA5; // TODO: color-secondly
      }

      .anime-card-rating {
        display: flex;
        align-items: center;
        font-weight: 500;

        i {
          display: flex;
          align-items: center;
        }
      }
    }

    .anime-card-title {
      width: 100%;
      margin-top: 0.5rem;
      font-size: 0.875rem;
      word-break: break-word;
      white-space: pre-wrap;
      line-height: 1.25;

      @media (min-width: 927px) {
        font-size: 1rem;
        font-weight: 500;
      }
    }
  }
}
</style>
