<script lang="ts" setup>
import { computed, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useQuery } from 'vue-query';

import { config, SHIKIMORI_CLIENT_ID, SHIKIMORI_REDIRECT_URL } from '@/config';

import { useUserStore } from '@/stores/userStore';
import { useInitialStore } from '@/stores/initialStore';
import { useRecommendationStore } from '@/stores/recommendationStore';

import { getAnimeRates, getAuthTokens } from '@/services/shikimoriIntegration';
import { getAnimesRecommendation } from '@/services/animes';
import { RateApi } from '@/services/@types/animes';

import { useGetUserInfo } from '@/hooks/useGetUserInfo';

import VDotLoading from '@/components/kit/VDotLoading.vue';
import VIconImport from '@/components/kit/VIconImport/VIconImport.vue';
import VButton from '@/components/kit/VButton.vue';
import AnimeCard from '@/components/common/AnimeCard.vue';

const router = useRouter();
const route = useRoute();

const initialStore = useInitialStore();
const userStore = useUserStore();
const recommendationStore = useRecommendationStore();

const { code } = route.query;

onBeforeMount(async () => {
  if (typeof code === 'string' && !userStore.isAuthorized) {
    const tokens = await getAuthTokens(code);
    if (tokens.access_token) {
      userStore.$patch({
        isAuthorized: true,
      });
      localStorage.setItem('tokenAccess', tokens.access_token);
      localStorage.setItem('tokenRefresh', tokens.refresh_token);
      await useGetUserInfo();
    }
  }
});

const onAuthButtonClickHandler = () => {
  const redirectParams = new URLSearchParams({
    client_id: SHIKIMORI_CLIENT_ID,
    redirect_uri: SHIKIMORI_REDIRECT_URL,
    response_type: 'code',
    scope: '',
  });
  const redirectUrl = `${config.shikimoriUrl}/oauth/authorize?${redirectParams.toString()}`;
  window.location.href = redirectUrl;
};

const illustrationSize = computed(() => (initialStore.isMobileVersion ? 300 : 600));

const userId = computed(() => userStore.id);
const isAuthorized = computed(() => userStore.isAuthorized);

const { data: userRates } = useQuery(
  ['get-user-rates', userId],
  () => getAnimeRates(userId.value as number),
  {
    refetchOnWindowFocus: false,
    enabled: isAuthorized,
  },
);

const isUserRatesLoading = computed(() => !!userRates.value);

const {
  data: animesRecommend,
  isLoading: isLoadingRecommendation,
} = useQuery(
  ['get-animes-recommendation', userRates],
  () => getAnimesRecommendation(userRates.value as RateApi[]),
  {
    refetchOnWindowFocus: false,
    enabled: isUserRatesLoading,
    onSuccess: (data) => {
      recommendationStore.$patch({
        recommendationAnimes: data,
      });
    },
    initialData: recommendationStore.recommendationAnimes,
  },
);

const onAnimeCardClickHandler = async (id: string) => {
  await router.push({ name: 'anime', params: { id } });
};
</script>

<template>
  <div class="recommendation">
    <div v-if="userStore.isAuthorized" class="recommendation-cards">
      <div class="recommendation-cards-title">
        Персональные рекомендации на основе нейронной сети
      </div>
      <div v-if="!isLoadingRecommendation" class="anime-cards">
        <anime-card
          v-for="anime in animesRecommend"
          :key="anime.externalId"
          :anime="anime"
          @click="onAnimeCardClickHandler(anime._id)"
        />
      </div>
      <div v-else class="loading">
        <v-dot-loading class="loading">
          Нейросеть подбирает варианты
        </v-dot-loading>
      </div>
    </div>
    <div v-else class="recommendation-not-auth">
      <v-icon-import
        class="recommendation-not-auth-illustration"
        name="illustration"
        fill="none"
        :size="illustrationSize"
      />
      <div class="recommendation-not-auth-text-content">
        <h2 class="not-auth-text-content-title">
          <span>Войдите</span> через свой аккаунт, для получения рекомендаций
        </h2>
        <div class="not-auth-text-content-subtitle">
          Сервису необходим доступ к истории просмотров, для построения модели на основе нейронной сети
        </div>
        <v-button
          class="not-auth-text-content-button"
          type="primary"
          size="large"
          :fluid="true"
          @click="onAuthButtonClickHandler"
        >
          <div class="not-auth-text-content-button-content">
            <VIconImport
              name="shikireki-logo"
              :size="30"
              fill="#ffffff"
            />
            <div>через shikimori</div>
          </div>
        </v-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.recommendation {
  width: 100%;
  display: flex;
  background-color: var(--color-background);
  padding-bottom: 1.875rem;

  .recommendation-cards {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 0.5rem;

    @media (min-width: 927px) {
      margin-top: 1rem;
    }

    .recommendation-cards-title {
      margin-left: var(--padding-containter);
      font-size: 1.5rem;
      font-weight: 600;

      @media (min-width: 927px) {
        font-size: 2.5rem;
      }
    }

    .anime-cards {
      margin-top: 1rem;

      @media (min-width: 927px) {
        margin-top: 1.5rem;
      }

      margin-left: var(--padding-containter);

      display: flex;
      flex-wrap: wrap;
      gap: 2rem;
    }

    .loading {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .recommendation-not-auth {
    width: 100%;
    margin-bottom: 4rem;
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2.5rem;

    @media(min-width: 1200px) {
      flex-direction: row-reverse;
      justify-content: space-between;
    }

    .recommendation-not-auth-illustration {
      :deep(svg) {
        .illustration-background {
          fill: var(--color-background-illustration);
        }
      }
    }

    .recommendation-not-auth-text-content {
      display: flex;
      flex-direction: column;
      text-align: center;
      align-items: center;

      @media(min-width: 1200px) {
        text-align: start;
        align-items: flex-start;
        padding: 0 4rem;
      }

      .not-auth-text-content-title {
        font-size: 2rem;

        @media(min-width: 1200px) {
          font-size: 3rem;
          max-width: 640px;
        }

        span {
          color: var(--color-primary);
        }
      }

      .not-auth-text-content-subtitle {
        margin-top: 1rem;
        max-width: 350px;
        line-height: 1.2;

        @media(min-width: 1200px) {
          font-size: 1.5rem;
          max-width: 540px;
        }
      }

      .not-auth-text-content-button {
        width: 100%;
        margin-top: 2rem;

        @media(min-width: 1200px) {
          max-width: 380px;
        }

        .not-auth-text-content-button-content {
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
      }
    }
  }
}
</style>
