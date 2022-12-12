<script lang="ts" setup>
const props = defineProps({
  description: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="description">
    <h2>Описание</h2>
    <div class="description-content">
      {{ props.description }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.description {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 927px) {
    gap: 2rem;
  }

  .description-content {
    word-break: break-word;
  }
}
</style>
