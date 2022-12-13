<script lang="ts" setup>
import { KindApi, RatingApi, StatusApi } from '@/services/@types/animes';
import { computed, PropType } from 'vue';

const props = defineProps({
  kind: {
    type: String,
    default: undefined,
  },
  rating: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  episodes: {
    type: Number,
    required: true,
  },
  episodesAired: {
    type: Number,
    default: undefined,
  },
  status: {
    type: String,
    default: undefined,
  },
  nextEpisodeAt: {
    type: String,
    default: undefined,
  },
  namesEnglish: {
    type: Array as PropType<Array<string>>,
    default: undefined,
  },
  namesJapanese: {
    type: Array as PropType<Array<string>>,
    default: undefined,
  },
});

const episodesAiredNotEmpty = computed(() => ((props.episodes === props.episodesAired)
  ? props.episodes : `${props.episodesAired ?? ''} / ${props.episodes}`));
const episodes = computed(() => (props.episodesAired ? episodesAiredNotEmpty.value : props.episodes));

const nextEpisodeAt = computed(() => (props.nextEpisodeAt ? (new Date(props.nextEpisodeAt))
  .toLocaleTimeString('ru-RU', {
    month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric',
  }) : undefined));
</script>

<template>
  <div class="information">
    <div class="information-item">
      <div class="title">
        Тип:
      </div>
      <div class="value">
        {{ KindApi[props.kind ?? 'tv'] }}
      </div>
    </div>
    <div v-if="episodes" class="information-item">
      <div class="title">
        Эпизоды:
      </div>
      <div class="value">
        {{ episodes }}
      </div>
    </div>
    <div v-if="props.status === 'ongoing'" class="information-item">
      <div class="title">
        Следующий эпизод:
      </div>
      <div class="value">
        {{ nextEpisodeAt }}
      </div>
    </div>
    <div class="information-item">
      <div class="title">
        Длительность эпизода:
      </div>
      <div class="value">
        {{ props.duration }} мин.
      </div>
    </div>
    <div class="information-item">
      <div class="title">
        Статус:
      </div>
      <div class="value">
        <div class="status" :class="[props.status]">
          {{ StatusApi[props.status] }}
        </div>
      </div>
    </div>
    <div class="information-item">
      <div class="title">
        Рейтинг:
      </div>
      <div class="value">
        {{ RatingApi[props.rating ?? 'No rating'] }}
      </div>
    </div>
    <div
      v-if="Array.isArray(props.namesJapanese)
        && props.namesJapanese.length > 0 && props.namesJapanese[0]"
      class="information-item"
    >
      <div class="title">
        По-японски:
      </div>
      <div class="value">
        {{ props.namesJapanese[0] }}
      </div>
    </div>
    <div
      v-if="Array.isArray(props.namesEnglish)
        && props.namesEnglish.length > 0 && props.namesEnglish[0]"
      class="information-item"
    >
      <div class="title">
        По-английски:
      </div>
      <div class="value">
        {{ props.namesEnglish[0] }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.information {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  .information-item {
    display: flex;
    gap: 1rem;

    .status {
      color: var(--color-white);
      padding: 0.125rem 0.5rem;
      background-color: var(--color-primary);
      box-shadow: 0 12px 40px 10px rgb(19 19 19 / 5%);
      border-radius: var(--border-radius-default-small);

      &.released {
        background-color: var(--color-green-darker);
      }
    }

    .title {
      min-width: 8rem;
      max-width: 8rem;
      font-weight: 500;
    }
  }
}
</style>
