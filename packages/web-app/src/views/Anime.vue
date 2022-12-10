<script lang="ts" setup>
import VIconImport from '@/components/kit/VIconImport/VIconImport.vue';
import AnimeCard from '@/components/common/AnimeCard.vue';
import HorizontalScrollContainer from '@/components/common/HorizontalScrollContainer.vue';

import { AnimeApi } from '@/services/@types/animes';

const animesSimilar: AnimeApi[] = [
  {
    externalId: 414,
    url: '123',
    score: 8,
    rating: '18+',
    name: 'Anime',
    nameRussian: 'Аниме',
    studios: [],
    genres: [],
    images: {
      original: '/system/animes/original/41467.jpg?1668635043',
    },
    duration: 4,
    episodes: 3,
    episodesAired: 4,
    favoured: false,
    anons: false,
    ongoing: false,
    ratesScoresStats: [],
    ratesStatusesStats: [],
    characters: [],
    persons: [],
  },
  {
    externalId: 414,
    url: '123',
    score: 8,
    rating: '18+',
    name: 'Anime',
    nameRussian: 'Аниме',
    studios: [],
    genres: [],
    images: {
      original: '/system/animes/original/41467.jpg?1668635043',
    },
    duration: 4,
    episodes: 3,
    episodesAired: 4,
    favoured: false,
    anons: false,
    ongoing: false,
    ratesScoresStats: [],
    ratesStatusesStats: [],
    characters: [],
    persons: [],
  },
  {
    externalId: 414,
    url: '123',
    score: 8,
    rating: '18+',
    name: 'Anime',
    nameRussian: 'Аниме',
    studios: [],
    genres: [],
    images: {
      original: '/system/animes/original/41467.jpg?1668635043',
    },
    duration: 4,
    episodes: 3,
    episodesAired: 4,
    favoured: false,
    anons: false,
    ongoing: false,
    ratesScoresStats: [],
    ratesStatusesStats: [],
    characters: [],
    persons: [],
  },
  {
    externalId: 414,
    url: '123',
    score: 8,
    rating: '18+',
    name: 'Anime',
    nameRussian: 'Аниме',
    studios: [],
    genres: [],
    images: {
      original: '/system/animes/original/41467.jpg?1668635043',
    },
    duration: 4,
    episodes: 3,
    episodesAired: 4,
    favoured: false,
    anons: false,
    ongoing: false,
    ratesScoresStats: [],
    ratesStatusesStats: [],
    characters: [],
    persons: [],
  },
];
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
          <img
            class="anime-left-picture"
            src="https://moe.shikimori.one/system/animes/original/41467.jpg?1668635043"
            alt="poster"
          >
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
          <div class="anime-left-rating">
            <div class="anime-left-rating-left">
              <div class="rating-left-up">
                <div class="rating-left-up-star" />
              </div>
              <div class="rating-left-down">
                <span class="rating-text">152 938 оценки</span>
              </div>
            </div>
            <div class="anime-left-rating-right">
              <span class="rating-right">8.6</span>
            </div>
          </div>
        </div>
        <div class="anime-right-information">
          <div class="information-about-anime">
            <div class="variable">
              Тип:
            </div>
            <div class="meaning">
              TV Сериал
            </div>
            <div class="variable">
              Эпизоды:
            </div>
            <div class="meaning">
              2
            </div>
            <div class="variable">
              Следующий эпизод:
            </div>
            <div class="meaning">
              24 окт. 18:00
            </div>
            <div class="variable">
              Длительность эпизода:
            </div>
            <div class="meaning">
              24 мин.
            </div>
            <div class="variable">
              Статус:
            </div>
            <div class="meaning">
              с 11 окт. 2022 г.
            </div>
            <div class="variable">
              Рейтинг:
            </div>
            <div class="meaning">
              R-17
            </div>
            <div class="variable">
              По-японски:
            </div>
            <div class="meaning">
              BLEACH: 千年血戦篇
            </div>
            <div class="variable">
              По-английски:
            </div>
            <div class="meaning">
              Bleach: Thousand-Year Blood War
            </div>
          </div>
          <div class="anime-status">
            <div class="anime-status-title">
              <span class="status-title">В списках у людей</span>
            </div>
            <div class="anime-status-left" />
            <div class="anime-status-right">
              <div class="meaning">
                Запланировано
              </div>
              <div class="meaning">
                Просмотренно
              </div>
              <div class="meaning">
                Смотрю
              </div>
              <div class="meaning">
                Брошено
              </div>
              <div class="meaning">
                Отложено
              </div>
            </div>
          </div>
          <div class="anime-studio">
            <div class="anime-studio-title">
              <span class="studio-text-title">Студии</span>
            </div>
            <div class="anime-studio-photo">
              <img
                src="https://dere.shikimori.one/system/studios/original/569.png?1351013196"
                alt=""
                class="studio-photo"
              >
            </div>
          </div>
          <div class="anime-description">
            <span class="description-title">Описание</span>
            <div class="description-text">
              Сообщество душ получает множество сообщений о тревоге: число пустых, уничтоженных в мире живых, растёт с
              каждой минутой; всё больше жителей района Руконгай числятся пропавшими; грань между миром живых и
              Сообществом душ под угрозой исчезновения. Вскоре и Сообщество душ получает множество сообщений о тревоге:
              число пустых, уничтоженных в мире живых, растёт с каждой минутой; всё больше жителей района Руконгай
              числятся пропавшими; грань между миром живых и Сообществом душ под
            </div>
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
          <div class="image">
            <img
              src="https://nyaa.shikimori.one/system/characters/original/5.jpg?1669414948"
              alt=""
              class="photo"
            >
            <span class="images-text">Ичиго Куросаки</span>
          </div>
          <div class="image">
            <img
              src="https://moe.shikimori.one/system/characters/original/7.jpg?1644787375"
              alt=""
              class="photo"
            >
            <span class="images-text">Орихимэ Иноуэ</span>
          </div>
          <div class="image">
            <img
              src="https://dere.shikimori.one/system/characters/original/564.jpg?1644787319"
              alt=""
              class="photo"
            >
            <span class="images-text">Урю Исида</span>
          </div>
          <div class="image">
            <img
              src="https://nyaa.shikimori.one/system/characters/original/575.jpg?1644787192"
              alt=""
              class="photo"
            >
            <span class="images-text">Ясутора Садо</span>
          </div>
        </div>
      </div>
    </div>
    <div class="anime-authors">
      <div class="anime-authors-title">
        <span class="authors-title-text">Авторы</span>
      </div>
      <div class="anime-authors-down">
        <div class="authors-one">
          <div class="authors-one-photo">
            <img
              src="https://nyaa.shikimori.one/system/people/original/1880.jpg?1663070895"
              alt=""
              class="photo-author"
            >
          </div>
          <div class="authors-one-text">
            <span class="text-title">Тайто Кубо</span>
            <span class="one-text">Автор оригинала</span>
          </div>
        </div>
        <div class="authors-two">
          <div class="authors-two-photo">
            <img
              src="https://nyaa.shikimori.one/system/people/original/31235.jpg?1644526447"
              alt=""
              class="photo-author"
            >
          </div>
          <div class="authors-two-text">
            <span class="text-title">Томохиса Тагути</span>
            <span class="one-text">Компоновка серий</span>
            <span class="one-text">Режиссёр</span>
          </div>
        </div>
      </div>
    </div>
    <div class="anime-similar">
      <div class="anime-similar-title">
        <span class="authors-title-text">Похожее</span>
      </div>
      <div class="anime-similar-down">
        <horizontal-scroll-container class="anime-cards-scrollable">
          <anime-card
            v-for="anime in animesSimilar"
            :key="anime.externalId"
            :anime="anime"
          />
        </horizontal-scroll-container>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.anime-content {
  display: flex;
  flex-direction: column;
  padding-right: var(--padding-containter);
  padding-left: var(--padding-containter);
  padding-bottom: var(--padding-containter);

  .anime-basic-information {
    .anime-basic-information-up {
      .anime-title {
        padding-bottom: 1rem;

        .anime-title-text {
          font-size: 40px;
          font-weight: 700;
        }
      }

      .anime-genres {
        display: flex;
        align-items: center;
        text-align: center;
        font-size: 14px;
        gap: 0.75rem;
        padding-bottom: 2rem;

        .anime-genre {
          padding: 0.625rem;
          align-content: center;
          background-color: var(--color-background-light);
          box-shadow: 0 12px 40px 10px rgba(19, 19, 19, 0.05);
          border-radius: var(--border-radius-default-small);
        }
      }
    }

    .anime-basic-information-down {
      display: flex;
      flex-direction: row;

      .anime-left-information {
        display: flex;
        flex-direction: column;
        padding-right: 2rem;

        .anime-left-picture {
          border-radius: var(--border-radius-card);
          padding-bottom: 1.5rem;
          width: 21.25rem;
          height: 29.75rem;
        }

        .anime-left-add {
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

          .left-add {
            .plus {
              padding-right: 0.813rem;
            }

            .add-list-text {
              font-size: 18px;
            }
          }

          .left-menu {
            .vector {

            }
          }
        }

        .anime-left-rating {
          display: flex;
          flex-direction: row;
          padding-top: 1.5rem;
          justify-content: space-between;
          align-items: center;

          .anime-left-rating-left {
            display: flex;
            flex-direction: column;

            .rating-left-up {
              .rating-left-up-star {
                background-color: #686c72;
                height: 1rem;
                width: 6.375rem;
              }
            }

            .rating-left-down {
              .rating-text {
                font-size: 14px;
              }
            }
          }

          .anime-left-rating-right {
            .rating-right {
              font-size: 40px;
              font-weight: 500;
            }
          }
        }
      }

      .anime-right-information {
        display: grid;
        grid-template-areas:"about status"
                        "about studio"
                        "description description";
        grid-template-rows: 8.969rem 8.969rem 13.063rem;
        grid-template-columns: 1fr 1fr;
        column-gap: 2rem;

        .information-about-anime {
          display: inline-grid;
          grid-template-rows: repeat(2, 1.188rem) repeat(2, 2.375rem) repeat(4, 1.188rem);
          grid-template-columns: 1fr 2fr;
          grid-area: about;
          row-gap: 0.625rem;
          column-gap: 1.063rem;

          .variable {
            font-weight: 700;
            font-size: 16px;
          }

          .meaning {
            font-size: 14px;
            font-weight: 400;
          }
        }

        .anime-status {
          grid-area: status;
          display: grid;
          grid-template-areas:"title title "
                        "left right ";
          grid-template-rows: 1fr 1fr;
          grid-template-columns: 1fr 1fr;
          row-gap: 0.75rem;

          .anime-status-title {
            grid-area: title;
            font-size: 24px;
            font-weight: 600;

            .status-title {

            }
          }

          .anime-status-left {
            grid-area: left;
            background-color: #686c72;
          }

          .anime-status-right {
            grid-area: right;
            text-align: right;
            display: grid;
            row-gap: 0.5rem;

            .meaning {
              font-size: 14px;
              font-weight: 400;
            }
          }
        }

        .anime-studio {
          grid-area: studio;
          display: grid;
          grid-template-rows: 4.438rem 3.188rem;
          grid-template-columns: 1fr;
          justify-content: end;
          align-items: end;

          .anime-studio-title {
            .studio-text-title {
              font-size: 24px;
              font-weight: 600;
            }
          }

          .anime-studio-photo {
            height: 2.375rem;
            width: 8.125rem;

            .studio-photo {
              height: 100%;
              width: 100%;
              border-radius: 0.188rem;
            }
          }
        }

        .anime-description {
          grid-area: description;
          display: inline-grid;
          grid-template-rows: 20% 80%;
          row-gap: 1.875rem;

          .description-title {
            font-size: 40px;
            font-weight: 600;
          }

          .description-text {
            font-size: 16px;
          }
        }
      }
    }
  }

  .anime-main-heroes {
    display: flex;
    flex-direction: column;
    padding-bottom: 2rem;

    .anime-main-heroes-title {
      padding-bottom: 1.25rem;

      .heroes-title {
        font-size: 40px;
        font-weight: 700;
      }
    }

    .anime-main-heroes-images {
      display: flex;
      flex-direction: column;
      padding-bottom: 2rem;

      .anime-main-heroes-images-up {
        display: flex;
        justify-content: left;

        .image {
          height: 16.25rem;
          width: 13.125rem;

          .photo {
            width: 100%;
            height: 100%;
            border-radius: 0.625rem;
            padding-right: 0.813rem;
            object-fit: cover;
          }

          .images-text {
            font-size: 16px;
            padding-right: 5.625rem;
          }
        }
      }
    }
  }

  .anime-authors {
    display: flex;
    flex-direction: column;
    padding-bottom: 1.875rem;

    .anime-authors-title {
      padding-bottom: 1.875rem;

      .authors-title-text {
        font-size: 40px;
        font-weight: 700;
      }
    }

    .anime-authors-down {
      display: flex;
      flex-direction: row;

      .authors-one {
        display: flex;
        flex-direction: row;
        padding-right: 3.938rem;
        align-items: center;

        .authors-one-photo {
          height: 6.25rem;
          width: 6.25rem;

          .photo-author {
            width: 100%;
            height: 100%;
            border-radius: 6.25rem;
            object-fit: cover;
          }
        }

        .authors-one-text {
          display: flex;
          flex-direction: column;
          padding-left: 1.5rem;

          .text-title {
            font-size: 24px;
            font-weight: 700;
            padding-bottom: 0.5rem;
          }

          .one-text {

          }
        }
      }

      .authors-two {
        display: flex;
        flex-direction: row;
        align-items: center;

        .authors-two-photo {
          height: 6.25rem;
          width: 6.25rem;

          .photo-author {
            width: 100%;
            height: 100%;
            border-radius: 6.25rem;
            object-fit: cover;
          }
        }

        .authors-two-text {
          display: flex;
          flex-direction: column;
          padding-left: 1.5rem;

          .text-title {
            font-size: 24px;
            font-weight: 700;
            padding-bottom: 0.5rem;
          }

          .one-text {

          }
        }
      }
    }
  }

  .anime-similar {
    .anime-similar-title {
      .authors-title-text {
        font-size: 40px;
        font-weight: 700;
      }
    }

    .anime-similar-down {
      .anime-cards-scrollable {

      }
    }
  }
}
</style>
