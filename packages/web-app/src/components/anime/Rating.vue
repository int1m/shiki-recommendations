<script lang="ts" setup>
import { NRate } from 'naive-ui';
import { useGetCSSVariable } from '@/hooks/useCssVariables';
import { computed, PropType } from 'vue';
import { RateScoresStatApi } from '@/services/@types/animes';

const props = defineProps({
  score: {
    type: Number,
    required: true,
  },
  ratesScoresStats: {
    type: Array as PropType<RateScoresStatApi[]>,
    required: true,
  },
});

const ratesCount = computed(() => props.ratesScoresStats?.reduce((count, rateScore) => count + rateScore.value, 0));

const colorPrimary = useGetCSSVariable('--color-primary');
</script>

<template>
  <div class="rating">
    <div class="rating-left">
      <n-rate
        :color="colorPrimary"
        :readonly="true"
        :allow-half="true"
        :count="5"
        :default-value="props.score / 2"
      />
      <span class="subtitle">{{ ratesCount }} оценок</span>
    </div>
    <div class="rating-right">
      {{ props.score }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.rating {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .rating-left {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .subtitle {
      color: var(--color-text-secondary);
    }
  }

  .rating-right {
    font-size: 2.5rem;
    font-weight: 500;
  }
}
</style>
