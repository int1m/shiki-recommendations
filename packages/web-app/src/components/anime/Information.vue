<script lang="ts" setup>
import { KindApi, RatingApi } from '@/services/@types/animes';
import { PropType } from 'vue';

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
    <div class="information-item">
      <div class="title">
        Эпизоды:
      </div>
      <div class="value">
        ---
      </div>
    </div>
    <div v-if="props.status === 'ongoing'" class="information-item">
      <div class="title">
        Следующий эпизод:
      </div>
      <div class="value">
        {{ props.nextEpisodeAt }}
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
        ---
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

    .title {
      min-width: 8rem;
      max-width: 8rem;
      font-weight: 500;
    }
  }
}
</style>
