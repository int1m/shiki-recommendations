<script lang="ts" setup>
</script>

<template>
  <div class="horizontal-container">
    <div class="scrollable-container">
      <slot class="scrollable-container-content" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.horizontal-container {
  display: flex;
  position: relative;

  .scrollable-container {
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

    :deep(> div) {
      margin-right: 0.75rem;

      @media (min-width: 927px) {
        margin-right: 1.25rem;
      }
    }

    :deep(> div:first-child) {
      margin-left: var(--padding-containter);
    }
  }
}
</style>
