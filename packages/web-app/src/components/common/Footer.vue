<script lang="ts" setup>
import VIcon from '@/components/kit/VIcon.vue';

const currentYear = (new Date()).getFullYear();
</script>
<template>
  <footer>
    <div class="footer-up">
      <div class="footer-up-left">
        <VIcon name="logo-light" :size="48" />
        <div class="footer-up-left-text">
          shikireki
        </div>
      </div>
      <div class="footer-up-right">
        <VIcon name="sun" :size="24" />
      </div>
    </div>
    <div class="footer-down">
      <div class="footer-down-left">
        <a href="https://github.com/pont1s/shikireki" target="_blank">
          <span class="text-down">GitHub</span>
        </a>
      </div>
      <div class="footer-down-right">
        <span class="text-down">Copyright © startdown {{ currentYear }}</span>
      </div>
    </div>
  </footer>
</template>
<style lang="scss" scoped>
footer {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 3rem;
  width: 100%;
  background: var(--color-background-footer);
  color: #ffffff;

  a {
    color: #ffffff;
  }

  .footer-up {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .footer-up-left {
      display: flex;
      align-items: center;
      gap: 1rem;
      font-size: 1.5rem;
    }

    .footer-up-right {
      :deep(use) {
        fill: #ffffff;
        transition: fill ease-in-out .2s;
      }

      &:hover {
        color: var(--color-primary);

        :deep(use) {
          fill: var(--color-primary);
        }
      }
    }
  }

  .footer-down {
    display: flex;
    justify-content: space-between;
  }
}
</style>
