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
        <div class="anime-right-information">
          <div class="information-about-anime">
            <div class="variable">Тип:</div>
            <div class="meaning">TV Сериал</div>
            <div class="variable">Эпизоды:</div>
            <div class="meaning">2</div>
            <div class="variable">Следующий эпизод:</div>
            <div class="meaning">24 окт. 18:00</div>
            <div class="variable">Длительность эпизода:</div>
            <div class="meaning">24 мин.</div>
            <div class="variable">Статус:</div>
            <div class="meaning">с 11 окт. 2022 г.</div>
            <div class="variable">Рейтинг:</div>
            <div class="meaning">R-17</div>
            <div class="variable">По-японски:</div>
            <div class="meaning">BLEACH: 千年血戦篇</div>
            <div class="variable">По-английски:</div>
            <div class="meaning">Bleach: Thousand-Year Blood War</div>
          </div>
          <div class="anime-status">
            <div class="anime"></div>
          </div>
          <div class="anime-studio"></div>
          <div class="anime-description">
            <span class="description-title">Описание</span>
            <div class="description-text">Сообщество душ получает множество сообщений о тревоге: число пустых, уничтоженных в мире живых, растёт с каждой минутой; всё больше жителей района Руконгай числятся пропавшими; грань  между миром живых и Сообществом душ под угрозой исчезновения. Вскоре и Сообщество душ получает множество сообщений о тревоге: число пустых, уничтоженных в мире живых, растёт с каждой минутой; всё больше жителей района Руконгай числятся пропавшими; грань между миром живых и Сообществом душ под </div>
          </div>
        </div>
      </div>
    </div>
    <div class="anime-main-heroes">
      <div class="anime-main-heroes-title">
        <span class="heroes-title">Главные герои</span>
      </div>
      <div class="anime-main-heroes-images">
        <div class="anime-main-heroes-images-up">
          <div class="image"><img src="https://nyaa.shikimori.one/system/characters/preview/5.jpg?1669414948" alt="" class="photo"></div>
          <div class="image"><img src="https://moe.shikimori.one/system/characters/preview/7.jpg?1644787375" alt="" class="photo"></div>
          <div class="image"><img src="https://dere.shikimori.one/system/characters/preview/564.jpg?1644787319" alt="" class="photo"></div>
          <div class="image"><img src="https://nyaa.shikimori.one/system/characters/preview/575.jpg?1644787192" alt="" class="photo"></div>
        </div>
        <div class="anime-main-heroes-images-down">
          <span class="images-text">Ичиго Куросаки</span>
          <span class="images-text">Орихимэ Иноуэ</span>
          <span class="images-text">Урю Исида</span>
          <span class="images-text">Ясутора Садо</span>
        </div>
      </div>
    </div>
    <div class="anime-authors">
      <div class="anime-authors-title">
        <span class="authors-title-text">Авторы</span>
      </div>
      <div class="anime-authors-down">
        <div class="authors-one"></div>
        <div class="authors-two"></div>
      </div>
    </div>
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
.anime-basic-information-down{
  display: flex;
  flex-direction: row;
}
.plus{
  padding-right: 0.813rem;
}
.add-list-text{
  font-size: 18px;
}
.anime-right-information{
  display: grid;
  grid-template-areas:"about status"
                      "about studio"
                      "description description";
  grid-template-rows: 8.969rem 8.969rem 13.063rem;
  grid-template-columns: 1fr 1fr;
  row-gap: 15px;
  column-gap: 32px;
}
.information-about-anime{
  display: inline-grid;
  grid-template-rows: repeat(2, 19px) repeat(2,38px) repeat(4,19px);
  grid-template-columns: 1fr 2fr;
  grid-area:about;
  row-gap: 10px;
  column-gap: 17px;
}
.anime-status{
  grid-area:status;

}
.anime-studio{
  grid-area: studio;

}
.anime-description{
  grid-area: description;
  display: inline-grid;
  grid-template-rows: 20% 80%;
  row-gap: 15px;
}
.variable{
  font-weight: 700;
  font-size: 14px;
}
.meaning{
  font-size: 14px;

}
.description-title{
  font-size: 30px;
  font-weight: 600;
}
.description-text{
  font-size: 14px;
}
.anime-main-heroes{
  display: flex;
  flex-direction: column;
}
.anime-main-heroes-images{
  display: flex;
  flex-direction: column;
}
.anime-main-heroes-images-up{
  display: flex;
  justify-content: left;
}

.image{
  height: 300px;
  width: 203px;
}
.photo{
  width: 100%;
  height: 100%;
  border-radius: 8px 8px 8px 8px;
  padding-right: 12px;
}
.heroes-title{
  font-size: 40px;
  font-weight: 700;
}
.anime-main-heroes-title{
  padding-bottom: 20px;
}
.anime-main-heroes-images-down{
  display: flex;
  justify-content: left;
}
.images-text{
  font-size: 16px;
  padding-right: 90px;
}
</style>
