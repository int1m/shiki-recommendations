<script lang="ts" setup>
import { PropType } from 'vue';
import { config } from '@/config';
import { PersonApi } from '@/services/@types/animes';
import HorizontalScrollContainer from '@/components/common/HorizontalScrollContainer.vue';

const props = defineProps({
  persons: {
    type: Array as PropType<PersonApi[]>,
    required: true,
  },
});
</script>

<template>
  <div class="authors">
    <h2>Авторы</h2>
    <horizontal-scroll-container class="authors-content">
      <div
        v-for="person in persons"
        :key="person.externalId"
        class="author"
      >
        <img
          :src="`${config.shikimoriUrl}${person.images.original}`"
          alt="author photo"
          class="photo"
          loading="lazy"
        >
        <div class="description">
          <div class="title">
            {{ person.nameRussian }}
          </div>
          <div
            v-for="(role, index) in person.roles"
            :key="index"
            class="roles"
          >
            <div>{{ role.nameRussian }}</div>
          </div>
        </div>
      </div>
    </horizontal-scroll-container>
  </div>
</template>

<style lang="scss" scoped>
.authors {
  display: flex;
  flex-direction: column;

  h2 {
    margin-left: 1rem;

    @media (min-width: 927px) {
      margin-left: 1.5rem;
    }
  }

  @media (min-width: 927px) {
    gap: 1rem;
  }

  .authors-content {
    display: flex;

    .author {
      display: flex;
      flex-shrink: 0;
      align-items: center;
      gap: 1.5rem;
      user-select: none;

      .photo {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        object-fit: cover;
        object-position: top center;
        pointer-events: none;

        @media (min-width: 927px) {
          width: 6.25rem;
          height: 6.25rem;
        }
      }

      .description {
        .title {
          font-weight: 600;

          @media (min-width: 927px) {
            font-size: 1.5rem;
          }

          .roles {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
          }
        }
      }
    }
  }
}
</style>
