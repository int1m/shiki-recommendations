<script lang="ts" setup>
import HorizontalScrollContainer from '@/components/common/HorizontalScrollContainer.vue';
</script>

<template>
  <div class="authors">
    <h2>Авторы</h2>
    <horizontal-scroll-container class="authors-content">
      <div class="author">
        <img
          src="https://nyaa.shikimori.one/system/people/original/1880.jpg?1663070895"
          alt="author photo"
          class="photo"
        >
        <div class="description">
          <div class="title">Тайто Кубо</div>
          <div class="roles">
            <div>Компоновка серий</div>
            <div>Режиссёр</div>
          </div>
        </div>
      </div>
      <div class="author">
        <img
          src="https://nyaa.shikimori.one/system/people/original/1880.jpg?1663070895"
          alt="author photo"
          class="photo"
        >
        <div class="description">
          <div class="title">Тайто Кубо</div>
          <div class="roles">
            <div>Компоновка серий</div>
            <div>Режиссёр</div>
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

  @media (min-width: 927px) {
    gap: 1rem;
  }

  .authors-content {
    display: flex;
    gap: 2rem;

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
