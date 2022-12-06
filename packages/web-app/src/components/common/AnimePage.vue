<script lang="ts" setup>
import VIcon from '@/components/kit/VIcon.vue';
import VIconImport from '@/components/kit/VIconImport/VIconImport.vue';

</script>

<template>
  <div class="anime-content">
    <div class="anime-basic-information">
      <div class="anime-basic-information-up">
        <div class="anime-title">
          <span class="anime-title-text">Блич: Тысячелетняя кровавая война</span>
        </div>
        <div class="anime-genres">
          <div class="anime-genre">
            Супер сила
          </div>
          <div class="anime-genre">
            Экшен
          </div>
          <div class="anime-genre">
            Приключения
          </div>
          <div class="anime-genre">
            Комедия
          </div>
          <div class="anime-genre">
            Сверхъестественное
          </div>
          <div class="anime-genre">
            Сёнен
          </div>
        </div>
      </div>
      <div class="anime-basic-information-down">
        <div class="anime-left-information">
          <img class="anime-left-picture" src=" https://moe.shikimori.one/system/animes/original/41467.jpg?1668635043" alt="poster">
          <div class="anime-left-add">
            <div class="left-add">
              <v-icon-import
                class="plus"
                name="plus"
                :size="14"
                fill="#fff"
              />
              <span class="add-list-text">Добавить в список</span>
            </div>
            <div class="left-menu">
              <v-icon-import
                class="vector"
                name="vector"
                :size="13"
                fill="#fff"
              />
            </div>
          </div>
          <div class="anime-left-rating" />
        </div>
        <div class="anime-right-information" />
      </div>
    </div>
    <div class="anime-main-heroes" />
    <div class="anime-authors" />
    <div class="anime-similar" />
  </div>
</template>

<style scoped>
.anime-content{
  display: flex;
  flex-direction: column;
  padding: var(--padding-containter);
}
.anime-title{
  padding-bottom: 1rem;
}
.anime-title-text{
  font-size: 40px;
  font-weight: 700;
}

.anime-genres{
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 14px;
  gap: 0.75rem;
  padding-bottom: 2rem;
}
.anime-genre{
  padding: 0.625rem;
  align-content: center;
  background-color: var(--color-background-light);
  box-shadow: 0 12px 40px 10px rgba(19, 19, 19, 0.05);
  border-radius: var(--border-radius-default-small);
}
.anime-left-information{
  display: flex;
  flex-direction: column;
  padding-right: 2rem;
}
.anime-left-picture{
  border-radius: var(--border-radius-card);
  padding-bottom: 1.5rem;
  width: 21.25rem;
  height: 29.75rem;
}
.anime-left-add{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: var(--border-radius-card);
  background-color: var(--color-primary);
  width: 21.25rem;
  height: 2.5rem;
  color: var(--color-white);
  padding: 0.5rem;
}
.plus{
  padding-right: 0.813rem;
}
.add-list-text{
  font-size: 18px;
}

</style>
