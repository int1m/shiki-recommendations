<script lang="ts" setup>
import { computed, PropType } from 'vue';
import { NPopover } from 'naive-ui';
import { RateStatusesStatApi } from '@/services/@types/animes';

const props = defineProps({
  ratesStatusesStats: {
    type: Array as PropType<RateStatusesStatApi[]>,
    required: true,
  },
});


const maxRate = computed(() => Math.max(...props.ratesStatusesStats.map((rate) => rate.value)));
</script>

<template>
  <div class="rates-statuses">
    <div class="title">
      В списках у людей
    </div>
    <div class="rates-statuses-content">
      <div
        v-for="(rate, index) in props.ratesStatusesStats"
        :key="index"
        class="rate-statuses"
      >
        <n-popover
          trigger="hover"
          placement="top"
          :show-arrow="false"
        >
          <template #trigger>
            <div class="rate-statuses-char">
              <span :style="{ width: `${rate.value / maxRate * 100}%` }" />
            </div>
          </template>
          <div :style="{ padding: '0.125rem 0.25rem', fontSize: '0.875rem' }">{{ rate.value }}</div>
        </n-popover>

        <div class="rate-statuses-title">
          {{ rate.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.rates-statuses {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .title {
    font-size: 1.5rem;
    line-height: 1;
    font-weight: 600;
  }

  .rates-statuses-content {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

   .rate-statuses {
     display: flex;
     align-items: center;
     gap: 2rem;

     .rate-statuses-char {
       position: relative;
       width: 100%;
       height: 0.5rem;
       background-color: var(--color-background-rates);
       border-radius: 0.25rem;
       cursor: pointer;

       span {
         position: absolute;
         top: 0;
         left: 0;
         height: 100%;
         width: 0%;
         background-color: var(--color-primary);
         border-radius: 0.25rem;
       }
     }

     .rate-statuses-value {
       padding: 1rem;
     }

     .rate-statuses-title {
       text-align: end;
       max-width: 7.5rem;
       width: 100%;
     }
   }
  }
}
</style>
