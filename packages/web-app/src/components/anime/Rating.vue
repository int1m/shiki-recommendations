<script lang="ts" setup>
import { NRate } from 'naive-ui';
import { useGetCSSVariable } from '@/hooks/useCssVariables';

const colorPrimary = useGetCSSVariable('--color-primary');
</script>

<template>
  <div class="rating">
    <div class="rating-left">
      <n-rate
        :color="colorPrimary"
        :readonly="true"
        :allow-half="true"
        :default-value="4.5"
      />
      <span class="subtitle">152 938 оценок</span>
    </div>
    <div class="rating-right">
      8.6
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
