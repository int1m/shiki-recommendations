<script lang="ts" setup>
import { PropType } from 'vue';

import { config } from '@/config';
import { useInitialStore } from '@/stores/initialStore';
import { useGetCSSVariable } from '@/hooks/useCssVariables';

import VIconImport from '@/components/kit/VIconImport/VIconImport.vue';

import { AnimeApi, KindApi } from '@/services/@types/animes';

const props = defineProps({
  anime: {
    type: Object as PropType<AnimeApi>,
    required: true,
  },
});

const initialStore = useInitialStore();

const colorPrimary = useGetCSSVariable('--color-primary');
</script>

<template>
  <div class="anime-card">
    <img
      class="anime-card-poster"
      :src="`${config.shikimoriUrl}${props.anime.images.original}`"
      alt="anime poster"
    >
    <div class="anime-card-info">
      <div class="anime-card-info-content">
        <span class="anime-card-type">
          {{ KindApi[props.anime.kind ?? 'tv'] }}
        </span>
        <div class="anime-card-rating">
          <v-icon-import
            name="star"
            :size="initialStore.isMobileVersion ? 12 : 18"
            :fill="colorPrimary"
          />
          <span class="anime-card-rating-value">{{ props.anime.score }}</span>
        </div>
      </div>
      <div class="anime-card-title">
        {{ props.anime.nameRussian }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.anime-card {
  width: 100%;
  max-width: 152px;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  gap: 0.75rem;
  user-select: none;
  transition: transform ease-out .1s;
  cursor: pointer;

  @media (min-width: 927px) {
    max-width: 200px;
  }

  &:hover {
    transform: scale(1.025);
  }

  .anime-card-poster {
    width: 100%;
    height: 12.5rem;
    object-fit: cover;
    border-radius: var(--border-radius-card);
    user-select: none;
    pointer-events: none;

    @media (min-width: 927px) {
      height: 16.5rem;
    }
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
      display: -webkit-box;
      width: 100%;
      max-height: 2.5rem;
      margin-top: 0.5rem;
      font-size: 0.875rem;
      word-break: break-word;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      line-height: 1.25;

      @media (min-width: 927px) {
        font-size: 1rem;
        font-weight: 500;
      }
    }
  }
}
</style>
